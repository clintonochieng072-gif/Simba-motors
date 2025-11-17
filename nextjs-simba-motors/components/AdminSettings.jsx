import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
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
} from "../utils/api";
import { useToast } from "../contexts/ToastContext";

import {
  FaCog,
  FaUser,
  FaBell,
  FaShieldAlt,
  FaPalette,
  FaDollarSign,
  FaFileAlt,
  FaCheck,
  FaTrash,
  FaKey,
} from "react-icons/fa";

const AdminSettings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { showSuccess, showError } = useToast();

  const [feeStructure, setFeeStructure] = useState({
    dealerCommission: 5,
    individualCommission: 8,
    premiumListingFee: 500,
    featuredListingFee: 1000,
  });

  const [contentPages, setContentPages] = useState({
    aboutUs: "Welcome to Simba Motors...",
    contact: "Get in touch with us...",
    privacy: "Privacy Policy content...",
  });

  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    orderAlerts: true,
  });

  const [appearanceSettings, setAppearanceSettings] = useState({
    theme: "Light mode",
    language: "English",
    timezone: "EAT (UTC+3)",
  });

  const [apiKeys, setApiKeys] = useState([]);
  const [activeSessions, setActiveSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Password change modal state
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  // API Key generation
  const [newApiKeyName, setNewApiKeyName] = useState("");

  // Load settings from backend on component mount
  useEffect(() => {
    loadSettings();
    loadApiKeys();
    loadActiveSessions();
  }, []);

  const loadSettings = async () => {
    try {
      const response = await getSettings();
      const settings = response?.data || {};

      setFeeStructure(settings.feeStructure || feeStructure);
      setContentPages(settings.contentPages || contentPages);
      setNotificationSettings(
        settings.notificationSettings || notificationSettings
      );
      setAppearanceSettings(settings.appearanceSettings || appearanceSettings);
    } catch (error) {
      console.error("Error loading settings:", error);
      showError("Failed to load settings");
    } finally {
      setLoading(false);
    }
  };

  const loadApiKeys = async () => {
    try {
      const response = await getApiKeys();
      setApiKeys(response?.data || []);
    } catch (error) {
      console.error("Error loading API keys:", error);
      setApiKeys([]);
    }
  };

  const loadActiveSessions = async () => {
    try {
      const response = await getActiveSessions();
      setActiveSessions(response?.data || []);
    } catch (error) {
      console.error("Error loading active sessions:", error);
      setActiveSessions([]);
    }
  };

  const handleSaveFees = async () => {
    try {
      await updateFeeStructure({ feeStructure });
      showSuccess("Fee settings saved successfully!");
    } catch (error) {
      showError("Failed to save fee settings");
      console.error("Error saving fees:", error);
    }
  };

  const handleSaveContent = async () => {
    try {
      await updateContentPages({ contentPages });
      showSuccess("Content changes saved successfully!");
    } catch (error) {
      showError("Failed to save content changes");
      console.error("Error saving content:", error);
    }
  };

  const handleNotificationToggle = async (key) => {
    const updatedSettings = {
      ...notificationSettings,
      [key]: !notificationSettings[key],
    };
    setNotificationSettings(updatedSettings);

    try {
      await updateNotificationSettings({
        notificationSettings: updatedSettings,
      });
    } catch (error) {
      // Revert on error
      setNotificationSettings(notificationSettings);
      showError("Failed to update notification settings");
      console.error("Error updating notifications:", error);
    }
  };

  const handleAppearanceChange = async (key, value) => {
    const updatedSettings = {
      ...appearanceSettings,
      [key]: value,
    };
    setAppearanceSettings(updatedSettings);

    try {
      await updateAppearanceSettings({ appearanceSettings: updatedSettings });
    } catch (error) {
      // Revert on error
      setAppearanceSettings(appearanceSettings);
      showError("Failed to update appearance settings");
      console.error("Error updating appearance:", error);
    }
  };

  const handleChangePassword = async () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      showError("New passwords do not match");
      return;
    }

    if (passwordData.newPassword.length < 6) {
      showError("Password must be at least 6 characters long");
      return;
    }

    try {
      await changePassword({
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      showSuccess("Password changed successfully!");
      setShowPasswordModal(false);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      showError("Failed to change password");
      console.error("Error changing password:", error);
    }
  };

  const handleGenerateApiKey = async () => {
    if (!newApiKeyName.trim()) {
      showError("Please enter a name for the API key");
      return;
    }

    try {
      await generateApiKey({ name: newApiKeyName.trim() });
      showSuccess("API key generated successfully!");
      setNewApiKeyName("");
      loadApiKeys(); // Refresh the list
    } catch (error) {
      showError("Failed to generate API key");
      console.error("Error generating API key:", error);
    }
  };

  const handleDeleteApiKey = async (id) => {
    try {
      await deleteApiKey(id);
      showSuccess("API key deleted successfully!");
      loadApiKeys(); // Refresh the list
    } catch (error) {
      showError("Failed to delete API key");
      console.error("Error deleting API key:", error);
    }
  };

  // Handle back button navigation
  useEffect(() => {
    const handlePopState = () => {
      // When back button is pressed on settings page, navigate to overview
      navigate("/admin/dashboard/overview", { replace: true });
    };

    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, [navigate]);

  const settingsSections = [
    {
      title: "Profile Settings",
      description: "Manage your admin profile and account information.",
      icon: FaUser,
      items: [
        {
          label: "Personal Information",
          status: "Not configured",
          type: "info",
        },
        { label: "Change Password", status: "Secure", type: "action" },
        {
          label: "Two-Factor Authentication",
          status: "Disabled",
          type: "toggle",
        },
      ],
    },
    {
      title: "Notification Preferences",
      description: "Configure how you receive notifications and alerts.",
      icon: FaBell,
      items: [
        { label: "Email Notifications", key: "email", type: "toggle" },
        { label: "Push Notifications", key: "push", type: "toggle" },
        { label: "Order Alerts", key: "orderAlerts", type: "toggle" },
      ],
    },
    {
      title: "Security Settings",
      description: "Manage security preferences and access controls.",
      icon: FaShieldAlt,
      items: [
        {
          label: "Session Management",
          status: `${activeSessions.length} active sessions`,
          type: "info",
        },
        {
          label: "API Keys",
          status: `${apiKeys.length} active keys`,
          type: "info",
        },
        { label: "Audit Logs", status: "Enabled", type: "info" },
      ],
    },
    {
      title: "Appearance",
      description: "Customize the admin dashboard appearance.",
      icon: FaPalette,
      items: [
        {
          label: "Theme",
          key: "theme",
          options: ["Light mode", "Dark mode"],
          type: "select",
        },
        {
          label: "Language",
          key: "language",
          options: ["English", "Swahili"],
          type: "select",
        },
        {
          label: "Timezone",
          key: "timezone",
          options: ["EAT (UTC+3)", "UTC+0"],
          type: "select",
        },
      ],
    },
  ];

  return (
    <>
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-heading font-bold text-neutral-800">
          Settings
        </h1>
        <p className="text-neutral-600 mt-1 text-sm sm:text-base">
          Manage your account settings and preferences.
        </p>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
        {settingsSections.map((section, index) => {
          const Icon = section.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-soft border border-neutral-200 p-4 sm:p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Icon className="text-blue-600" size={18} />
                </div>
                <div>
                  <h3 className="text-base sm:text-lg font-semibold text-neutral-800">
                    {section.title}
                  </h3>
                  <p className="text-neutral-600 text-xs sm:text-sm">
                    {section.description}
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {section.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-neutral-50 transition-colors"
                  >
                    <span className="text-neutral-700 font-medium">
                      {item.label}
                    </span>
                    <div className="flex items-center gap-2">
                      {item.type === "toggle" && item.key && (
                        <button
                          onClick={() => handleNotificationToggle(item.key)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                            (
                              item.key === "email"
                                ? notificationSettings.email
                                : item.key === "push"
                                ? notificationSettings.push
                                : notificationSettings.orderAlerts
                            )
                              ? "bg-blue-600"
                              : "bg-gray-200"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              (
                                item.key === "email"
                                  ? notificationSettings.email
                                  : item.key === "push"
                                  ? notificationSettings.push
                                  : notificationSettings.orderAlerts
                              )
                                ? "translate-x-6"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                      )}
                      {item.type === "select" && item.key && (
                        <select
                          value={appearanceSettings[item.key]}
                          onChange={(e) =>
                            handleAppearanceChange(item.key, e.target.value)
                          }
                          className="text-sm border border-neutral-300 rounded px-2 py-1"
                        >
                          {item.options.map((option, idx) => (
                            <option key={idx} value={option}>
                              {option}
                            </option>
                          ))}
                        </select>
                      )}
                      {item.type === "info" && (
                        <span className="text-neutral-500 text-sm">
                          {item.status}
                        </span>
                      )}
                      {item.type === "action" && (
                        <button
                          onClick={() => setShowPasswordModal(true)}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Change
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => alert(`Configure ${section.title} clicked`)}
                className="w-full mt-4 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-3 sm:px-4 py-2 rounded-lg font-medium transition-colors text-sm"
              >
                Configure {section.title}
              </button>
            </div>
          );
        })}
      </div>

      {/* Fee Structure Section */}
      <div className="bg-white rounded-xl shadow-soft border border-neutral-200 p-4 sm:p-6 mb-6 sm:mb-8">
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <div className="p-2 bg-blue-100 rounded-lg">
            <FaDollarSign className="text-blue-600" size={18} />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-neutral-800">
              Fee Structure & Commission Settings
            </h3>
            <p className="text-neutral-600 text-xs sm:text-sm">
              Configure commission rates and listing fees for different seller
              types.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Dealer Commission (%)
            </label>
            <input
              type="number"
              value={feeStructure.dealerCommission}
              onChange={(e) =>
                setFeeStructure({
                  ...feeStructure,
                  dealerCommission: parseFloat(e.target.value),
                })
              }
              className="w-full p-2 sm:p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              min="0"
              max="20"
              step="0.1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Individual Seller Commission (%)
            </label>
            <input
              type="number"
              value={feeStructure.individualCommission}
              onChange={(e) =>
                setFeeStructure({
                  ...feeStructure,
                  individualCommission: parseFloat(e.target.value),
                })
              }
              className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="0"
              max="20"
              step="0.1"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Premium Listing Fee (KSh)
            </label>
            <input
              type="number"
              value={feeStructure.premiumListingFee}
              onChange={(e) =>
                setFeeStructure({
                  ...feeStructure,
                  premiumListingFee: parseInt(e.target.value),
                })
              }
              className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Featured Listing Fee (KSh)
            </label>
            <input
              type="number"
              value={feeStructure.featuredListingFee}
              onChange={(e) =>
                setFeeStructure({
                  ...feeStructure,
                  featuredListingFee: parseInt(e.target.value),
                })
              }
              className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              min="0"
            />
          </div>
        </div>

        <div className="flex justify-end mt-4 sm:mt-6">
          <button
            onClick={handleSaveFees}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 rounded-lg font-medium transition-colors text-sm"
          >
            Save Fee Settings
          </button>
        </div>
      </div>

      {/* Content Management Section */}
      <div className="bg-white rounded-xl shadow-soft border border-neutral-200 p-4 sm:p-6">
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <div className="p-2 bg-blue-100 rounded-lg">
            <FaFileAlt className="text-blue-600" size={18} />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-neutral-800">
              Content Management
            </h3>
            <p className="text-neutral-600 text-xs sm:text-sm">
              Edit static pages and content displayed on the public website.
            </p>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              About Us Page
            </label>
            <textarea
              value={contentPages.aboutUs}
              onChange={(e) =>
                setContentPages({ ...contentPages, aboutUs: e.target.value })
              }
              className="w-full p-2 sm:p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              rows="3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Contact Page
            </label>
            <textarea
              value={contentPages.contact}
              onChange={(e) =>
                setContentPages({ ...contentPages, contact: e.target.value })
              }
              className="w-full p-2 sm:p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              rows="3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-neutral-700 mb-2">
              Privacy Policy
            </label>
            <textarea
              value={contentPages.privacy}
              onChange={(e) =>
                setContentPages({ ...contentPages, privacy: e.target.value })
              }
              className="w-full p-2 sm:p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              rows="3"
            />
          </div>
        </div>

        <div className="flex justify-end mt-4 sm:mt-6">
          <button
            onClick={handleSaveContent}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 sm:px-6 py-2 rounded-lg font-medium transition-colors text-sm"
          >
            Save Content Changes
          </button>
        </div>
      </div>

      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-heading font-bold text-neutral-800">
                  Change Password
                </h2>
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="text-neutral-400 hover:text-neutral-600"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        currentPassword: e.target.value,
                      })
                    }
                    className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        newPassword: e.target.value,
                      })
                    }
                    className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({
                        ...passwordData,
                        confirmPassword: e.target.value,
                      })
                    }
                    className="w-full p-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleChangePassword}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                >
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* API Keys Section */}
      <div className="bg-white rounded-xl shadow-soft border border-neutral-200 p-4 sm:p-6 mb-6 sm:mb-8">
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <div className="p-2 bg-blue-100 rounded-lg">
            <FaKey className="text-blue-600" size={18} />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-neutral-800">
              API Keys Management
            </h3>
            <p className="text-neutral-600 text-xs sm:text-sm">
              Generate and manage API keys for third-party integrations.
            </p>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={newApiKeyName}
              onChange={(e) => setNewApiKeyName(e.target.value)}
              placeholder="Enter API key name"
              className="flex-1 p-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
            />
            <button
              onClick={handleGenerateApiKey}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm"
            >
              Generate Key
            </button>
          </div>
        </div>

        <div className="space-y-2">
          {apiKeys.map((apiKey) => (
            <div
              key={apiKey.id}
              className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg"
            >
              <div>
                <p className="font-medium text-neutral-800">{apiKey.name}</p>
                <p className="text-sm text-neutral-500">
                  Created: {new Date(apiKey.createdAt).toLocaleDateString()}
                  {apiKey.lastUsed && (
                    <span className="ml-4">
                      Last used:{" "}
                      {new Date(apiKey.lastUsed).toLocaleDateString()}
                    </span>
                  )}
                </p>
              </div>
              <button
                onClick={() => handleDeleteApiKey(apiKey.id)}
                className="text-red-600 hover:text-red-800 p-2"
              >
                <FaTrash size={16} />
              </button>
            </div>
          ))}
          {apiKeys.length === 0 && (
            <p className="text-neutral-500 text-sm text-center py-4">
              No API keys generated yet
            </p>
          )}
        </div>
      </div>

      {/* Active Sessions Section */}
      <div className="bg-white rounded-xl shadow-soft border border-neutral-200 p-4 sm:p-6">
        <div className="flex items-center gap-3 mb-4 sm:mb-6">
          <div className="p-2 bg-blue-100 rounded-lg">
            <FaShieldAlt className="text-blue-600" size={18} />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-semibold text-neutral-800">
              Active Sessions
            </h3>
            <p className="text-neutral-600 text-xs sm:text-sm">
              Monitor and manage active admin sessions.
            </p>
          </div>
        </div>

        <div className="space-y-2">
          {activeSessions.map((session, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-neutral-50 rounded-lg"
            >
              <div>
                <p className="font-medium text-neutral-800">
                  Session ID: {session.sessionId.slice(0, 8)}...
                </p>
                <p className="text-sm text-neutral-500">
                  IP: {session.ipAddress || "Unknown"} • Last Activity:{" "}
                  {new Date(session.lastActivity).toLocaleString()}
                </p>
                {session.userAgent && (
                  <p className="text-xs text-neutral-400 mt-1">
                    {session.userAgent.slice(0, 100)}...
                  </p>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-green-500 rounded-full"></span>
                <span className="text-sm text-green-600">Active</span>
              </div>
            </div>
          ))}
          {activeSessions.length === 0 && (
            <p className="text-neutral-500 text-sm text-center py-4">
              No active sessions
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default AdminSettings;
