import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  image: string;
  description: string;
  features: string[];
}

const products: Product[] = [
  { id: 1, name: 'Wireless Earbuds', price: 79.99, rating: 4.5, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80', description: 'High-quality wireless earbuds with noise cancellation and long battery life.', features: ['Active noise cancellation', '24-hour battery life', 'Touch controls', 'Water resistant'] },
  { id: 2, name: 'Smart Watch', price: 199.99, rating: 4.2, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80', description: 'Feature-packed smartwatch with health tracking and smartphone notifications.', features: ['Heart rate monitoring', 'Sleep tracking', 'GPS', 'Water resistant'] },
  { id: 3, name: 'Laptop Backpack', price: 49.99, rating: 4.7, image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80', description: 'Durable and comfortable backpack with dedicated laptop compartment and multiple pockets.', features: ['Laptop compartment', 'Water resistant', 'Multiple pockets', 'Padded straps'] }
];

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [isWishlist, setIsWishlist] = useState(false);

  const product = products.find(p => p.id === Number(id));

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h2 className="text-2xl font-semibold text-gray-600">Product not found</h2>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto rounded-lg shadow-lg"
          />
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-6"
        >
          <h1 className="text-3xl font-bold">{product.name}</h1>
          
          <div className="flex items-center space-x-2">
            <div className="flex">
              {[...Array(5)].map((_, index) => (
                <Star
                  key={index}
                  size={20}
                  className={index < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}
                  fill={index < Math.floor(product.rating) ? 'currentColor' : 'none'}
                />
              ))}
            </div>
            <span className="text-gray-600">({product.rating})</span>
          </div>

          <p className="text-2xl font-bold text-indigo-600">${product.price}</p>

          <p className="text-gray-600">{product.description}</p>

          <div>
            <h3 className="font-semibold mb-2">Key Features:</h3>
            <ul className="list-disc list-inside space-y-1">
              {product.features.map((feature, index) => (
                <li key={index} className="text-gray-600">{feature}</li>
              ))}
            </ul>
          </div>

          <div className="flex space-x-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
            >
              <ShoppingCart size={20} />
              <span>Add to Cart</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsWishlist(!isWishlist)}
              className={`p-3 rounded-full border ${
                isWishlist ? 'bg-red-50 border-red-200' : 'border-gray-300'
              }`}
            >
              <Heart
                size={20}
                className={isWishlist ? 'text-red-500' : 'text-gray-400'}
                fill={isWishlist ? 'currentColor' : 'none'}
              />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProductPage;