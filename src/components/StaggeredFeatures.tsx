import React from 'react';
import { motion } from 'framer-motion';
import FeatureCard from './UI/FeatureCard';
import { LucideIcon } from 'lucide-react';

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

interface StaggeredFeaturesProps {
  features: Feature[];
}

const StaggeredFeatures: React.FC<StaggeredFeaturesProps> = ({ features }) => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div 
      className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12"
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.3 }}
    >
      {features.map((feature, index) => (
        <motion.div key={index} variants={item}>
          <FeatureCard 
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
          />
        </motion.div>
      ))}
    </motion.div>
  );
};

export default StaggeredFeatures;