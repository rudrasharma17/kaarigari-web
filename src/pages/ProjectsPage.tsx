import { motion } from 'motion/react';
import { CASE_STUDIES } from '../constants';
import { ArrowUpRight, Search } from 'lucide-react';

export default function ProjectsPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="pt-40 pb-20 px-6 min-h-screen bg-brand-base"
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
          <div>
            <span className="text-brand-accent text-sm font-bold uppercase tracking-[0.3em] mb-4 block">
              Portfolio
            </span>
            <h1 className="text-6xl md:text-8xl font-display font-black tracking-tighter uppercase leading-[0.9] text-brand-light">
              LATEST <span className="text-brand-accent italic">PROJECTS</span>
            </h1>
          </div>
          <div className="flex gap-4">
             <button className="px-6 py-3 bg-brand-accent text-brand-base rounded-full font-bold text-sm uppercase tracking-widest">All</button>
             <button className="px-6 py-3 bg-brand-surface text-brand-light rounded-full font-bold text-sm uppercase tracking-widest border border-brand-light/10 hover:border-brand-accent transition-all">Design</button>
             <button className="px-6 py-3 bg-brand-surface text-brand-light rounded-full font-bold text-sm uppercase tracking-widest border border-brand-light/10 hover:border-brand-accent transition-all">Dev</button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {CASE_STUDIES.map((study, index) => (
            <motion.div
              key={study.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="group relative h-[500px] rounded-[40px] overflow-hidden bg-brand-surface cursor-pointer"
            >
              <img
                src={study.image}
                alt={study.title}
                className="w-full h-full object-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 transition-opacity group-hover:opacity-80" />
              
              <div className="absolute inset-0 p-10 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                   <span className="text-brand-accent font-display font-bold text-2xl">{study.number}</span>
                   <div className="w-12 h-12 bg-brand-light/10 backdrop-blur-md rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                     <Search className="w-6 h-6 text-brand-light" />
                   </div>
                </div>
                
                <div>
                   <span className="px-3 py-1 bg-brand-light/10 backdrop-blur-md text-brand-light/60 text-[10px] font-bold uppercase rounded-full tracking-widest mb-4 inline-block">
                     {study.client}
                   </span>
                   <h3 className="text-2xl font-display font-bold uppercase text-brand-light mb-2 group-hover:text-brand-accent transition-colors">
                     {study.title}
                   </h3>
                   <p className="text-brand-light/40 text-sm font-medium line-clamp-2">
                     {study.description}
                   </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
