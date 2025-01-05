import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

const products = [
  { id: 1, name: 'Wireless Earbuds', price: 79.99, rating: 4.5, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80', category: 'Audio' },
  { id: 2, name: 'Smart Watch', price: 199.99, rating: 4.2, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80', category: 'Wearables' },
  { id: 3, name: 'Laptop Backpack', price: 49.99, rating: 4.7, image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80', category: 'Accessories' },
  { id: 4, name: 'Bluetooth Speaker', price: 59.99, rating: 4.3, image: 'https://images.unsplash.com/photo-1589256469067-ea99122bbdc4?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80', category: 'Audio' },
  { id: 5, name: 'Noise-Cancelling Headphones', price: 249.99, rating: 4.8, image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80', category: 'Audio' },
  { id: 6, name: 'Power Bank', price: 39.99, rating: 4.4, image: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80', category: 'Accessories' },
  { id: 7, name: 'Wireless Keyboard', price: 89.99, rating: 4.6, image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80', category: 'Accessories' },
  { id: 8, name: 'Security Camera', price: 129.99, rating: 4.5, image: 'https://tinyurl.com/38xhpn9e', category: 'Smart Home' },
  { id: 9, name: 'Smart Band', price: 89.99, rating: 4.4, image: 'https://tinyurl.com/4wax5dnf', category: 'Wearables' },
  { id: 10, name: 'External SSD', price: 119.99, rating: 4.7, image: 'https://tinyurl.com/2ya5z896', category: 'Storage' }
];

const categories = [...new Set(products.map(product => product.category))];

function ProductsPage() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 300 });

  const filteredProducts = products
    .filter(product => 
      selectedCategory === 'All' || product.category === selectedCategory)
    .filter(product => 
      product.price >= priceRange.min && product.price <= priceRange.max)
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row gap-8">
        <motion.aside 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          className="md:w-64 space-y-6"
        >
          <div>
            <h3 className="text-lg font-semibold mb-2 flex items-center">
              <Filter size={20} className="mr-2" />
              Filters
            </h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Category</h4>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="All">All Categories</option>
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              <div>
                <h4 className="font-medium mb-2">Sort By</h4>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full p-2 border rounded-md"
                >
                  <option value="name">Name</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Rating</option>
                </select>
              </div>

              <div>
                <h4 className="font-medium mb-2">Price Range</h4>
                <div className="space-y-2">
                  <input
                    type="range"
                    min="0"
                    max="300"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange.min}</span>
                    <span>${priceRange.max}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.aside>

        <main className="flex-1">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                </Link>
                <div className="p-4">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="text-lg font-semibold mb-2 hover:text-indigo-600 transition-colors">
                      {product.name}
                    </h3>
                  </Link>
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}
                        fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                      />
                    ))}
                    <span className="ml-1 text-sm text-gray-600">({product.rating})</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-indigo-600">${product.price}</span>
                    <button
                      onClick={() => addToCart(product)}
                      className="bg-indigo-600 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-indigo-700 transition-colors"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default ProductsPage;