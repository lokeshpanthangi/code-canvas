import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-card via-card to-secondary border border-border p-12 lg:p-16">
          {/* Background Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-syntax-purple/10 rounded-full blur-3xl -z-10" />

          <div className="relative z-10 max-w-2xl">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Ready to Build AI from Scratch?
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Join thousands of developers who have mastered machine learning by understanding it deeply. 
              Start your journey today.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/curriculum">
                <Button variant="hero" size="lg" className="group">
                  Explore Curriculum
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Button variant="outline" size="lg">
                Read the Docs
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
