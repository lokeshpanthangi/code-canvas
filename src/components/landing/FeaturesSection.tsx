import {
  Code2,
  Brain,
  Layers,
  Database,
  Cpu,
  GitBranch,
  ArrowUpRight,
  Sparkles,
  Lightbulb,
  Rocket,
} from "lucide-react";

const FeaturesSection = () => {
  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-background border border-foreground/10 mb-6">
            <Sparkles className="w-4 h-4 text-emerald-text" />
            <span className="text-sm text-emerald-text">
              Why developers love us
            </span>
          </div>
          <h2 className="text-4xl  text-white lg:text-6xl font-bold tracking-tight mb-6">
            Learn ML the{" "}
            <span className="bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">
              Right Way
            </span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Our content is designed by ML engineers who believe understanding
            trumps abstraction. Build real implementations, not just copy-paste
            examples.
          </p>
        </div>

        {/* Bento Grid Layout - 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
          {/* Large Feature Card - Spans 2 columns */}
          <div className="md:col-span-2 group relative rounded-3xl bg-card/50 border border-border overflow-hidden cursor-pointer transition-all hover:border-foreground/20 hover:shadow-lg hover:shadow-foreground/5">
            <div className="relative z-10 p-8 lg:p-10 h-full flex flex-col">
              <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6">
                <Code2 className="w-8 h-8 text-emerald-400" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">
                Pure Python & NumPy
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-6 flex-1">
                No high-level frameworks hiding the magic. Build neural
                networks, optimizers, and training loops using fundamental
                building blocks. Understand every line of code.
              </p>
              <div className="flex items-center gap-2 text-sm text-foreground/70 group-hover:text-foreground transition-colors">
                <span>Explore fundamentals</span>
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Math Card */}
          <div className="group relative rounded-3xl bg-card/50 border border-border p-6 lg:p-8 cursor-pointer transition-all hover:border-foreground/20 hover:shadow-lg hover:shadow-foreground/5">
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4">
                <Brain className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Mathematical Foundations
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Deep dive into linear algebra, calculus, and probability.
              </p>
            </div>
          </div>

          {/* Layers Card */}
          <div className="group relative rounded-3xl bg-card/50 border border-border p-6 lg:p-8 cursor-pointer transition-all hover:border-foreground/20 hover:shadow-lg hover:shadow-foreground/5">
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center mb-4">
                <Layers className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Layer by Layer
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Understand activations, loss functions, and gradient descent.
              </p>
            </div>
          </div>

          {/* Dataset Card */}
          <div className="group relative rounded-3xl bg-card/50 border border-border p-6 lg:p-8 cursor-pointer transition-all hover:border-foreground/20 hover:shadow-lg hover:shadow-foreground/5">
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4">
                <Database className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Real Datasets
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Practice with MNIST, CIFAR, and custom datasets.
              </p>
            </div>
          </div>

          {/* Interactive Learning Card */}
          <div className="group relative rounded-3xl bg-card/50 border border-border p-6 lg:p-8 cursor-pointer transition-all hover:border-foreground/20 hover:shadow-lg hover:shadow-foreground/5">
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center mb-4">
                <Lightbulb className="w-5 h-5 text-yellow-400" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Interactive Learning
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Hands-on exercises with instant feedback.
              </p>
            </div>
          </div>

          {/* GPU Card */}
          <div className="group relative rounded-3xl bg-card/50 border border-border p-6 lg:p-8 cursor-pointer transition-all hover:border-foreground/20 hover:shadow-lg hover:shadow-foreground/5">
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-4">
                <Cpu className="w-5 h-5 text-rose-400" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                GPU Optimization
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Learn to optimize for modern hardware acceleration.
              </p>
            </div>
          </div>

          {/* Production Card */}
          <div className="group relative rounded-3xl bg-card/50 border border-border p-6 lg:p-8 cursor-pointer transition-all hover:border-foreground/20 hover:shadow-lg hover:shadow-foreground/5">
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4">
                <GitBranch className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Production Ready
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Best practices for deploying ML models.
              </p>
            </div>
          </div>

          {/* Projects Card */}
          <div className="group relative rounded-3xl bg-card/50 border border-border p-6 lg:p-8 cursor-pointer transition-all hover:border-foreground/20 hover:shadow-lg hover:shadow-foreground/5">
            <div className="relative z-10">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center mb-4">
                <Rocket className="w-5 h-5 text-indigo-400" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Build Projects
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Create portfolio-ready ML applications.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
