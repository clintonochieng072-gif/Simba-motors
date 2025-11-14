const mongoose = require("mongoose");

const settingsSchema = new mongoose.Schema(
  {
    // Fee Structure
    feeStructure: {
      dealerCommission: { type: Number, default: 5 },
      individualCommission: { type: Number, default: 8 },
      premiumListingFee: { type: Number, default: 500 },
      featuredListingFee: { type: Number, default: 1000 },
    },

    // Content Pages
    contentPages: {
      aboutUs: { type: String, default: "Welcome to Simba Motors..." },
      contact: { type: String, default: "Get in touch with us..." },
      privacy: { type: String, default: "Privacy Policy content..." },
    },

    // Notification Settings
    notificationSettings: {
      email: { type: Boolean, default: true },
      push: { type: Boolean, default: true },
      orderAlerts: { type: Boolean, default: true },
    },

    // Appearance Settings
    appearanceSettings: {
      theme: { type: String, default: "Light mode" },
      language: { type: String, default: "English" },
      timezone: { type: String, default: "EAT (UTC+3)" },
    },

    // API Keys (encrypted storage would be better in production)
    apiKeys: [
      {
        name: { type: String, required: true },
        key: { type: String, required: true },
        createdAt: { type: Date, default: Date.now },
        lastUsed: { type: Date },
      },
    ],

    // Sessions (for tracking active sessions)
    sessions: [
      {
        sessionId: { type: String, required: true },
        ipAddress: { type: String },
        userAgent: { type: String },
        createdAt: { type: Date, default: Date.now },
        lastActivity: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
    // Ensure only one settings document exists
    collection: "settings",
  }
);

// Static method to get the single settings document
settingsSchema.statics.getSettings = async function () {
  let settings = await this.findOne();
  if (!settings) {
    settings = new this();
    await settings.save();
  }
  return settings;
};

module.exports = mongoose.model("Settings", settingsSchema);
