import React from "react";

const ProductDetail = ({ product, addToCart }) => {
  if (!product) return <div>Loading...</div>;

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl">
      <div className="flex gap-8">
        {/* Product Image */}
        <div className="w-1/2">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="rounded-lg w-full object-cover"
          />
        </div>

        {/* Product Info */}
        <div className="w-1/2 space-y-4">
          <h2 className="text-2xl font-bold">{product.title}</h2>

          <p className="text-gray-600">{product.description}</p>

          <div className="text-lg font-semibold text-green-600">
            ₹ {product.price}
          </div>

          <div className="text-sm text-gray-500">
            <strong>Brand:</strong> {product.brand}
          </div>

          <div className="text-sm text-gray-500">
            <strong>Category:</strong> {product.category}
          </div>

          <div className="text-sm text-gray-500">
            <strong>Rating:</strong>  {product.rating}
          </div>

          <div className="text-sm text-gray-500">
            <strong>Stock:</strong> {product.stock}
          </div>

          <button
            onClick={() => addToCart(product)}
            className="mt-4 bg-blue-600 text-black px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;