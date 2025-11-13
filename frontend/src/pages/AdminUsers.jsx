import React, { useState, useEffect } from "react";
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaEye,
  FaEdit,
  FaTrash,
  FaCheckCircle,
  FaTimesCircle,
  FaCar,
  FaDollarSign,
} from "react-icons/fa";

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);

  // Mock data - replace with actual API calls
  useEffect(() => {
    const mockUsers = [
      {
        id: 1,
        name: "John Doe Motors",
        email: "john@doemotors.com",
        role: "Dealer",
        listingsCount: 15,
        lastLogin: "2024-01-15",
        status: "Active",
        phone: "+254 712 345 678",
        location: "Nairobi, Kenya",
        joinedDate: "2023-06-15",
        totalRevenue: 2500000,
        verified: true,
        listings: [
          {
            id: 101,
            name: "Toyota Corolla 2020",
            price: 1850000,
            status: "Sold",
          },
          {
            id: 102,
            name: "Honda Civic 2019",
            price: 1650000,
            status: "Published",
          },
          {
            id: 103,
            name: "Nissan Altima 2018",
            price: 1450000,
            status: "Published",
          },
        ],
      },
      {
        id: 2,
        name: "Jane Smith",
        email: "jane.smith@email.com",
        role: "Individual",
        listingsCount: 2,
        lastLogin: "2024-01-10",
        status: "Active",
        phone: "+254 723 456 789",
        location: "Mombasa, Kenya",
        joinedDate: "2023-09-20",
        totalRevenue: 320000,
        verified: false,
        listings: [
          { id: 201, name: "BMW X3 2021", price: 3200000, status: "Published" },
        ],
      },
      {
        id: 3,
        name: "Auto Kenya Ltd",
        email: "info@autokenya.com",
        role: "Dealer",
        listingsCount: 28,
        lastLogin: "2024-01-14",
        status: "Active",
        phone: "+254 734 567 890",
        location: "Kisumu, Kenya",
        joinedDate: "2023-03-10",
        totalRevenue: 4500000,
        verified: true,
        listings: [
          {
            id: 301,
            name: "Mercedes C-Class 2022",
            price: 4200000,
            status: "Published",
          },
          { id: 302, name: "Audi A4 2021", price: 3800000, status: "Sold" },
        ],
      },
    ];
    setUsers(mockUsers);
  }, []);

  const handleViewUser = (user) => {
    setSelectedUser(user);
    setShowUserModal(true);
  };

  const handleStatusToggle = (userId) => {
    setUsers(
      users.map((user) =>
        user.id === userId
          ? {
              ...user,
              status: user.status === "Active" ? "Suspended" : "Active",
            }
          : user
      )
    );
  };

  const handleDeleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-heading font-bold text-neutral-800">
              User & Dealer Management
            </h1>
            <p className="text-neutral-600 mt-1">
              Manage registered users and dealers on the platform.
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl shadow-soft border border-neutral-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-neutral-500 text-sm font-medium">
                  Total Users
                </h3>
                <p className="text-2xl font-bold text-neutral-800 mt-2">
                  {users.length}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-blue-100">
                <FaUser className="text-blue-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-soft border border-neutral-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-neutral-500 text-sm font-medium">
                  Active Dealers
                </h3>
                <p className="text-2xl font-bold text-neutral-800 mt-2">
                  {
                    users.filter(
                      (u) => u.role === "Dealer" && u.status === "Active"
                    ).length
                  }
                </p>
              </div>
              <div className="p-3 rounded-xl bg-green-100">
                <FaCheckCircle className="text-green-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-soft border border-neutral-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-neutral-500 text-sm font-medium">
                  Total Listings
                </h3>
                <p className="text-2xl font-bold text-neutral-800 mt-2">
                  {users.reduce((sum, user) => sum + user.listingsCount, 0)}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-orange-100">
                <FaCar className="text-orange-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-soft border border-neutral-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-neutral-500 text-sm font-medium">
                  Total Revenue
                </h3>
                <p className="text-2xl font-bold text-neutral-800 mt-2">
                  KSh{" "}
                  {(
                    users.reduce((sum, user) => sum + user.totalRevenue, 0) /
                    1000000
                  ).toFixed(1)}
                  M
                </p>
              </div>
              <div className="p-3 rounded-xl bg-purple-100">
                <FaDollarSign className="text-purple-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-xl shadow-soft border border-neutral-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50 border-b border-neutral-200">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Listings
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Last Login
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-neutral-200">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-neutral-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <div className="h-10 w-10 rounded-full bg-neutral-300 flex items-center justify-center">
                            <FaUser className="text-neutral-600" size={16} />
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-neutral-900">
                            {user.name}
                          </div>
                          <div className="text-sm text-neutral-500">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-neutral-900">
                        {user.role}
                        {user.verified && (
                          <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-blue-100 text-blue-800">
                            Verified
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                      {user.listingsCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-500">
                      {new Date(user.lastLogin).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                          user.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleViewUser(user)}
                          className="text-blue-600 hover:text-blue-900"
                          title="View Details"
                        >
                          <FaEye size={16} />
                        </button>
                        <button
                          onClick={() => handleStatusToggle(user.id)}
                          className={`${
                            user.status === "Active"
                              ? "text-orange-600 hover:text-orange-900"
                              : "text-green-600 hover:text-green-900"
                          }`}
                          title={
                            user.status === "Active" ? "Suspend" : "Activate"
                          }
                        >
                          {user.status === "Active" ? (
                            <FaTimesCircle size={16} />
                          ) : (
                            <FaCheckCircle size={16} />
                          )}
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete"
                        >
                          <FaTrash size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* User Details Modal */}
      {showUserModal && selectedUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-neutral-800">
                  {selectedUser.name} - {selectedUser.role}
                </h2>
                <button
                  onClick={() => setShowUserModal(false)}
                  className="text-neutral-400 hover:text-neutral-600"
                >
                  <FaTimesCircle size={24} />
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* User Info */}
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-800 mb-3">
                      Contact Information
                    </h3>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <FaEnvelope className="text-neutral-400" size={16} />
                        <span className="text-neutral-700">
                          {selectedUser.email}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <FaPhone className="text-neutral-400" size={16} />
                        <span className="text-neutral-700">
                          {selectedUser.phone}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <FaMapMarkerAlt
                          className="text-neutral-400"
                          size={16}
                        />
                        <span className="text-neutral-700">
                          {selectedUser.location}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <FaCalendarAlt className="text-neutral-400" size={16} />
                        <span className="text-neutral-700">
                          Joined{" "}
                          {new Date(
                            selectedUser.joinedDate
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-neutral-800 mb-3">
                      Account Statistics
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-neutral-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-neutral-800">
                          {selectedUser.listingsCount}
                        </div>
                        <div className="text-sm text-neutral-600">
                          Total Listings
                        </div>
                      </div>
                      <div className="bg-neutral-50 p-4 rounded-lg">
                        <div className="text-2xl font-bold text-neutral-800">
                          KSh {(selectedUser.totalRevenue / 1000000).toFixed(1)}
                          M
                        </div>
                        <div className="text-sm text-neutral-600">
                          Revenue Generated
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Listings */}
                <div>
                  <h3 className="text-lg font-semibold text-neutral-800 mb-3">
                    Recent Listings
                  </h3>
                  <div className="space-y-3">
                    {selectedUser.listings.map((listing) => (
                      <div
                        key={listing.id}
                        className="border border-neutral-200 rounded-lg p-4"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="font-medium text-neutral-800">
                              {listing.name}
                            </h4>
                            <p className="text-sm text-neutral-600">
                              KSh {listing.price.toLocaleString()}
                            </p>
                          </div>
                          <span
                            className={`px-2 py-1 text-xs font-semibold rounded-full ${
                              listing.status === "Published"
                                ? "bg-green-100 text-green-800"
                                : listing.status === "Sold"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {listing.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-neutral-200">
                <button
                  onClick={() => setShowUserModal(false)}
                  className="px-4 py-2 text-neutral-600 hover:text-neutral-800 transition-colors"
                >
                  Close
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Edit User
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminUsers;
