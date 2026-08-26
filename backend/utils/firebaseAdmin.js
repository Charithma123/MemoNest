const { initializeApp, cert } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const path = require("path");

const serviceAccount = require(path.join(__dirname, "..", "config", "firebase-service-account.json"));

const app = initializeApp({
  credential: cert(serviceAccount),
});

const adminAuth = getAuth(app);

module.exports = adminAuth;