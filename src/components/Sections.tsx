import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from 'motion/react';
import { ArrowUpRight, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

function Wobble({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
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
    <motion.div ref={ref} style={{ x: sx, y: sy }} className={`inline-block ${className}`}
      onMouseMove={onMove} onMouseLeave={onLeave}>
      {children}
    </motion.div>
  );
}

const R = '#EE2C57', N = '#010D1A', C = '#F8F6DA', D = '#010D1A', B = '#010D1A';
const ease = [0.16, 1, 0.3, 1] as const;

function FU({ children, delay = 0, className = '' }: any) {
  const ref = useRef<HTMLDivElement>(null);
  const v = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} className={className}
      initial={{ opacity: 0, y: 52 }} animate={v ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.9, ease }}>
      {children}
    </motion.div>
  );
}

function useCounter(target: number, inView: boolean) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0; const dur = 1800;
    const step = (ts: number, startTs: number) => {
      const p = Math.min((ts - startTs) / dur, 1);
      setCount(Math.floor(p * target));
      if (p < 1) requestAnimationFrame(t => step(t, startTs));
    };
    requestAnimationFrame(ts => step(ts, ts));
  }, [inView, target]);
  return count;
}

const SERVICES = ['Brand Films','Music Videos','Commercials','Documentaries','Corporate','Color Grading','4K Production','Motion Design'];

const WORKS = [
  { title: 'Gym',    cat: 'Fitness',   year: 'Explore', w: 420, col: '#0a0016', link: '/works' },
  { title: 'Restaurant', cat: 'Dining',  year: 'Explore', w: 380, col: '#001528', link: '/works' },
  { title: 'Fashion', cat: 'Style',  year: 'Explore', w: 400, col: '#1a000a', link: '/works' },
  { title: 'Event',    cat: 'Live',  year: 'Explore', w: 420, col: '#000d2a', link: '/works' },
  { title: 'Long Format',  cat: 'Films',   year: 'Explore', w: 360, col: '#0a1200', link: '/works' },
];

const PROCESS = [
  { n:'01', t:'Discovery',  d:'We interrogate every assumption before a single frame is conceived.' },
  { n:'02', t:'Vision',     d:'Treatment decks that challenge the ordinary and inspire alignment.' },
  { n:'03', t:'Execution', d:'Every shot deliberate. Every frame a decision made under pressure.' },
  { n:'04', t:'Delivery',   d:'Post-production mastered to the pixel. Nothing short of flawless.' },
];

/* ── Ticker ── */
export function Ticker() {
  const items = [...SERVICES, ...SERVICES, ...SERVICES];
  return (
    <div className="overflow-hidden" style={{ borderTop:`1px solid rgba(248,246,218,0.06)`, borderBottom:`1px solid rgba(248,246,218,0.06)` }}>
      <div className="flex overflow-hidden select-none py-5">
        <div className="marquee-f">
          {items.map((s,i) => (
            <span key={i} className="flex items-center gap-5 font-display font-semibold text-base uppercase tracking-widest" style={{ color:`rgba(248,246,218,0.7)` }}>
              {s} <span style={{ color:C }}>·</span>
            </span>
          ))}
        </div>
      </div>
      <div className="flex overflow-hidden select-none py-5" style={{ borderTop:`1px solid rgba(248,246,218,0.15)` }}>
        <div className="marquee-r">
          {[...SERVICES].reverse().concat([...SERVICES].reverse()).map((s,i) => (
            <span key={i} className="flex items-center gap-5 font-display text-sm uppercase tracking-widest" style={{ color:`rgba(248,246,218,0.5)` }}>
              {s} <span style={{ color:`rgba(248,246,218,0.2)` }}>—</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

const GRADS = [
  'linear-gradient(135deg,#010D1A 0%,#001a33 100%)',
  'linear-gradient(135deg,#1a0011 0%,#010D1A 100%)',
  'linear-gradient(160deg,#002200 0%,#010D1A 100%)',
  'linear-gradient(120deg,#1a0a00 0%,#010D1A 100%)',
  'linear-gradient(150deg,#0a001a 0%,#010D1A 100%)',
];

/* ── Works (Grid Layout) ── */
export function Works() {
  const ref = useRef<HTMLDivElement>(null);
  const v = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="works" className="py-24" style={{ borderTop:`1px solid rgba(248,246,218,0.05)` }}>
      <div ref={ref} className="px-8 md:px-16 mb-16 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <motion.p className="label-tag mb-4" initial={{ opacity:0, x:-20 }} animate={v?{opacity:1,x:0}:{}} transition={{ duration:0.8 }}>
            Selected Works
          </motion.p>
          <div className="overflow-hidden">
            <motion.h2 className="font-display font-bold tracking-tight leading-none" style={{ fontSize:'clamp(2.5rem,6vw,5.5rem)', color:C }}
              initial={{ y:'110%' }} animate={v?{y:0}:{}} transition={{ delay:0.1, duration:1, ease }}>
              Stories We've Told.
            </motion.h2>
          </div>
        </div>
        <motion.div initial={{ opacity:0, x:20 }} animate={v?{opacity:1,x:0}:{}} transition={{ delay:0.3, duration:0.8 }}>
          <Link to="/works" className="inline-flex items-center justify-center border border-brand-red/40 rounded-full px-8 py-3 text-[10px] font-bold uppercase tracking-widest transition-colors text-brand-red hover:bg-brand-red hover:text-brand-cream">
            View all Reels
          </Link>
        </motion.div>
      </div>

      <div className="px-8 md:px-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {WORKS.map((w, i) => (
          <Link key={i} to={`/works?cat=${w.title}`}
            className="group relative h-[300px] cursor-pointer overflow-hidden rounded-xl border border-white/5 transition-all duration-700 hover:-translate-y-2 hover:border-brand-red/30"
            style={{ background: GRADS[i % GRADS.length] }}>

            
            {/* Category Title */}
            <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-10">
              <span className="font-mono text-[10px] tracking-[0.5em] uppercase mb-2 opacity-50" style={{ color: C }}>Explore</span>
              <h3 className="font-display font-bold text-4xl md:text-5xl tracking-tighter group-hover:scale-110 transition-transform duration-700" style={{ color: C }}>{w.title}</h3>
              <div className="mt-6 w-12 h-1 overflow-hidden">
                <div className="w-full h-full transition-transform duration-700 -translate-x-full group-hover:translate-x-0" style={{ background: R }} />
              </div>
            </div>

            {/* Hover effect */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700"
              style={{ background: `radial-gradient(circle at 50% 50%, ${R} 0%, transparent 70%)` }} />
            
            {/* Index number */}
            <div className="absolute top-6 right-6 font-mono text-[10px] opacity-20" style={{ color: C }}>
              0{i+1}
            </div>
          </Link>
        ))}
        {/* End card */}
        <Link to="/gallery"
          className="group relative h-[300px] cursor-pointer overflow-hidden rounded-xl border border-white/5 transition-all duration-700 hover:-translate-y-2 hover:border-brand-red/30"
          style={{ background: GRADS[WORKS.length % GRADS.length] }}>

          {/* Category Title */}
          <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center z-10">
            <span className="font-mono text-[10px] tracking-[0.5em] uppercase mb-2 opacity-50" style={{ color: C }}>Explore</span>
            <h3 className="font-display font-bold text-4xl md:text-5xl tracking-tighter group-hover:scale-110 transition-transform duration-700" style={{ color: C }}>Photos</h3>
            <div className="mt-6 w-12 h-1 overflow-hidden">
              <div className="w-full h-full transition-transform duration-700 -translate-x-full group-hover:translate-x-0" style={{ background: R }} />
            </div>
          </div>

          {/* Hover effect */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700"
            style={{ background: `radial-gradient(circle at 50% 50%, ${R} 0%, transparent 70%)` }} />
          
          {/* Index number */}
          <div className="absolute top-6 right-6 font-mono text-[10px] opacity-20" style={{ color: C }}>
            0{WORKS.length + 1}
          </div>
        </Link>
      </div>

    </section>
  );
}


/* ── Philosophy ── */
export function Philosophy() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset:['start end','end start'] });
  const x1 = useTransform(scrollYProgress, [0,1], ['-6%','6%']);
  const x2 = useTransform(scrollYProgress, [0,1], ['6%','-6%']);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const bgY = useTransform(scrollYProgress, [0,1], ['0%', isMobile ? '0%' : '12%']);
  const v   = useInView(ref, { once:true, margin:'-80px' });

  const lines = ["We don't make videos.", "We craft experiences", "that outlive campaigns."];
  return (
    <section ref={ref} className="py-40 md:py-60 overflow-hidden" style={{ borderTop:`1px solid rgba(248,246,218,0.05)`, background:D }}>
      <motion.div style={{ y: bgY }} className="relative">
        {['CINEMA','CRAFT','STORY'].map((w,i) => (
          <motion.div key={i} style={{ x: i%2===0 ? x1 : x2 }} className="overflow-hidden leading-[1.1] pt-4 pb-4">
            <span className={`block font-display font-black text-[12vw] md:text-[17vw] tracking-tighter select-none uppercase ${i===1?'text-right':''}`}
              style={{ color:`rgba(238,44,87,0.055)` }}>{w}</span>
          </motion.div>
        ))}


        {/* Foreground */}
        <div className="absolute inset-0 flex items-center justify-center px-6">
          <div className="text-center max-w-4xl">
            {lines.map((line, i) => (
              <div key={i} className="overflow-hidden">
                <motion.div initial={{ y:'115%' }} animate={v?{y:0}:{}}
                  transition={{ delay:i*0.15, duration:1.05, ease }}>
                  <span className="block font-display font-bold tracking-tight leading-tight"
                    style={{ fontSize:'clamp(2rem,5vw,5rem)', color: i===1 ? R : C, fontStyle: i===1 ? 'italic' : 'normal', fontWeight: i===1 ? 300 : 700 }}>
                    {line}
                  </span>
                </motion.div>
              </div>
            ))}
            <motion.p initial={{ opacity:0, y:20 }} animate={v?{opacity:1,y:0}:{}}
              transition={{ delay:0.65, duration:0.8 }}
              className="mt-8 text-base md:text-lg max-w-lg mx-auto leading-relaxed" style={{ color:`rgba(248,246,218,0.5)` }}>
              Every brief is a search for truth. Every frame, a decision. We measure our work by the silence it creates in a room.
            </motion.p>
            <motion.a href="mailto:kaarigari.productions@gmail.com" initial={{ opacity:0, y:16 }} animate={v?{opacity:1,y:0}:{}}
              transition={{ delay:0.85, duration:0.7 }}
              className="inline-flex items-center gap-3 mt-10 font-mono text-[10px] tracking-[0.4em] uppercase group"
              style={{ color:R }}>
              <span>Start a conversation</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </motion.a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

/* ── Process ── */
export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const v = useInView(ref, { once:true, margin:'-60px' });
  const [active, setActive] = useState<number|null>(null);

  return (
    <section id="process" className="px-8 md:px-16 py-28" style={{ borderTop:`1px solid rgba(248,246,218,0.05)` }}>
      <div ref={ref}>
        <FU className="mb-14">
          <p className="label-tag mb-4">Our Process</p>
          <h2 className="font-display font-bold tracking-tight leading-none" style={{ fontSize:'clamp(2.5rem,6vw,5.5rem)', color:C }}>
            How we think.
          </h2>
        </FU>

        <div className="divide-y" style={{ borderTop:`1px solid rgba(248,246,218,0.07)`, borderColor:`rgba(248,246,218,0.07)` }}>
          {PROCESS.map((s, i) => (
            <motion.div key={i}
              initial={{ opacity:0, x:-30 }} animate={v?{opacity:1,x:0}:{}}
              transition={{ delay:i*0.1, duration:0.8, ease }}
              className="flex items-start gap-8 py-10 group cursor-pointer transition-all duration-500"
              style={{ borderColor:`rgba(248,246,218,0.07)` }}
              onClick={() => setActive(active===i ? null : i)}>
              <span className="font-mono text-sm flex-shrink-0 pt-1" style={{ color:`rgba(238,44,87,0.5)` }}>{s.n}</span>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-2xl md:text-4xl tracking-tight transition-colors duration-300"
                    style={{ color: active===i ? R : C }}>
                    {s.t}
                  </h3>
                  <motion.div animate={{ rotate: active===i ? 45 : 0 }} transition={{ duration:0.3 }}
                    className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ml-4"
                    style={{ border:`1px solid rgba(248,246,218,0.15)` }}>
                    <span style={{ color:`rgba(248,246,218,0.5)`, fontSize:16 }}>+</span>
                  </motion.div>
                </div>
                <motion.div animate={{ height: active===i ? 'auto' : 0, opacity: active===i ? 1 : 0 }}
                  initial={{ height:0, opacity:0 }} transition={{ duration:0.4, ease }}
                  className="overflow-hidden">
                  <p className="text-sm md:text-base leading-relaxed pt-4" style={{ color:`rgba(248,246,218,0.45)` }}>{s.d}</p>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Stats ── */
function StatNum({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const v = useInView(ref, { once:true });
  const n = useCounter(target, v);
  return <div ref={ref}>{n}{suffix}</div>;
}

export function Stats() {
  const v = useInView(useRef<HTMLDivElement>(null), { once:true });
  const ref = useRef<HTMLDivElement>(null);
  const inV = useInView(ref, { once:true, margin:'-60px' });

  return (
    <section style={{ borderTop:`1px solid rgba(248,246,218,0.05)` }}>
      <div ref={ref} className="grid grid-cols-2 md:grid-cols-4">
        {[{t:1,s:'+',l:'Years of Craft'},{t:40,s:'+',l:'Produced'},{t:4,s:'K',l:'Max Resolution'},{t:5,s:'+',l:'Brand Partners'}].map((s,i)=>(
          <motion.div key={i} initial={{ opacity:0, y:40 }} animate={inV?{opacity:1,y:0}:{}}
            transition={{ delay:i*0.1, duration:0.8 }}
            className="px-8 py-16 md:py-20 text-center relative group overflow-hidden"
            style={{ borderRight: i<3 ? `1px solid rgba(248,246,218,0.06)`:undefined }}>
            <motion.div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background:`linear-gradient(135deg, rgba(238,44,87,0.08) 0%, transparent 70%)` }} />
            <div className="font-display font-bold text-5xl md:text-7xl mb-2 tracking-tighter" style={{ color:R }}>
              <StatNum target={s.t} suffix={s.s} />
            </div>
            <div className="font-mono text-[9px] tracking-[0.35em] uppercase" style={{ color:`rgba(248,246,218,0.3)` }}>{s.l}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ── CTA ── */
export function Cta() {
  const ref = useRef<HTMLDivElement>(null);
  const v = useInView(ref, { once:true, margin:'-80px' });
  const { scrollYProgress } = useScroll({ target:ref, offset:['start end','end end'] });
  const scale = useTransform(scrollYProgress, [0,1], [0.88, 1]);

  return (
    <section className="relative overflow-hidden" style={{ borderTop:`1px solid rgba(248,246,218,0.05)` }}>
      {/* Big BG text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <span className="font-display font-black text-[22vw] tracking-tighter select-none whitespace-nowrap"
          style={{ color:`rgba(238,44,87,0.04)` }}>kaarigari</span>
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="hidden md:block w-[600px] h-[300px] rounded-full blur-[140px]" style={{ background:`rgba(238,44,87,0.07)` }} />
      </div>

      <motion.div ref={ref} style={{ scale }} className="relative z-10 px-8 md:px-16 pt-40 md:pt-60 pb-10 md:pb-12 text-center origin-bottom">
        <motion.p initial={{ opacity:0 }} animate={v?{opacity:1}:{}} transition={{ delay:0.1 }}
          className="label-tag mb-12 justify-center">
          Start a Project
        </motion.p>

        {["Let's Make", "Something Real."].map((line, i) => (
          <div key={i} className="overflow-hidden">
            <motion.h2 initial={{ y:'110%' }} animate={v?{y:0}:{}}
              transition={{ delay:0.15+i*0.12, duration:1.1, ease }}
              className="block font-display font-bold tracking-tighter leading-none"
              style={{ fontSize:'clamp(3rem,10vw,10rem)', color: i===1 ? R : C, fontStyle: i===1 ? 'italic' : 'normal', fontWeight: i===1 ? 300 : 700 }}>
              {line}
            </motion.h2>
          </div>
        ))}

        <motion.div initial={{ opacity:0, y:24 }} animate={v?{opacity:1,y:0}:{}}
          transition={{ delay:0.55, duration:0.9 }}
          className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Wobble>
            <a href="mailto:kaarigari.productions@gmail.com"
              className="group relative px-12 py-4 font-bold text-[10px] tracking-[0.45em] uppercase overflow-hidden transition-all duration-300 block"
              style={{ background:R, color:C }}>
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background:`rgba(248,246,218,0.15)` }} />
              <Mail className="inline w-3.5 h-3.5 mr-2 relative z-10" />
              <span className="relative z-10">Get in Touch</span>
            </a>
          </Wobble>
          <Wobble>
            <a href="tel:+919352335417"
              className="group px-12 py-4 font-mono text-[10px] tracking-[0.45em] uppercase transition-all duration-300 block"
              style={{ border:`1px solid rgba(248,246,218,0.15)`, color:`rgba(248,246,218,0.5)` }}
              onMouseEnter={e=>{(e.currentTarget as any).style.borderColor=R;(e.currentTarget as any).style.color=R;}}
              onMouseLeave={e=>{(e.currentTarget as any).style.borderColor='rgba(248,246,218,0.15)';(e.currentTarget as any).style.color='rgba(248,246,218,0.5)';}}>
              <Phone className="inline w-3.5 h-3.5 mr-2" />+91 93523 35417
            </a>
          </Wobble>
        </motion.div>

        <motion.div initial={{ opacity:0, y:20 }} animate={v?{opacity:1,y:0}:{}} transition={{ delay:0.75 }}
          className="mt-24 flex flex-col items-center">
          <div className="flex h-24 w-24 items-center justify-center mb-4">
            <img src="/logo.png" alt="kaarigari logo" className="h-[140%] w-[140%] object-contain opacity-40 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-500" />
          </div>
          <p className="font-mono text-[9px] tracking-widest uppercase" style={{ color:`rgba(248,246,218,0.15)` }}>
            © 2026 kaarigari productions · crafted with truth
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
