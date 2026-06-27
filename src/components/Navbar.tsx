import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'motion/react';
import { NavLink, useLocation, useSearchParams } from 'react-router-dom';

const R = '#EE2C57', C = '#F8F6DA', B = '#010D1A';
const ease = [0.16, 1, 0.3, 1] as const;

const LINKS = [
  { label: 'Home',    href: '/'        },
  { label: 'Works',   href: '/works'   },
  { label: 'About',   href: '/about'   },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [open, setOpen]         = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY }             = useScroll();
  const { pathname }            = useLocation();
  const [searchParams]          = useSearchParams();
  const videoOpen               = !!searchParams.get('v');

  useEffect(() => scrollY.on('change', v => setScrolled(v > 60)), [scrollY]);
  // Close mobile menu on route change
  useEffect(() => setOpen(false), [pathname]);

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[100] px-5 sm:px-8 md:px-16 py-2 md:py-2.5 flex items-center justify-between"

        initial={{ y: -80, opacity: 0 }}
        animate={{ y: videoOpen ? -100 : 0, opacity: videoOpen ? 0 : 1 }}
        transition={{ duration: videoOpen ? 0.3 : 0.8, ease, delay: videoOpen ? 0 : 0.2 }}
        style={{
          pointerEvents: videoOpen ? 'none' : 'auto',
          background:    scrolled ? `rgba(1,13,26,0.92)` : 'transparent',
          backdropFilter:scrolled ? 'blur(20px)' : 'none',
          borderBottom:  scrolled ? `1px solid rgba(248,246,218,0.06)` : '1px solid transparent',
          transition:    'background 0.4s, backdrop-filter 0.4s, border-color 0.4s',
        }}>

        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-3 group">
          <div className="flex h-20 w-20 shrink-0 items-center justify-center">
            <img 
              src="/logo.png" 
              alt="Kaarigari Production Logo" 
              className="h-[140%] w-[140%] object-contain transition-transform duration-500 group-hover:scale-110"
            />
          </div>
          <div className="flex h-20 flex-col justify-center leading-none gap-1">
            <span className="font-display font-bold text-lg tracking-tight transition-colors duration-300"
              style={{ color: C }}>
              kaarigari
            </span>
            <span className="font-mono text-[8px] tracking-[0.5em] uppercase" style={{ color: `rgba(248,246,218,0.3)` }}>
              productions
            </span>
          </div>
        </NavLink>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-10">
          {LINKS.map(({ label, href }) => (
            <NavLink key={label} to={href}
              className={({ isActive }) =>
                `font-mono text-[10px] tracking-[0.35em] uppercase transition-colors duration-300 ${isActive ? '' : ''}`
              }
              style={({ isActive }) => ({ color: isActive ? R : `rgba(248,246,218,0.4)` })}
              onMouseEnter={e => ((e.target as any).style.color = R)}
              onMouseLeave={(e) => {
                // keep red if active
                const el = e.currentTarget as HTMLAnchorElement;
                if (!el.classList.contains('active') && el.getAttribute('aria-current') !== 'page') {
                  (e.target as any).style.color = 'rgba(248,246,218,0.4)';
                }
              }}>
              {label}
            </NavLink>
          ))}
        </div>

        {/* CTA + hamburger */}
        <div className="flex items-center gap-5">
          <NavLink to="/contact"
            className="hidden md:inline-block px-5 py-2 font-mono text-[9px] tracking-[0.4em] uppercase transition-all duration-300"
            style={{ border: `1px solid rgba(238,44,87,0.4)`, color: R, background: 'transparent' }}
            onMouseEnter={e => { (e.currentTarget as any).style.background = R; (e.currentTarget as any).style.color = C; }}
            onMouseLeave={e => { (e.currentTarget as any).style.background = 'transparent'; (e.currentTarget as any).style.color = R; }}>
            Start a Project
          </NavLink>
          <button onClick={() => setOpen(o => !o)} className="flex flex-col gap-1.5 p-1 md:hidden" aria-label="Menu">
            <span className={`block h-px w-7 transition-all duration-300 origin-center ${open ? 'rotate-45 translate-y-2.5' : ''}`} style={{ background: C }} />
            <span className={`block h-px w-5 transition-all duration-300 ${open ? 'opacity-0 translate-x-2' : ''}`} style={{ background: `rgba(248,246,218,0.5)` }} />
            <span className={`block h-px w-7 transition-all duration-300 origin-center ${open ? '-rotate-45 -translate-y-1' : ''}`} style={{ background: C }} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.5, ease }}
            className="fixed inset-0 z-[90] flex flex-col items-center justify-center gap-10"
            style={{ background: B }}>
            {LINKS.map(({ label, href }, i) => (
              <motion.div key={label}
                initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 + i * 0.07, duration: 0.5 }}>
                <NavLink to={href} onClick={() => setOpen(false)}
                  className="font-display font-bold text-5xl tracking-tight transition-colors duration-300 block"
                  style={({ isActive }) => ({ color: isActive ? R : C })}>
                  {label}
                </NavLink>
              </motion.div>
            ))}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
              <NavLink to="/contact" onClick={() => setOpen(false)}
                className="mt-6 px-10 py-4 font-mono text-[9px] tracking-[0.4em] uppercase block"
                style={{ background: R, color: C }}>
                Start a Project
              </NavLink>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
