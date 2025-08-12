import React, { useState } from 'react';
import { Smartphone, Monitor } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface DeviceToggleProps {
  mobileImage: string;
  desktopImage: string;
}

const DeviceToggle: React.FC<DeviceToggleProps> = ({ mobileImage, desktopImage }) => {
  const [device, setDevice] = useState<'mobile' | 'desktop'>('mobile');

  const toggleDevice = () => {
    setDevice(device === 'mobile' ? 'desktop' : 'mobile');
  };

  return (
    <div className="flex flex-col items-center">
      <div className="bg-gray-100 p-1 rounded-full mb-6 inline-flex">
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

      <div className="relative w-full h-80 md:h-96">
        <AnimatePresence mode="wait">
          {device === 'mobile' ? (
            <motion.div
              key="mobile"
              className="absolute inset-0 flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={mobileImage}
                alt="MoveMate on mobile"
                className="h-full object-contain rounded-2xl shadow-lg"
              />
            </motion.div>
          ) : (
            <motion.div
              key="desktop"
              className="absolute inset-0 flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={desktopImage}
                alt="MoveMate on desktop"
                className="h-full object-contain rounded-lg shadow-lg"
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default DeviceToggle;