import { Camera, Film, Layers, Monitor, Cpu, Palette, Code2, Rocket, MessageSquare, Zap, Globe, Aperture, Wind, Zap as Light } from 'lucide-react';

export const APP_NAME = "KAARIGARI";

export const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Portfolio', href: '/#portfolio' },
  { name: 'Philosophy', href: '/#philosophy' },
  { name: 'Equipment', href: '/#equipment' },
  { name: 'Inquiry', href: '/contact' },
];

export const SERVICES = [
  {
    id: 's1',
    title: 'Cinematography',
    description: 'High-end visual storytelling using state-of-the-art cinema cameras and lighting.',
    icon: <Camera className="w-8 h-8" />,
  },
  {
    id: 's2',
    title: 'Color Grading',
    description: 'Precision color science to evoke the right emotional response for your brand.',
    icon: <Palette className="w-8 h-8" />,
  },
  {
    id: 's3',
    title: 'Post-Production',
    description: 'Seamless editing, VFX, and sound design for a polished final product.',
    icon: <Layers className="w-8 h-8" />,
  },
];

export const EQUIPMENT = [
  {
    id: 'e1',
    name: 'ARRI ALEXA Mini LF',
    category: 'Camera',
    description: 'Large format sensor with natural skin tones and organic roll-off.',
    specs: ['4.5K Sensor', '14+ Stops DR', 'LPL Mount'],
    hotspot: { x: 45, y: 40 }
  },
  {
    id: 'e2',
    name: 'RED V-RAPTOR',
    category: 'Camera',
    description: 'High-speed powerhouse capable of 4K 120fps recording.',
    specs: ['4K VV', '35.4MP', '17+ Stops DR'],
    hotspot: { x: 55, y: 35 }
  },
  {
    id: 'e3',
    name: 'Cooke Anamorphic/i',
    category: 'Lenses',
    description: 'The legendary "Cooke Look" with beautiful oval bokeh.',
    specs: ['2x Squeeze', 'T2.3 Speed', 'i/Technology'],
    hotspot: { x: 50, y: 60 }
  },
  {
    id: 'e4',
    name: 'Aputure 1200d Pro',
    category: 'Lighting',
    description: 'The brightest LED light source for daylight simulation.',
    specs: ['1200W Output', 'CRI 96+', 'IP54 Weatherproof'],
    hotspot: { x: 70, y: 50 }
  },
];

export const PORTFOLIO_ITEMS = [
  {
    id: 'p1',
    title: 'Vogue & Silk',
    client: 'Vogue',
    category: 'Fashion',
    image: 'https://drive.google.com/thumbnail?id=1QBMkS4Va10qjvQNaOTFjhUo6lgZNrYNo&sz=w400',
    aspect: 'aspect-[9/16]',
  },
  {
    id: 'p2',
    title: 'MaxFit Event Highlights',
    client: 'MaxFit',
    category: 'Event',
    image: 'https://drive.google.com/thumbnail?id=17l_-BhjAhBNzQZz-zmuyDO4TesStvEB_&sz=w400',
    aspect: 'aspect-video',
  },
  {
    id: 'p3',
    title: 'Bosch Jaipur Document',
    client: 'Bosch',
    category: 'Long Format',
    image: 'https://drive.google.com/thumbnail?id=1MEqEFMN-ymX26H-8mrociNVQjOoMgYHI&sz=w400',
    aspect: 'aspect-video',
  },
  {
    id: 'p4',
    title: 'Dhaba - Culinary Heritage',
    client: 'Dhaba',
    category: 'Restaurant',
    image: 'https://drive.google.com/thumbnail?id=1bAg20z7RNbOw0pgjQdIHupHchP52W3QK&sz=w400',
    aspect: 'aspect-[9/16]',
  },
];

export const CASE_STUDIES = [
  {
    id: '1',
    title: 'MaxFit - Power & Pace',
    client: 'Gym',
    description: 'High energy fitness training session.',
    image: 'https://drive.google.com/thumbnail?id=1NVgnsZL_B9kkZNBRhUb0w671n_Qbb0v0&sz=w400',
    number: '01',
  },
  {
    id: '2',
    title: 'Dhaba V - Modern Tastes',
    client: 'Restaurant',
    description: 'Bridging generational recipes with modern presentation.',
    image: 'https://drive.google.com/thumbnail?id=1SBLv6dmYTMZS5NFd3-Pir4fTRrFGe7Vr&sz=w400',
    number: '02',
  },
  {
    id: '3',
    title: 'Filmistaan Narrative',
    client: 'Long Format',
    description: 'A celebration of cinematic art and classic storytelling.',
    image: 'https://drive.google.com/thumbnail?id=17KldGa3f7AO6Nn0YnQfHKw_9JU6hTbp9&sz=w400',
    number: '03',
  },
];

export const PROCESS_STEPS = [
  {
    id: '01',
    title: 'Pre-Production',
    description: 'Storyboarding, location scouting, and meticulous planning.',
    icon: <Monitor className="w-6 h-6" />,
  },
  {
    id: '02',
    title: 'Production',
    description: 'Executing the vision with precision on set.',
    icon: <Camera className="w-6 h-6" />,
  },
  {
    id: '03',
    title: 'Edit & Grade',
    description: 'Crafting the narrative and visual tone in post.',
    icon: <Palette className="w-6 h-6" />,
  },
  {
    id: '04',
    title: 'Delivery',
    description: 'High-quality final masters in all required formats.',
    icon: <Rocket className="w-6 h-6" />,
  },
];

export const TEAM = [
  {
    name: 'Aryan Kashyap',
    role: 'Director / DP',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop',
  },
  {
    name: 'Sarah Chen',
    role: 'Colorist',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=400&auto=format&fit=crop',
  },
  {
    name: 'Marcus Thorne',
    role: 'Editor',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&auto=format&fit=crop',
  },
];

export const ARTICLES: any[] = [];

