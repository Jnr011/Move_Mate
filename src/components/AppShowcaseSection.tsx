import Container from './UI/Container';
import { Smartphone, Monitor } from 'lucide-react';
import MoveMateApp from './MoveMateApp';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AppShowcaseSection = () => {
  const [device, setDevice] = useState<'mobile' | 'desktop'>('mobile');

  return (
    <section id="app-showcase" className="bg-white">
      <Container>
        <div className="section-title">
          <h2>Experience the App</h2>
          <p>See how MoveMate works on different devices</p>
        </div>
        
        {/* Device Toggle Controls */}
        <div className="bg-gray-100 p-1 rounded-full mb-6 inline-flex mx-auto mt-8">
          <button
            className={`p-2 rounded-full flex items-center gap-2 transition-colors ${
              device === 'mobile' ? 'bg-white shadow-md text-teal-600' : 'text-gray-500'
            }`}
            onClick={() => setDevice('mobile')}
          >
            <Smartphone size={20} />
            <span className="text-sm font-medium">Mobile</span>
          </button>
          <button
            className={`p-2 rounded-full flex items-center gap-2 transition-colors ${
              device === 'desktop' ? 'bg-white shadow-md text-teal-600' : 'text-gray-500'
            }`}
            onClick={() => setDevice('desktop')}
          >
            <Monitor size={20} />
            <span className="text-sm font-medium">Desktop</span>
          </button>
        </div>
        
        {/* App Display Area */}
        <div className="flex justify-center mt-8">
          <AnimatePresence mode="wait">
            {device === 'mobile' ? (
              <motion.div
                key="mobile"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                {/* Mobile phone frame - fixed dimensions */}
                <div className="rounded-[2.5rem] overflow-hidden border-[14px] border-gray-800 shadow-xl w-[320px] h-[640px] flex flex-col">
                  {/* Phone notch area */}
                  <div className="bg-black text-white pt-3 pb-1 px-4 flex justify-center relative shrink-0">
                    <div className="absolute left-4 top-4 w-14 h-1 bg-gray-700 rounded-full"></div>
                    <div className="w-16 h-4 bg-black rounded-full"></div>
                  </div>
                  
                  {/* Scrollable app content */}
                  <div className="flex-grow overflow-y-auto">
                    <MoveMateApp isDesktop={false} />
                  </div>
                  
                  {/* Phone home indicator */}
                  <div className="bg-black py-3 flex justify-center shrink-0">
                    <div className="w-24 h-1 bg-gray-700 rounded-full"></div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="desktop"
                className="w-full max-w-5xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-gray-800 rounded-t-lg p-2 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="mx-auto bg-gray-700 rounded-full px-20 py-1 text-xs text-gray-400">
                    movemateapp.com
                  </div>
                </div>
                <div className="shadow-2xl rounded-b-lg bg-white p-4 h-[640px] overflow-auto">
                  <MoveMateApp isDesktop={true} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
};

export default AppShowcaseSection;