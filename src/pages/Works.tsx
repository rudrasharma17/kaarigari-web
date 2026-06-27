import { useRef, useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, useInView, AnimatePresence } from 'motion/react';

import { ArrowUpRight, Play, X } from 'lucide-react';

const R = '#EE2C57', C = '#F8F6DA', D = '#010D1A', B = '#010D1A', BLACK = '#000000';
const ease = [0.16, 1, 0.3, 1] as const;
const GRADS = [
  'linear-gradient(135deg,#111111 0%,#010D1A 100%)',
  'linear-gradient(135deg,#0a0a0a 0%,#010D1A 100%)',
  'linear-gradient(160deg,#111111 0%,#010D1A 100%)',
  'linear-gradient(120deg,#0a0a0a 0%,#010D1A 100%)',
  'linear-gradient(150deg,#111111 0%,#010D1A 100%)',
];

const CATS = ['Gym', 'Restaurant', 'Fashion', 'Event', 'Long Format'];

const PROJECTS = [
  {
    id: 15,
    title: 'Showreel',
    cat: 'Long Format',
    year: '2026',
    desc: 'Cinematic showreel highlighting our best visual storytelling and production work.',
    thumb: 'https://img.youtube.com/vi/JbJLgYDk1tk/maxresdefault.jpg',
    video: 'https://www.youtube-nocookie.com/embed/JbJLgYDk1tk?autoplay=1&mute=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3',
    aspect: 'wide',
    tags: ['Showreel', 'Cinematic']
  },
  {
    id: 1,
    title: 'MaxFit - Power & Pace',
    cat: 'Gym',
    year: '2026',
    desc: 'High energy fitness training session showcasing intensity and strength.',
    thumb: 'https://drive.google.com/thumbnail?id=1NVgnsZL_B9kkZNBRhUb0w671n_Qbb0v0&sz=w400',
    video: '/works_videos/1NVgnsZL_B9kkZNBRhUb0w671n_Qbb0v0.mp4',
    aspect: 'tall',
    tags: ['Fitness', 'Energy', 'Dynamic']
  },
  {
    id: 2,
    title: 'MaxFit - The Grind',
    cat: 'Gym',
    year: '2026',
    desc: 'Cinematic gym progression, capturing the raw essence of power lifting.',
    thumb: 'https://drive.google.com/thumbnail?id=1K_pBKcX04lrdrQl35T7oFjGfjlI4EKYA&sz=w400',
    video: '/works_videos/1K_pBKcX04lrdrQl35T7oFjGfjlI4EKYA.mp4',
    aspect: 'tall',
    tags: ['Gym', 'Cinematic', 'Workout']
  },
  {
    id: 3,
    title: 'MaxFit - Athletic Motion',
    cat: 'Gym',
    year: '2026',
    desc: 'Focus on movement, agility, and performance coaching.',
    thumb: 'https://drive.google.com/thumbnail?id=1KXzl823JBwoRiA1Tw3KP9rXgFySAkSzX&sz=w400',
    video: '/works_videos/1KXzl823JBwoRiA1Tw3KP9rXgFySAkSzX.mp4',
    aspect: 'tall',
    tags: ['Athletic', 'Performance', 'Reel']
  },
  // Restaurant
  {
    id: 4,
    title: 'Dhaba - Culinary Heritage',
    cat: 'Restaurant',
    year: '2026',
    desc: 'Celebrating rich North Indian cuisine, sizzling street eats, and heritage recipes.',
    thumb: 'https://drive.google.com/thumbnail?id=1bAg20z7RNbOw0pgjQdIHupHchP52W3QK&sz=w400',
    video: '/works_videos/1bAg20z7RNbOw0pgjQdIHupHchP52W3QK.mp4',
    aspect: 'tall',
    tags: ['Culinary', 'Heritage', 'Street Food']
  },
  {
    id: 5,
    title: 'Dhaba - Sizzle & Smoke',
    cat: 'Restaurant',
    year: '2026',
    desc: 'A sensory journey through spices, clay ovens, and piping hot dishes.',
    thumb: 'https://drive.google.com/thumbnail?id=1_FIws5TBqsSXwohHkaZj-aCJurFFhR0X&sz=w400',
    video: '/works_videos/1_FIws5TBqsSXwohHkaZj-aCJurFFhR0X.mp4',
    aspect: 'tall',
    tags: ['Spices', 'Tandoor', 'Flavors']
  },
  {
    id: 6,
    title: 'Dhaba - Modern Twist',
    cat: 'Restaurant',
    year: '2026',
    desc: 'Traditional Indian dishes presented with contemporary style and plating.',
    thumb: 'https://drive.google.com/thumbnail?id=1SBLv6dmYTMZS5NFd3-Pir4fTRrFGe7Vr&sz=w400',
    video: '/works_videos/1SBLv6dmYTMZS5NFd3-Pir4fTRrFGe7Vr.mp4',
    aspect: 'tall',
    tags: ['Modern Indian', 'Plating', 'Gastronomy']
  },
  {
    id: 7,
    title: 'First Class Dining',
    cat: 'Restaurant',
    year: '2026',
    desc: 'Experiencing premium ingredients, luxury ambience, and mastercraft chefs.',
    thumb: 'https://drive.google.com/thumbnail?id=1WiyzSUIje76q8GW-fz5YiHx5MEBg4OOk&sz=w400',
    video: '/works_videos/1WiyzSUIje76q8GW-fz5YiHx5MEBg4OOk.mp4',
    aspect: 'tall',
    tags: ['Luxury', 'Fine Dining', 'Ambience']
  },
  // Fashion
  {
    id: 8,
    title: 'Deepika - Style in Motion',
    cat: 'Fashion',
    year: '2026',
    desc: 'A bold and graceful fashion editorial showcasing rich textiles and elegant silhouettes.',
    thumb: 'https://drive.google.com/thumbnail?id=1QBMkS4Va10qjvQNaOTFjhUo6lgZNrYNo&sz=w400',
    video: '/works_videos/1QBMkS4Va10qjvQNaOTFjhUo6lgZNrYNo.mp4',
    aspect: 'tall',
    tags: ['Fashion', 'Editorial', 'Elegant']
  },
  // Event
  {
    id: 9,
    title: 'Badminton Championship',
    cat: 'Event',
    year: '2026',
    desc: 'Capturing the intense speed, passion, and smash action of competitive badminton.',
    thumb: 'https://drive.google.com/thumbnail?id=1JUxI28eV6_RKV_4uvBfZKn3lk6QMG-sH&sz=w400',
    video: '/works_videos/1JUxI28eV6_RKV_4uvBfZKn3lk6QMG-sH.mp4',
    aspect: 'wide',
    tags: ['Sports', 'Action', 'Tournament']
  },
  {
    id: 10,
    title: 'MaxFit - Event Highlights',
    cat: 'Event',
    year: '2026',
    desc: 'The energy, crowd, and action from the annual fitness event showcase.',
    thumb: 'https://drive.google.com/thumbnail?id=17l_-BhjAhBNzQZz-zmuyDO4TesStvEB_&sz=w400',
    video: '/works_videos/17l_-BhjAhBNzQZz-zmuyDO4TesStvEB_.mp4',
    aspect: 'tall',
    tags: ['Event Recap', 'Community', 'High Octane']
  },
  {
    id: 11,
    title: 'Swah Final Showcase',
    cat: 'Event',
    year: '2026',
    desc: 'Cinematic capture of live music performance, artistic expressions, and creative design.',
    thumb: 'https://drive.google.com/thumbnail?id=1JSACQFm6rDq5C0LnQhxp_m6JtwgrGTE7&sz=w400',
    video: 'https://drive.google.com/file/d/1JSACQFm6rDq5C0LnQhxp_m6JtwgrGTE7/preview',
    aspect: 'wide',
    tags: ['Live Art', 'Stage', 'Performance']
  },
  // Long Format
  {
    id: 12,
    title: 'Bosch Jaipur - Brand Narrative',
    cat: 'Long Format',
    year: '2026',
    desc: 'A comprehensive look at the innovative machinery and engineering excellence in Jaipur.',
    thumb: 'https://drive.google.com/thumbnail?id=1MEqEFMN-ymX26H-8mrociNVQjOoMgYHI&sz=w400',
    video: 'https://drive.google.com/file/d/1MEqEFMN-ymX26H-8mrociNVQjOoMgYHI/preview',
    aspect: 'wide',
    tags: ['Documentary', 'Industrial', 'Engineering']
  },
  {
    id: 13,
    title: 'The Partial Truth',
    cat: 'Long Format',
    year: '2026',
    desc: 'An evocative short film exploring human connection, screenwriting, and cinematic storytelling.',
    thumb: 'https://drive.google.com/thumbnail?id=1eQvb5ZEtCjEf2ku_IUNOtmRz1Nksfj36&sz=w400',
    video: 'https://drive.google.com/file/d/1eQvb5ZEtCjEf2ku_IUNOtmRz1Nksfj36/preview',
    aspect: 'wide',
    tags: ['Short Film', 'Narrative', 'Drama']
  },
  {
    id: 14,
    title: 'Filmistaan - Cinematic Story',
    cat: 'Long Format',
    year: '2026',
    desc: 'A celebration of cinema culture, sets, and the people behind the magic of film-making.',
    thumb: 'https://drive.google.com/thumbnail?id=17KldGa3f7AO6Nn0YnQfHKw_9JU6hTbp9&sz=w400',
    video: 'https://drive.google.com/file/d/17KldGa3f7AO6Nn0YnQfHKw_9JU6hTbp9/preview',
    aspect: 'wide',
    tags: ['Cinema', 'Film Culture', 'Behind The Scenes']
  }
];


function FU({children,delay=0,className=''}:any){
  return(
    <motion.div className={className}
      initial={{opacity:0,y:40}} 
      whileInView={{opacity:1,y:0}}
      viewport={{ once: true, margin: '-50px' }}
      transition={{delay,duration:0.9,ease}}>
      {children}
    </motion.div>
  );
}

export default function Works() {

  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = searchParams.get('cat');
  const [selectedCat, setSelectedCat] = useState<string | null>(initialCat);
  const [liveProjects, setLiveProjects] = useState(PROJECTS);
  const [videoErrorStates, setVideoErrorStates] = useState<Record<number, boolean>>({});

  useEffect(() => {
    // Relying on hardcoded PROJECTS array for maximum reliability.
    setLiveProjects(PROJECTS);
  }, []);

  const modalParam = searchParams.get('v');
  const modal = modalParam ? parseInt(modalParam, 10) : null;

  const setModal = (id: number | null) => {
    setSearchParams(prev => {
      if (id === null) {
        prev.delete('v');
      } else {
        prev.set('v', id.toString());
      }
      return prev;
    }, { replace: false });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setModal(null);
      }
    };
    if (modal !== null) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [modal]);

  useEffect(() => {
    const cat = searchParams.get('cat');
    setSelectedCat(cat);
  }, [searchParams]);

  const filtered = selectedCat ? liveProjects.filter(p => p.cat === selectedCat) : liveProjects;
  const sel = liveProjects.find(p => p.id === modal);

  return (
    <div className="min-h-screen">

      {/* Hero */}
      <section className="relative pt-40 pb-16 px-8 md:px-16 overflow-hidden">
        <div className="absolute right-0 top-12 font-display font-black leading-none select-none pointer-events-none opacity-[0.02]"
          style={{fontSize:'min(30vw,320px)',color:C,letterSpacing:'-0.06em'}}>WORK</div>
        <motion.p className="label-tag mb-8" initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:0.3,duration:0.8}}>
          Selected Works
        </motion.p>
        <div className="overflow-hidden mb-8">
          {['Our', 'Work.'].map((line,i)=>(
            <div key={i} className="overflow-hidden">
              <motion.div initial={{y:'110%'}} animate={{y:0}} transition={{delay:0.1+i*0.1,duration:0.8,ease}}>
                <span className="block font-display tracking-tighter leading-[1.2] pt-2 pb-2"
                  style={{fontSize:'clamp(3.5rem,10vw,9rem)',color:i===1?R:C,fontStyle:i===1?'italic':'normal',fontWeight:i===1?300:700}}>
                  {line}
                </span>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-3 mt-8">
          <button
            onClick={() => setSelectedCat(null)}
            className="px-6 py-2.5 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-300 cursor-pointer"
            style={{
              background: !selectedCat ? R : 'rgba(255,255,255,0.02)',
              color: !selectedCat ? C : 'rgba(255,255,255,0.4)',
              border: `1px solid ${!selectedCat ? R : 'rgba(255,255,255,0.1)'}`,
            }}
          >
            All
          </button>
          {CATS.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className="px-6 py-2.5 rounded-full text-xs font-mono tracking-widest uppercase transition-all duration-300 cursor-pointer"
              style={{
                background: selectedCat === cat ? R : 'rgba(255,255,255,0.02)',
                color: selectedCat === cat ? C : 'rgba(255,255,255,0.4)',
                border: `1px solid ${selectedCat === cat ? R : 'rgba(255,255,255,0.1)'}`,
              }}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Main Content */}
      <section className="px-8 md:px-16 py-16">
        <motion.div 
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                onClick={() => setModal(p.id)}
                className={`group relative cursor-pointer overflow-hidden rounded-xl border border-white/5 bg-[#010D1A] w-full aspect-video ${i % 2 !== 0 ? 'md:mt-16' : ''}`}
                style={{ background: GRADS[(i + 2) % GRADS.length] }}>
                
                {/* Video Thumbnail */}
                <motion.div className="absolute inset-0 z-0" layoutId={`video-wrap-${p.id}`}>
                  {p.thumb && (
                    <img 
                      src={p.thumb} 
                      alt={p.title}
                      className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-85 group-hover:scale-105 transition-all duration-700"
                      referrerPolicy="no-referrer"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                  )}
                  <div className="absolute inset-0 bg-[#010D1A]/40 group-hover:bg-[#010D1A]/10 transition-colors duration-500" />
                  {/* Visual representation of a video/reel */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full border border-brand-red/30 flex items-center justify-center bg-brand-red/10 md:backdrop-blur-sm group-hover:scale-110 transition-transform duration-500">
                      <Play className="w-6 h-6 ml-1" style={{ color: R }} />
                    </div>
                  </div>
                </motion.div>

                <div className="absolute inset-0 p-8 flex flex-col justify-end z-10 bg-gradient-to-t from-[#010D1A]/80 via-[#010D1A]/10 to-transparent pointer-events-none">
                  <span className="font-mono text-[9px] tracking-[0.3em] uppercase mb-2" style={{ color: R }}>{p.cat} · {p.year}</span>
                  <h3 className="font-display font-bold text-2xl md:text-3xl tracking-tight" style={{ color: C }}>{p.title}</h3>
                  <p className="mt-2 text-sm opacity-60 line-clamp-2 max-w-sm" style={{ color: C }}>{p.desc}</p>
                </div>

                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
                  style={{ background: `linear-gradient(45deg, rgba(238,44,87,0.1) 0%, transparent 60%)` }} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* SVG Liquid Filter Definition */}
      <svg className="hidden">
        <filter id="liquidHover">
          <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise">
            <animate attributeName="baseFrequency" dur="15s" values="0.015;0.02;0.015" repeatCount="indefinite" />
          </feTurbulence>
          <feDisplacementMap id="displacementMap" in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G">
            <animate attributeName="scale" values="0;0" dur="0.5s" begin="hover" fill="freeze" />
          </feDisplacementMap>
        </filter>
      </svg>

      {/* Stats Summary */}
      <section className="px-8 md:px-16 py-20 grid grid-cols-1 md:grid-cols-3 gap-12"
        style={{borderTop:`1px solid rgba(255,255,255,0.05)`,background:D}}>
        {[
          { n: '14 Reels', l: 'In Portfolio' },
          { n: '4K', l: 'Resolution' },
          { n: '1+', l: 'Years' }
        ].map((s, i) => (
          <FU key={i} delay={i * 0.1} className="text-center">
            <div className="font-display font-black text-4xl md:text-5xl mb-2" style={{ color: R }}>{s.n}</div>
            <div className="font-mono text-[9px] tracking-widest uppercase" style={{ color: `rgba(255,255,255,0.3)` }}>{s.l}</div>
          </FU>
        ))}
      </section>


      {/* Modal */}
      <AnimatePresence>
        {modal && sel && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-6"
            initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>
            <div className="absolute inset-0 cursor-pointer" style={{background:'rgba(1,13,26,0.92)'}} onClick={()=>setModal(null)}/>
            
            {/* Global close button floating outside the modal card, fixed to viewport top-right */}
            <motion.div className="relative z-10 w-full max-w-lg overflow-y-auto max-h-[95vh] rounded-2xl flex flex-col"
              style={{background:D,border:`1px solid rgba(255,255,255,0.08)`}}
              initial={{scale:0.92,y:30}} animate={{scale:1,y:0}} exit={{scale:0.92,y:20}}
              transition={{duration:0.5,ease}}>

              {/* Video section */}
              <motion.div layoutId={`video-wrap-${sel.id}`} className="relative w-full bg-[#010D1A] flex items-center justify-center flex-shrink-0"
                style={{
                  aspectRatio: sel.aspect === 'tall' ? '9/16' : '16/9',
                  maxHeight: '65vh',
                }}>
                {(() => {
                  const isDrive = sel.video.includes('drive.google.com');
                  if (isDrive && !videoErrorStates[sel.id]) {
                    const match = sel.video.match(/file\/d\/([^\/]+)/);
                    if (match && match[1]) {
                      const streamUrl = `https://drive.google.com/uc?export=download&id=${match[1]}`;
                      return (
                        <video
                          src={streamUrl}
                          className="w-full h-full object-contain bg-[#010D1A]"
                          controls
                          controlsList="nodownload"
                          autoPlay
                          playsInline
                          crossOrigin="anonymous"
                          onError={() => setVideoErrorStates(prev => ({ ...prev, [sel.id]: true }))}
                        />
                      );
                    }
                  }
                  return (
                    <iframe
                      src={sel.video}
                      className="w-full h-full object-contain bg-[#010D1A]"
                      allow="autoplay; fullscreen"
                      style={{ border: 'none' }}
                    />
                  );
                })()}

                {/* X button — inside video overlay, top-right */}
                <button
                  type="button"
                  className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-full text-white shadow-2xl transition-colors"
                  style={{background:'rgba(238,44,87,0.95)', zIndex: 10}}
                  onClick={(e) => { e.stopPropagation(); setModal(null); }}
                  aria-label="Close">
                  <X className="w-4 h-4"/>
                </button>
              </motion.div>

              {/* Text section */}
              <div className="p-5 md:p-7 flex-shrink-0">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className="font-mono text-[8px] tracking-widest uppercase mb-1 block" style={{color:R}}>{sel.cat}</span>
                    <h2 className="font-display font-bold text-xl md:text-2xl" style={{color:C}}>{sel.title}</h2>
                  </div>
                  <span className="font-mono text-xs" style={{color:`rgba(255,255,255,0.2)`}}>{sel.year}</span>
                </div>
                <p className="text-sm leading-relaxed mb-5" style={{color:`rgba(255,255,255,0.5)`}}>{sel.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {sel.tags.map(t=>(
                    <span key={t} className="px-3 py-1 font-mono text-[9px] tracking-widest uppercase"
                      style={{border:`1px solid rgba(255,255,255,0.1)`,color:`rgba(255,255,255,0.3)`}}>{t}</span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
