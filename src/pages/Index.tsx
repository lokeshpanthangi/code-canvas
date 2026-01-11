import Navbar from '@/components/layout/Navbar';
import HeroSection from '@/components/landing/HeroSection';
import FeaturesSection from '@/components/landing/FeaturesSection';
import TestimonialsSection from '@/components/landing/TestimonialsSection';
import CTASection from '@/components/landing/CTASection';
import Footer from '@/components/layout/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Noise overlay for texture */}
      <div className="noise-overlay" />
      
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
