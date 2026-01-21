import { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import {
  Users,
  MessageSquare,
  Github,
  ArrowUpRight,
  Heart,
  Star,
  GitFork,
  Flame,
  BookOpen,
  Code2,
  ExternalLink,
  Sparkles,
  Quote,
  Rocket,
  Zap,
  Globe,
  Play,
  Coffee,
  Twitter,
} from 'lucide-react';

// Discord icon component
const DiscordIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/>
  </svg>
);

// Activity types for the live feed
interface Activity {
  id: number;
  type: 'join' | 'star' | 'complete' | 'discuss' | 'contribute';
  user: string;
  action: string;
  time: string;
}

const liveActivities: Activity[] = [
  { id: 1, type: 'join', user: 'alex_ml', action: 'joined the community', time: 'just now' },
  { id: 2, type: 'complete', user: 'sarah_dev', action: 'completed Neural Networks module', time: '2m ago' },
  { id: 3, type: 'star', user: 'priya_k', action: 'starred the repository', time: '5m ago' },
  { id: 4, type: 'discuss', user: 'marcus_j', action: 'started a discussion on CNNs', time: '8m ago' },
  { id: 5, type: 'contribute', user: 'emma_w', action: 'opened a pull request', time: '12m ago' },
  { id: 6, type: 'join', user: 'david_ml', action: 'joined the community', time: '15m ago' },
  { id: 7, type: 'complete', user: 'lisa_ai', action: 'completed Backpropagation module', time: '18m ago' },
];

const showcaseProjects = [
  {
    id: 1,
    title: 'Handwritten Digit Classifier',
    author: 'Sarah Chen',
    description: 'Built a CNN from scratch that achieves 98.5% accuracy on MNIST',
    stars: 234,
    image: 'neural',
    tags: ['CNN', 'MNIST', 'NumPy'],
  },
  {
    id: 2,
    title: 'Sentiment Analysis Engine',
    author: 'Alex Rivera',
    description: 'LSTM-based model for analyzing movie review sentiments',
    stars: 189,
    image: 'nlp',
    tags: ['LSTM', 'NLP', 'Text'],
  },
  {
    id: 3,
    title: 'Mini GPT Implementation',
    author: 'Priya Sharma',
    description: 'A minimal transformer implementation following the GPT architecture',
    stars: 412,
    image: 'transformer',
    tags: ['Transformer', 'LLM', 'Attention'],
  },
];

const testimonials = [
  {
    id: 1,
    quote: "Finally understood backpropagation after years of treating it like a black box. This community changed everything for me.",
    author: 'Marcus Johnson',
    role: 'ML Engineer at Stripe',
    avatar: 'MJ',
  },
  {
    id: 2,
    quote: "The study groups here are incredible. Learning with others who share the same passion makes the journey so much better.",
    author: 'Emma Wilson',
    role: 'PhD Researcher',
    avatar: 'EW',
  },
  {
    id: 3,
    quote: "From zero ML knowledge to building my own neural network in 3 months. The support from this community is unmatched.",
    author: 'David Kim',
    role: 'Software Engineer',
    avatar: 'DK',
  },
];

const contributorAvatars = [
  'SC', 'AR', 'PS', 'MJ', 'EW', 'DK', 'LT', 'JW', 'NK', 'RB',
  'AM', 'CP', 'SH', 'TL', 'VG', 'WC', 'XY', 'ZA', 'BM', 'FN',
  'GK', 'HJ', 'IO', 'JP', 'KL', 'MN', 'OP', 'QR', 'ST', 'UV',
];

const Community = () => {
  const [currentActivity, setCurrentActivity] = useState(0);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  // Rotate through activities
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentActivity((prev) => (prev + 1) % liveActivities.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'join': return <Users className="w-3.5 h-3.5" />;
      case 'star': return <Star className="w-3.5 h-3.5" />;
      case 'complete': return <Rocket className="w-3.5 h-3.5" />;
      case 'discuss': return <MessageSquare className="w-3.5 h-3.5" />;
      case 'contribute': return <GitFork className="w-3.5 h-3.5" />;
      default: return <Zap className="w-3.5 h-3.5" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case 'join': return 'text-emerald-400 bg-emerald-500/10';
      case 'star': return 'text-amber-400 bg-amber-500/10';
      case 'complete': return 'text-purple-400 bg-purple-500/10';
      case 'discuss': return 'text-blue-400 bg-blue-500/10';
      case 'contribute': return 'text-rose-400 bg-rose-500/10';
      default: return 'text-foreground/70 bg-foreground/5';
    }
  };

  return (
    <div className="min-h-screen bg-background relative">
      <div className="noise-overlay" />
      <Navbar />
      
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-6">
          {/* Hero Section with Live Activity */}
          <div className="max-w-5xl mx-auto text-center mb-16">
            {/* Live Activity Ticker */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10 mb-8">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-xs text-muted-foreground">Live</span>
              </div>
              <div className="h-4 w-px bg-border" />
              <div className="flex items-center gap-2 text-sm">
                <span className={`p-1 rounded ${getActivityColor(liveActivities[currentActivity].type)}`}>
                  {getActivityIcon(liveActivities[currentActivity].type)}
                </span>
                <span className="text-foreground font-medium">{liveActivities[currentActivity].user}</span>
                <span className="text-muted-foreground">{liveActivities[currentActivity].action}</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Where ML Learners
              <br />
              <span className="bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 bg-clip-text text-transparent">
                Become Builders
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
              Join 15,000+ developers learning machine learning from first principles. 
              Ask questions, share projects, and grow together.
            </p>

            {/* Stats Row */}
            <div className="flex flex-wrap items-center justify-center gap-8 mb-10 text-sm">
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-teal-400" />
                <span className="font-semibold text-foreground">15,000+</span>
                <span className="text-muted-foreground">members</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400" />
                <span className="font-semibold text-foreground">2.8k</span>
                <span className="text-muted-foreground">GitHub stars</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-blue-400" />
                <span className="font-semibold text-foreground">120+</span>
                <span className="text-muted-foreground">countries</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a href="https://discord.gg" target="_blank" rel="noopener noreferrer">
                <Button variant="hero" size="lg" className="h-12 px-6">
                  <DiscordIcon className="w-5 h-5 mr-2" />
                  Join Discord
                </Button>
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Button variant="glass" size="lg" className="h-12 px-6">
                  <Github className="w-5 h-5 mr-2" />
                  Star on GitHub
                </Button>
              </a>
            </div>
          </div>

          {/* Connect Cards - Bento Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
            {/* Discord - Large */}
            <div className="md:col-span-2 lg:col-span-1 lg:row-span-2 group">
              <a 
                href="https://discord.gg" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block h-full p-8 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-purple-500/5 border border-indigo-500/20 hover:border-indigo-500/40 transition-all hover:shadow-lg hover:shadow-indigo-500/10"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-indigo-500/20 flex items-center justify-center">
                    <DiscordIcon className="w-7 h-7 text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-foreground">Discord</h3>
                    <div className="flex items-center gap-2">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                      <span className="text-sm text-emerald-400">1.2k online</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-6">
                  Get real-time help, join study groups, and connect with fellow learners. Our most active community hub.
                </p>

                <div className="space-y-3 mb-6">
                  {['#help-forum', '#show-your-work', '#study-buddies', '#job-board'].map((channel) => (
                    <div key={channel} className="flex items-center gap-2 text-sm">
                      <span className="text-indigo-400">#</span>
                      <span className="text-foreground/80">{channel.slice(1)}</span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center gap-2 text-indigo-400 group-hover:gap-3 transition-all">
                  <span className="text-sm font-medium">Join 8,500+ members</span>
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </a>
            </div>

            {/* GitHub */}
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group p-6 rounded-3xl bg-card/50 border border-border hover:border-foreground/20 transition-all hover:shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-foreground/10 flex items-center justify-center">
                  <Github className="w-6 h-6 text-foreground" />
                </div>
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-amber-500/10">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="text-xs text-amber-400 font-medium">2.8k</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">GitHub</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Contribute to open source implementations and help others learn.
              </p>
              <div className="flex items-center gap-4 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <GitFork className="w-3.5 h-3.5" /> 892 forks
                </span>
                <span className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" /> 156 contributors
                </span>
              </div>
            </a>

            {/* Twitter/X */}
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group p-6 rounded-3xl bg-card/50 border border-border hover:border-foreground/20 transition-all hover:shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-foreground/10 flex items-center justify-center">
                  <Twitter className="w-6 h-6 text-foreground" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Twitter / X</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Follow for ML tips, community highlights, and new content announcements.
              </p>
              <span className="text-xs text-muted-foreground">@MLCodex • 12k followers</span>
            </a>

            {/* YouTube */}
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group p-6 rounded-3xl bg-gradient-to-br from-rose-500/10 to-orange-500/5 border border-rose-500/20 hover:border-rose-500/40 transition-all hover:shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-rose-500/20 flex items-center justify-center">
                  <Play className="w-6 h-6 text-rose-400 fill-rose-400" />
                </div>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">YouTube</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Watch deep dives, live coding sessions, and community project showcases.
              </p>
              <span className="text-xs text-muted-foreground">45+ videos • 8k subscribers</span>
            </a>

            {/* Discussions */}
            <a 
              href="https://github.com/discussions" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group p-6 rounded-3xl bg-card/50 border border-border hover:border-foreground/20 transition-all hover:shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-blue-400" />
                </div>
                <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-blue-500/10">
                  <Flame className="w-3.5 h-3.5 text-orange-400" />
                  <span className="text-xs text-blue-400 font-medium">Active</span>
                </div>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Discussions</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Long-form Q&A, RFC proposals, and deep technical conversations.
              </p>
              <span className="text-xs text-muted-foreground">2.4k discussions</span>
            </a>
          </div>

          {/* Community Showcase */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-6">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foreground/5 border border-foreground/10 mb-3">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span className="text-xs text-foreground/70">Community Showcase</span>
                </div>
                <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">
                  Built by Our Community
                </h2>
              </div>
              <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
                View all projects <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {showcaseProjects.map((project) => (
                <div
                  key={project.id}
                  className="group relative rounded-2xl bg-card/50 border border-border overflow-hidden hover:border-foreground/20 transition-all cursor-pointer"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  {/* Project visual placeholder */}
                  <div className="h-40 bg-gradient-to-br from-foreground/5 to-foreground/10 relative overflow-hidden">
                    {hoveredProject === project.id && (
                      <div className="absolute inset-0 bg-foreground/5 flex items-center justify-center">
                        <Button variant="glass" size="sm">
                          <ExternalLink className="w-4 h-4 mr-1" /> View Project
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-foreground">{project.title}</h3>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                        <span>{project.stars}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{project.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-foreground/60">by {project.author}</span>
                      <div className="flex gap-1">
                        {project.tags.slice(0, 2).map((tag) => (
                          <span key={tag} className="text-[10px] px-2 py-0.5 rounded-full bg-foreground/5 text-foreground/60">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foreground/5 border border-foreground/10 mb-3">
                <Heart className="w-3.5 h-3.5 text-rose-400" />
                <span className="text-xs text-foreground/70">Community Love</span>
              </div>
              <h2 className="text-2xl lg:text-3xl font-bold tracking-tight">
                What Our Members Say
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="p-6 rounded-2xl bg-card/50 border border-border"
                >
                  <Quote className="w-8 h-8 text-foreground/10 mb-4" />
                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-teal-500/20 to-cyan-500/20 flex items-center justify-center text-sm font-medium text-foreground/70">
                      {testimonial.avatar}
                    </div>
                    <div>
                      <div className="font-medium text-foreground text-sm">{testimonial.author}</div>
                      <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contributor Wall */}
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-3">
                Built by <span className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">156+ Contributors</span>
              </h2>
              <p className="text-muted-foreground">
                Thank you to everyone who has contributed to making this possible.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 max-w-3xl mx-auto">
              {contributorAvatars.map((avatar, index) => (
                <div
                  key={index}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-foreground/10 to-foreground/5 border border-foreground/10 flex items-center justify-center text-xs font-medium text-foreground/50 hover:border-foreground/30 hover:text-foreground/70 transition-all cursor-pointer"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  {avatar}
                </div>
              ))}
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-xs font-medium text-teal-400 hover:bg-teal-500/20 transition-all cursor-pointer"
              >
                +126
              </a>
            </div>

            <div className="text-center mt-8">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <Heart className="w-4 h-4 text-rose-400" />
                Become a contributor
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Ways to Get Involved */}
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold tracking-tight mb-3">
                Ways to Get Involved
              </h2>
              <p className="text-muted-foreground">
                Everyone starts somewhere. Here's how you can contribute.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {[
                { 
                  icon: BookOpen, 
                  title: 'Improve Documentation', 
                  description: 'Help make our guides clearer and more beginner-friendly',
                  color: 'blue'
                },
                { 
                  icon: Code2, 
                  title: 'Contribute Code', 
                  description: 'Fix bugs, add features, or create new implementations',
                  color: 'emerald'
                },
                { 
                  icon: MessageSquare, 
                  title: 'Help Others', 
                  description: 'Answer questions in Discord or GitHub Discussions',
                  color: 'purple'
                },
                { 
                  icon: Coffee, 
                  title: 'Sponsor', 
                  description: 'Support the project financially to keep it free for everyone',
                  color: 'amber'
                },
              ].map((item, index) => (
                <div 
                  key={index}
                  className="group flex items-start gap-4 p-5 rounded-2xl bg-card/50 border border-border hover:border-foreground/20 transition-all cursor-pointer"
                >
                  <div className={`w-11 h-11 rounded-xl bg-${item.color}-500/10 border border-${item.color}-500/20 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                    <item.icon className={`w-5 h-5 text-${item.color}-400`} />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-1">{item.title}</h4>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Community;
