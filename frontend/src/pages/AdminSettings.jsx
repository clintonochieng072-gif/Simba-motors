import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  FaCog,
  FaUser,
  FaBell,
  FaShieldAlt,
  FaPalette,
  FaDollarSign,
  FaFileAlt,
  FaCheck,
} from "react-icons/fa";

const AdminSettings = () => {
  const navigate = useNavigate();
  const location = useLocation();
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
    theme: "Dark mode",
    language: "English",
    timezone: "EAT (UTC+3)",
  });

  useEffect(() => {
    // Load from localStorage
    const savedFees = localStorage.getItem("feeStructure");
    if (savedFees) setFeeStructure(JSON.parse(savedFees));

    const savedContent = localStorage.getItem("contentPages");
    if (savedContent) setContentPages(JSON.parse(savedContent));

    const savedNotifications = localStorage.getItem("notificationSettings");
    if (savedNotifications)
      setNotificationSettings(JSON.parse(savedNotifications));

    const savedAppearance = localStorage.getItem("appearanceSettings");
    if (savedAppearance) setAppearanceSettings(JSON.parse(savedAppearance));
  }, []);

  const handleSaveFees = () => {
    localStorage.setItem("feeStructure", JSON.stringify(feeStructure));
    alert("Fee settings saved successfully!");
  };

  const handleSaveContent = () => {
    localStorage.setItem("contentPages", JSON.stringify(contentPages));
    alert("Content changes saved successfully!");
  };

  const handleNotificationToggle = (key) => {
    setNotificationSettings({
      ...notificationSettings,
      [key]: !notificationSettings[key],
    });
  };

  const handleAppearanceChange = (key, value) => {
    setAppearanceSettings({
      ...appearanceSettings,
      [key]: value,
    });
  };

  useEffect(() => {
    localStorage.setItem(
      "notificationSettings",
      JSON.stringify(notificationSettings)
    );
    localStorage.setItem(
      "appearanceSettings",
      JSON.stringify(appearanceSettings)
    );
  }, [notificationSettings, appearanceSettings]);

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
        { label: "Session Management", status: "Active", type: "info" },
        { label: "API Keys", status: "2 active keys", type: "info" },
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
                        <button className="text-blue-600 hover:text-blue-800 text-sm">
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
    </>
  );
};

export default AdminSettings;
