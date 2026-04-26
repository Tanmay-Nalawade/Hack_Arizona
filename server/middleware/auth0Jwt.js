const { auth } = require("express-oauth2-jwt-bearer");

// Paste your Auth0 env vars in `server/.env`
// AUTH0_ISSUER_BASE_URL=https://YOUR_TENANT.us.auth0.com/
// AUTH0_AUDIENCE=YOUR_API_IDENTIFIER
const requireAuth = auth({
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
  audience: process.env.AUTH0_AUDIENCE
});

module.exports = { requireAuth };

