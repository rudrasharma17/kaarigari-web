import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

export default function SaaSNavbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl"
    >
      <div className="glass rounded-full px-8 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold font-display tracking-tight text-white">
          Flux<span className="text-saas-accent">AI</span>
        </Link>
        
        <div className="hidden md:flex items-center gap-8">
          <Link to="#features" className="text-sm font-medium text-saas-muted hover:text-white transition-colors">Features</Link>
          <Link to="#pricing" className="text-sm font-medium text-saas-muted hover:text-white transition-colors">Pricing</Link>
          <Link to="#testimonials" className="text-sm font-medium text-saas-muted hover:text-white transition-colors">Testimonials</Link>
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden sm:block text-sm font-medium text-white hover:text-saas-accent transition-colors">
            Log In
          </button>
          <button className="bg-saas-accent hover:bg-saas-accent-dark text-white px-6 py-2 rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-saas-accent/20">
            Sign Up
          </button>
        </div>
      </div>
    </motion.nav>
  );
}
