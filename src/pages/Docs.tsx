import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { 
  Binary, 
  Calculator, 
  TrendingUp, 
  Network, 
  Layers, 
  Eye, 
  MessageSquare, 
  Zap,
  GitBranch,
  Box,
  Cpu,
  BarChart3,
  BookOpen,
  Search,
  Grid3X3,
  List,
  Clock,
  ArrowRight,
  Sparkles,
  GraduationCap,
  Trophy,
  ChevronRight,
  Play,
  Star,
  Users,
  LucideIcon
} from 'lucide-react';

interface Module {
  id: number;
  slug?: string;
  icon: LucideIcon;
  title: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  codePreview: string[];
  estimatedTime: string;
  section: string;
  lessons?: number;
  completed?: number;
}

const modules: Module[] = [
  {
    id: 1,
    icon: Calculator,
    title: 'Linear Algebra Essentials',
    description: 'Master vectors, matrices, and transformations that form the backbone of ML computations.',
    difficulty: 'beginner',
    codePreview: ['class Matrix:', 'def dot_product(self, other):', '    # Compute matrix multiplication'],
    estimatedTime: '3 hours',
    section: 'foundations',
    lessons: 8,
    completed: 0,
  },
  {
    id: 2,
    icon: TrendingUp,
    title: 'Linear Regression',
    description: 'Build your first ML model from scratch. Understand gradient descent and optimization.',
    difficulty: 'beginner',
    codePreview: ['class LinearRegression:', 'def fit(self, X, y):', '    # Minimize loss function'],
    estimatedTime: '2 hours',
    section: 'foundations',
    lessons: 6,
    completed: 0,
  },
  {
    id: 3,
    icon: Binary,
    title: 'Logistic Regression',
    description: 'Learn classification with the sigmoid function and cross-entropy loss.',
    difficulty: 'beginner',
    codePreview: ['class LogisticRegression:', 'def sigmoid(self, z):', '    # Apply activation'],
    estimatedTime: '2.5 hours',
    section: 'foundations',
    lessons: 7,
    completed: 0,
  },
  {
    id: 4,
    icon: Network,
    title: 'Neural Networks',
    description: 'Build a multi-layer perceptron from scratch using NumPy matrices.',
    difficulty: 'intermediate',
    codePreview: ['class NeuralNetwork:', 'def forward(self, X):', '    # Propagate through layers'],
    estimatedTime: '4 hours',
    section: 'neural-networks',
    lessons: 12,
    completed: 0,
  },
  {
    id: 5,
    icon: Layers,
    title: 'Backpropagation',
    description: 'Implement the chain rule to compute gradients through your network.',
    difficulty: 'intermediate',
    codePreview: ['class BackProp:', 'def backward(self, loss):', '    # Chain rule magic'],
    estimatedTime: '3.5 hours',
    section: 'neural-networks',
    lessons: 10,
    completed: 0,
  },
  {
    id: 6,
    icon: Zap,
    title: 'Activation Functions',
    description: 'ReLU, Sigmoid, Tanh, and more. Understand when and why to use each.',
    difficulty: 'intermediate',
    codePreview: ['class Activations:', 'def relu(self, x):', '    # Max(0, x)'],
    estimatedTime: '1.5 hours',
    section: 'neural-networks',
    lessons: 5,
    completed: 0,
  },
  {
    id: 7,
    icon: Eye,
    title: 'Convolutional Networks',
    description: 'Build CNNs for image recognition. Learn convolutions, pooling, and feature maps.',
    difficulty: 'advanced',
    codePreview: ['class Conv2D:', 'def convolve(self, input, kernel):', '    # Slide kernel over input'],
    estimatedTime: '5 hours',
    section: 'deep-learning',
    lessons: 15,
    completed: 0,
  },
  {
    id: 8,
    icon: MessageSquare,
    title: 'Recurrent Networks',
    description: 'Sequence modeling with RNNs and LSTMs. Capture temporal dependencies.',
    difficulty: 'advanced',
    codePreview: ['class LSTM:', 'def step(self, x, h_prev, c_prev):', '    # Update cell state'],
    estimatedTime: '4 hours',
    section: 'deep-learning',
    lessons: 12,
    completed: 0,
  },
  {
    id: 9,
    icon: GitBranch,
    title: 'Attention Mechanism',
    description: 'The foundation of transformers. Learn self-attention and multi-head attention.',
    difficulty: 'advanced',
    codePreview: ['class Attention:', 'def scaled_dot_product(self, Q, K, V):', '    # Compute attention scores'],
    estimatedTime: '4 hours',
    section: 'advanced',
    lessons: 11,
    completed: 0,
  },
  {
    id: 10,
    icon: Box,
    title: 'Transformers',
    description: 'Build the architecture that powers modern LLMs from the ground up.',
    difficulty: 'advanced',
    codePreview: ['class Transformer:', 'def encode(self, src):', '    # Multi-head self-attention'],
    estimatedTime: '6 hours',
    section: 'advanced',
    lessons: 18,
    completed: 0,
  },
  {
    id: 11,
    icon: Cpu,
    title: 'GPU Optimization',
    description: 'Learn to optimize your implementations for modern hardware acceleration.',
    difficulty: 'advanced',
    codePreview: ['class CUDAKernel:', 'def parallel_matmul(self, A, B):', '    # Tiled matrix multiply'],
    estimatedTime: '4 hours',
    section: 'advanced',
    lessons: 9,
    completed: 0,
  },
  {
    id: 12,
    slug: 'model-deployment',
    icon: BarChart3,
    title: 'Model Deployment',
    description: 'Take your models to production with proper serving infrastructure.',
    difficulty: 'intermediate',
    codePreview: ['class ModelServer:', 'def predict(self, request):', '    # Batch inference'],
    estimatedTime: '3 hours',
    section: 'projects',
    lessons: 8,
    completed: 0,
  },
];

const sections = [
  { id: 'all', label: 'All Modules', icon: Grid3X3, count: modules.length },
  { id: 'foundations', label: 'Foundations', icon: BookOpen, count: modules.filter(m => m.section === 'foundations').length },
  { id: 'neural-networks', label: 'Neural Networks', icon: Network, count: modules.filter(m => m.section === 'neural-networks').length },
  { id: 'deep-learning', label: 'Deep Learning', icon: Layers, count: modules.filter(m => m.section === 'deep-learning').length },
  { id: 'advanced', label: 'Advanced', icon: Sparkles, count: modules.filter(m => m.section === 'advanced').length },
  { id: 'projects', label: 'Projects', icon: Trophy, count: modules.filter(m => m.section === 'projects').length },
];

const difficultyConfig = {
  beginner: { 
    label: 'Beginner', 
    color: 'emerald',
    bgClass: 'bg-emerald-500/10',
    textClass: 'text-emerald-400',
    borderClass: 'border-emerald-500/20',
    glowClass: 'shadow-emerald-500/20',
    gradient: 'from-emerald-500/10 via-transparent to-transparent',
    // Hover variants for Tailwind JIT
    hoverBg: 'group-hover:bg-emerald-500/10',
    hoverText: 'group-hover:text-emerald-400',
    hoverBorder: 'group-hover:border-emerald-500/20',
  },
  intermediate: { 
    label: 'Intermediate', 
    color: 'amber',
    bgClass: 'bg-amber-500/10',
    textClass: 'text-amber-400',
    borderClass: 'border-amber-500/20',
    glowClass: 'shadow-amber-500/20',
    gradient: 'from-amber-500/10 via-transparent to-transparent',
    hoverBg: 'group-hover:bg-amber-500/10',
    hoverText: 'group-hover:text-amber-400',
    hoverBorder: 'group-hover:border-amber-500/20',
  },
  advanced: { 
    label: 'Advanced', 
    color: 'purple',
    bgClass: 'bg-purple-500/10',
    textClass: 'text-purple-400',
    borderClass: 'border-purple-500/20',
    glowClass: 'shadow-purple-500/20',
    gradient: 'from-purple-500/10 via-transparent to-transparent',
    hoverBg: 'group-hover:bg-purple-500/10',
    hoverText: 'group-hover:text-purple-400',
    hoverBorder: 'group-hover:border-purple-500/20',
  },
};

// Modern Module Card Component
const ModuleCard = ({ module, index, viewMode }: { module: Module; index: number; viewMode: 'grid' | 'list' }) => {
  const Icon = module.icon;
  const config = difficultyConfig[module.difficulty];

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: index * 0.05 }}
      >
        <Link to={`/docs/${module.slug || module.id}`}>
          <div className="group relative rounded-2xl bg-card/50 border border-border overflow-hidden cursor-pointer transition-all duration-300 hover:border-foreground/20 hover:shadow-lg hover:shadow-foreground/5">
            {/* Subtle gradient overlay - only on hover */}
            <div className={`absolute inset-0 bg-gradient-to-r ${config.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            
            <div className="relative z-10 p-5 flex items-center gap-5">
              {/* Icon - neutral by default, colored on hover */}
              <div className={`relative w-14 h-14 rounded-2xl bg-foreground/5 border border-foreground/10 flex items-center justify-center shrink-0 ${config.hoverBg} ${config.hoverBorder} group-hover:shadow-lg transition-all duration-300`}>
                <Icon className={`w-6 h-6 text-muted-foreground ${config.hoverText} transition-colors duration-300`} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-1.5">
                  <h3 className={`text-base font-semibold text-foreground truncate ${config.hoverText} transition-colors`}>{module.title}</h3>
                  <span className={`text-[10px] px-2.5 py-1 rounded-full bg-foreground/5 text-foreground/70 border border-foreground/10 font-medium uppercase tracking-wider shrink-0 ${config.hoverBg} ${config.hoverText} ${config.hoverBorder} transition-colors duration-300`}>
                    {config.label}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-1">{module.description}</p>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-5 shrink-0">
                <div className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground">
                  <BookOpen className="w-4 h-4" />
                  <span>{module.lessons} lessons</span>
                </div>
                <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>{module.estimatedTime}</span>
                </div>
                <div className={`w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center ${config.hoverBg} transition-colors duration-300`}>
                  <ChevronRight className={`w-4 h-4 text-muted-foreground ${config.hoverText} transition-colors duration-300`} />
                </div>
              </div>
            </div>
          </div>
        </Link>
      </motion.div>
    );
  }

  // Grid View
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Link to={`/docs/${module.slug || module.id}`}>
        <div className="group relative h-full rounded-3xl bg-card/50 border border-border overflow-hidden cursor-pointer transition-all duration-500 hover:border-foreground/20 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl hover:shadow-foreground/5">
          {/* Animated gradient background - only on hover */}
          <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
          
          {/* Glow effect - only on hover */}
          <div className={`absolute -inset-px rounded-3xl bg-gradient-to-b ${config.gradient} opacity-0 group-hover:opacity-50 transition-opacity duration-500 blur-xl`} />
          
          <div className="relative z-10 p-7 flex flex-col h-full">
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              {/* Icon - neutral by default, colored on hover */}
              <div className={`relative w-16 h-16 rounded-2xl bg-foreground/5 border border-foreground/10 flex items-center justify-center ${config.hoverBg} ${config.hoverBorder} group-hover:shadow-lg transition-all duration-300`}>
                <Icon className={`w-7 h-7 text-muted-foreground ${config.hoverText} transition-colors duration-300`} />
              </div>
              {/* Badge - neutral by default, colored on hover */}
              <span className={`text-[10px] px-3 py-1.5 rounded-full bg-foreground/5 text-foreground/70 border border-foreground/10 font-semibold uppercase tracking-wider ${config.hoverBg} ${config.hoverText} ${config.hoverBorder} transition-colors duration-300`}>
                {config.label}
              </span>
            </div>

            {/* Content - title highlights in difficulty color on hover */}
            <h3 className={`text-xl font-bold text-foreground mb-3 ${config.hoverText} transition-colors duration-300`}>
              {module.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-6 flex-1 leading-relaxed line-clamp-2">
              {module.description}
            </p>

            {/* Code Preview - theme-aware like landing page */}
            <div className="rounded-2xl bg-card/80 border border-border/50 p-4 mb-6 font-mono text-xs overflow-hidden">
              <div className="flex gap-3">
                <div className="select-none text-right text-muted-foreground/40">
                  {module.codePreview.map((_, i) => (
                    <div key={i}>{i + 1}</div>
                  ))}
                </div>
                <div className="flex-1 overflow-hidden">
                  {module.codePreview.map((line, i) => (
                    <div key={i} className="truncate">
                      {line.includes('class') && (
                        <>
                          <span className="text-[#C586C0] dark:text-[#C586C0] text-[#AF00DB]">&nbsp;class</span>
                          <span className="text-[#4EC9B0] dark:text-[#4EC9B0] text-[#267F99]">{line.replace('class', '').replace(':', '')}</span>
                          <span className="text-foreground">:</span>
                        </>
                      )}
                      {line.includes('def') && (
                        <>
                          <span className="text-[#C586C0] dark:text-[#C586C0] text-[#AF00DB]">&nbsp;&nbsp;def</span>
                          <span className="text-[#DCDCAA] dark:text-[#DCDCAA] text-[#795E26]">{line.replace('def', '').replace(':', '').replace('self,', '').replace('self', '')}</span>
                          <span className="text-foreground">:</span>
                        </>
                      )}
                      {line.includes('#') && (
                        <span className="text-[#6A9955] dark:text-[#6A9955] text-[#008000] italic">{line}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-border/50">
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4" />
                  <span>{module.lessons} lessons</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4" />
                  <span>{module.estimatedTime}</span>
                </div>
              </div>
              <div className={`flex items-center gap-2 text-sm font-medium text-muted-foreground ${config.hoverText} transition-colors duration-300`}>
                <span>Start</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const Docs = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeSection, setActiveSection] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  useEffect(() => {
    const urlSearch = searchParams.get('search');
    if (urlSearch) {
      setSearchQuery(urlSearch);
    }
  }, [searchParams]);

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    if (value.trim()) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  const filteredModules = useMemo(() => {
    let result = modules;
    
    if (activeSection !== 'all') {
      result = result.filter(m => m.section === activeSection);
    }
    
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(m => 
        m.title.toLowerCase().includes(query) ||
        m.description.toLowerCase().includes(query)
      );
    }
    
    return result;
  }, [activeSection, searchQuery]);

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-br from-teal-500/10 via-cyan-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-gradient-to-tr from-purple-500/10 via-pink-500/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-white/[0.02] to-transparent rounded-full" />
      </div>
      
      <div className="noise-overlay" />
      
      <Navbar />
      
      <main className="relative pt-24 pb-12">
        <div className="container mx-auto px-6">
          {/* Hero Header */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="relative max-w-4xl">
              {/* Badge */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/20 mb-6"
              >
                <Sparkles className="w-4 h-4 text-teal-400" />
                <span className="text-sm text-teal-400 font-medium">Structured Learning Path</span>
              </motion.div>
              
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4 tracking-tight">
                ML Docs
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                Master machine learning by building every algorithm from scratch. 
                No frameworks, just pure understanding.
              </p>
            </div>
          </motion.div>

          {/* Search and Controls */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-col lg:flex-row gap-4 mb-8"
          >
            {/* Search Input */}
            <div className="relative flex-1 max-w-xl">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-teal-500/20 to-cyan-500/20 blur-xl opacity-0 focus-within:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Search modules..."
                  className="w-full pl-14 pr-5 py-4 text-base rounded-2xl bg-white/[0.03] border border-white/[0.08] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500/30 transition-all backdrop-blur-sm shadow-lg shadow-black/10"
                />
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-3">
              <div className="flex rounded-2xl bg-white/[0.03] border border-white/[0.08] p-1.5 backdrop-blur-sm shadow-lg shadow-black/10">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-xl transition-all duration-200 ${viewMode === 'grid' ? 'bg-white/10 text-foreground shadow-md' : 'text-muted-foreground hover:text-foreground hover:bg-white/5'}`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-xl transition-all duration-200 ${viewMode === 'list' ? 'bg-white/10 text-foreground shadow-md' : 'text-muted-foreground hover:text-foreground hover:bg-white/5'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Category Navigation */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-12"
          >
            <div className="flex flex-wrap gap-3">
              {sections.map((section, i) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                return (
                  <motion.button
                    key={section.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 + i * 0.05 }}
                    onClick={() => setActiveSection(section.id)}
                    className={`group relative flex items-center gap-2.5 px-5 py-3 rounded-2xl text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white shadow-lg shadow-teal-500/25'
                        : 'bg-white/[0.03] border border-white/[0.08] text-muted-foreground hover:text-foreground hover:bg-white/[0.06] hover:border-white/15 shadow-lg shadow-black/10'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-muted-foreground group-hover:text-foreground'} transition-colors`} />
                    <span>{section.label}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${isActive ? 'bg-white/20 text-white' : 'bg-white/5 text-muted-foreground'}`}>
                      {section.count}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>

          {/* Results Info */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm text-muted-foreground">
              {searchQuery ? (
                <>Found <span className="text-foreground font-semibold">{filteredModules.length}</span> results for "<span className="text-teal-400">{searchQuery}</span>"</>
              ) : (
                <>Showing <span className="text-foreground font-semibold">{filteredModules.length}</span> modules</>
              )}
            </p>
          </div>

          {/* Modules Grid */}
          <div className={viewMode === 'grid' 
            ? "grid md:grid-cols-2 xl:grid-cols-3 gap-6" 
            : "flex flex-col gap-4"
          }>
            {filteredModules.map((module, index) => (
              <ModuleCard 
                key={module.id} 
                module={module} 
                index={index}
                viewMode={viewMode}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredModules.length === 0 && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-24"
            >
              <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-white/[0.08] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-black/20">
                <BookOpen className="w-10 h-10 text-muted-foreground" />
              </div>
              <p className="text-xl text-foreground font-semibold mb-2">No modules found</p>
              <p className="text-muted-foreground mb-6">
                {searchQuery ? `No results for "${searchQuery}"` : 'No modules in this section.'}
              </p>
              <button 
                onClick={() => { setActiveSection('all'); setSearchQuery(''); setSearchParams({}); }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-medium hover:shadow-lg hover:shadow-teal-500/25 transition-all"
              >
                Clear filters
                <ArrowRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* Bottom CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-24"
          >
            <div className="relative rounded-[2.5rem] overflow-hidden">
              <div className="relative border border-border rounded-[2.5rem] p-12 lg:p-16 text-center bg-card/50">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground/5 border border-foreground/10 mb-6">
                  <GraduationCap className="w-4 h-4 text-teal-400" />
                  <span className="text-sm text-foreground/70">Start Your Journey</span>
                </div>
                
                <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-4">
                  Ready to Build ML from Scratch?
                </h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
                  Join thousands of developers who have mastered machine learning by understanding it from the ground up.
                </p>
                
                <div className="flex flex-wrap items-center justify-center gap-4">
                  <Link to="/docs/1">
                    <button className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold text-lg hover:shadow-xl hover:shadow-teal-500/30 hover:scale-105 transition-all duration-300">
                      <Play className="w-5 h-5" />
                      Start First Module
                    </button>
                  </Link>
                  <button className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-foreground/5 border border-foreground/10 text-foreground font-semibold text-lg hover:bg-foreground/10 hover:border-foreground/20 transition-all duration-300">
                    View Learning Path
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="mt-24">
          <Footer />
        </div>
      </main>
    </div>
  );
};

export default Docs;
