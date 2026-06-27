import { motion } from 'motion/react';

export default function SaaSCta() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative bg-saas-accent rounded-[3rem] p-12 md:p-20 text-center overflow-hidden"
        >
          {/* Animated Background Circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-900/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-6xl font-bold font-display text-white mb-6">
              Ready to automate <br /> your future?
            </h2>
            <p className="text-indigo-100 max-w-xl mx-auto mb-10 text-lg">
              Start your 14-day free trial today. No credit card required. 
              Setup takes less than 2 minutes.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto bg-white text-saas-accent hover:bg-indigo-50 px-8 py-4 rounded-full font-bold text-lg transition-all hover:scale-105">
                Get Started Now
              </button>
              <button className="w-full sm:w-auto border border-white/30 text-white hover:bg-white/10 px-8 py-4 rounded-full font-bold text-lg transition-all">
                Schedule a Demo
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
