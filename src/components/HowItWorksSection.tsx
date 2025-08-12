import Container from './UI/Container';
import HowItWorksCard from './UI/HowItWorksCard';

const HowItWorksSection = () => {
  const steps = [
    {
      step: 1,
      title: "Request a Move",
      description: "Enter your pickup and delivery locations, item details, and preferred time.",
      imageSrc: "/images/how-it-works-1.svg"
    },
    {
      step: 2,
      title: "Get Matched",
      description: "We'll connect you with available drivers in your area who match your requirements.",
      imageSrc: "/images/how-it-works-2.svg"
    },
    {
      step: 3,
      title: "Track & Complete",
      description: "Track your driver in real-time and complete payment once delivery is done.",
      imageSrc: "/images/how-it-works-3.svg"
    }
  ];

  return (
    <section id="how-it-works" className="bg-white">
      <Container>
        <div className="section-title">
          <h2>How MoveMate Works</h2>
          <p>Simple steps to get your items moved with ease</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          {steps.map((step) => (
            <HowItWorksCard 
              key={step.step}
              step={step.step}
              title={step.title}
              description={step.description}
              imageSrc={step.imageSrc}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default HowItWorksSection;