const Settings = require("../models/Settings");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Get all settings
exports.getSettings = async (req, res) => {
  try {
    const settings = await Settings.getSettings();
    res.json(settings);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch settings", error: error.message });
  }
};

// Update fee structure
exports.updateFeeStructure = async (req, res) => {
  try {
    const { feeStructure } = req.body;
    const settings = await Settings.getSettings();

    settings.feeStructure = {
      ...settings.feeStructure.toObject(),
      ...feeStructure,
    };

    await settings.save();
    res.json({ message: "Fee structure updated successfully", settings });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Failed to update fee structure",
        error: error.message,
      });
  }
};

// Update content pages
exports.updateContentPages = async (req, res) => {
  try {
    const { contentPages } = req.body;
    const settings = await Settings.getSettings();

    settings.contentPages = {
      ...settings.contentPages.toObject(),
      ...contentPages,
    };

    await settings.save();
    res.json({ message: "Content pages updated successfully", settings });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Failed to update content pages",
        error: error.message,
      });
  }
};

// Update notification settings
exports.updateNotificationSettings = async (req, res) => {
  try {
    const { notificationSettings } = req.body;
    const settings = await Settings.getSettings();

    settings.notificationSettings = {
      ...settings.notificationSettings.toObject(),
      ...notificationSettings,
    };

    await settings.save();
    res.json({
      message: "Notification settings updated successfully",
      settings,
    });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Failed to update notification settings",
        error: error.message,
      });
  }
};

// Update appearance settings
exports.updateAppearanceSettings = async (req, res) => {
  try {
    const { appearanceSettings } = req.body;
    const settings = await Settings.getSettings();

    settings.appearanceSettings = {
      ...settings.appearanceSettings.toObject(),
      ...appearanceSettings,
    };

    await settings.save();
    res.json({ message: "Appearance settings updated successfully", settings });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Failed to update appearance settings",
        error: error.message,
      });
  }
};

// Change password
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // Get the admin user (assuming single admin for now)
    const admin = await User.findOne({ username: "admin" });
    if (!admin) {
      return res.status(404).json({ message: "Admin user not found" });
    }

    // Verify current password
    const isValidPassword = await bcrypt.compare(
      currentPassword,
      admin.password
    );
    if (!isValidPassword) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    // Update password
    admin.password = hashedPassword;
    await admin.save();

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to change password", error: error.message });
  }
};

// Generate API key
exports.generateApiKey = async (req, res) => {
  try {
    const { name } = req.body;
    const settings = await Settings.getSettings();

    // Generate a random API key
    const apiKey = require("crypto").randomBytes(32).toString("hex");

    settings.apiKeys.push({
      name,
      key: apiKey,
    });

    await settings.save();
    res.json({ message: "API key generated successfully", apiKey });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to generate API key", error: error.message });
  }
};

// Get API keys
exports.getApiKeys = async (req, res) => {
  try {
    const settings = await Settings.getSettings();
    const apiKeys = settings.apiKeys.map((key) => ({
      id: key._id,
      name: key.name,
      createdAt: key.createdAt,
      lastUsed: key.lastUsed,
    }));
    res.json(apiKeys);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch API keys", error: error.message });
  }
};

// Delete API key
exports.deleteApiKey = async (req, res) => {
  try {
    const { id } = req.params;
    const settings = await Settings.getSettings();

    settings.apiKeys = settings.apiKeys.filter(
      (key) => key._id.toString() !== id
    );
    await settings.save();

    res.json({ message: "API key deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete API key", error: error.message });
  }
};

// Get active sessions
exports.getActiveSessions = async (req, res) => {
  try {
    const settings = await Settings.getSettings();

    // Filter sessions active within last 24 hours
    const activeSessions = settings.sessions.filter((session) => {
      const lastActivity = new Date(session.lastActivity);
      const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
      return lastActivity > oneDayAgo;
    });

    res.json(activeSessions);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Failed to fetch active sessions",
        error: error.message,
      });
  }
};

// Add/Update session
exports.updateSession = async (req, res) => {
  try {
    const { sessionId, ipAddress, userAgent } = req.body;
    const settings = await Settings.getSettings();

    const existingSessionIndex = settings.sessions.findIndex(
      (s) => s.sessionId === sessionId
    );

    if (existingSessionIndex >= 0) {
      // Update existing session
      settings.sessions[existingSessionIndex].lastActivity = new Date();
    } else {
      // Add new session
      settings.sessions.push({
        sessionId,
        ipAddress,
        userAgent,
      });
    }

    await settings.save();
    res.json({ message: "Session updated successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to update session", error: error.message });
  }
};

// Clear inactive sessions
exports.clearInactiveSessions = async (req, res) => {
  try {
    const settings = await Settings.getSettings();

    // Remove sessions inactive for more than 30 days
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    settings.sessions = settings.sessions.filter((session) => {
      return new Date(session.lastActivity) > thirtyDaysAgo;
    });

    await settings.save();
    res.json({ message: "Inactive sessions cleared successfully" });
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Failed to clear inactive sessions",
        error: error.message,
      });
  }
};
