import React, { useEffect, useState } from "react";
import { fetchAll } from "../apis/api";
import { useNavigate } from "react-router-dom";

const resources = [
  "products",
  "users",
  "recipes",
  "posts",
  "comments",
  "todos",
];

const OverviewPanel = () => {
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const loadCounts = async () => {
      const result = {};

      await Promise.all(
        resources.map(async (type) => {
          try {
            const res = await fetchAll(type, 1, 1);
            result[type] = res.total;
          } catch {
            result[type] = 0;
          }
        })
      );

      setCounts(result);
      setLoading(false);
    };

    loadCounts();
  }, []);

  return (
    <div className="mb-10">
      <h2 className="text-2xl font-semibold mb-6">Quick Overview</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {resources.map((type) => (
          <div
            key={type}
            className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition"
          >
            <h3 className="text-lg font-semibold capitalize">{type}</h3>

            <p className="text-gray-500 mt-2">
              {loading
                ? "Loading..."
                : `${counts[type] ?? 0} records available`}
            </p>

            <button
              onClick={() => navigate(`/${type}`)}
              className="mt-4 text-blue-600 font-medium hover:underline"
            >
              Manage
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OverviewPanel;
