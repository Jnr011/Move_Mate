import { ArrowDown, Download } from 'lucide-react';
import Container from './UI/Container';
import Button from './UI/Button';
import { motion } from 'framer-motion';

const HeroSection = () => {
  return (
    <section id="hero" className="pt-32 pb-16 md:pt-40 md:pb-24 relative overflow-hidden">
      {/* Background Animation */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <motion.div 
          className="absolute top-0 left-0 w-64 h-64 bg-teal-100 rounded-full opacity-50 blur-3xl transform -translate-x-1/2 -translate-y-1/2"
          animate={{ 
            x: [0, 20, 0], 
            y: [0, 15, 0],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 20,
            ease: "easeInOut" 
          }}
        ></motion.div>
        <motion.div 
          className="absolute bottom-0 right-0 w-80 h-80 bg-blue-100 rounded-full opacity-50 blur-3xl transform translate-x-1/2 translate-y-1/2"
          animate={{ 
            x: [0, -30, 0], 
            y: [0, -20, 0],
          }}
          transition={{ 
            repeat: Infinity, 
            duration: 25,
            ease: "easeInOut" 
          }}
        ></motion.div>
      </motion.div>

      <Container className="relative z-10">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div 
            className="md:w-1/2 text-center md:text-left mb-10 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h1 className="mb-6 leading-tight">
              Move <span className="text-teal-600">Made Easy</span> With MoveMate
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-lg mx-auto md:mx-0">
              Connect with trusted truck drivers instantly and move your items safely and efficiently.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button 
                variant="primary"
                size="lg"
                className="gap-2"
                href="#download"
              >
                <Download size={20} />
                Download App
              </Button>
              <Button 
                variant="outline"
                size="lg"
                href="#how-it-works"
              >
                Learn More
              </Button>
            </div>
          </motion.div>
          <motion.div 
            className="md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <img 
              src="/images/app-screenshot.png" 
              alt="MoveMate App" 
              className="w-full max-w-md mx-auto rounded-2xl shadow-2xl"
            />
          </motion.div>
        </div>
        
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <motion.a 
            href="#about" 
            className="text-gray-400 hover:text-teal-600 transition-colors"
            animate={{ y: [0, 10, 0] }}
            transition={{ 
              repeat: Infinity, 
              duration: 1.5,
              ease: "easeInOut" 
            }}
          >
            <ArrowDown size={24} />
          </motion.a>
        </motion.div>
      </Container>
    </section>
  );
};

export default HeroSection;
