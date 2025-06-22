import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleCheckout = () => {
    // Save order in localStorage
    const newOrder = {
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0),
    };

    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
    localStorage.setItem('orders', JSON.stringify([...existingOrders, newOrder]));

    clearCart();

    // ✅ Navigate to Order Success page
    navigate('/order-success');
  };

  return (
    <div className='p-6 min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center'>
      <h2 className='text-3xl font-bold text-yellow-300 mb-4'>Checkout</h2>

      <p className='text-lg mb-2'>
        Total: ₹{cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0)}
      </p>

      <button
        onClick={handleCheckout}
        className='bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600 transition'
      >
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
