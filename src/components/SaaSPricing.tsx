import { motion } from 'motion/react';
import { Check } from 'lucide-react';

const tiers = [
  {
    name: 'Starter',
    price: '$0',
    description: 'Perfect for exploring the power of Flux AI.',
    features: ['500 AI Requests / mo', 'Standard Models', 'Community Support', 'Basic Analytics'],
    cta: 'Get Started',
    popular: false
  },
  {
    name: 'Pro',
    price: '$49',
    description: 'For growing teams scaling their automation.',
    features: ['Unlimited AI Requests', 'All Premium Models', 'Priority Email Support', 'Advanced Analytics', 'Custom Workflows'],
    cta: 'Try Pro Free',
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    description: 'Advanced features for large organizations.',
    features: ['Dedicated Account Manager', 'SLA Guarantees', 'On-premise Deployment', 'Custom Model Training', 'Unlimited Users'],
    cta: 'Contact Sales',
    popular: false
  }
];

export default function SaaSPricing() {
  return (
    <section id="pricing" className="py-24 bg-saas-bg relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-display mb-4">Simple, transparent pricing</h2>
          <p className="text-saas-muted max-w-2xl mx-auto">
            Choose the plan that's right for your business. No hidden fees.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {tiers.map((tier, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`p-8 rounded-3xl border ${tier.popular ? 'border-saas-accent bg-saas-accent/5 relative' : 'border-white/10 glass'} flex flex-col`}
            >
              {tier.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-saas-accent text-white px-4 py-1 rounded-full text-xs font-bold">
                  MOST POPULAR
                </span>
              )}
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-2">{tier.name}</h3>
                <div className="flex items-baseline gap-1 mb-4">
                  <span className="text-4xl font-bold">{tier.price}</span>
                  {tier.price !== 'Custom' && <span className="text-saas-muted">/mo</span>}
                </div>
                <p className="text-saas-muted text-sm">{tier.description}</p>
              </div>

              <ul className="space-y-4 mb-8 flex-grow">
                {tier.features.map((feature, fIndex) => (
                  <li key={fIndex} className="flex items-center gap-3 text-sm">
                    <Check className="w-4 h-4 text-saas-accent" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>

              <button className={`w-full py-4 rounded-xl font-bold transition-all ${tier.popular ? 'bg-saas-accent hover:bg-saas-accent-dark text-white' : 'glass hover:bg-white/10 text-white'}`}>
                {tier.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
