import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { 
  Sparkles, 
  ArrowUpRight, 
  Clock, 
  Users, 
  Star, 
  GitFork,
  Filter,
  Search,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Project {
  id: number;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  tags: string[];
  estimatedTime: string;
  stars: number;
  forks: number;
  contributors: number;
  image: string;
  featured?: boolean;
  color: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: 'Neural Network from Scratch',
    slug: 'neural-network',
    description: 'Build a complete neural network using only NumPy. Implement forward propagation, backpropagation, and gradient descent.',
    longDescription: 'Master the fundamentals by implementing a fully-connected neural network from the ground up. You\'ll understand every matrix multiplication and gradient calculation.',
    difficulty: 'intermediate',
    category: 'Deep Learning',
    tags: ['NumPy', 'Backpropagation', 'MLP'],
    estimatedTime: '8 hours',
    stars: 2847,
    forks: 892,
    contributors: 156,
    image: 'neural',
    featured: true,
    color: 'emerald',
  },
  {
    id: 2,
    title: 'Image Classifier CNN',
    slug: 'cnn-image-classifier',
    description: 'Create a convolutional neural network that can classify images with high accuracy.',
    longDescription: 'Learn to build and train CNNs for image recognition. Implement convolutions, pooling, and feature extraction from scratch.',
    difficulty: 'advanced',
    category: 'Computer Vision',
    tags: ['CNN', 'MNIST', 'Image Processing'],
    estimatedTime: '12 hours',
    stars: 1923,
    forks: 645,
    contributors: 89,
    image: 'vision',
    featured: true,
    color: 'purple',
  },
  {
    id: 3,
    title: 'Sentiment Analyzer',
    slug: 'sentiment-analyzer',
    description: 'Build an NLP model that can detect emotions and sentiment in text.',
    longDescription: 'Dive into natural language processing by creating a sentiment analysis system using word embeddings and recurrent networks.',
    difficulty: 'intermediate',
    category: 'NLP',
    tags: ['RNN', 'Word2Vec', 'Text Classification'],
    estimatedTime: '6 hours',
    stars: 1456,
    forks: 423,
    contributors: 67,
    image: 'nlp',
    color: 'blue',
  },
  {
    id: 4,
    title: 'Game AI Agent',
    slug: 'game-ai-agent',
    description: 'Train an AI to play games using reinforcement learning techniques.',
    longDescription: 'Implement Q-learning and policy gradients to create an intelligent agent that learns to master games through trial and error.',
    difficulty: 'advanced',
    category: 'Reinforcement Learning',
    tags: ['Q-Learning', 'Policy Gradient', 'OpenAI Gym'],
    estimatedTime: '15 hours',
    stars: 2156,
    forks: 567,
    contributors: 112,
    image: 'game',
    featured: true,
    color: 'rose',
  },
  {
    id: 5,
    title: 'Stock Price Predictor',
    slug: 'stock-predictor',
    description: 'Use time series analysis and LSTMs to forecast stock prices.',
    longDescription: 'Learn to handle sequential data and implement LSTM networks for financial predictions and time series forecasting.',
    difficulty: 'intermediate',
    category: 'Time Series',
    tags: ['LSTM', 'Time Series', 'Finance'],
    estimatedTime: '7 hours',
    stars: 1678,
    forks: 534,
    contributors: 78,
    image: 'stock',
    color: 'amber',
  },
  {
    id: 6,
    title: 'Face Recognition System',
    slug: 'face-recognition',
    description: 'Build a facial recognition system using embeddings and similarity metrics.',
    longDescription: 'Create a complete face recognition pipeline from detection to embedding extraction and identity verification.',
    difficulty: 'advanced',
    category: 'Computer Vision',
    tags: ['Face Detection', 'Embeddings', 'Siamese Networks'],
    estimatedTime: '10 hours',
    stars: 1834,
    forks: 489,
    contributors: 94,
    image: 'face',
    color: 'cyan',
  },
  {
    id: 7,
    title: 'Music Generator',
    slug: 'music-generator',
    description: 'Create an AI that composes original music using generative models.',
    longDescription: 'Explore generative AI by building a music composition system that learns patterns from existing songs.',
    difficulty: 'advanced',
    category: 'Generative AI',
    tags: ['RNN', 'MIDI', 'Sequence Generation'],
    estimatedTime: '14 hours',
    stars: 1245,
    forks: 378,
    contributors: 56,
    image: 'music',
    color: 'violet',
  },
  {
    id: 8,
    title: 'Linear Regression Engine',
    slug: 'linear-regression',
    description: 'Start with the basics - implement linear regression from first principles.',
    longDescription: 'Perfect for beginners. Understand gradient descent, loss functions, and optimization by building the simplest ML model.',
    difficulty: 'beginner',
    category: 'Fundamentals',
    tags: ['Gradient Descent', 'NumPy', 'Optimization'],
    estimatedTime: '3 hours',
    stars: 3421,
    forks: 1234,
    contributors: 234,
    image: 'linear',
    color: 'teal',
  },
];

const categories = ['All', 'Deep Learning', 'Computer Vision', 'NLP', 'Reinforcement Learning', 'Time Series', 'Generative AI', 'Fundamentals'];

const Projects = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const featuredProjects = projects.filter(p => p.featured);

  const getColorClasses = (color: string) => ({
    bg: `bg-${color}-500/10`,
    border: `border-${color}-500/20`,
    text: `text-${color}-400`,
    gradient: `from-${color}-500/20`,
  });

  const difficultyStyles = {
    beginner: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    intermediate: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
    advanced: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
  };

  return (
    <div className="min-h-screen bg-background relative">
      <div className="noise-overlay" />
      <Navbar />
      
      <main className="pt-32 lg:pt-40 pb-20">
        {/* Hero Section */}
        <section className="container mx-auto px-6 mb-20">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10 mb-8">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span className="text-sm text-foreground/70">Hands-on Learning</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
              Build{' '}
              <span className="bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 bg-clip-text text-transparent">
                Real Projects
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
              Learn by doing. Each project is designed to teach you specific ML concepts through practical implementation. No tutorials—just code.
            </p>

            {/* Search Bar */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search projects, technologies, concepts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-14 pl-12 pr-4 rounded-2xl bg-card/50 border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-foreground/30 focus:ring-2 focus:ring-foreground/10 transition-all"
              />
            </div>
          </div>
        </section>

        {/* Featured Projects - Horizontal Scroll */}
        <section className="mb-20 overflow-hidden">
          <div className="container mx-auto px-6 mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-foreground mb-2">Featured Projects</h2>
                <p className="text-muted-foreground">Our most popular hands-on experiences</p>
              </div>
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
          
          <div className="flex gap-6 px-6 overflow-x-auto pb-4 scrollbar-hide">
            {featuredProjects.map((project) => {
              return (
                <Link
                  key={project.id}
                  to={`/projects/${project.slug}`}
                  className="group relative flex-shrink-0 w-[400px] rounded-3xl bg-card/50 border border-border overflow-hidden cursor-pointer hover:border-foreground/20 hover:shadow-xl hover:shadow-foreground/5 transition-all"
                  onMouseEnter={() => setHoveredProject(project.id)}
                  onMouseLeave={() => setHoveredProject(null)}
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                    project.color === 'emerald' ? 'from-emerald-500/10' :
                    project.color === 'purple' ? 'from-purple-500/10' :
                    project.color === 'rose' ? 'from-rose-500/10' :
                    'from-teal-500/10'
                  } to-transparent`} />
                  
                  {/* Content */}
                  <div className="relative z-10 p-8">
                    <div className="flex items-start justify-end mb-6">
                      <span className={`text-xs px-3 py-1 rounded-full border font-medium ${difficultyStyles[project.difficulty]}`}>
                        {project.difficulty.charAt(0).toUpperCase() + project.difficulty.slice(1)}
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-foreground transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                      {project.longDescription}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.tags.map((tag) => (
                        <span key={tag} className="text-xs px-3 py-1 rounded-full bg-foreground/5 text-foreground/70">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Stats */}
                    <div className="flex items-center justify-between pt-6 border-t border-border/30">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <Star className="w-4 h-4" />
                          <span>{project.stars.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <GitFork className="w-4 h-4" />
                          <span>{project.forks}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4" />
                          <span>{project.estimatedTime}</span>
                        </div>
                      </div>
                      <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Category Filter */}
        <section className="container mx-auto px-6 mb-12">
          <div className="flex items-center gap-3 flex-wrap">
            <Filter className="w-4 h-4 text-muted-foreground" />
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-foreground text-background'
                    : 'bg-foreground/5 text-foreground/70 hover:bg-foreground/10 hover:text-foreground border border-transparent hover:border-foreground/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* All Projects Grid */}
        <section className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project) => {
              return (
                <Link
                  key={project.id}
                  to={`/projects/${project.slug}`}
                  className="group relative rounded-3xl bg-card/50 border border-border overflow-hidden cursor-pointer hover:border-foreground/20 hover:shadow-lg hover:shadow-foreground/5 transition-all"
                >
                  {/* Gradient Background */}
                  <div className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                    project.color === 'emerald' ? 'from-emerald-500/10' :
                    project.color === 'purple' ? 'from-purple-500/10' :
                    project.color === 'blue' ? 'from-blue-500/10' :
                    project.color === 'rose' ? 'from-rose-500/10' :
                    project.color === 'amber' ? 'from-amber-500/10' :
                    project.color === 'cyan' ? 'from-cyan-500/10' :
                    project.color === 'violet' ? 'from-violet-500/10' :
                    'from-teal-500/10'
                  } to-transparent`} />
                  
                  <div className="relative z-10 p-6">
                    {/* Header */}
                    <div className="flex items-start justify-end mb-5">
                      <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${difficultyStyles[project.difficulty]}`}>
                        {project.difficulty.charAt(0).toUpperCase() + project.difficulty.slice(1)}
                      </span>
                    </div>
                    
                    {/* Category Badge */}
                    <div className="text-xs text-muted-foreground mb-2">{project.category}</div>
                    
                    {/* Title & Description */}
                    <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-foreground transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                      {project.description}
                    </p>
                    
                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-5">
                      {project.tags.slice(0, 3).map((tag) => (
                        <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-foreground/5 text-foreground/60">
                          {tag}
                        </span>
                      ))}
                    </div>
                    
                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-border/30">
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Star className="w-3.5 h-3.5" />
                          <span>{project.stars.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{project.estimatedTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-3.5 h-3.5" />
                          <span>{project.contributors}</span>
                        </div>
                      </div>
                      <span className="flex items-center gap-1 text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                        Start
                        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          
          {filteredProjects.length === 0 && (
            <div className="text-center py-20">
              <div className="w-16 h-16 rounded-2xl bg-foreground/5 border border-foreground/10 flex items-center justify-center mx-auto mb-4">
                <Search className="w-6 h-6 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">No projects found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </section>

        {/* Bottom CTA */}
        <section className="container mx-auto px-6 mt-20">
          <div className="relative rounded-[2.5rem] border border-border bg-card/50 p-10 lg:p-16 text-center hover:shadow-xl hover:shadow-foreground/5 transition-shadow">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
                Ready to{' '}
                <span className="bg-gradient-to-r from-teal-500 to-cyan-600 bg-clip-text text-transparent">
                  Start Building?
                </span>
              </h2>
              <p className="text-muted-foreground mb-8">
                Pick a project that interests you and dive in. Each project comes with step-by-step guidance and all the resources you need.
              </p>
              <div className="flex items-center justify-center gap-4">
                <Button variant="hero" size="lg" className="h-14 px-8">
                  Explore Docs
                  <ArrowUpRight className="w-5 h-5" />
                </Button>
                <Button variant="outline" size="lg" className="h-14 px-8 border-foreground/20 hover:bg-foreground/5 hover:border-foreground/30 hover:text-foreground">
                  Join Community
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Projects;
