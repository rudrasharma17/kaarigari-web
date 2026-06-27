import { motion } from 'motion/react';
import { CASE_STUDIES } from '../constants';
import { ArrowRight } from 'lucide-react';

export default function CaseStudies() {
  return (
    <section className="py-32 px-6 bg-brand-accent rounded-[40px] md:rounded-[80px]" id="projects">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20">
          <h2 className="text-[12vw] sm:text-[10vw] md:text-[8vw] font-display font-black leading-[0.85] tracking-tighter uppercase text-brand-base">
            CASE <span className="font-light italic">STUDIES</span>
          </h2>
        </div>

        <div className="space-y-12">
          {CASE_STUDIES.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-brand-base rounded-[40px] md:rounded-[60px] overflow-hidden grid grid-cols-1 md:grid-cols-2 group"
            >
              <div className="p-8 md:p-16 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-brand-accent text-2xl font-display font-bold">{study.number}</span>
                    <span className="text-brand-light/40 text-sm font-bold uppercase tracking-widest">{study.client}</span>
                  </div>
                  <h3 className="text-4xl md:text-5xl font-display font-bold uppercase tracking-tight mb-6">
                    {study.title}
                  </h3>
                  <p className="text-brand-light/60 text-lg leading-relaxed mb-8">
                    {study.description}
                  </p>
                </div>
                
                <button className="flex items-center gap-4 bg-brand-accent text-brand-base px-8 py-4 rounded-full font-bold self-start hover:scale-105 transition-transform">
                  VIEW PROJECT
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>

              <div className="relative h-80 md:h-auto overflow-hidden">
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-brand-base/80 to-transparent md:hidden" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
