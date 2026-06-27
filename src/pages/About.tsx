import { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { CharReveal } from '../components/HeroSection';

const R = '#EE2C57', N = '#010D1A', C = '#F8F6DA', D = '#010D1A', BLACK = '#000000';
const ease = [0.16, 1, 0.3, 1] as const;

function FU({ children, delay = 0, className = '' }: any) {
  return (
    <motion.div className={className}
      initial={{ opacity: 0, y: 48 }} 
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay, duration: 0.9, ease }}>
      {children}
    </motion.div>
  );
}

const TEAM = [
  { name: 'Rudra Sharma', role: 'Founder & Director', img: 'https://drive.google.com/thumbnail?id=1WryLSXYx3oNAQAvdkUD3GJZX3PpgG1cG&sz=w400', bio: 'Expresses storytelling through edits.' },
  { name: 'Sachetam Singh Bhati', role: 'Co-Founder & Cinematographer', img: 'https://drive.google.com/thumbnail?id=1L0VC_NhAJwHvQmroFU8YygwUVp8Ynh0u&sz=w400', bio: 'Idea -> Art -> Kaarigari' },
  { name: 'Prince Sharma', role: 'Co-Founder & Cinematographer', img: 'https://drive.google.com/thumbnail?id=1WWWTUevtOr8rT6ittNx4rchXNkmYvb_8&sz=w400', bio: 'Capture moments and creates art. Speaks through camera.' },
  { name: 'Garv Dana', role: 'Director Of Operation', img: 'https://drive.google.com/thumbnail?id=1hlcBcsG0mFbID8zUCWGP6l3_c1rj7COU&sz=w400', bio: 'Kaarigar that manages the Operations.' },
  { name: 'Harshita Rathore', role: 'Marketing Head', img: 'https://drive.google.com/thumbnail?id=1RQq0NMz2podAsupky-b3RbPSKpO2WPNN&sz=w400', bio: 'Kaarigar that makes your brand grow' },
];

const VALUES = [
  { n: '01', t: 'Intentionality', d: 'We reject mediocrity. Every decision, from lens choice to cut point, serves the story.' },
  { n: '02', t: 'Collaboration',  d: 'Great work emerges when client vision meets creative expertise without ego.' },
  { n: '03', t: 'Craft',          d: 'We obsess over the invisible details most audiences never consciously notice — but feel.' },
  { n: '04', t: 'Honesty',        d: "We tell you what your project needs, not what you want to hear." },
];

const AWARDS = [
  { title: 'Best Brand Film', org: 'Kyoorius Awards', year: '2023' },
  { title: 'Gold — Corporate Video', org: 'ABBY Awards', year: '2023' },
  { title: 'Best Cinematography', org: 'OTT Play Awards', year: '2022' },
  { title: 'Excellence in Craft', org: 'FICCI Frames', year: '2022' },
  { title: 'Best Director', org: 'WOW Awards', year: '2021' },
  { title: 'Gold — Short Film', org: 'IAMAI Digital', year: '2021' },
];

export default function About() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const y    = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);
  const fade = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const [liveTeam, setLiveTeam] = useState(TEAM);

  useEffect(() => {
    const updateTeamWithPhotos = (aboutFiles: any[]) => {
      const newTeam = TEAM.map(member => {
        const firstName = member.name.split(' ')[0].toLowerCase();
        const matchedFile = aboutFiles.find((f: any) => f.name.toLowerCase().includes(firstName));
        if (matchedFile) {
          return { ...member, img: matchedFile.image };
        }
        return member;
      });
      setLiveTeam(newTeam);
    };

    const cached = localStorage.getItem('driveData');
    if (cached) {
      try {
        const data = JSON.parse(cached);
        if (data.about) updateTeamWithPhotos(data.about);
      } catch (e) {}
    }

    fetch('https://script.google.com/macros/s/AKfycbzS9kHx9Xv4GupGInr51irpXZWEmmUbTqo_CIGUvZYpEOJzvQ6U05fJcAn1SVJl8p1G/exec')
      .then(res => res.json())
      .then(data => {
        localStorage.setItem('driveData', JSON.stringify(data));
        if (data.about) updateTeamWithPhotos(data.about);
      })
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative min-h-[80vh] flex flex-col justify-end overflow-hidden pt-32">
        {/* Grid lines */}
        <div className="absolute inset-0 z-0 opacity-10" style={{
          backgroundImage: `linear-gradient(rgba(248,246,218,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(248,246,218,0.08) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }} />
        <motion.div style={{ y, opacity: fade }} className="relative z-10 px-8 md:px-16 pb-20">
          <motion.p className="label-tag mb-8" initial={{ opacity:0, x:-20 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.3, duration:0.8 }}>
            Who We Are
          </motion.p>
          {['Expressing art', 'through', 'kaarigari.'].map((line, i) => (
            <div key={i} className="overflow-hidden flex flex-wrap">
              <CharReveal text={line} delay={0.4 + i * 0.14} 
                className="block font-display font-bold tracking-tighter leading-[1] pt-2 pb-4"
                style={{ fontSize:'clamp(3rem,8vw,8rem)', color: i === 1 ? R : C, fontStyle: i === 1 ? 'italic' : 'normal', fontWeight: i === 1 ? 300 : 700 }} />
            </div>
          ))}
          <motion.p initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.9, duration:0.8 }}
            className="mt-8 text-lg max-w-xl leading-relaxed" style={{ color:`rgba(255,255,255,0.55)` }}>
            Founded in jaipur in 2025, with the vision to craft art.
          </motion.p>
        </motion.div>
        {/* Bottom border */}
        <motion.div className="absolute bottom-0 left-0 right-0 h-px"
          style={{ background: `linear-gradient(90deg, ${R}, transparent)`, scaleX: 0, transformOrigin:'left' }}
          animate={{ scaleX:1 }} transition={{ delay:1.2, duration:1.5, ease }} />
      </section>

      {/* ── Team ── */}
      <section className="px-6 md:px-16 py-28" style={{ borderTop:`1px solid rgba(248,246,218,0.05)` }}>
        <FU className="mb-20 max-w-2xl">
          <p className="font-mono text-[10px] tracking-widest uppercase mb-6" style={{ color:R }}>The People</p>
          <h2 className="font-display font-bold text-5xl md:text-7xl tracking-tighter leading-[0.9]" style={{ color:C }}>Behind the lens.</h2>
        </FU>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-x-4 lg:gap-x-6 gap-y-20 justify-center">
          {liveTeam.map((m: any, i: number) => (
            <FU key={i} delay={i * 0.1} className={`w-full ${i % 2 !== 0 ? 'md:mt-12' : ''}`}>
              <div className="group cursor-default relative">
                {/* Avatar */}
                <div className="relative overflow-hidden mb-6 aspect-[3/4] md:aspect-[4/5] rounded-none bg-neutral-900"
                  style={{ border: `1px solid rgba(255,255,255,0.05)` }}>
                  {m.img ? (
                    <img src={m.img} alt={m.name} fetchPriority="high" loading="eager" className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center transition-transform duration-700 ease-out group-hover:scale-105 bg-neutral-900">
                      <span className="font-display font-bold text-6xl text-white/10">
                        {m.name.split(' ').map((w: string)=>w[0]).join('')}
                      </span>
                    </div>
                  )}
                  {/* Subtle vignette overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="font-mono text-[9px] tracking-widest uppercase" style={{ color:R }}>{m.role}</div>
                  <h3 className="font-display font-bold text-2xl tracking-tight" style={{ color:C }}>{m.name}</h3>
                  <p className="text-sm leading-relaxed text-white/50 mt-2">{m.bio}</p>
                </div>
              </div>
            </FU>
          ))}
        </div>
      </section>

      {/* ── Mission ── */}
      <section className="px-8 md:px-16 py-28 grid md:grid-cols-2 gap-16 md:gap-24" style={{ borderTop:`1px solid rgba(248,246,218,0.05)` }}>
        <FU>
          <p className="label-tag mb-6">Our Mission</p>
          <h2 className="font-display font-bold text-4xl md:text-5xl tracking-tight leading-tight" style={{ color:C }}>
            We exist to make brands impossible to ignore.
          </h2>
          {/* Consistent Stats for About page */}
          <div className="flex flex-wrap items-center gap-10 mt-12">
              <div className="text-left">
                <div className="font-display font-bold text-4xl" style={{ color: R }}>40+</div>
                <div className="font-mono text-[9px] tracking-widest uppercase mt-1" style={{ color: `rgba(255,255,255,0.3)` }}>Projects</div>
              </div>
              <div className="text-left">
                <div className="font-display font-bold text-4xl" style={{ color: R }}>4K</div>
                <div className="font-mono text-[9px] tracking-widest uppercase mt-1" style={{ color: `rgba(255,255,255,0.3)` }}>Resolution</div>
              </div>
              <div className="text-left">
                <div className="font-display font-bold text-4xl" style={{ color: R }}>1+</div>
                <div className="font-mono text-[9px] tracking-widest uppercase mt-1" style={{ color: `rgba(255,255,255,0.3)` }}>Years</div>
              </div>
            </div>
        </FU>
        <FU delay={0.15} className="flex flex-col justify-center gap-6">

          <p className="text-base md:text-lg leading-relaxed" style={{ color:`rgba(255,255,255,0.55)` }}>
            Every brand has a story worth telling. Most agencies tell it safely. We tell it cinematically — with the same craft and intention that goes into a feature film.
          </p>
          <p className="text-base md:text-lg leading-relaxed" style={{ color:`rgba(255,255,255,0.45)` }}>
            From a 30-second social ad to a 10-minute brand documentary, we bring the full weight of our craft to bear on every frame.
          </p>
          <div className="flex items-center gap-3 mt-2">
            <span className="w-8 h-px" style={{ background:R }} />
            <span className="font-mono text-[10px] tracking-widest uppercase" style={{ color:`rgba(255,255,255,0.3)` }}>Est. 2025, Jaipur</span>
          </div>
        </FU>
      </section>

      {/* ── Values ── */}
      <section className="px-8 md:px-16 py-24" style={{ borderTop:`1px solid rgba(248,246,218,0.05)` }}>
        <FU className="mb-14">
          <p className="label-tag mb-4">What We Stand For</p>
          <h2 className="font-display font-bold text-4xl md:text-6xl tracking-tight" style={{ color:C }}>Our Values.</h2>
        </FU>
        <div className="grid md:grid-cols-2 gap-px" style={{ background:`rgba(255,255,255,0.05)` }}>
          {VALUES.map((v, i) => (
            <FU key={i} delay={i * 0.08}
              className="p-10 group transition-all duration-500 cursor-default"
              style={{ background: `rgba(248,246,218,0.02)` }}
              >
              <div className="font-display font-bold text-5xl mb-6" style={{ color:`rgba(238,44,87,0.18)` }}>{v.n}</div>
              <h3 className="font-display font-bold text-2xl mb-4" style={{ color:C }}>{v.t}</h3>
              <p className="text-sm leading-relaxed" style={{ color:`rgba(255,255,255,0.45)` }}>{v.d}</p>
            </FU>
          ))}
        </div>
      </section>




      {/* ── CTA strip ── */}
      <section className="px-8 md:px-16 py-20 flex flex-col md:flex-row items-center justify-between gap-8" style={{ borderTop:`1px solid rgba(248,246,218,0.05)` }}>
        <FU>
          <h2 className="font-display font-bold text-3xl md:text-5xl tracking-tight" style={{ color:C }}>
            Ready to work<br /><span style={{ color:R, fontStyle:'italic', fontWeight:300 }}>together?</span>
          </h2>
        </FU>
        <FU delay={0.15} className="flex gap-4">
          <a href="/contact"
            className="px-10 py-4 font-bold text-[10px] tracking-[0.4em] uppercase transition-all duration-300"
            style={{ background:R, color:C }}>
            Start a Project
          </a>
          <a href="/works"
            className="px-10 py-4 font-mono text-[10px] tracking-[0.4em] uppercase transition-all duration-300 flex items-center gap-2"
            style={{ border:`1px solid rgba(255,255,255,0.15)`, color:`rgba(255,255,255,0.5)` }}>
            View Our Work <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </FU>
      </section>
    </div>
  );
}
