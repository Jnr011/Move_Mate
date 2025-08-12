import Container from './UI/Container';

const AboutSection = () => {
  return (
    <section id="about" className="bg-gray-50">
      <Container>
        <div className="section-title">
          <h2>About MoveMate</h2>
          <p>Connecting truck drivers with people who need to move items</p>
        </div>
        
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="md:w-1/2">
            <img 
              src="/images/truck-illustration.svg" 
              alt="MoveMate Concept" 
              className="w-full max-w-lg mx-auto"
            />
          </div>
          <div className="md:w-1/2">
            <h3 className="mb-6 text-teal-600">Our Mission</h3>
            <p className="text-lg text-gray-700 mb-6">
              MoveMate is revolutionizing the way people move items by creating a platform that directly connects individuals with truck drivers in their area.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              Our mission is to make moving items of any size accessible, affordable, and stress-free while creating flexible earning opportunities for drivers.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h4 className="text-xl font-semibold mb-2 text-blue-600">For Users</h4>
                <p className="text-gray-600">Find trusted drivers instantly for your moving needs</p>
              </div>
              <div>
                <h4 className="text-xl font-semibold mb-2 text-blue-600">For Drivers</h4>
                <p className="text-gray-600">Earn flexibly by helping people in your community</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default AboutSection;