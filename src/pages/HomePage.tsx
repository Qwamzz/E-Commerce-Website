import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import ImageSlider from '../components/ImageSlider';
import AIBot from '../components/AIBot';

const HomePage: React.FC = () => {
  const featuredProducts = [
    { id: 1, name: 'Wireless Earbuds', price: 79.99, image: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    { id: 2, name: 'Smart Watch', price: 199.99, image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' },
    { id: 3, name: 'Laptop Backpack', price: 49.99, image: 'https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80' }
  ];

  return (
    <div className="space-y-16">
      <ImageSlider />
      
      <section className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Featured Products</h2>
          <p className="text-gray-600">Discover our handpicked selection of premium products</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">${product.price}</p>
                <Link
                  to={`/product/${product.id}`}
                  className="inline-flex items-center text-indigo-600 hover:text-indigo-700"
                >
                  View Details <ArrowRight size={16} className="ml-1" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="text-center mt-8"
        >
          <Link
            to="/products"
            className="inline-flex items-center bg-indigo-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-indigo-700 transition-colors duration-300"
          >
            View All Products <ArrowRight size={20} className="ml-2" />
          </Link>
        </motion.div>
      </section>

      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Why Choose ShopSmart?</h2>
            <p className="text-gray-600">Experience shopping with confidence</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Free Shipping',
                description: 'Free shipping on orders over $50',
                icon: '🚚'
              },
              {
                title: '24/7 Support',
                description: 'Round-the-clock customer service',
                icon: '💬'
              },
              {
                title: 'Secure Payment',
                description: 'Safe and secure payment methods',
                icon: '🔒'
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-white p-6 rounded-lg shadow-md text-center"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AIBot />
    </div>
  );
};

export default HomePage;