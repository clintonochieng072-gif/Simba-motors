"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from "recharts";

import {
  FaCar,
  FaClock,
  FaDollarSign,
  FaUsers,
  FaCalendarAlt,
  FaEye,
} from "react-icons/fa";
import { getCars, getDashboardStats } from "@/lib/api";

const AdminOverview = () => {
  const router = useRouter();
  const [cars, setCars] = useState([]);
  const [stats, setStats] = useState({
    totalActiveListings: 0,
    totalRevenue: 2500000, // Placeholder
    newLeads: 23, // Placeholder
    pendingApproval: 8, // Placeholder
  });

  useEffect(() => {
    fetchCars();
    fetchDashboardStats();
  }, []);

  const fetchCars = async () => {
    try {
      const response = await getCars();
      const carsData = response?.cars || [];
      setCars(carsData);
      setStats((prev) => ({
        ...prev,
        totalActiveListings: carsData.length,
      }));
    } catch (error) {
      console.error("Error fetching cars:", error);
      setCars([]);
    }
  };

  const fetchDashboardStats = async () => {
    try {
      const response = await getDashboardStats();
      setStats((prev) => ({
        ...prev,
        totalRevenue: response.totalRevenue,
        newLeads: response.newLeads,
        pendingApproval: response.pendingApprovals,
      }));
    } catch (error) {
      console.error("Error fetching dashboard stats:", error);
      // Keep placeholder values if API fails
    }
  };

  const statCards = [
    {
      title: "Total Active Listings",
      value: stats.totalActiveListings,
      change: "+12% from last month",
      icon: FaCar,
      color: "blue",
    },
    {
      title: "Revenue/Commissions",
      value: `KSh ${(stats.totalRevenue / 1000000).toFixed(1)}M`,
      change: "+8% from last month",
      icon: FaDollarSign,
      color: "green",
    },
    {
      title: "New Leads/Inquiries",
      value: stats.newLeads,
      change: "Last 24 hours",
      icon: FaUsers,
      color: "orange",
    },
    {
      title: "Pending Approval",
      value: stats.pendingApproval,
      change: "Awaiting review",
      icon: FaClock,
      color: "red",
    },
  ];

  // Sample data for charts
  const listingPerformanceData = [
    { month: "Jan", listings: 45, sold: 32 },
    { month: "Feb", listings: 52, sold: 38 },
    { month: "Mar", listings: 48, sold: 41 },
    { month: "Apr", listings: 61, sold: 45 },
    { month: "May", listings: 55, sold: 48 },
    { month: "Jun", listings: 67, sold: 52 },
  ];

  const trafficSourceData = [
    { name: "Organic", value: 45, color: "#3B82F6" },
    { name: "Direct", value: 25, color: "#10B981" },
    { name: "Paid", value: 20, color: "#F59E0B" },
    { name: "Social", value: 10, color: "#EF4444" },
  ];

  const topBrandsData = [
    { brand: "Toyota", count: 25 },
    { brand: "Honda", count: 18 },
    { brand: "Nissan", count: 15 },
    { brand: "BMW", count: 12 },
    { brand: "Mercedes", count: 10 },
  ];

  const recentActivity = [
    {
      action: "New listing added",
      item: "Toyota Corolla 2020",
      time: "2 hours ago",
    },
    {
      action: "Lead inquiry",
      item: "Honda Civic 2019",
      time: "4 hours ago",
    },
    {
      action: "Listing approved",
      item: "Nissan Altima 2018",
      time: "1 day ago",
    },
    {
      action: "New dealer registered",
      item: "John Doe Motors",
      time: "2 days ago",
    },
  ];

  return (
    <>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-heading font-bold text-neutral-800">
            Dashboard Overview
          </h1>
          <p className="text-neutral-600 mt-1">
            Welcome back! Here's what's happening with your inventory.
          </p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="text-neutral-600 hover:text-primary-600 p-2 rounded-lg hover:bg-neutral-100 transition-colors">
            <FaCalendarAlt size={20} />
          </button>
          <div className="relative">
            <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-neutral-100 transition-colors">
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40' fill='%23ffffff'%3E%3Ccircle cx='20' cy='20' r='18' fill='%23374151'/%3E%3Ctext x='20' y='25' text-anchor='middle' fill='%23ffffff' font-family='Arial' font-size='18'%3EA%3C/text%3E%3C/svg%3E"
                alt="Admin"
                className="w-8 h-8 rounded-full"
              />
              <span className="text-neutral-700 font-medium">Admin</span>
            </button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl shadow-soft border border-neutral-200 p-6 hover:shadow-medium transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-neutral-500 text-sm font-medium">
                    {stat.title}
                  </h3>
                  <p className="text-2xl font-bold text-neutral-800 mt-2">
                    {stat.value}
                  </p>
                  <p className="text-neutral-600 text-sm mt-1">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-xl bg-${stat.color}-100`}>
                  <Icon className={`text-${stat.color}-600`} size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Listing Performance Chart */}
        <div className="bg-white rounded-xl shadow-soft border border-neutral-200 p-6">
          <h3 className="text-lg font-semibold text-neutral-800 mb-4">
            Listing Performance Over Time
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={listingPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="month" stroke="#6B7280" />
              <YAxis stroke="#6B7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#F9FAFB",
                  border: "1px solid #E5E7EB",
                  borderRadius: "8px",
                }}
              />
              <Line
                type="monotone"
                dataKey="listings"
                stroke="#3B82F6"
                strokeWidth={2}
                name="Listings Added"
              />
              <Line
                type="monotone"
                dataKey="sold"
                stroke="#10B981"
                strokeWidth={2}
                name="Sold"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Traffic Source Chart */}
        <div className="bg-white rounded-xl shadow-soft border border-neutral-200 p-6">
          <h3 className="text-lg font-semibold text-neutral-800 mb-4">
            Traffic Source Breakdown
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={trafficSourceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {trafficSourceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-4">
            {trafficSourceData.map((entry, index) => (
              <div key={index} className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: entry.color }}
                ></div>
                <span className="text-sm text-neutral-600">
                  {entry.name} ({entry.value}%)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Top Brands Chart */}
      <div className="bg-white rounded-xl shadow-soft border border-neutral-200 p-6 mb-8">
        <h3 className="text-lg font-semibold text-neutral-800 mb-4">
          Top 5 Best-Selling/Most-Viewed Brands
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topBrandsData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
            <XAxis dataKey="brand" stroke="#6B7280" />
            <YAxis stroke="#6B7280" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#F9FAFB",
                border: "1px solid #E5E7EB",
                borderRadius: "8px",
              }}
            />
            <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-soft border border-neutral-200 p-6">
          <h2 className="text-xl font-heading font-semibold text-neutral-800 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <FaEye className="text-primary-600" size={14} />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-neutral-800">
                    {activity.action}
                  </p>
                  <p className="text-sm text-neutral-600">{activity.item}</p>
                  <p className="text-xs text-neutral-500 mt-1">
                    {activity.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-soft border border-neutral-200 p-6">
          <h2 className="text-xl font-heading font-semibold text-neutral-800 mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <button
              onClick={() => router.push("/admin/dashboard/add-car")}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white px-4 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
            >
              <FaCar size={16} />
              Add New Car
            </button>
            <button
              onClick={() => router.push("/admin/dashboard/users")}
              className="w-full bg-secondary-500 hover:bg-secondary-600 text-white px-4 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
            >
              <FaUsers size={16} />
              View All Users
            </button>
            <button
              onClick={() => alert("Report generation feature coming soon!")}
              className="w-full bg-neutral-100 hover:bg-neutral-200 text-neutral-700 px-4 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
            >
              <FaDollarSign size={16} />
              Generate Report
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminOverview;
