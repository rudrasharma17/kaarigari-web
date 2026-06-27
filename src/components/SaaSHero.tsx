import { motion } from 'motion/react';

export default function SaaSHero() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-saas-accent/20 blur-[120px] rounded-full -z-10" />
      
      <div className="max-w-7xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full glass text-xs font-bold tracking-widest uppercase text-saas-accent mb-6">
            Introducing Flux AI 2.0
          </span>
          <h1 className="text-5xl md:text-7xl font-bold font-display tracking-tight mb-8">
            Scale your workflow with <br />
            <span className="text-gradient">Intelligent Automation</span>
          </h1>
          <p className="text-lg md:text-xl text-saas-muted max-w-2xl mx-auto mb-10">
            The all-in-one platform to build, deploy, and scale your AI agents. 
            Automate the boring stuff and focus on what matters most.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
            <button className="w-full sm:w-auto bg-saas-accent hover:bg-saas-accent-dark text-white px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105 shadow-xl shadow-saas-accent/30">
              Get Started for Free
            </button>
            <button className="w-full sm:w-auto glass hover:bg-white/10 text-white px-8 py-4 rounded-full font-bold text-lg transition-all">
              Watch Demo
            </button>
          </div>
        </motion.div>

        {/* Dashboard Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative max-w-5xl mx-auto"
        >
          <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl shadow-saas-accent/10 glow">
            <img 
              src="/dashboard-preview.png" 
              alt="Flux AI Dashboard" 
              className="w-full object-cover"
            />
          </div>

          
          {/* Floating Accents */}
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-fuchsia-500/20 blur-2xl rounded-full animate-pulse" />
          <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-indigo-500/20 blur-2xl rounded-full animate-pulse" />
        </motion.div>
      </div>
    </section>
  );
}
