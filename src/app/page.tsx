"use client";
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Search, Leaf, ShoppingBag, MapPin, TrendingUp, Users } from 'lucide-react';
import ChatBot from '@/components/ChatBot';
import VoiceCommand from '@/components/VoiceCommand';
import ProductShowcase from '@/components/ProductShowcase';


const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white relative overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 -z-10">
        
      </div>

      <VoiceCommand />
      
      {/* Hero Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="container mx-auto px-4 py-24 relative z-10"
      >
        {/* Background decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -right-4 w-64 h-64 bg-green-100 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-4 -left-4 w-96 h-96 bg-green-200 rounded-full opacity-20 blur-3xl"></div>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="text-center relative z-10"
        >
          <motion.div variants={fadeInUp}>
            <h1 className="text-5xl md:text-7xl font-bold text-green-800 mb-6 tracking-tight">
              QuickVeggie Market
            </h1>
          </motion.div>
          
          <motion.p 
            variants={fadeInUp}
            className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed"
          >
            Connect with local vegetable vendors, find the best prices, and shop smarter
          </motion.p>
          
          {/* Search Bar */}
          <motion.div 
            variants={fadeInUp}
            className="max-w-2xl mx-auto mb-12"
          >
            <Link href="/search">
              <div className="flex items-center bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-4 cursor-pointer group">
                <Search className="w-5 h-5 text-gray-400 group-hover:text-green-600 transition-colors duration-300" />
                <input
                  type="text"
                  placeholder="Search for vegetables or vendors..."
                  className="w-full bg-transparent border-none focus:outline-none text-gray-800 placeholder-gray-500 ml-3"
                  readOnly
                />
                <span className="text-green-600 font-medium group-hover:translate-x-1 transition-transform duration-300">
                  Search
                </span>
              </div>
            </Link>
          </motion.div>

          <motion.div 
            variants={fadeInUp}
            className="flex flex-col sm:flex-row justify-center gap-4 mb-16"
          >
            <Link href="/markets">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-green-600 text-white px-8 py-4 rounded-xl font-medium hover:bg-green-700 transition-colors duration-300 flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <MapPin className="w-5 h-5" />
                Find Markets
              </motion.button>
            </Link>
            <Link href="/vendor/auth">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-green-600 border-2 border-green-600 px-8 py-4 rounded-xl font-medium hover:bg-green-50 transition-colors duration-300 flex items-center justify-center gap-2 w-full sm:w-auto"
              >
                <ShoppingBag className="w-5 h-5" />
                Register as Vendor
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Product Showcase Section */}
      <ProductShowcase />

      {/* Features Section */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="bg-white py-24"
      >
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
            Why Choose QuickVeggie?
          </h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <FeatureCard 
              icon={<Leaf className="w-8 h-8 text-green-600" />}
              title="Real-time Prices"
              description="Get up-to-date prices from various vendors in your local market"
            />
            <FeatureCard 
              icon={<MapPin className="w-8 h-8 text-green-600" />}
              title="Find Nearby Markets"
              description="Discover and navigate local vegetable markets easily"
            />
            <FeatureCard 
              icon={<TrendingUp className="w-8 h-8 text-green-600" />}
              title="Compare & Save"
              description="Compare prices across different vendors to get the best deals"
            />
          </div>
        </div>
      </motion.div>

      <ChatBot />
    </main>
  );
}

function FeatureCard({ 
  title, 
  description, 
  icon 
}: { 
  title: string; 
  description: string; 
  icon: React.ReactNode;
}) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
    >
      <div className="bg-green-50 w-16 h-16 rounded-xl flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  );
}