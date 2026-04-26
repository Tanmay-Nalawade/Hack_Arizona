const express = require("express");
const User = require("../models/User");
const { requireAuth } = require("../middleware/auth0Jwt");

const router = express.Router();

// Protected: sync the authenticated Auth0 user into MongoDB
// GET /api/user/sync
router.get("/sync", requireAuth, async (req, res) => {
  try {
    const { sub, name, phone_number } = req.auth.payload; // provided by express-oauth2-jwt-bearer
    if (!sub) return res.status(400).json({ error: "Missing token sub claim" });

    let user = await User.findOne({ auth0Id: sub });
    if (user) return res.json({ user, created: false });

    user = await User.create({
      auth0Id: sub,
      name: name || "",
      phone_number: phone_number || ""
    });

    return res.status(201).json({ user, created: true });
  } catch (err) {
    return res.status(500).json({ error: "User sync failed" });
  }
});

module.exports = router;

