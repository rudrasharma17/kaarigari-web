import { motion } from 'motion/react';
import SaaSNavbar from '../components/SaaSNavbar';
import SaaSHero from '../components/SaaSHero';
import SaaSFeatures from '../components/SaaSFeatures';
import SaaSPricing from '../components/SaaSPricing';
import SaaSTestimonials from '../components/SaaSTestimonials';
import SaaSCta from '../components/SaaSCta';

export default function SaaSLanding() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="bg-saas-bg min-h-screen text-saas-text selection:bg-saas-accent selection:text-white"
    >
      <SaaSNavbar />
      <main>
        <SaaSHero />
        <SaaSFeatures />
        <SaaSTestimonials />
        <SaaSPricing />
        <SaaSCta />
      </main>
      
      {/* Simple Footer for SaaS */}
      <footer className="py-12 border-t border-white/5 bg-saas-bg">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xl font-bold font-display">
            Flux<span className="text-saas-accent">AI</span>
          </div>
          <div className="flex gap-8 text-sm text-saas-muted">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
          <p className="text-sm text-saas-muted">
            © 2026 Flux AI Inc. All rights reserved.
          </p>
        </div>
      </footer>
    </motion.div>
  );
}
