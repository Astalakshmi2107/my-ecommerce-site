import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-gradient-to-br from-purple-900 via-indigo-800 to-gray-900 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-wrap items-center justify-between">
        
        {/* Logo */}
        <Link
          to="/"
          className="text-2xl font-extrabold tracking-wide hover:text-yellow-300 transition duration-300"
        >
          🛍️ MyShop
        </Link>

        {/* Navigation Links */}
        <div className="flex flex-wrap items-center gap-6 text-[17px] font-medium mt-2 md:mt-0">
          <Link to="/home" className="hover:text-yellow-300 transition">Home</Link>
          <Link to="/products" className="hover:text-yellow-300 transition">Products</Link>
          <Link to="/add-product" className="text-white hover:text-yellow-300">Add Product</Link>

          <Link to="/cart" className="relative hover:text-yellow-300 transition">
            Cart
            <span className="ml-1 px-2 py-0.5 text-xs bg-yellow-400 text-black rounded-full font-bold">
              {cart.length}
            </span>
          </Link>

          {user ? (
            <>
              <Link to="/orders" className="hover:text-yellow-300 transition">Orders</Link>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-full font-semibold transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-yellow-300 transition">Login</Link>
              <Link
                to="/signup"
                className="bg-green-400 hover:bg-green-500 text-black px-4 py-1 rounded-full font-semibold transition"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
