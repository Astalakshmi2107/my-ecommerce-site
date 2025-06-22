import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useContext(CartContext);

  return (
    <div className="backdrop-blur-md bg-white/10 text-white rounded-xl shadow-lg 
                    hover:shadow-2xl transform hover:scale-105 transition duration-300 
                    max-w-[280px] w-full mx-auto min-h-[320px] border border-white/20 p-4">
      
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-36 object-cover rounded-md mb-3"
        onError={(e) => {
          e.target.src = "https://via.placeholder.com/300x200?text=No+Image";
        }}
      />

      <h3 className="text-base font-bold bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-500 bg-clip-text text-transparent">
        {product.name}
      </h3>

      <p className="text-sm font-medium mb-1">₹{product.price}</p>
      <p className="text-xs text-white/70 mb-3">
        {product.description?.slice(0, 60) || "Premium quality gadget."}
      </p>

      <button
        className="bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-md transition"
        onClick={() => addToCart(product)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;


