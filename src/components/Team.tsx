import { motion } from 'motion/react';
import { TEAM } from '../constants';
import { Instagram, Twitter, Linkedin } from 'lucide-react';

export default function Team() {
  return (
    <section className="py-32 px-6 bg-brand-base" id="team">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <span className="text-brand-accent text-sm font-bold uppercase tracking-[0.3em] mb-4 block">
            The Geniuses
          </span>
          <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tighter uppercase leading-tight text-brand-light">
            Behind The <span className="text-brand-accent italic">Scenes</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TEAM.map((member, index) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-[40px] mb-6">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-base/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-8">
                  <div className="flex gap-4">
                    <button className="w-10 h-10 bg-brand-accent text-brand-base rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                      <Instagram className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 bg-brand-accent text-brand-base rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                      <Twitter className="w-5 h-5" />
                    </button>
                    <button className="w-10 h-10 bg-brand-accent text-brand-base rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                      <Linkedin className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="text-center">
                <h3 className="text-2xl font-display font-bold uppercase tracking-tight text-brand-light mb-1 group-hover:text-brand-accent transition-colors">
                  {member.name}
                </h3>
                <p className="text-brand-light/50 text-sm font-bold uppercase tracking-widest leading-none mt-2">
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
