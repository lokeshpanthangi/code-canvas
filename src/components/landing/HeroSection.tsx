import { ArrowRight, BookOpen, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import CodeTerminal from "./CodeTerminal";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 lg:pt-32">
      <div className="container mx-auto px-6 relative z-10">
        {/* Centered Content Layout */}
        <div className="max-w-5xl mx-auto text-center mb-16">
          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-8">
            <span className="block text-white">Build Machine Learning</span>
            <span className="block mt-2">
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-teal-500 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  From the Metal Up
                </span>
                <span className="absolute -bottom-2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-teal-500/30 to-transparent" />
              </span>
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
            Master the math and algorithms behind AI. No black boxes, just pure
            Python and NumPy. Learn by building real implementations from
            scratch.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
            <Link to="/projects">
              <Button variant="hero" size="lg" className="h-14 px-8 text-base">
                Start Learning Free
                <ArrowRight className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/docs">
              <Button variant="glass" size="lg" className="h-14 px-8 text-base">
                <BookOpen className="w-4 h-4 mr-1" />
                Docs
              </Button>
            </Link>
          </div>
        </div>

        {/* Bento-style Preview Section */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            {/* Main Code Terminal - Spans 2 columns */}
            <div className="lg:col-span-2">
              <CodeTerminal />
            </div>

            {/* Side Cards */}
            <div className="flex flex-col gap-4 lg:gap-6">
              {/* Quick Start Card */}
              <div className="group p-6 rounded-2xl bg-card/50 border border-border hover:border-foreground/20 hover:shadow-lg hover:shadow-foreground/5 transition-all cursor-pointer hover:scale-105 transition-all duration-500 ease-out">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                    <Play className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      Quick Start
                    </h3>
                    <p className="text-xs text-muted-foreground">5 min setup</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Get started with your first neural network in minutes.
                </p>
              </div>

              {/* Community Card */}
              <Link to="/community">
                <div className="group p-6 rounded-2xl bg-card/50 border border-border hover:border-foreground/20 hover:shadow-lg hover:shadow-foreground/5 transition-all cursor-pointer hover:scale-105 transition-all duration-500 ease-out">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="flex -space-x-2">
                      {[...Array(4)].map((_, i) => (
                        <div
                          key={i}
                          className="w-8 h-8 rounded-full bg-gradient-to-br from-foreground/20 to-foreground/5 border-2 border-background flex items-center justify-center text-xs text-foreground/50"
                        >
                          {String.fromCharCode(65 + i)}
                        </div>
                      ))}
                      <div className="w-8 h-8 rounded-full bg-foreground/10 border-2 border-background flex items-center justify-center text-xs text-muted-foreground">
                        +2k
                      </div>
                    </div>
                  </div>
                  <h3 className="font-semibold text-foreground mb-1">
                    Join the Community
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    Learn together with 10k+ developers
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
    </section>
  );
};

export default HeroSection;
