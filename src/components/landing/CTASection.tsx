import { ArrowRight, Zap, Github, Star, BookOpen, Users, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section className="py-32 relative">
      <div className="container mx-auto px-6 relative z-10">
        {/* Main CTA Card */}
        <div className="relative rounded-[2.5rem] border border-border bg-card/50 shadow-xl shadow-foreground/5 hover:shadow-2xl hover:shadow-foreground/10 transition-shadow">
          <div className="relative p-10 lg:p-16">
            {/* Top row - Stats/Trust */}
            <div className="flex flex-wrap items-center gap-6 mb-12 pb-8 border-b border-border/30">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-foreground/5 border border-foreground/10 hover:bg-foreground/10 hover:border-foreground/20 transition-colors"
              >
                <Github className="w-5 h-5" />
                <span className="font-medium">Star on GitHub</span>
                <div className="flex items-center gap-1 pl-3 border-l border-foreground/10">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-sm">2.8k</span>
                </div>
              </a>
              
              <div className="flex items-center gap-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>15k+ Learners</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>50+ Modules</span>
                </div>
                <div className="flex items-center gap-2">
                  <Rocket className="w-4 h-4" />
                  <span>Open Source</span>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-6">
                  <Zap className="w-4 h-4 text-emerald-400" />
                  <span className="text-sm text-emerald-400 font-medium">100% Free Forever</span>
                </div>

                <h2 className="text-4xl lg:text-6xl font-bold tracking-tight mb-6">
                  Start Building{' '}
                  <span className="bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">Today</span>
                </h2>
                
                <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                  Join thousands of developers who have mastered machine learning by understanding it from the ground up. No prerequisites needed.
                </p>

                <div className="flex flex-wrap gap-4">
                  <Link to="/docs">
                    <Button variant="hero" size="lg" className="h-14 px-8 text-base">
                      Explore Docs
                      <ArrowRight className="w-5 h-5" />
                    </Button>
                  </Link>
                  <Button variant="outline" size="lg" className="h-14 px-8 text-base border-foreground/20 hover:bg-foreground/5 hover:border-foreground/30 hover:text-foreground">
                    View on GitHub
                    <Github className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>

              {/* Right side - Quick Start Card */}
              <div className="relative">
                <div className="relative rounded-3xl bg-card/80 border border-border p-8 hover:shadow-lg hover:shadow-foreground/5 transition-shadow">
                  <h3 className="text-xl font-semibold mb-6">Quick Start Guide</h3>
                  
                  <div className="space-y-4">
                    {[
                      { step: '01', title: 'Choose Your Path', desc: 'Start with fundamentals or jump to advanced topics' },
                      { step: '02', title: 'Learn by Building', desc: 'Implement algorithms from scratch with NumPy' },
                      { step: '03', title: 'Practice & Iterate', desc: 'Complete exercises and build real projects' },
                    ].map((item) => (
                      <div key={item.step} className="flex gap-4 p-4 rounded-xl bg-foreground/5 border border-foreground/5 hover:border-foreground/10 transition-colors">
                        <div className="text-2xl font-bold text-foreground/20">{item.step}</div>
                        <div>
                          <h4 className="font-medium text-foreground">{item.title}</h4>
                          <p className="text-sm text-muted-foreground">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-border/30 flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Ready in 5 minutes</span>
                    <Link to="/docs" className="text-sm font-medium text-foreground hover:underline underline-offset-4">
                      Get Started →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
