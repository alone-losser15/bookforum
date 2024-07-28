require('dotenv').config();

const firebaseKey = {
    "type": process.env.F_TYPE,
    "project_id": process.env.F_PROJECT_ID,
    "private_key_id": process.env.F_PRIVATE_KEY_ID,
    "private_key": process.env.F_PRIVATE_KEY.replace(/\\n/g, '\n'),
    "client_email": process.env.F_CLIENT_EMAIL,
    "client_id": process.env.F_CLIENT_ID,
    "auth_uri": process.env.F_AUTH_URI,
    "token_uri": process.env.F_TOKEN_URI,
    "auth_provider_x509_cert_url": process.env.F_CERT_URL,
    "client_x509_cert_url": process.env.F_CLIENT_CERT_URL,
    "universe_domain": process.env.F_UNIVERSE_DOMAIN,
}

module.exports = firebaseKey;