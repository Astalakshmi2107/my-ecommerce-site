import React, { useState, useEffect } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const storedOrders = JSON.parse(localStorage.getItem('orders')) || [];
    setOrders(storedOrders);
  }, []);

  const handleClearOrders = () => {
    localStorage.removeItem('orders');
    setOrders([]);
  };

  return (
    <div className="p-6 min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-black text-white">
      <h2 className="text-3xl font-extrabold text-center mb-6 text-yellow-300 drop-shadow-lg">
        📦 Your Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-center text-white/70 italic">You have no orders yet.</p>
      ) : (
        <>
          <ul className="space-y-6 max-w-4xl mx-auto">
            {orders.map((order, orderIndex) => (
              <li
                key={orderIndex}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 shadow-lg border border-white/20"
              >
                <h3 className="text-lg font-bold text-pink-300 mb-4">
                  Order #{orderIndex + 1}
                </h3>

                <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="bg-white/20 p-3 rounded-lg flex items-center gap-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded object-cover border border-white/30"
                      />
                      <div>
                        <p className="text-sm font-semibold text-white">{item.name}</p>
                        <p className="text-xs text-gray-300">
                          ₹{item.price} × {item.quantity || 1} = ₹
                          {(item.price * (item.quantity || 1)).toFixed(2)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <p className="mt-4 text-right text-green-400 font-semibold">
                  Total: ₹{order.total.toFixed(2)}
                </p>
              </li>
            ))}
          </ul>

          <div className="mt-10 text-center">
            <button
              onClick={handleClearOrders}
              className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg transition mt-4"
            >
              🗑️ Clear All Orders
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Orders;


