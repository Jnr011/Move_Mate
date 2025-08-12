import Container from './UI/Container';
import StaggeredFeatures from './StaggeredFeatures';
import { Truck, MapPin, CreditCard, Shield } from 'lucide-react';
import AnimatedSection from './AnimatedSection';

const FeaturesSection = () => {
  const features = [
    {
      title: "On-Demand Truck Booking",
      description: "Book a truck with a few taps and get your items moved right when you need them.",
      icon: Truck
    },
    {
      title: "Real-Time Tracking",
      description: "Track your driver and shipment in real-time from pickup to delivery.",
      icon: MapPin
    },
    {
      title: "Secure Payments",
      description: "Pay securely through the app with multiple payment options available.",
      icon: CreditCard
    },
    {
      title: "Reliable Drivers",
      description: "All drivers are thoroughly vetted and rated by the community for reliability.",
      icon: Shield
    }
  ];

  return (
    <section id="features" className="bg-gray-50">
      <Container>
        <AnimatedSection>
          <div className="section-title">
            <h2>MoveMate Features</h2>
            <p>Designed to make your moving experience seamless</p>
          </div>
        </AnimatedSection>
        
        <StaggeredFeatures features={features} />
      </Container>
    </section>
  );
};

export default FeaturesSection;