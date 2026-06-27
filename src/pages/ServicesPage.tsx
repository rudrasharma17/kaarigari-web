import { motion } from 'motion/react';
import { SERVICES } from '../constants';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';

export default function ServicesPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 pb-20 px-6 min-h-screen bg-brand-base"
    >
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <span className="text-brand-accent text-sm font-bold uppercase tracking-[0.3em] mb-4 block">
            What we do
          </span>
          <h1 className="text-6xl md:text-8xl font-display font-black tracking-tighter uppercase leading-[0.9] text-brand-light">
            OUR <span className="text-brand-accent italic">SERVICES</span>
          </h1>
          <p className="mt-8 text-xl text-brand-light/60 max-w-2xl font-light">
            We provide precision-crafted digital solutions that bridge the gap between creative vision and technical execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-brand-surface p-12 rounded-[50px] border border-brand-light/5 hover:border-brand-accent/30 transition-all group"
            >
              <div className="w-16 h-16 bg-brand-accent rounded-2xl flex items-center justify-center mb-8 text-brand-base">
                {service.icon}
              </div>
              <h2 className="text-3xl font-display font-bold uppercase tracking-tight mb-6 group-hover:text-brand-accent transition-colors">
                {service.title}
              </h2>
              <p className="text-brand-light/60 text-lg mb-8 leading-relaxed">
                {service.description}
              </p>
              
              <div className="space-y-4 mb-10">
                {['Customized Approach', 'Dedicated Support', 'Cutting-edge Tech'].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-brand-light/80">
                    <CheckCircle2 className="w-5 h-5 text-brand-accent" />
                    <span className="text-sm font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <button className="flex items-center gap-3 bg-brand-light/5 hover:bg-brand-accent hover:text-brand-base text-brand-light px-8 py-4 rounded-full font-bold transition-all uppercase tracking-widest text-sm">
                Get more info
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
