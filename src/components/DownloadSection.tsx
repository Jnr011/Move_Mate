import Container from './UI/Container';
import Button from './UI/Button';
import { Download } from 'lucide-react';

const DownloadSection = () => {
  return (
    <section id="download" className="bg-gradient-to-r from-teal-500 to-blue-500 text-white">
      <Container>
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="mb-6">Download MoveMate Today</h2>
          <p className="text-xl mb-10 text-white/90">
            Get started with MoveMate and experience a seamless moving service. Available on iOS and Android.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="flex flex-col items-center">
              <div className="flex gap-4 mb-6">
                <Button 
                  className="bg-black hover:bg-gray-800 text-white gap-2 w-full"
                  size="lg"
                  href="https://apps.apple.com"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  App Store
                </Button>
                <Button 
                  className="bg-black hover:bg-gray-800 text-white gap-2 w-full"
                  size="lg"
                  href="https://play.google.com"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v17c0 .83-.67 1.5-1.5 1.5S3 21.33 3 20.5zm16.5-15H8v14h11.5c.83 0 1.5-.67 1.5-1.5v-11c0-.83-.67-1.5-1.5-1.5zM15.53 12L13 9.47l1.06-1.06 2.47 2.47 4.94-4.94 1.06 1.06z"/>
                  </svg>
                  Google Play
                </Button>
              </div>
              <p className="text-white/80 text-sm">Scan the QR code to download</p>
            </div>
            
            <div className="flex justify-center">
              <img 
                src="/images/qr-code.svg" 
                alt="QR Code for download" 
                className="w-48 h-48 bg-white p-2 rounded-xl"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default DownloadSection;
