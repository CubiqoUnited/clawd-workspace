import HeroSection from './cubiqo/components/HeroSection';
import MultiModelSection from './cubiqo/components/MultiModelSection';
import IntelligenceSection from './cubiqo/components/IntelligenceSection';
import MobileSection from './cubiqo/components/MobileSection';
import FeaturesGrid from './cubiqo/components/FeaturesGrid';
import CTASection from './cubiqo/components/CTASection';
import Footer from './cubiqo/components/Footer';

export const metadata = {
  title: 'CubiQo - Intelligence, Reimagined | Multi-Model AI Platform',
  description: 'Private, secure, multi-model AI assistant. Routes to optimal models—Claude, OpenAI, specialized systems. Zero data retention. Your intelligence, your rules.',
  keywords: ['multi-model AI', 'private AI assistant', 'secure AI platform', 'cooperative AI', 'BYO AI model', 'zero data retention', 'AI privacy', 'intelligent routing'],
  openGraph: {
    title: 'CubiQo - Intelligence, Reimagined',
    description: 'The Cooperative V.A. The World Needs. Private by design.',
    images: ['/assets/cubiqo-com/og-image.jpg'],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CubiQo - Intelligence, Reimagined',
    description: 'Private, secure, multi-model AI assistant. Zero data retention.',
    images: ['/assets/cubiqo-com/og-image.jpg'],
  },
};

export default function CubiQoHomePage() {
  return (
    <main className="min-h-screen bg-black text-white overflow-x-hidden">
      <HeroSection />
      <MultiModelSection />
      <IntelligenceSection />
      <MobileSection />
      <FeaturesGrid />
      <CTASection />
      <Footer />
    </main>
  );
}