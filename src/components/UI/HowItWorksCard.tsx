import React from 'react';

interface HowItWorksCardProps {
  step: number;
  title: string;
  description: string;
  imageSrc: string;
}

const HowItWorksCard: React.FC<HowItWorksCardProps> = ({
  step,
  title,
  description,
  imageSrc,
}) => {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4 text-blue-600 font-bold text-xl">
        {step}
      </div>
      <img src={imageSrc} alt={title} className="w-32 h-32 mb-4 object-contain" />
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 max-w-xs mx-auto">{description}</p>
    </div>
  );
};

export default HowItWorksCard;