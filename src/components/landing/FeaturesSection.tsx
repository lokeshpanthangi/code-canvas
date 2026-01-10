import { Code2, Brain, Layers, Database, Cpu, GitBranch } from 'lucide-react';

const features = [
  {
    icon: Code2,
    title: 'Pure Python & NumPy',
    description: 'No high-level frameworks hiding the magic. Build everything using fundamental building blocks.',
  },
  {
    icon: Brain,
    title: 'Mathematical Foundations',
    description: 'Deep dive into the linear algebra, calculus, and probability that power modern AI.',
  },
  {
    icon: Layers,
    title: 'Layer by Layer',
    description: 'Understand each component: activation functions, loss landscapes, gradient descent.',
  },
  {
    icon: Database,
    title: 'Real Datasets',
    description: 'Practice with actual data. From MNIST to custom datasets for hands-on experience.',
  },
  {
    icon: Cpu,
    title: 'GPU Optimization',
    description: 'Learn to optimize your implementations for modern hardware acceleration.',
  },
  {
    icon: GitBranch,
    title: 'Production Ready',
    description: 'Best practices for deploying ML models in real-world applications.',
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Learn ML the <span className="text-primary">Right Way</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our curriculum is designed by ML engineers who believe understanding trumps abstraction.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group p-6 rounded-2xl bg-card border border-border card-hover-glow"
            >
              <div className="mb-4">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-secondary group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
              </div>
              <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
