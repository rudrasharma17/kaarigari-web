import { Instagram, Twitter, Linkedin, Facebook, ArrowUpRight, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import { APP_NAME, NAV_LINKS } from '../constants';
import { useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

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

export default function Footer() {
  return (
    <footer className="bg-cinema-black pt-32 pb-12 px-6 border-t border-white/5" id="contact">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 mb-32">
          <div>
            <h2 className="text-7xl md:text-9xl font-display font-medium tracking-tighter uppercase text-white leading-[0.8]">
              LET'S <br />
              <span className="italic flex items-center gap-4">
                TALK
                <Wobble>
                  <Link to="/contact" className="w-12 h-12 md:w-20 md:h-20 bg-cinema-gold rounded-full flex items-center justify-center text-black group cursor-pointer hover:scale-110 transition-transform pointer-events-auto">
                    <ArrowUpRight className="w-1/2 h-1/2" />
                  </Link>
                </Wobble>
              </span>
            </h2>
            
            <div className="mt-16 flex gap-6">
              {[
                {Icon: Instagram, href: 'https://www.instagram.com/kaarigari.productions?igsh=MW82YnJpcnY0aW1rMw%3D%3D&utm_source=qr'},
                {Icon: Youtube, href: 'https://youtube.com/@kaarigari.productions?si=TND7MDmMytxE9t98'},
                {Icon: Linkedin, href: '#'},
              ].map(({Icon, href}, i) => (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer" className="w-12 h-12 border border-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all pointer-events-auto">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-12">
            <div>
              <h4 className="text-white/20 font-bold uppercase tracking-widest text-xs mb-8">Navigation</h4>
              <ul className="space-y-4">
                {NAV_LINKS.map(link => (
                  <li key={link.name}>
                    <Link to={link.href} className="text-white/40 hover:text-cinema-gold font-display font-medium uppercase text-lg transition-colors pointer-events-auto">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white/20 font-bold uppercase tracking-widest text-xs mb-8">Contact</h4>
              <ul className="space-y-6">
                <li>
                  <span className="block text-white/20 text-[10px] font-bold uppercase mb-2">Email us</span>
                  <a href="mailto:kaarigari.productions@gmail.com" className="text-white font-display font-bold text-xl hover:text-cinema-gold italic transition-colors pointer-events-auto">
                    kaarigari.productions@gmail.com
                  </a>
                </li>
                <li>
                  <span className="block text-white/20 text-[10px] font-bold uppercase mb-2">Call us</span>
                  <Wobble>
                    <p className="text-white font-display font-bold text-xl italic cursor-pointer pointer-events-auto">
                      +91 9352335417
                    </p>
                  </Wobble>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
           <Link to="/" className="flex items-center gap-3 group pointer-events-auto">
            <img src="/logo.png" alt="Logo" className="w-8 h-8 object-contain transition-transform duration-500 group-hover:scale-110" />
            <div className="flex flex-col leading-none">
              <span className="text-white font-display font-bold tracking-tight text-lg uppercase">
                kaarigari
              </span>
              <span className="text-white/20 font-mono text-[7px] tracking-[0.4em] uppercase">productions</span>
            </div>
          </Link>

          
          <div className="text-white/20 text-[10px] font-bold uppercase tracking-[0.2em]">
            © 2026 Kaarigari Production / ENGINEERING EMOTION.
          </div>
          
          <div className="flex gap-8">
            <Link to="/pages" className="text-white/20 hover:text-white text-[10px] font-bold uppercase tracking-widest pointer-events-auto">Privacy</Link>
            <Link to="/pages" className="text-white/20 hover:text-white text-[10px] font-bold uppercase tracking-widest pointer-events-auto">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

