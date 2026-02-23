import { useState, useMemo, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { 
  TrendingUp, 
  Network, 
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
  Bot,
  BrainCircuit,
  Workflow,
  Wand2,
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
}

const modules: Module[] = [
  {
    id: 1,
    slug: 'linear-regression',
    icon: TrendingUp,
    title: 'Linear Regression',
    description: 'Build your first ML model from scratch. Understand gradient descent and optimization.',
    difficulty: 'beginner',
    codePreview: ['class LinearRegression:', 'def fit(self, X, y):', '    # Minimize loss function'],
    estimatedTime: '2 hours',
    section: 'foundations',
  },
  {
    id: 2,
    slug: 'model-deployment',
    icon: BarChart3,
    title: 'Model Deployment',
    description: 'Take your models to production with proper serving infrastructure.',
    difficulty: 'intermediate',
    codePreview: ['class ModelServer:', 'def predict(self, request):', '    # Batch inference'],
    estimatedTime: '3 hours',
    section: 'projects',
  },
  {
    id: 3,
    slug: 'basic-chatbot',
    icon: Workflow,
    title: 'Build a Basic Chatbot',
    description: 'Create a conversational AI chatbot using LLM APIs with streaming responses and chat history.',
    difficulty: 'beginner',
    codePreview: ['class Chatbot:', 'def chat(self, message):', '    # Stream LLM response'],
    estimatedTime: '2 hours',
    section: 'gen-ai',
  },
  {
    id: 4,
    slug: 'basic-rag',
    icon: BrainCircuit,
    title: 'Implement Basic RAG',
    description: 'Build a Retrieval-Augmented Generation pipeline with embeddings, vector search, and context injection.',
    difficulty: 'intermediate',
    codePreview: ['class RAGPipeline:', 'def retrieve_and_generate(self, query):', '    # Search → Augment → Generate'],
    estimatedTime: '3 hours',
    section: 'gen-ai',
  },
  {
    id: 5,
    icon: Bot,
    title: 'Build a Small Agent',
    description: 'Create an autonomous AI agent with tool use, reasoning loops, and structured action planning.',
    difficulty: 'intermediate',
    codePreview: ['class Agent:', 'def run(self, task):', '    # Think → Act → Observe loop'],
    estimatedTime: '3.5 hours',
    section: 'gen-ai',
  },
  {
    id: 6,
    icon: Wand2,
    title: 'Prompt Engineering Patterns',
    description: 'Master chain-of-thought, few-shot, and system prompt techniques for reliable LLM outputs.',
    difficulty: 'beginner',
    codePreview: ['class PromptBuilder:', 'def chain_of_thought(self, task):', '    # Structure reasoning steps'],
    estimatedTime: '1.5 hours',
    section: 'gen-ai',
  },
];

const sections = [
  { id: 'all', label: 'All Modules', icon: Grid3X3, count: modules.length },
  { id: 'foundations', label: 'Foundations', icon: BookOpen, count: modules.filter(m => m.section === 'foundations').length },
  { id: 'gen-ai', label: 'Generative AI', icon: Sparkles, count: modules.filter(m => m.section === 'gen-ai').length },
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
            
            <div className="relative z-10 p-4 sm:p-5 flex items-center gap-3 sm:gap-5">
              {/* Icon - neutral by default, colored on hover */}
              <div className={`relative w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-foreground/5 border border-foreground/10 flex items-center justify-center shrink-0 ${config.hoverBg} ${config.hoverBorder} group-hover:shadow-lg transition-all duration-300`}>
                <Icon className={`w-5 h-5 sm:w-6 sm:h-6 text-muted-foreground ${config.hoverText} transition-colors duration-300`} />
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 mb-1 sm:mb-1.5">
                  <h3 className={`text-sm sm:text-base font-semibold text-foreground ${config.hoverText} transition-colors`}>{module.title}</h3>
                  <span className={`text-[9px] sm:text-[10px] px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full bg-foreground/5 text-foreground/70 border border-foreground/10 font-medium uppercase tracking-wider shrink-0 ${config.hoverBg} ${config.hoverText} ${config.hoverBorder} transition-colors duration-300`}>
                    {config.label}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground line-clamp-1 hidden sm:block">{module.description}</p>
              </div>

              {/* Meta */}
              <div className="flex items-center gap-3 sm:gap-5 shrink-0">
                <div className="hidden sm:flex items-center gap-1.5 text-sm text-muted-foreground">
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
        <div className="group relative h-full rounded-2xl sm:rounded-3xl bg-card/50 border border-border overflow-hidden cursor-pointer transition-all duration-500 hover:border-foreground/20 hover:scale-[1.02] hover:-translate-y-1 hover:shadow-xl hover:shadow-foreground/5">
          {/* Animated gradient background - only on hover */}
          <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
          
          {/* Glow effect - only on hover */}
          <div className={`absolute -inset-px rounded-2xl sm:rounded-3xl bg-gradient-to-b ${config.gradient} opacity-0 group-hover:opacity-50 transition-opacity duration-500 blur-xl`} />
          
          <div className="relative z-10 p-4 sm:p-7 flex flex-col h-full">
            {/* Header */}
            <div className="flex items-start justify-between mb-4 sm:mb-6">
              {/* Icon - neutral by default, colored on hover */}
              <div className={`relative w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-foreground/5 border border-foreground/10 flex items-center justify-center ${config.hoverBg} ${config.hoverBorder} group-hover:shadow-lg transition-all duration-300`}>
                <Icon className={`w-5 h-5 sm:w-7 sm:h-7 text-muted-foreground ${config.hoverText} transition-colors duration-300`} />
              </div>
              {/* Badge - neutral by default, colored on hover */}
              <span className={`text-[9px] sm:text-[10px] px-2 sm:px-3 py-1 sm:py-1.5 rounded-full bg-foreground/5 text-foreground/70 border border-foreground/10 font-semibold uppercase tracking-wider ${config.hoverBg} ${config.hoverText} ${config.hoverBorder} transition-colors duration-300`}>
                {config.label}
              </span>
            </div>

            {/* Content - title highlights in difficulty color on hover */}
            <h3 className={`text-base sm:text-xl font-bold text-foreground mb-2 sm:mb-3 ${config.hoverText} transition-colors duration-300`}>
              {module.title}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6 flex-1 leading-relaxed line-clamp-2">
              {module.description}
            </p>

            {/* Code Preview - theme-aware like landing page - hidden on mobile */}
            <div className="hidden sm:block rounded-xl sm:rounded-2xl bg-card/80 border border-border/50 p-3 sm:p-4 mb-4 sm:mb-6 font-mono text-[10px] sm:text-xs overflow-hidden">
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
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{module.estimatedTime}</span>
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
            className="mb-8 sm:mb-12"
          >
            <div className="relative max-w-4xl">
              {/* Badge */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/20 mb-4 sm:mb-6"
              >
                <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-400" />
                <span className="text-xs sm:text-sm text-teal-400 font-medium">Structured Learning Path</span>
              </motion.div>
              
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4 tracking-tight">
                ML Docs
              </h1>
              <p className="text-sm sm:text-lg text-muted-foreground max-w-xl leading-relaxed">
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
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-6 sm:mb-8"
          >
            {/* Search Input */}
            <div className="relative flex-1 max-w-xl">
              <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-teal-500/20 to-cyan-500/20 blur-xl opacity-0 focus-within:opacity-100 transition-opacity duration-300" />
              <div className="relative">
                <Search className="absolute left-4 sm:left-5 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  placeholder="Search modules..."
                  className="w-full pl-11 sm:pl-14 pr-4 sm:pr-5 py-3 sm:py-4 text-sm sm:text-base rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/[0.08] text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500/30 transition-all backdrop-blur-sm shadow-lg shadow-black/10"
                />
              </div>
            </div>

            {/* View Toggle */}
            <div className="flex items-center gap-3">
              <div className="flex rounded-xl sm:rounded-2xl bg-white/[0.03] border border-white/[0.08] p-1 sm:p-1.5 backdrop-blur-sm shadow-lg shadow-black/10">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-200 ${viewMode === 'grid' ? 'bg-white/10 text-foreground shadow-md' : 'text-muted-foreground hover:text-foreground hover:bg-white/5'}`}
                >
                  <Grid3X3 className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 sm:p-3 rounded-lg sm:rounded-xl transition-all duration-200 ${viewMode === 'list' ? 'bg-white/10 text-foreground shadow-md' : 'text-muted-foreground hover:text-foreground hover:bg-white/5'}`}
                >
                  <List className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>
            </div>
          </motion.div>

          {/* Category Navigation */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mb-8 sm:mb-12 -mx-4 sm:mx-0 px-4 sm:px-0"
          >
            <div className="flex gap-2 sm:gap-3 overflow-x-auto pb-2 sm:pb-0 sm:flex-wrap scrollbar-hide">
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
                    className={`group relative flex items-center gap-1.5 sm:gap-2.5 px-3 sm:px-5 py-2 sm:py-3 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap shrink-0 ${
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
            ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6" 
            : "flex flex-col gap-3 sm:gap-4"
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
            className="mt-16 sm:mt-24"
          >
            <div className="relative rounded-2xl sm:rounded-[2.5rem] overflow-hidden">
              <div className="relative border border-border rounded-2xl sm:rounded-[2.5rem] p-6 sm:p-12 lg:p-16 text-center bg-card/50">
                <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-foreground/5 border border-foreground/10 mb-4 sm:mb-6">
                  <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-teal-400" />
                  <span className="text-xs sm:text-sm text-foreground/70">Start Your Journey</span>
                </div>
                
                <h2 className="text-xl sm:text-3xl lg:text-5xl font-bold text-foreground mb-3 sm:mb-4">
                  Ready to Build ML from Scratch?
                </h2>
                <p className="text-sm sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-6 sm:mb-8">
                  Join thousands of developers who have mastered machine learning by understanding it from the ground up.
                </p>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                  <Link to="/docs/linear-regression">
                    <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold text-sm sm:text-lg hover:shadow-xl hover:shadow-teal-500/30 hover:scale-105 transition-all duration-300">
                      <Play className="w-4 h-4 sm:w-5 sm:h-5" />
                      Start First Module
                    </button>
                  </Link>
                  <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl bg-foreground/5 border border-foreground/10 text-foreground font-semibold text-sm sm:text-lg hover:bg-foreground/10 hover:border-foreground/20 transition-all duration-300">
                    View Learning Path
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
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
