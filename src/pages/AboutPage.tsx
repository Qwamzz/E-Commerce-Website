import React from 'react';
import { motion } from 'framer-motion';

const AboutPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <motion.h1 
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        About ShopSmart
      </motion.h1>
      <motion.div 
        className="bg-white shadow-lg rounded-lg overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <img 
          src="https://images.unsplash.com/photo-1556742044-3c52d6e88c62?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
          alt="Team working together" 
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <p className="text-gray-700 mb-4">
            ShopSmart is your go-to destination for cutting-edge technology and innovative gadgets. Founded in 2023, we've quickly become a leader in the e-commerce space, offering a curated selection of high-quality electronics and accessories.
          </p>
          <p className="text-gray-700 mb-4">
            Our mission is to make the latest technology accessible to everyone. We believe that smart devices and gadgets can enhance our daily lives, and we're committed to bringing you the best products at competitive prices.
          </p>
          <p className="text-gray-700">
            At ShopSmart, customer satisfaction is our top priority. Our team of tech enthusiasts is always ready to assist you in finding the perfect product for your needs. We stand behind every item we sell with our satisfaction guarantee.
          </p>
        </div>
      </motion.div>
      <motion.div 
        className="mt-12 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold mb-4">Our Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Innovation', 'Quality', 'Customer Focus'].map((value, index) => (
            <motion.div 
              key={value} 
              className="bg-indigo-100 p-4 rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <h3 className="font-semibold mb-2">{value}</h3>
              <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default AboutPage;