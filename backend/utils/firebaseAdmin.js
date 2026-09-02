const { initializeApp, cert } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const path = require("path");

let serviceAccount;

if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  try {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  } catch (err) {
    console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT environment variable:", err);
  }
}

if (!serviceAccount) {
  serviceAccount = require(path.join(__dirname, "..", "config", "firebase-service-account.json"));
}

const app = initializeApp({
  credential: cert(serviceAccount),
});

const adminAuth = getAuth(app);

module.exports = adminAuth;