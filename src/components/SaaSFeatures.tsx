import { motion } from 'motion/react';
import { Zap, Shield, Cpu, Globe, Layers, BarChart3 } from 'lucide-react';

const features = [
  {
    title: 'Lightning Fast',
    description: 'Our global infrastructure ensures sub-millisecond latency for all your AI requests.',
    icon: <Zap className="w-6 h-6" />,
    className: 'md:col-span-2'
  },
  {
    title: 'Enterprise Security',
    description: 'Bank-grade encryption and SOC2 compliance out of the box.',
    icon: <Shield className="w-6 h-6" />,
    className: 'md:col-span-1'
  },
  {
    title: 'Advanced AI Models',
    description: 'Access the latest LLMs and custom fine-tuned models tailored for your business.',
    icon: <Cpu className="w-6 h-6" />,
    className: 'md:col-span-1'
  },
  {
    title: 'Visual Workflow',
    description: 'Drag and drop interface to build complex automation chains without writing a single line of code.',
    icon: <Layers className="w-6 h-6" />,
    className: 'md:col-span-2'
  },
  {
    title: 'Real-time Analytics',
    description: 'Deep insights into your agent performance and user interactions.',
    icon: <BarChart3 className="w-6 h-6" />,
    className: 'md:col-span-1'
  },
  {
    title: 'Global Scale',
    description: 'Deploy your agents to 50+ regions with a single click.',
    icon: <Globe className="w-6 h-6" />,
    className: 'md:col-span-2'
  }
];


export default function SaaSFeatures() {
  return (
    <section id="features" className="py-24 bg-saas-bg relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">Built for the future of work</h2>
          <p className="text-saas-muted max-w-2xl mx-auto">
            Everything you need to build powerful AI-driven applications without the complexity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`glass p-8 rounded-3xl group hover:border-saas-accent/50 transition-all ${feature.className}`}
            >
              <div className="w-12 h-12 bg-saas-accent/10 rounded-2xl flex items-center justify-center text-saas-accent mb-6 group-hover:scale-110 transition-transform">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
              <p className="text-saas-muted leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
