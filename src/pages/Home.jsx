import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const fallbackProducts = [
  {
    _id: '1',
    name: 'EarBuds',
    price: 399,
    image: '${import.meta.env.BASE_URL}images/product1.jpg',
  },
  {
    _id: '2',
    name: 'Smart Watch',
    price: 899,
    image: '${import.meta.env.BASE_URL}images/product2.jpg',
  },
  {
    _id: '3',
    name: 'Headphones',
    price: 199,
    image: '${import.meta.env.BASE_URL}images/product3.jpg',
  },
  {
    _id: '4',
    name: 'Laptop',
    price: 499,
    image: '${import.meta.env.BASE_URL}images/product4.jpg',
  },
];

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/products');
        const data = await res.json();

        if (!Array.isArray(data) || data.length === 0) {
          throw new Error('Empty data');
        }

        const withImages = data.slice(0, 4).map((p, i) => ({
          ...p,
          name: p.name || fallbackProducts[i].name,
          price: p.price || fallbackProducts[i].price,
          image: p.image || fallbackProducts[i % fallbackProducts.length].image,
        }));

        setProducts(withImages);
      } catch (err) {
        console.warn('Backend failed or returned empty. Using fallback.');
        setProducts(fallbackProducts);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-900 to-gray-800 text-white px-6 py-16 font-sans rounded-t-3xl">

      {/* Hero Section */}
      <section className="flex flex-col lg:flex-row items-center justify-between gap-16 mt-12 mb-16">
        {/* Left Side: Text */}
      <div className="lg:w-1/2 pl-2 md:pl-12">
         <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
              Shop Smart. <br />
            <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                 Live Better
                 </span>
            </h1>
          <p className="text-lg text-gray-300 mb-6">
             Unlock exclusive tech & fashion deals—where style meets innovation, and savings never go out of trend!
          </p>


          {/* Buttons */}
          <div className="flex gap-4 pt-2">
            <button
              onClick={() => navigate('/products')}
              className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-md shadow-md font-semibold"
            >
              Shop Now
            </button>
           
          </div>
        </div>

        {/* Right Side: Image */}
        <div className="lg:w-1/2 flex justify-center">
          <img
            src="/images/cart.jpg"
            alt="Shopping Illustration"
            className="w-[350px] h-auto rounded-xl shadow-lg"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/350x300?text=No+Image';
            }}
          />
        </div>
      </section>

      {/* Products Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center text-purple-400 mb-10">
          Featured Products
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white text-gray-900 rounded-xl shadow-lg overflow-hidden hover:scale-105 hover:shadow-xl transition duration-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                }}
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-purple-700 mb-1">{product.name}</h3>
                <p className="text-gray-800 text-sm">₹{product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Explore All Products Button */}
      <div className="text-center">
        <button
          onClick={() => navigate('/products')}
          className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold px-8 py-3 rounded-full shadow-lg transition duration-300"
        >
          Explore All Products
        </button>
      </div>
    </div>
  );
};

export default Home;




