import React from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "../loginSignup/auth";

const resources = [
  "products",
  "carts",
  "recipes",
  "users",
  "posts",
  "comments",
  "todos",
];

const Sidebar = ({ active }) => {
  const logout = Auth((state) => state.logout);
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");
    if (confirmLogout) {
      logout();
      navigate("/login");
    }
  };

  return (
    <div className="w-64 bg-gray-900 text-white min-h-screen sticky top-0 p-5 flex flex-col">
      {/* Top Section */}
      <div>
        <h2 className="text-2xl font-bold mb-8">Dashboard</h2>

        <ul className="space-y-4">
          {resources.map((type) => (
            <li
              key={type}
              onClick={() => navigate(`/${type}`)}
              className={`p-2 rounded cursor-pointer capitalize transition duration-200 hover:bg-gray-700 ${
                active === type ? "bg-gray-700" : ""
              }`}
            >
              {type}
            </li>
          ))}
        </ul>
      </div>

      {/* Logout Button  */}
      <button
        onClick={handleLogout}
        className="mt-auto bg-white-600 text-black py-2 px-4 rounded-lg transition duration-200 shadow-md"
      >
        Logout
      </button>
    </div>
  );
};

export default Sidebar;