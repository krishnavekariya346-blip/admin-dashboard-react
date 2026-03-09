import React, { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";
import DataViewer from "../components/Data";
import ProductDetail from "./ProductDetails";
import RecipeDetail from "./RecipeDetail";
import UserDetail from "./UserDetail";
import PostDetail from "./PostDetail";
import TodoDetail from "./TodoDetail";
import OverviewPanel from "../components/overviewPanel";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { fetchSingle } from "../apis/api";

const Dashboard = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  // Detect type from URL
  const pathParts = location.pathname.split("/").filter(Boolean);
  const type = pathParts[0] === "dashboard" ? null : pathParts[0];

  const [cart, setCart] = useState([]);
  const [singleItem, setSingleItem] = useState(null);

  // ------------------ Load Cart From localStorage ------------------
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  // ------------------ Save Cart To localStorage ------------------
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  // ------------------ Fetch Single Item ------------------
  useEffect(() => {
    if (!id) {
      setSingleItem(null);
      return;
    }

    const loadSingle = async () => {
      try {
        const data = await fetchSingle(type, id);
        setSingleItem(data);
      } catch (error) {
        console.error("Single item error:", error);
      }
    };

    loadSingle();
  }, [type, id]);

  // ------------------ Cart Logic --> addTocart & remove From Cart------------------
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);

      if (exists) {
        alert("Your cart has been updated");
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      alert("Product added to cart successfully");
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden">
      {/* Sidebar sticky */}
      <div className="sticky top-0 h-screen">
        <Sidebar active={type} setActive={(t) => navigate(`/${t}`)} />
      </div>

      <div className="flex-1 bg-gray-100 p-8 overflow-y-auto">
        {/* ================= Dashboard Home (Only Overview) ================= */}
        {location.pathname === "/dashboard" && (
          <>
            <h1 className="text-3xl font-bold mb-6">Dashboard Overview</h1>
            <OverviewPanel />
          </>
        )}

        {/* ================= Resource Pages ================= */}
        {type && (
          <>
            <div className="mb-4 text-sm text-gray-500 flex items-center gap-2">
              <a
              href="/dashboard"
                onClick={() => navigate("/dashboard")}
                className="cursor-pointer hover:text-blue-600 transition"
              >
                Dashboard
              </a>

              <span>/</span>

              <span
                onClick={() => navigate(`/${type}`)}
                className="cursor-pointer capitalize hover:text-blue-600 transition"
              >
                {type}
              </span>

              {id && (
                <>
                  <span>/</span>
                  <span className="text-gray-700">Details</span>
                </>
              )}
            </div>

            <h1 className="text-3xl font-bold mb-6 capitalize">
              {type} Dashboard
            </h1>

            {id ? (
              <>
                {type === "products" && (
                  <ProductDetail product={singleItem} addToCart={addToCart} />
                )}
                {type === "recipes" && <RecipeDetail recipe={singleItem} />}
                {type === "users" && <UserDetail user={singleItem} />}
                {type === "posts" && <PostDetail post={singleItem} />}
                {type === "todos" && <TodoDetail todo={singleItem} />}
              </>
            ) : (
              <DataViewer
                type={type}
                cart={cart}
                addToCart={addToCart}
                removeFromCart={removeFromCart}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
