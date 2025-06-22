import React from 'react';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-green-800 to-black text-white flex flex-col items-center justify-center p-6">
      <h2 className="text-4xl font-extrabold text-green-300 mb-4 animate-bounce">
        ✅ Order Placed Successfully!
      </h2>

      <p className="mb-6 text-lg text-white/80 text-center">
        Thank you for shopping with us. Your order has been placed.
      </p>

      <div className="flex gap-4">
        {/* View Orders Button */}
        <Link to="/orders">
          <button className="bg-yellow-600 hover:bg-yellow-700 text-white px-6 py-2 rounded-lg transition">
            📦 View Orders
          </button>
        </Link>

        {/* Shop More Button */}
        <Link to="/products">
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition">
            🛍️ Shop More
          </button>
        </Link>
      </div>
    </div>
  );
};

export default OrderSuccess;


