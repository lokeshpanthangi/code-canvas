import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import CodeTerminal from './CodeTerminal';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16">
      {/* Background gradient */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-syntax-purple/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-border text-sm">
              <span className="w-2 h-2 rounded-full bg-syntax-green animate-pulse" />
              <span className="text-muted-foreground">v2.0 Released — Now with Transformers</span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Build Machine Learning.{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-syntax-cyan">
                From the Metal Up.
              </span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg">
              Master the math and algorithms behind AI. No black boxes, just pure Python and NumPy. 
              Learn by building real implementations from scratch.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link to="/curriculum">
                <Button variant="hero" size="lg" className="group">
                  Start Learning
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button variant="glass" size="lg">
                View on GitHub
              </Button>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-4">
              <div>
                <div className="text-2xl font-bold text-foreground">50+</div>
                <div className="text-sm text-muted-foreground">Modules</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">10K+</div>
                <div className="text-sm text-muted-foreground">Learners</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-foreground">100%</div>
                <div className="text-sm text-muted-foreground">From Scratch</div>
              </div>
            </div>
          </div>

          {/* Right Content - Code Terminal */}
          <div className="lg:pl-8">
            <CodeTerminal />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
