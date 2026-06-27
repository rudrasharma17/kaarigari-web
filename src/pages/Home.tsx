import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { X } from 'lucide-react';
import { HeroSection, Intro } from '../components/HeroSection';
import { Ticker, Works, Philosophy, Process, Stats, Cta } from '../components/Sections';

const B = '#010D1A', R = '#EE2C57', C = '#FFFFFF';
const ease = [0.16, 1, 0.3, 1] as const;

export default function Home() {
  const [intro, setIntro]   = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setIntro(false), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <Intro done={!intro} />

      <HeroSection />
      <Ticker />
      <Works />
      <Philosophy />
      <Process />
      <Stats />
      <Cta />
    </div>
  );
}
