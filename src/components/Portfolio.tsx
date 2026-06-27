import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { PORTFOLIO_ITEMS } from '../constants';

export default function Portfolio() {
  return (
    <section id="portfolio" className="py-40 px-6 bg-cinema-black">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
          <div>
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="text-cinema-gold text-xs font-bold uppercase tracking-[0.4em] mb-6 block"
            >
              Selected Works
            </motion.span>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-display font-medium tracking-tighter leading-none"
            >
              CRAFTED <br />
              <span className="italic text-white/40">MOMENTS.</span>
            </motion.h2>
          </div>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-white/40 max-w-sm text-right pb-4"
          >
            A collection of visual narratives where technical precision meets emotional resonance.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 md:gap-10">
          {PORTFOLIO_ITEMS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: any, index: number, key?: any }) {
  // Creating a sophisticated asymmetrical grid pattern
  const colSpans = [
    'lg:col-span-7', // Item 1
    'lg:col-span-5', // Item 2
    'lg:col-span-5', // Item 3
    'lg:col-span-7', // Item 4
  ];
  
  const colSpan = colSpans[index % colSpans.length];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={`${colSpan} portfolio-item group relative overflow-hidden bg-white/5 cursor-none`}
    >
      <div className={`${project.aspect} overflow-hidden`}>
        <motion.img
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.6 }}
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
        />
      </div>
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
        <div className="flex justify-between items-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
          <div>
            <span className="text-cinema-gold text-[10px] font-bold uppercase tracking-widest mb-2 block">{project.category}</span>
            <h3 className="text-2xl md:text-3xl font-display font-bold tracking-tighter text-white">{project.title}</h3>
            <p className="text-white/40 text-xs mt-1 uppercase tracking-wider">{project.client}</p>
          </div>
          <div className="w-12 h-12 bg-cinema-gold rounded-full flex items-center justify-center text-black">
            <ArrowUpRight className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Frame number */}
      <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-[10px] font-mono text-white/40 tracking-tighter">F_00{index + 1}</span>
      </div>
    </motion.div>
  );
}

