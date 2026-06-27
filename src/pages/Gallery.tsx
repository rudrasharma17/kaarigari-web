import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const B = '#010D1A';
const C = '#F8F6DA';
const R = '#EE2C57';
const BLACK = '#000000';

export default function Gallery() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cached = localStorage.getItem('driveData');
    if (cached) {
      const data = JSON.parse(cached);
      if (data.gallery) setPhotos(data.gallery);
      setLoading(false);
    }

    fetch('https://script.google.com/macros/s/AKfycbzS9kHx9Xv4GupGInr51irpXZWEmmUbTqo_CIGUvZYpEOJzvQ6U05fJcAn1SVJl8p1G/exec')
      .then(res => res.json())
      .then(data => {
        localStorage.setItem('driveData', JSON.stringify(data));
        if (data.gallery) setPhotos(data.gallery);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching gallery:", err);
        if (!cached) setLoading(false);
      });
  }, []);
  return (
    <div className="min-h-screen">
      <div className="pt-32 pb-16 px-6" style={{ background: BLACK }}>
        <div className="max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="font-display font-medium text-5xl md:text-7xl" style={{ color: C }}>
            Gallery
          </h1>
        </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
           {loading ? (
             <div className="col-span-full flex justify-center py-20 text-white/40 font-mono uppercase tracking-widest text-xs">
               Loading...
             </div>
           ) : photos.length > 0 ? (
             photos.map((photo, i) => (
               <motion.div
                 key={photo.id}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 transition={{ duration: 0.7, delay: (i % 6) * 0.1 }}
                 className="break-inside-avoid relative group rounded-xl overflow-hidden bg-white/5 border border-white/5"
               >
                 <img 
                   src={photo.image} 
                   alt="Gallery Photo" 
                   className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                   loading="lazy"
                 />
                 <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-t from-[#010D1A]/80 to-transparent pointer-events-none" />
               </motion.div>
             ))
           ) : (
             <div className="col-span-full flex justify-center py-20 text-white/40 font-mono uppercase tracking-widest text-xs">
               No photos found in Drive
             </div>
           )}
        </div>
      </div>
    </div>
  );
}
