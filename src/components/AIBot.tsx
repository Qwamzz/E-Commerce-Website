import React, { useState } from 'react';
import { MessageSquare, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const products = [
  { id: 1, name: 'Wireless Earbuds', price: 79.99, rating: 4.5, category: 'Audio', features: ['Active noise cancellation', '24-hour battery life', 'Touch controls', 'Water resistant'], description: 'High-quality wireless earbuds with noise cancellation and long battery life.' },
  { id: 2, name: 'Smart Watch', price: 199.99, rating: 4.2, category: 'Wearables', features: ['Heart rate monitoring', 'Sleep tracking', 'GPS', 'Water resistant'], description: 'Feature-packed smartwatch with health tracking and smartphone notifications.' },
  { id: 3, name: 'Laptop Backpack', price: 49.99, rating: 4.7, category: 'Accessories', features: ['Laptop compartment', 'Water resistant', 'Multiple pockets', 'Padded straps'], description: 'Durable and comfortable backpack with dedicated laptop compartment.' }
];

const generateResponse = (input: string): string => {
  const lowercaseInput = input.toLowerCase();

  if (lowercaseInput.includes('hello') || lowercaseInput.includes('hi')) {
    return "Hello! I'm here to help you find the perfect product. What are you looking for today?";
  }

  if (lowercaseInput.includes('shipping') || lowercaseInput.includes('delivery')) {
    return "We offer free shipping on orders over $50. Standard delivery takes 3-5 business days, and express delivery is available for an additional fee.";
  }

  if (lowercaseInput.includes('return') || lowercaseInput.includes('refund')) {
    return "We have a 30-day return policy for all products. Items must be in original condition with packaging.";
  }

  const productMatch = products.find(product => 
    lowercaseInput.includes(product.name.toLowerCase()) ||
    lowercaseInput.includes(product.category.toLowerCase())
  );

  if (productMatch) {
    return `${productMatch.description} It's priced at $${productMatch.price} and has a rating of ${productMatch.rating}/5.`;
  }

  return "I'm here to help! You can ask me about our products, shipping, returns, or any other questions you might have.";
};

const AIBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState<{ type: 'user' | 'bot'; text: string }[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMessage = message.trim();
    setChat(prev => [...prev, { type: 'user', text: userMessage }]);
    setMessage('');

    const botResponse = generateResponse(userMessage);
    setTimeout(() => {
      setChat(prev => [...prev, { type: 'bot', text: botResponse }]);
    }, 500);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-white rounded-lg shadow-xl w-80 mb-4"
          >
            <div className="bg-indigo-600 text-white p-4 rounded-t-lg">
              <h3 className="font-semibold">Shopping Assistant</h3>
            </div>
            <div className="h-96 p-4 overflow-y-auto">
              {chat.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-4 ${
                    msg.type === 'user' ? 'text-right' : 'text-left'
                  }`}
                >
                  <div
                    className={`inline-block p-3 rounded-lg ${
                      msg.type === 'user'
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-100 text-gray-800'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSubmit} className="p-4 border-t">
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1 px-3 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="submit"
                  className="bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors"
                >
                  <Send size={20} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 transition-colors"
      >
        <MessageSquare size={24} />
      </motion.button>
    </div>
  );
};

export default AIBot;