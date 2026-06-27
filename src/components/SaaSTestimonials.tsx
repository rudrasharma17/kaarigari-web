import { motion } from 'motion/react';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CTO at TechFlow',
    content: 'Flux AI has completely transformed how our engineering team handles background tasks. We saved over 40 hours a week.',
    avatar: 'https://i.pravatar.cc/150?u=sarah'
  },
  {
    name: 'Michael Chen',
    role: 'Founder of GrowthLab',
    content: 'The most intuitive AI platform I’ve ever used. The visual workflow builder is a game-changer for non-technical founders.',
    avatar: 'https://i.pravatar.cc/150?u=michael'
  },
  {
    name: 'Elena Rodriguez',
    role: 'Product Manager at Innovate',
    content: 'Security was our biggest concern, but Flux AI passed all our audits with flying colors. Highly recommended for enterprise.',
    avatar: 'https://i.pravatar.cc/150?u=elena'
  }
];

export default function SaaSTestimonials() {
  return (
    <section id="testimonials" className="py-24 bg-saas-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">Trusted by world-class teams</h2>
          <p className="text-saas-muted max-w-2xl mx-auto">
            Join thousands of innovators who are building the future with Flux AI.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="glass p-8 rounded-3xl relative"
            >
              <div className="flex items-center gap-4 mb-6">
                <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full border border-white/10" />
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-xs text-saas-muted">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-saas-text leading-relaxed italic">"{testimonial.content}"</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
