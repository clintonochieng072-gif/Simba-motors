const express = require("express");
const router = express.Router();
const { verifyToken } = require("../controllers/authController");
const {
  getSettings,
  updateFeeStructure,
  updateContentPages,
  updateNotificationSettings,
  updateAppearanceSettings,
  changePassword,
  generateApiKey,
  getApiKeys,
  deleteApiKey,
  getActiveSessions,
  updateSession,
  clearInactiveSessions,
} = require("../controllers/settingsController");

// Protected settings routes
router.use(verifyToken);

// Get all settings
router.get("/", getSettings);

// Update settings
router.put("/fees", updateFeeStructure);
router.put("/content", updateContentPages);
router.put("/notifications", updateNotificationSettings);
router.put("/appearance", updateAppearanceSettings);

// Password management
router.put("/password", changePassword);

// API Keys management
router.post("/api-keys", generateApiKey);
router.get("/api-keys", getApiKeys);
router.delete("/api-keys/:id", deleteApiKey);

// Session management
router.get("/sessions", getActiveSessions);
router.post("/sessions", updateSession);
router.delete("/sessions/inactive", clearInactiveSessions);

module.exports = router;
