const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const exphbs = require('express-handlebars').create();
const dotenv = require('dotenv');
const { OpenAI } = require("openai");
const cors = require("cors"); // Import the cors middleware

const app = express();
const port = process.env.PORT || 3000;
app.use(cors()); // Enable CORS for all routes

app.use(express.json());
dotenv.config();

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((err) => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    });

app.engine('handlebars', exphbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));

app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false
}));

// Register a Handlebars helper to check if an array includes a value
exphbs.handlebars.registerHelper('includes', function (array, value, options) {
    return (array && array.includes(value)) ? options.fn(this) : '';
});

exphbs.handlebars.registerHelper('contains', function (array, value, options) {
    return array.includes(value) ? options.fn(this) : options.inverse(this);
});

// Middleware to add user data to locals for all views
app.use(async (req, res, next) => {
    res.locals.username = req.session.username;
    res.locals.profilePicURL = req.session.profilePicURL;
    res.locals.email = req.session.email;

    // Ensure user is logged in and populate the user object
    if (req.session.userId) {
        try {
            const user = await User.findById(req.session.userId).populate('likedReviews').exec();
            req.user = user;
        } catch (error) {
            console.error('Error populating user:', error);
            req.user = null;
        }
    } else {
        req.user = null;
    }

    next();
});

app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public'), {
    setHeaders: (res, path, stat) => {
        if (path.endsWith('.css')) {
            res.setHeader('Content-Type', 'text/css');
        };
        if (path.endsWith('.js')) {
            res.setHeader('Content-Type', 'application/javascript');
        }
    }
}));

// Create a new OpenAI instance with your API key
const openai = new OpenAI(process.env.OPENAI_API_KEY);

// Route for summarizing book reviews
app.post("/book-summarizer", async (req, res) => {
    try {
        const { reviews } = req.body;
        console.log("SUMMARIZER CALLED");
        if (!reviews || !Array.isArray(reviews)) {
            return res.status(400).json({ message: "Invalid reviews data" });
        }

        const prompt = reviews.map((review, index) => `Review #${index + 1} ${review}`).join("\n");

        const completion = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'Please summarize the reviews of the book.DO NOT GIVE numbering to reviews in the summary.' },
                { role: 'user', content: prompt }
            ]
        });

        return res.status(200).json({
            success: true,
            data: completion.choices[0].message.content,
        });
    } catch (error) {
        console.error("Error:", error.message);
        return res.status(500).json({
            message: "Internal Server Error",
        });
    }
});

app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/home', require('./routes/home'));
app.use('/genre', require('./routes/genre'));
app.use('/reviews', require('./routes/reviews'));
app.use('/publish-review', require('./routes/reviews'));
app.use('/profile', require('./routes/profile'));
app.use('/add-book', require('./routes/addBook'));
app.post('/sign-out', (req, res) => {
    // Destroy the session to sign out the user
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).send('Internal Server Error');
        }
        // Redirect the user to the home page or another appropriate page after sign out
        res.redirect('/');
    });
});


const multer = require('multer');
const multerGoogleStorage = require('multer-google-storage');
const admin = require('firebase-admin');
const credentials = require('./firebase.js');
const bucket = 'bookreviewforum.appspot.com';

const uploadHandler = multer({
  storage: multerGoogleStorage.storageEngine({
    autoRetry: true,
    bucket: bucket,
    projectId: credentials.project_id,
    keyFilename: './firebase-key.json',
    filename: (req, file, cb) => {
      const fileName = `profile_pics/${req.session.email}${file.originalname}`;
      console.log('Uploading file:', fileName);
      cb(null, fileName);
    },
  }),
});

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(credentials),
    storageBucket: 'bookreviewforum.appspot.com'
  });
}

// Handle file upload
app.post('/upload-profile-pic', uploadHandler.single('profilePic'), async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).send('No file uploaded');
    }

    const downloadURL = `https://storage.googleapis.com/${bucket}/${file.path}`;
    console.log('File uploaded to:', downloadURL);

    const email = req.session.email;
    const User = require('./models/user');
    const userData = await User.findOne({ email }).lean();

    if (!userData) {
      return res.status(404).send('User not found');
    }

    // Find the user by ID
    const user = await User.findById(userData._id);

    // Update the user's profilePicURL with the download URL
    user.profilePicURL = downloadURL;
    await user.save();

    // Update the session data with the new profile picture URL
    req.session.profilePicURL = user.profilePicURL;

    // Redirect back to the referring page or homepage
    res.redirect(req.headers.referer || '/');
  } catch (error) {
    console.error('Error uploading profile picture:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
