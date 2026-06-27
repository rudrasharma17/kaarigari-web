import { motion } from 'motion/react';
import { Globe, Shield, Zap, Sparkles } from 'lucide-react';

export default function OtherPages() {
  const sections = [
    { title: 'Privacy Policy', icon: <Shield className="w-8 h-8" /> },
    { title: 'Terms of Service', icon: <Globe className="w-8 h-8" /> },
    { title: 'Career', icon: <Zap className="w-8 h-8" /> },
    { title: 'Our Story', icon: <Sparkles className="w-8 h-8" /> },
  ];

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
            Information
          </span>
          <h1 className="text-6xl md:text-8xl font-display font-black tracking-tighter uppercase leading-[0.9] text-brand-light italic">
            COMPANY <span className="text-brand-accent not-italic">PAGES</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-brand-surface p-10 rounded-[40px] border border-brand-light/5 hover:border-brand-accent/20 transition-all cursor-pointer group"
            >
              <div className="w-16 h-16 bg-brand-base rounded-2xl flex items-center justify-center mb-8 border border-brand-light/10 group-hover:bg-brand-accent group-hover:text-brand-base transition-colors">
                {section.icon}
              </div>
              <h3 className="text-2xl font-display font-bold uppercase tracking-tight text-brand-light mb-2 group-hover:text-brand-accent transition-colors">
                {section.title}
              </h3>
              <p className="text-brand-light/40 text-sm">Explore our company’s {section.title.toLowerCase()} and understand our core values.</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
