'use client';
import { useEffect, useRef, useState, useCallback, forwardRef, useImperativeHandle } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { PORTFOLIO_ITEMS } from '../constants';

// ─── Config ───────────────────────────────────────────────────────────────────
const TOTAL_FRAMES  = 120;
const SCROLL_HEIGHT = '600vh';   // 600vh ÷ 120 frames = 5vh per frame — deliberate pacing
const BG_COLOR      = '#050505'; // must match the camera image background exactly

// ─── Component ────────────────────────────────────────────────────────────────
const CameraScroll = forwardRef(({ onCtaClick }: { onCtaClick?: () => void }, ref) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef    = useRef<HTMLCanvasElement>(null);
  const imagesRef    = useRef<HTMLImageElement[]>([]);
  const lastIdxRef   = useRef<number>(-1);
  const rafRef        = useRef<number>(0);
  // Local canvas logical dimensions (updated on resize, read in RAF loop)
  const dimRef        = useRef({ w: 0, h: 0 });

  const [loadProgress, setLoadProgress] = useState(0);
  const [isLoaded,     setIsLoaded]     = useState(false);

  // ── useScroll tied to the tall container ────────────────────────────────
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // ── Phase jump (for navbar) ──────────────────────────────────────────────
  const scrollToPhase = useCallback((i: number) => {
    if (!containerRef.current) return;
    const targets = [0, 0.25, 0.6, 0.9, 1];
    const px = (targets[i] ?? 0) * (containerRef.current.scrollHeight - window.innerHeight);
    window.scrollTo({ top: px, behavior: 'smooth' });
  }, []);

  useImperativeHandle(ref, () => ({ scrollToPhase }));

  useEffect(() => {
    const h = (e: any) => scrollToPhase(e.detail);
    window.addEventListener('scrollToPhase', h);
    return () => window.removeEventListener('scrollToPhase', h);
  }, [scrollToPhase]);

  // ── Preload all frames ───────────────────────────────────────────────────
  useEffect(() => {
    let done = 0;
    const imgs: HTMLImageElement[] = [];
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = `/Sequence/frame_${i}.webp`;
      img.onload  = () => { done++; setLoadProgress(Math.round((done / TOTAL_FRAMES) * 100)); if (done === TOTAL_FRAMES) setIsLoaded(true); };
      img.onerror = () => { done++; };
      imgs[i] = img;
    }
    imagesRef.current = imgs;
  }, []);

  // ── Canvas RAF loop (industry-standard for image-sequence scrubbing) ──────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // alpha:false → browser skips alpha compositing = ~20% faster
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Resize canvas + scale ctx ONCE (not every frame)
    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const W   = window.innerWidth;
      const H   = window.innerHeight;
      canvas.width  = W * dpr;
      canvas.height = H * dpr;
      ctx.scale(dpr, dpr);          // set once — never inside the draw loop
      dimRef.current = { w: W, h: H };
      lastIdxRef.current = -1;      // force redraw after resize
    };
    resize();
    window.addEventListener('resize', resize);

    // RAF loop — runs at 60fps max, reads scroll position each tick
    const loop = () => {
      const progress = scrollYProgress.get();
      const idx = Math.max(0, Math.min(Math.round(progress * (TOTAL_FRAMES - 1)), TOTAL_FRAMES - 1));

      // Only draw when frame changes
      if (idx !== lastIdxRef.current) {
        lastIdxRef.current = idx;
        const img = imagesRef.current[idx];

        if (img?.complete && img.naturalWidth) {
          const { w: W, h: H } = dimRef.current;

          // Opaque fill (no clearRect needed with alpha:false)
          ctx.fillStyle = BG_COLOR;
          ctx.fillRect(0, 0, W, H);

          // CONTAIN fit — whole camera visible, centred
          const iR = img.naturalWidth / img.naturalHeight;
          const sR = W / H;
          let dW: number, dH: number, dX: number, dY: number;
          if (iR > sR) { dW = W; dH = W / iR; dX = 0;            dY = (H - dH) / 2; }
          else         { dH = H; dW = H * iR; dX = (W - dW) / 2; dY = 0;            }

          ctx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight, dX, dY, dW, dH);
        }
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [scrollYProgress]);

  // ── Text beat visibility transforms ─────────────────────────────────────
  // Beat 1: 0–14%
  const b1Op = useTransform(scrollYProgress, [0, 0.04, 0.11, 0.16], [0, 1, 1, 0]);
  const b1Y  = useTransform(scrollYProgress, [0, 0.08],              [18, 0]);
  // Beat 2: 20–40%
  const b2Op = useTransform(scrollYProgress, [0.20, 0.25, 0.35, 0.42], [0, 1, 1, 0]);
  const b2Y  = useTransform(scrollYProgress, [0.20, 0.27],             [18, 0]);
  // Beat 3: 54–76%
  const b3Op = useTransform(scrollYProgress, [0.54, 0.59, 0.70, 0.77], [0, 1, 1, 0]);
  const b3Y  = useTransform(scrollYProgress, [0.54, 0.62],             [18, 0]);
  // Beat 4: 87–100%
  const b4Op = useTransform(scrollYProgress, [0.87, 0.92, 0.97, 1.00], [0, 1, 1, 0]);
  const b4Y  = useTransform(scrollYProgress, [0.87, 0.93],             [18, 0]);

  // ─────────────────────────────────────────────────────────────────────────
  return (
    <div ref={containerRef} style={{ height: SCROLL_HEIGHT }} className="relative w-full">

      {/* STICKY PANEL — everything inside is fixed to viewport */}
      <div className="sticky top-0 h-screen w-full overflow-hidden" style={{ backgroundColor: BG_COLOR }}>

        {/* Full-screen canvas — the image sequence */}
        <canvas
          ref={canvasRef}
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
        />

        {/* ═══ TEXT BEATS ═══════════════════════════════════════════════════ */}

        {/* Beat 1 — 0% — Bottom-centre — hero title */}
        <motion.div
          style={{ opacity: b1Op, y: b1Y }}
          className="absolute bottom-16 inset-x-0 flex flex-col items-center text-center pointer-events-none z-20 px-6"
        >
          <p className="text-white/30 font-mono text-[9px] tracking-[0.6em] uppercase mb-3">Est. 2026 · Cinematic Universe</p>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter text-white leading-none mb-4">
            Kaarigari<br />
            <span className="text-cinema-gold italic font-extralight">Production.</span>
          </h1>
          <p className="text-white/50 text-base sm:text-lg tracking-widest">Engineered clarity.</p>
          <div className="mt-10 flex flex-col items-center gap-3">
            <div className="w-px h-10 bg-gradient-to-b from-cinema-gold to-transparent" />
            <p className="text-cinema-gold/70 text-[9px] tracking-[0.7em] uppercase animate-pulse">Scroll to explore</p>
          </div>
        </motion.div>

        {/* Beat 2 — 25% — Left panel — philosophy */}
        <motion.div
          style={{ opacity: b2Op, y: b2Y }}
          className="absolute left-8 md:left-16 top-1/2 -translate-y-1/2 max-w-[260px] pointer-events-none z-20"
        >
          <p className="text-cinema-gold font-mono text-[9px] tracking-[0.5em] uppercase mb-5">— Philosophy</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-[0.95] mb-5">
            Built for<br />Precision.
          </h2>
          <div className="w-10 h-px bg-cinema-gold/50 mb-5" />
          <p className="text-white/45 text-sm leading-relaxed">
            Every detail, measured.<br />Every frame, a choice.
          </p>
        </motion.div>

        {/* Beat 3 — 60% — Right panel — engineering */}
        <motion.div
          style={{ opacity: b3Op, y: b3Y }}
          className="absolute right-8 md:right-16 top-1/2 -translate-y-1/2 max-w-[260px] text-right pointer-events-none z-20"
        >
          <p className="text-cinema-gold font-mono text-[9px] tracking-[0.5em] uppercase mb-5">Engineering —</p>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white leading-[0.95] mb-5">
            Layered<br />Engineering.
          </h2>
          <div className="w-10 h-px bg-cinema-gold/50 mb-5 ml-auto" />
          <p className="text-white/45 text-sm leading-relaxed">
            See what's inside.<br />Precision at every layer.
          </p>
        </motion.div>

        {/* Beat 4 — 90% — Bottom-centre — CTA */}
        <motion.div
          style={{ opacity: b4Op, y: b4Y }}
          className="absolute bottom-16 inset-x-0 flex flex-col items-center text-center pointer-events-auto z-20 px-6"
        >
          <p className="text-cinema-gold font-mono text-[9px] tracking-[0.5em] uppercase mb-5">— Start Your Story</p>
          <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-white leading-none mb-4">
            Assembled.<br />
            <span className="italic text-cinema-gold font-extralight">Ready.</span>
          </h2>
          <p className="text-white/40 text-sm mb-10 tracking-wide">Your vision. Our craft.</p>
          <button
            onClick={onCtaClick}
            className="px-12 py-4 border border-cinema-gold text-cinema-gold text-[10px] font-bold tracking-[0.45em] uppercase hover:bg-cinema-gold hover:text-black transition-colors duration-300 cursor-pointer"
          >
            Initiate Project
          </button>
        </motion.div>

        {/* ═══ LOADING SCREEN ═══════════════════════════════════════════════ */}
        <AnimatePresence>
          {!isLoaded && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="absolute inset-0 z-50 flex items-center justify-center"
              style={{ backgroundColor: BG_COLOR }}
            >
              <div className="flex flex-col items-center gap-5">
                <p className="text-cinema-gold font-mono text-[10px] tracking-[0.5em] uppercase">
                  Loading Kaarigari sequence…
                </p>
                <div className="w-48 h-px bg-white/10 relative overflow-hidden">
                  <div
                    className="absolute left-0 top-0 h-full bg-cinema-gold transition-all duration-100"
                    style={{ width: `${loadProgress}%` }}
                  />
                </div>
                <p className="text-white/25 font-mono text-[9px] tracking-widest">{loadProgress}%</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
});

CameraScroll.displayName = 'CameraScroll';
export default CameraScroll;
