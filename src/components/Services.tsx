import { motion } from 'motion/react';
import { SERVICES } from '../constants';
import { ArrowUpRight } from 'lucide-react';

export default function Services() {
  return (
    <section className="py-40 px-6 bg-cinema-black" id="services">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
          <div>
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-cinema-gold text-xs font-bold uppercase tracking-[0.4em] mb-6 block"
            >
              Our Expertise
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-display font-medium tracking-tighter leading-[0.9] uppercase"
            >
              CRAFTING <br />
              VISUAL <span className="text-cinema-gold italic">EXCELLENCE.</span>
            </motion.h2>
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="bg-white/5 border border-white/10 p-8 max-w-sm rounded-lg"
          >
             <p className="text-sm text-white/40 leading-relaxed">
               We bridge the gap between high-end technical execution and raw emotional storytelling, ensuring every frame serves the narrative.
             </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="mb-10 text-cinema-gold group-hover:scale-110 transition-transform duration-500 origin-left">
                {service.icon}
              </div>
              <h3 className="text-3xl font-display font-medium tracking-tight mb-6 group-hover:text-cinema-gold transition-colors">
                {service.title}
              </h3>
              <p className="text-white/40 leading-relaxed mb-10 text-lg">
                {service.description}
              </p>
              
              <div className="h-px w-full bg-white/10 group-hover:bg-cinema-gold/50 transition-colors" />
              
              <div className="flex items-center justify-between mt-6 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-bold tracking-[0.2em] text-cinema-gold uppercase">Explore Service</span>
                <ArrowUpRight className="w-5 h-5 text-cinema-gold" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

