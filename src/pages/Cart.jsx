import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, setCart } = useContext(CartContext);
  const navigate = useNavigate();

  const increaseQty = (index) => {
    const updatedCart = [...cart];
    updatedCart[index].quantity = (updatedCart[index].quantity || 1) + 1;
    setCart(updatedCart);
  };

  const decreaseQty = (index) => {
    const updatedCart = [...cart];
    if ((updatedCart[index].quantity || 1) > 1) {
      updatedCart[index].quantity -= 1;
      setCart(updatedCart);
    }
  };

  const removeFromCart = (index) => {
    const updatedCart = cart.filter((_, i) => i !== index);
    setCart(updatedCart);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#251c57] to-[#2e2c60] p-6 text-white">
      <h2 className="text-3xl font-extrabold text-center mb-8 bg-gradient-to-r from-green-400 via-lime-400 to-green-600 bg-clip-text text-transparent drop-shadow-md">
        🛒 Your Cart
       </h2>



      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div className="space-y-4">
          {cart.map((item, idx) => (
            <div
              key={idx}
              className="max-w-3xl mx-auto flex items-center justify-between gap-4 bg-white/20 backdrop-blur-md p-4 rounded-xl shadow-lg text-white"
            >
              <div className="flex items-center gap-4 flex-1">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-sm">
                    ₹{item.price} × {item.quantity || 1} = ₹
                    {(item.price * (item.quantity || 1)).toFixed(2)}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => decreaseQty(idx)}
                  className="bg-white text-black px-2 py-1 rounded hover:bg-gray-200"
                >
                  −
                </button>
                <span>{item.quantity || 1}</span>
                <button
                  onClick={() => increaseQty(idx)}
                  className="bg-white text-black px-2 py-1 rounded hover:bg-gray-200"
                >
                  +
                </button>
              </div>

              <button
                onClick={() => removeFromCart(idx)}
                className="bg-purple-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
               >
                   Remove Cart
               </button>

            </div>
          ))}
        </div>
      )}

      {cart.length > 0 && (
        <div className="max-w-3xl mx-auto mt-6">
          <button
            onClick={() => navigate('/checkout')}
            className="bg-green-500 text-white px-5 py-2 rounded hover:bg-green-600 transition"
          >
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
