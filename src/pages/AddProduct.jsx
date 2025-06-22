import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    image: '',
    price: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('⚠️ You must be logged in to add a product.');
        return;
      }

      await axios.post('http://localhost:5000/api/products/add', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      alert('✅ Product added successfully!');
      setFormData({ name: '', category: '', image: '', price: '' });
    } catch (err) {
      console.error(err);
      alert('❌ Failed to add product');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-800 via-pink-900 to-black py-12 px-6 text-white">
      <div className="max-w-2xl mx-auto bg-gray-900 p-8 rounded-2xl shadow-2xl">
        <h2 className="text-4xl font-extrabold text-center text-pink-400 mb-8">
          ➕ Add New Product
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block mb-1 text-sm text-gray-300">Product Name</label>
              <input
                name="name"
                placeholder="e.g., Wireless Mouse"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg text-black focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-300">Category</label>
              <input
                name="category"
                placeholder="e.g., Electronics"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg text-black focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-300">Image URL</label>
              <input
                name="image"
                placeholder="https://example.com/image.jpg"
                value={formData.image}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg text-black focus:outline-none"
                required
              />
            </div>

            <div>
              <label className="block mb-1 text-sm text-gray-300">Price (₹)</label>
              <input
                name="price"
                type="number"
                placeholder="e.g., 999"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg text-black focus:outline-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-3 rounded-full transition duration-300"
          >
            🚀 Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
