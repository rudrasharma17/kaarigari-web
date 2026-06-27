'use client';
import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

export function LightLeakCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0);
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0);
  const velocityX = useMotionValue(0);

  // Core bright spot
  const smoothX = useSpring(mouseX, { stiffness: 150, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 150, damping: 20 });
  
  // Secondary trail (more lag)
  const trailX = useSpring(mouseX, { stiffness: 60, damping: 25 });
  const trailY = useSpring(mouseY, { stiffness: 60, damping: 25 });

  // Tertiary wide ambient lag
  const ambientX = useSpring(mouseX, { stiffness: 20, damping: 30 });
  const ambientY = useSpring(mouseY, { stiffness: 20, damping: 30 });

  // Dynamically stretch the flare based on horizontal mouse velocity
  const coreWidth = useTransform(velocityX, [-50, 0, 50], [400, 150, 400]);
  const trailWidth = useTransform(velocityX, [-50, 0, 50], [800, 400, 800]);

  useEffect(() => {
    let lastX = window.innerWidth / 2;
    let frameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      
      const vX = e.clientX - lastX;
      velocityX.set(vX);
      lastX = e.clientX;
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    
    // Decay velocity to 0 when mouse stops
    const decayVelocity = () => {
      velocityX.set(velocityX.get() * 0.9);
      frameId = requestAnimationFrame(decayVelocity);
    };
    decayVelocity();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(frameId);
    };
  }, [mouseX, mouseY, velocityX]);

  if (!isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden mix-blend-screen">
      
      {/* 3. Widest ambient horizontal glow */}
      <motion.div
        className="absolute top-0 left-0 h-[10px] bg-[#002A54]/50 rounded-[100%]"
        style={{
          x: ambientX,
          y: ambientY,
          translateX: '-50%',
          translateY: '-50%',
          width: '1200px',
          filter: 'blur(30px)'
        }}
      />

      {/* 2. Secondary wider trailing flare (classic anamorphic artifact) */}
      <motion.div
        className="absolute top-0 left-0 h-[2px] bg-[#002A54]/80 rounded-full"
        style={{
          x: trailX,
          y: trailY,
          translateX: '-50%',
          translateY: '-50%',
          width: trailWidth, 
          boxShadow: '0 0 40px 5px rgba(59, 130, 246, 0.4), 0 0 80px 10px rgba(59, 130, 246, 0.2)',
          filter: 'blur(4px)'
        }}
      />

      {/* 1. Core bright sharp flare */}
      <motion.div
        className="absolute top-0 left-0 h-[1px] bg-[#002A54] rounded-full"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
          width: coreWidth,
          boxShadow: '0 0 15px 2px rgba(255, 255, 255, 0.8), 0 0 30px 4px rgba(59, 130, 246, 0.6)',
          filter: 'blur(1px)'
        }}
      />

    </div>
  );
}
