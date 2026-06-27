import { motion } from 'motion/react';
import { ARTICLES } from '../constants';
import { ArrowUpRight } from 'lucide-react';

export default function News() {
  return (
    <section className="py-32 px-6 bg-brand-base" id="news">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
          <div>
            <span className="text-brand-accent text-sm font-bold uppercase tracking-[0.3em] mb-4 block">
              Read Our Blog
            </span>
            <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tighter uppercase leading-tight text-brand-light">
              Check out latest news <br />
              <span className="text-brand-accent italic">update & articles</span>
            </h2>
          </div>
          <button className="text-brand-light border border-brand-light/20 px-8 py-4 rounded-full font-bold hover:bg-brand-light hover:text-brand-base transition-all uppercase tracking-widest text-sm">
            View All Posts
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.map((article, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group bg-brand-surface rounded-[40px] overflow-hidden border border-brand-light/5 hover:border-brand-accent/20 transition-all"
            >
              <div className="aspect-video overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <span className="px-3 py-1 bg-brand-accent text-brand-base text-[10px] font-bold uppercase rounded-full">
                    {article.category}
                  </span>
                  <span className="text-brand-light/40 text-xs font-bold uppercase">
                    {article.date}
                  </span>
                </div>
                <h3 className="text-xl font-display font-bold text-brand-light mb-6 leading-snug group-hover:text-brand-accent transition-colors">
                  {article.title}
                </h3>
                <div className="flex items-center gap-2 text-brand-light/60 font-bold text-xs uppercase tracking-widest group-hover:text-brand-light transition-colors cursor-pointer">
                  Read Full Article
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
