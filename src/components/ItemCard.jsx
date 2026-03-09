import React from "react";
import { useNavigate } from "react-router-dom";

const ItemCard = ({ item, type, addToCart, removeFromCart, onDelete }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/${type}/${item.id}`)}
      className="bg-white p-4 rounded-2xl shadow-md cursor-pointer hover:shadow-xl transition"
    >
      <div>
        {/* ================= Product / Cart Image ================= */}
        {(type === "products" || type === "carts") && item.thumbnail && (
          <img
            src={item.thumbnail}
            alt={item.title}
            className="h-36 w-full object-contain mb-3"
          />
        )}

        {/*==================================== Recipe Image =====================================*/}
        {type === "recipes" && item.image && (
          <img
            src={item.image}
            alt={item.name}
            className="h-36 w-full object-cover rounded-lg mb-3"
          />
        )}

        {/*========================================= Title ========================================*/}
        <h4 className="font-semibold text-base line-clamp-2">
          {item.title || item.todo || item.name || item.firstName}
        </h4>

        {/*======================================= Description ============================================*/}
        {type !== "products" && type !== "carts" && (
          <p className="text-gray-600 text-sm mt-2 line-clamp-3">
            {item.description || item.email || item.body || ""}
          </p>
        )}

        {/* ====================================Todos Status =======================================*/}
        {type === "todos" && (
          <p className="text-sm mt-2 font-medium">
            Status: {item.completed ? "Completed" : "Not Completed"}
          </p>
        )}

        {/* ======================================Product Price =======================================*/}
        {type === "products" && (
          <p className="text-green-600 font-semibold mt-2">${item.price}</p>
        )}
      </div>

      {/*====================================== Cart (+) (-) btns ========================================*/}
      {type === "carts" && (
        <>
          {/* Price */}
          <p className="text-green-600 font-semibold mt-2">
            Price: ${item.price}
          </p>

          {/* Subtotal */}
          <p className="text-gray-600 text-sm mt-1">
            Subtotal: ${(item.price * item.quantity).toFixed(2)}
          </p>

          {/* Quantity Buttons */}
          <div
            className="flex items-center justify-between mt-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => removeFromCart(item.id)}
              className="bg-red-500 text-black px-3 py-1 rounded-lg hover:bg-red-600 transition"
            >
              -
            </button>

            <span className="font-semibold text-lg">{item.quantity}</span>

            <button
              onClick={() => addToCart({ ...item, quantity: undefined })}
              className="bg-green-500 text-black px-3 py-1 rounded-lg hover:bg-green-600 transition"
            >
              +
            </button>
          </div>
        </>
      )}

      {/*============================================= Add To Cart Button ===========================================*/}
      {type === "products" && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            addToCart(item);
          }}
          className="w-full mt-4 bg-blue-600 text-black py-2 rounded-lg hover:bg-blue-700 transition duration-200"
        >
          Add To Cart
        </button>
      )}

      {type === "products" && onDelete && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (window.confirm("Delete this item?")) {
              onDelete(item.id);
            }
          }}
          className="w-full mt-2 bg-red-500 text-red-600 py-2 rounded-lg hover:bg-red-600"
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default ItemCard;
