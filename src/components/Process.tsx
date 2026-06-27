import { motion } from 'motion/react';
import { PROCESS_STEPS } from '../constants';

export default function Process() {
  return (
    <section className="py-40 px-6 bg-cinema-black" id="process">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-24">
          <div>
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-cinema-gold text-xs font-bold uppercase tracking-[0.4em] mb-6 block"
            >
              The Workflow
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-display font-medium tracking-tighter leading-[0.9] uppercase"
            >
              METHOD TO THE <br />
              <span className="text-cinema-gold italic">CRAFT.</span>
            </motion.h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1px bg-white/10 border border-white/10">
           {PROCESS_STEPS.map((step, index) => (
             <motion.div
               key={step.id}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: index * 0.1, duration: 0.8 }}
               className="bg-cinema-black p-12 group hover:bg-white/[0.01] transition-colors relative"
             >
                <div className="text-[120px] font-display font-bold text-white/[0.02] absolute top-4 right-4 leading-none select-none group-hover:text-cinema-gold/[0.05] transition-colors">
                  {step.id}
                </div>
                
                <div className="relative z-10">
                  <div className="w-12 h-12 text-cinema-gold mb-10 group-hover:scale-110 transition-transform origin-left">
                    {step.icon}
                  </div>
                  
                  <h3 className="text-2xl font-display font-medium tracking-tight mb-4 group-hover:text-cinema-gold transition-colors">
                    {step.title}
                  </h3>
                  
                  <p className="text-white/40 leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>
             </motion.div>
           ))}
        </div>
      </div>
    </section>
  );
}

