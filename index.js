
const express = require('express')
const path = require('path')

const app = express()
const port = 3000

app.use(express.static(path.join(__dirname, "public")))

app.get('/login', (req, res) => {
  filePath = path.join(__dirname, 'public', 'login', 'login.html')
  console.log(filePath)
  res.sendFile(filePath)
})

app.get('/signup', (req, res) => {
  filePath = path.join(__dirname, 'public', 'signup', 'signup.html') 
  res.sendFile(filePath)
})



app.use(express.static(path.join(__dirname, "public")))

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
