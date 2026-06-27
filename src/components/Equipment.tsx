import { motion } from 'motion/react';
import { EQUIPMENT } from '../constants';
import { ChevronRight } from 'lucide-react';

export default function Equipment() {
  return (
    <section id="equipment" className="py-32 bg-cinema-black text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div className="max-w-2xl">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-cinema-gold font-display tracking-widest text-sm uppercase mb-4 block"
            >
              TECHNICAL SPECIFICATIONS
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-display font-medium tracking-tighter leading-none"
            >
              OUR ARSENAL <span className="text-white/20">/</span> EQUIPMENT
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-white/40 max-w-sm text-right hidden md:block"
          >
            We only use industry-standard tools to ensure your vision is captured with the highest possible fidelity.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/10 border border-white/10">
          {EQUIPMENT.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-cinema-black p-8 group hover:bg-white/[0.02] transition-colors relative"
            >
              <div className="flex justify-between items-start mb-12">
                <span className="text-xs font-mono text-white/30 uppercase tracking-widest">{item.category}</span>
                <ChevronRight className="w-4 h-4 text-cinema-gold opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0" />
              </div>
              
              <h3 className="text-2xl font-display font-medium mb-4 group-hover:text-cinema-gold transition-colors">
                {item.name}
              </h3>
              
              <p className="text-white/50 text-sm leading-relaxed mb-8">
                {item.description}
              </p>

              <div className="space-y-2 pt-6 border-t border-white/5">
                {item.specs.map((spec, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-1 h-1 rounded-full bg-cinema-gold/50" />
                    <span className="text-[10px] font-mono text-white/40 uppercase tracking-tight">{spec}</span>
                  </div>
                ))}
              </div>

              {/* Decorative corner */}
              <div className="absolute top-0 right-0 w-8 h-8 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute top-2 right-2 w-px h-2 bg-cinema-gold/50" />
                <div className="absolute top-2 right-2 w-2 h-px bg-cinema-gold/50" />
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-20 p-8 border border-white/5 bg-white/[0.01] flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div className="flex items-center gap-6">
            <div className="w-12 h-12 rounded-full border border-cinema-gold/20 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-cinema-gold animate-pulse" />
            </div>
            <div>
              <p className="text-sm font-medium">CUSTOM RIGS AVAILABLE</p>
              <p className="text-xs text-white/40 uppercase tracking-widest">In-house engineering for specialized shots</p>
            </div>
          </div>
          <button className="px-8 py-4 bg-cinema-gold text-black font-display font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors">
            DOWNLOAD EQUIPMENT LIST (PDF)
          </button>
        </motion.div>
      </div>
    </section>
  );
}
