'use client';
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'motion/react';
import { Play, ChevronDown, X } from 'lucide-react';

const R = '#EE2C57', C = '#F8F6DA', B = '#010D1A';
const ease = [0.16, 1, 0.3, 1] as const;

/* ── Optimized Reveal ── */
function CharReveal({ text, delay = 0, className = '', style = {} }: { text: string; delay?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <div className="overflow-hidden inline-block pr-6 -mr-6 pb-4 -mb-4 pt-2 -mt-2">
      <motion.span className={`inline-block ${className}`} style={style}
        initial={{ y: '100%' }}
        whileInView={{ y: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ delay: delay, duration: 0.8, ease }}>
        {text}
      </motion.span>
    </div>
  );
}

/* ── Magnetic button ── */
function MagBtn({ children, onClick, style, className = '' }: any) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });
  const onMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.3);
    y.set((e.clientY - r.top - r.height / 2) * 0.3);
  };
  const onLeave = () => { x.set(0); y.set(0); };
  return (
    <motion.button ref={ref} style={{ x: sx, y: sy, ...style }} className={className}
      onMouseMove={onMove} onMouseLeave={onLeave} onClick={onClick}>
      {children}
    </motion.button>
  );
}

/* ── Intro screen ── */
function Intro({ done }: { done: boolean }) {
  const [percent, setPercent] = useState(0);
  
  useEffect(() => {
    if (done) return;
    const dur = 400;
    const interval = 16;
    const steps = dur / interval;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      setPercent(Math.min(100, Math.floor((step / steps) * 100)));
      if (step >= steps) clearInterval(timer);
    }, interval);
    return () => clearInterval(timer);
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div className="fixed inset-0 z-[500] flex flex-col items-center justify-center overflow-hidden"
          style={{ background: B }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1] }}>
          


          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }} transition={{ duration: 0.5 }}
            className="text-center flex flex-col items-center relative z-10">
            
            <div className="overflow-hidden mb-2">
              <motion.img 
                initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ duration: 0.7, ease }}
                src="/logo.png" 
                alt="Kaarigari" 
                className="w-28 h-28 md:w-32 md:h-32 object-contain opacity-80"
              />
            </div>
            
            <div className="overflow-hidden pb-2">
              <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ delay: 0.2, duration: 0.7, ease }}>
                <div className="font-display font-bold text-4xl md:text-6xl tracking-tighter leading-normal" style={{ color: C }}>
                  kaarigari
                </div>
              </motion.div>
            </div>

            
            <motion.div className="h-[2px] mt-8 overflow-hidden relative" style={{ width: '240px', background: `rgba(248,246,218,0.1)` }}>
              <motion.div className="absolute top-0 left-0 h-full" style={{ background: R }}
                initial={{ width: '0%' }} animate={{ width: `${percent}%` }}
                transition={{ duration: 0.1 }} />
            </motion.div>
            
            <div className="flex justify-between w-[240px] mt-4">
              <div className="font-mono text-[9px] tracking-[0.5em] uppercase" style={{ color: `rgba(248,246,218,0.4)` }}>
                Loading
              </div>
              <div className="font-mono text-[9px] tracking-widest" style={{ color: R }}>
                {percent}%
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Hero ── */
export function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const y    = useTransform(scrollYProgress, [0, 1], ['0%', isMobile ? '0%' : '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen flex flex-col justify-center overflow-hidden bg-brand-black">
      
      {/* Full Screen Cinematic Background Video */}
      <motion.div className="absolute inset-0 z-0" style={{ y }}>
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          preload="auto"
          className="w-full h-full object-cover"
          src="/Showreel_compressed.mp4"
        />
        {/* Sleek Dark Cinematic Overlay */}
        <div className="absolute inset-0 bg-brand-black/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/80 via-transparent to-brand-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black/60 via-transparent to-brand-black/60" />
      </motion.div>

      {/* Content */}
      <motion.div style={{ opacity }} className="relative z-30 px-6 md:px-16 w-full h-full flex flex-col items-center justify-center text-center">

        {/* Massive Typography */}
        <div className="overflow-visible flex whitespace-nowrap mb-1 md:mb-2">
          <CharReveal text="KAARIGARI" delay={0.3} className="font-display font-bold leading-[0.8] tracking-tighter text-[18vw] md:text-[14vw] drop-shadow-2xl uppercase" 
            style={{ color: C }} />
        </div>
        <div className="overflow-visible flex whitespace-nowrap mt-1 md:mt-2">
          <CharReveal text="PRODUCTIONS" delay={0.4} className="font-display font-medium italic leading-[0.8] tracking-tighter text-[13vw] md:text-[9vw] drop-shadow-2xl uppercase" 
            style={{ color: R }} />
        </div>

        {/* Bottom Bar attached to viewport bottom */}
        <div className="absolute bottom-4 md:bottom-12 left-0 right-0 px-5 md:px-16 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.9 }}
            className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 md:gap-8 w-full border-t border-white/10 pt-5 md:pt-6 pb-4 md:pb-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent md:bg-none rounded-t-3xl md:rounded-none">
            
            <div className="text-center md:text-left flex flex-col items-center md:items-start">
              <p className="text-[11px] md:text-base max-w-[280px] md:max-w-sm leading-relaxed text-white/70">
                Cinematic experiences for brands that demand more than ordinary.
              </p>
              <a href="/works" className="mt-4 inline-flex items-center justify-center border border-brand-red/40 rounded-full px-8 py-3 text-[11px] uppercase tracking-widest transition-colors text-brand-red hover:bg-brand-red hover:text-brand-cream bg-brand-red/10 md:bg-transparent">
                View all Reels
              </a>
            </div>

            <div className="flex items-center gap-12 md:gap-10">
              <div className="text-center">
                <div className="font-display font-bold text-3xl md:text-3xl" style={{ color: C }}>40+</div>
                <div className="font-mono text-[9px] tracking-widest uppercase text-white/50 mt-1">Projects</div>
              </div>
              <div className="text-center">
                <div className="font-display font-bold text-3xl md:text-3xl" style={{ color: C }}>4K</div>
                <div className="font-mono text-[9px] tracking-widest uppercase text-white/50 mt-1">Resolution</div>
              </div>
            </div>

            <a href="#works" className="hidden md:flex items-center gap-2 font-mono text-[10px] tracking-widest uppercase text-white/40 hover:text-white transition-colors">
              <ChevronDown className="w-4 h-4 animate-bounce" style={{ color: R }} />Scroll
            </a>

          </motion.div>
        </div>

      </motion.div>
    </section>
  );
}

export { Intro, CharReveal, MagBtn };
