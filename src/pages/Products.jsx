import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import ProductCard from "../components/ProductCard";

const Products = () => {
  const { user } = useContext(AuthContext);
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/products", {
        headers: {
          Authorization: `Bearer ${user?.token}`,
        },
      });
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    if (user) {
      fetchProducts();
    }
  }, [user]);

  // 👇 Filter suggestions based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSuggestions([]);
    } else {
      const filtered = products
        .filter((product) =>
          product?.name?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        .map((p) => p.name);
      setSuggestions(filtered.slice(0, 5)); // Show only top 5
    }
  }, [searchTerm, products]);

  const filteredProducts = products
    .filter((product) =>
      product?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .slice(0, user ? products.length : 4);

  const handleSuggestionClick = (name) => {
    setSearchTerm(name);
    setSuggestions([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-950 via-indigo-900 to-gray-900 text-white px-6 py-10">
      <div className="max-w-6xl mx-auto relative">
        {/* Search Box */}
        <div className="mb-6 relative">
          <input
            type="text"
            placeholder="🔍 Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-lg p-3 rounded-md shadow-inner text-black focus:ring-2 ring-yellow-300 outline-none"
          />

          {/* 🔽 Suggestions Dropdown */}
          {suggestions.length > 0 && (
            <ul className="absolute z-10 w-full max-w-lg bg-white text-black mt-1 rounded shadow-lg">
              {suggestions.map((name, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(name)}
                  className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                >
                  {name}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p className="text-yellow-300 col-span-full text-center mt-10 text-lg">
              ❌ No products found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;

