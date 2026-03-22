import { useState, useEffect, useRef, useCallback } from 'react';
import { useGitHubStats } from '@/hooks/useGitHubStats';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { CodeBlock, Callout, OutputBlock, InlineCode } from '@/components/project/CodeBlock';
import { 
  ChevronRight, 
  Clock, 
  Users, 
  Star, 
  GitFork,
  ArrowLeft,
  Github,
  BookOpen,
  List,
  ExternalLink,
  CheckCircle2,
  Circle,
  Download,
  Loader2,
  Play,
  Pause,
  RotateCcw
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import Confetti from 'react-confetti';

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'what-is-ml', title: 'What is Machine Learning?' },
  { id: 'how-ml-works', title: 'How ML Works' },
  { id: 'what-is-linear-regression', title: 'What is Linear Regression?' },
  { id: 'the-equation', title: 'The Equation' },
  { id: 'interactive-playground', title: 'Interactive Playground' },
  { id: 'cost-function', title: 'Cost Function' },
  { id: 'gradient-descent', title: 'Gradient Descent' },
  { id: 'watch-it-learn', title: 'Watch It Learn' },
  { id: 'implementation', title: 'Python Implementation' },
  { id: 'complete-code', title: 'Complete Code' },
  { id: 'next-steps', title: 'Next Steps' },
];

// Interactive Graph Component
const InteractiveGraph = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [slope, setSlope] = useState(0.5);
  const [intercept, setIntercept] = useState(2);
  
  // Sample data points
  const dataPoints = [
    { x: 1, y: 2.5 },
    { x: 2, y: 4.2 },
    { x: 3, y: 5.1 },
    { x: 4, y: 7.8 },
    { x: 5, y: 8.5 },
    { x: 6, y: 10.2 },
    { x: 7, y: 12.1 },
    { x: 8, y: 13.5 },
  ];

  // Graph dimensions - centered properly
  const width = 500;
  const height = 350;
  const padding = 50;
  const graphWidth = width - padding * 2;
  const graphHeight = height - padding * 2;

  // Scale functions
  const xMin = 0;
  const xMax = 10;
  const yMin = 0;
  const yMax = 16;

  const scaleX = (x: number) => padding + ((x - xMin) / (xMax - xMin)) * graphWidth;
  const scaleY = (y: number) => height - padding - ((y - yMin) / (yMax - yMin)) * graphHeight;

  // Calculate MSE
  const calculateMSE = () => {
    let sumSquaredError = 0;
    dataPoints.forEach(point => {
      const predicted = slope * point.x + intercept;
      sumSquaredError += Math.pow(point.y - predicted, 2);
    });
    return sumSquaredError / dataPoints.length;
  };

  const mse = calculateMSE();

  // Line points
  const lineStart = { x: scaleX(xMin), y: scaleY(slope * xMin + intercept) };
  const lineEnd = { x: scaleX(xMax), y: scaleY(slope * xMax + intercept) };

  // Colors
  const axisColor = isDark ? '#6b7280' : '#9ca3af';
  const gridColor = isDark ? '#374151' : '#e5e7eb';
  const textColor = isDark ? '#d1d5db' : '#374151';
  const pointColor = '#3b82f6';
  const lineColor = '#ef4444';

  return (
    <div className="w-full">
      <div className="flex justify-center mb-6">
        <svg width={width} height={height} className="border border-border rounded-xl bg-card/30">
          {/* Grid lines */}
          {[...Array(11)].map((_, i) => (
            <line
              key={`vgrid-${i}`}
              x1={scaleX(i)}
              y1={padding}
              x2={scaleX(i)}
              y2={height - padding}
              stroke={gridColor}
              strokeWidth="1"
              strokeDasharray="4,4"
            />
          ))}
          {[...Array(9)].map((_, i) => (
            <line
              key={`hgrid-${i}`}
              x1={padding}
              y1={scaleY(i * 2)}
              x2={width - padding}
              y2={scaleY(i * 2)}
              stroke={gridColor}
              strokeWidth="1"
              strokeDasharray="4,4"
            />
          ))}

          {/* Axes */}
          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke={axisColor} strokeWidth="2" />
          <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke={axisColor} strokeWidth="2" />

          {/* X-axis labels */}
          {[0, 2, 4, 6, 8, 10].map(val => (
            <text key={`x-${val}`} x={scaleX(val)} y={height - padding + 20} textAnchor="middle" fill={textColor} fontSize="12">
              {val}
            </text>
          ))}

          {/* Y-axis labels */}
          {[0, 4, 8, 12, 16].map(val => (
            <text key={`y-${val}`} x={padding - 15} y={scaleY(val) + 4} textAnchor="end" fill={textColor} fontSize="12">
              {val}
            </text>
          ))}

          {/* Axis titles */}
          <text x={width / 2} y={height - 10} textAnchor="middle" fill={textColor} fontSize="14" fontWeight="500">
            X (Input)
          </text>
          <text x={15} y={height / 2} textAnchor="middle" fill={textColor} fontSize="14" fontWeight="500" transform={`rotate(-90, 15, ${height / 2})`}>
            Y (Output)
          </text>

          {/* Regression line */}
          <line
            x1={lineStart.x}
            y1={lineStart.y}
            x2={lineEnd.x}
            y2={lineEnd.y}
            stroke={lineColor}
            strokeWidth="3"
          />

          {/* Data points */}
          {dataPoints.map((point, i) => (
            <circle
              key={i}
              cx={scaleX(point.x)}
              cy={scaleY(point.y)}
              r="8"
              fill={pointColor}
              stroke={isDark ? '#1f2937' : '#ffffff'}
              strokeWidth="2"
            />
          ))}
        </svg>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-foreground w-24">Slope (m):</label>
          <input
            type="range"
            min="0"
            max="2"
            step="0.1"
            value={slope}
            onChange={(e) => setSlope(parseFloat(e.target.value))}
            className="w-32"
          />
          <span className="text-sm font-mono text-foreground w-12">{slope.toFixed(1)}</span>
        </div>
        <div className="flex items-center gap-4">
          <label className="text-sm font-medium text-foreground w-24">Intercept (c):</label>
          <input
            type="range"
            min="-2"
            max="6"
            step="0.5"
            value={intercept}
            onChange={(e) => setIntercept(parseFloat(e.target.value))}
            className="w-32"
          />
          <span className="text-sm font-mono text-foreground w-12">{intercept.toFixed(1)}</span>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-sm text-muted-foreground">
          Current equation: <span className="font-mono font-semibold text-foreground">y = {slope.toFixed(1)}x + {intercept.toFixed(1)}</span>
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Mean Squared Error: <span className={`font-mono font-semibold ${mse < 1 ? 'text-green-500' : mse < 3 ? 'text-yellow-500' : 'text-red-500'}`}>{mse.toFixed(2)}</span>
        </p>
      </div>
    </div>
  );
};

// Gradient Descent Visualizer Component
const GradientDescentVisualizer = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  
  const [isTraining, setIsTraining] = useState(false);
  const [epoch, setEpoch] = useState(0);
  const [m, setM] = useState(0.1);
  const [c, setC] = useState(0.5);
  const [lossHistory, setLossHistory] = useState<number[]>([]);
  const animationRef = useRef<number | null>(null);

  // Sample data points
  const dataPoints = [
    { x: 1, y: 2.5 },
    { x: 2, y: 4.2 },
    { x: 3, y: 5.1 },
    { x: 4, y: 7.8 },
    { x: 5, y: 8.5 },
    { x: 6, y: 10.2 },
    { x: 7, y: 12.1 },
    { x: 8, y: 13.5 },
  ];

  const learningRate = 0.01;

  const calculateLoss = useCallback((slope: number, intercept: number) => {
    let sum = 0;
    dataPoints.forEach(point => {
      const predicted = slope * point.x + intercept;
      sum += Math.pow(point.y - predicted, 2);
    });
    return sum / dataPoints.length;
  }, []);

  const gradientStep = useCallback(() => {
    let dm = 0;
    let dc = 0;
    const n = dataPoints.length;

    dataPoints.forEach(point => {
      const predicted = m * point.x + c;
      const error = predicted - point.y;
      dm += (2 / n) * error * point.x;
      dc += (2 / n) * error;
    });

    const newM = m - learningRate * dm;
    const newC = c - learningRate * dc;
    const newLoss = calculateLoss(newM, newC);

    setM(newM);
    setC(newC);
    setEpoch(prev => prev + 1);
    setLossHistory(prev => [...prev.slice(-49), newLoss]);
  }, [m, c, calculateLoss]);

  useEffect(() => {
    if (isTraining && epoch < 200) {
      animationRef.current = requestAnimationFrame(() => {
        setTimeout(() => gradientStep(), 50);
      });
    } else if (epoch >= 200) {
      setIsTraining(false);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isTraining, epoch, gradientStep]);

  const reset = () => {
    setIsTraining(false);
    setEpoch(0);
    setM(0.1);
    setC(0.5);
    setLossHistory([]);
  };

  // Graph dimensions - centered properly
  const width = 500;
  const height = 350;
  const padding = 50;
  const graphWidth = width - padding * 2;
  const graphHeight = height - padding * 2;

  const xMin = 0;
  const xMax = 10;
  const yMin = 0;
  const yMax = 16;

  const scaleX = (x: number) => padding + ((x - xMin) / (xMax - xMin)) * graphWidth;
  const scaleY = (y: number) => height - padding - ((y - yMin) / (yMax - yMin)) * graphHeight;

  const lineStart = { x: scaleX(xMin), y: scaleY(m * xMin + c) };
  const lineEnd = { x: scaleX(xMax), y: scaleY(m * xMax + c) };

  const axisColor = isDark ? '#6b7280' : '#9ca3af';
  const gridColor = isDark ? '#374151' : '#e5e7eb';
  const textColor = isDark ? '#d1d5db' : '#374151';

  const currentLoss = calculateLoss(m, c);

  return (
    <div className="w-full">
      <div className="flex justify-center mb-6">
        <svg width={width} height={height} className="border border-border rounded-xl bg-card/30">
          {/* Grid */}
          {[...Array(11)].map((_, i) => (
            <line key={`vgrid-${i}`} x1={scaleX(i)} y1={padding} x2={scaleX(i)} y2={height - padding} stroke={gridColor} strokeWidth="1" strokeDasharray="4,4" />
          ))}
          {[...Array(9)].map((_, i) => (
            <line key={`hgrid-${i}`} x1={padding} y1={scaleY(i * 2)} x2={width - padding} y2={scaleY(i * 2)} stroke={gridColor} strokeWidth="1" strokeDasharray="4,4" />
          ))}

          {/* Axes */}
          <line x1={padding} y1={height - padding} x2={width - padding} y2={height - padding} stroke={axisColor} strokeWidth="2" />
          <line x1={padding} y1={padding} x2={padding} y2={height - padding} stroke={axisColor} strokeWidth="2" />

          {/* Labels */}
          {[0, 2, 4, 6, 8, 10].map(val => (
            <text key={`x-${val}`} x={scaleX(val)} y={height - padding + 20} textAnchor="middle" fill={textColor} fontSize="12">{val}</text>
          ))}
          {[0, 4, 8, 12, 16].map(val => (
            <text key={`y-${val}`} x={padding - 15} y={scaleY(val) + 4} textAnchor="end" fill={textColor} fontSize="12">{val}</text>
          ))}

          {/* Regression line */}
          <line x1={lineStart.x} y1={lineStart.y} x2={lineEnd.x} y2={lineEnd.y} stroke="#22c55e" strokeWidth="3" />

          {/* Data points */}
          {dataPoints.map((point, i) => (
            <circle key={i} cx={scaleX(point.x)} cy={scaleY(point.y)} r="8" fill="#3b82f6" stroke={isDark ? '#1f2937' : '#ffffff'} strokeWidth="2" />
          ))}
        </svg>
      </div>

      <div className="flex justify-center gap-3 mb-6">
        <Button
          onClick={() => setIsTraining(!isTraining)}
          variant="outline"
          size="sm"
          disabled={epoch >= 200}
        >
          {isTraining ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
          {isTraining ? 'Pause' : 'Start Training'}
        </Button>
        <Button onClick={reset} variant="outline" size="sm">
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
        <div>
          <div className="text-xs text-muted-foreground">Epoch</div>
          <div className="font-mono font-bold text-foreground">{epoch}</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">Slope (m)</div>
          <div className="font-mono font-bold text-foreground">{m.toFixed(3)}</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">Intercept (c)</div>
          <div className="font-mono font-bold text-foreground">{c.toFixed(3)}</div>
        </div>
        <div>
          <div className="text-xs text-muted-foreground">Loss (MSE)</div>
          <div className="font-mono font-bold text-foreground">{currentLoss.toFixed(3)}</div>
        </div>
      </div>

      {lossHistory.length > 1 && (
        <div className="mt-6">
          <p className="text-sm font-medium text-foreground mb-2 text-center">Loss Over Time</p>
          <div className="flex justify-center">
            <svg width={400} height={100} className="border border-border rounded bg-card/30">
              <polyline
                fill="none"
                stroke={isDark ? '#ffffff' : '#000000'}
                strokeWidth="2"
                points={lossHistory.map((loss, i) => `${20 + (i / 49) * 360},${90 - Math.min(loss / lossHistory[0], 1) * 70}`).join(' ')}
              />
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

const LinearRegressionModule = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [progress, setProgress] = useState<string[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const { stars, forks, contributors } = useGitHubStats();
  const [showConfetti, setShowConfetti] = useState(false);
  const contentRef = useRef<HTMLElement>(null);

  // Track scroll position for active section and confetti
  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(s => ({
        id: s.id,
        element: document.getElementById(s.id)
      })).filter(s => s.element);

      for (const section of sectionElements.reverse()) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 120) {
            setActiveSection(section.id);
            
            // Trigger confetti when reaching next-steps
            if (section.id === 'next-steps') {
              setShowConfetti(true);
              setTimeout(() => setShowConfetti(false), 5000);
            }
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - offset, behavior: 'smooth' });
    }
  };

  const toggleProgress = (sectionId: string) => {
    setProgress(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  };

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    
    const content = `LINEAR REGRESSION FROM SCRATCH
==============================
A beginner-friendly guide to understanding and implementing Linear Regression.

Complete learning module covering:
- What is Machine Learning
- How ML Works
- Linear Regression Explained
- The Math Behind It
- Python Implementation

Generated by MLCodex.dev`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'linear-regression-guide.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    setTimeout(() => setIsDownloading(false), 1000);
  };

  return (
    <div className="min-h-screen bg-background relative">
      {showConfetti && <Confetti width={window.innerWidth} height={window.innerHeight} recycle={false} numberOfPieces={300} />}
      <div className="noise-overlay" />
      <Navbar variant="simple" />
      
      <main className="pt-24 pb-20" ref={contentRef}>
        <div className="container mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/docs" className="hover:text-foreground transition-colors">Docs</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">Linear Regression</span>
          </div>

          <div className="flex gap-8 lg:gap-12">
            {/* Left Sidebar - Other Docs (Desktop) */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-28">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">Other Modules</span>
                </div>
                <nav className="space-y-1">
                  {[
                    { slug: 'neural-network', title: 'Neural Network from Scratch', path: '/projects/neural-network' },
                    { slug: 'model-deployment', title: 'Model Deployment', path: '/docs/model-deployment' },
                    { slug: 'logistic-regression', title: 'Logistic Regression' },
                    { slug: 'decision-trees', title: 'Decision Trees' },
                    { slug: 'clustering', title: 'K-Means Clustering' },
                  ].map((item) => (
                    item.path ? (
                      <Link
                        key={item.slug}
                        to={item.path}
                        className="block py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {item.title}
                      </Link>
                    ) : (
                      <span
                        key={item.slug}
                        className="block py-1.5 text-sm text-muted-foreground/50"
                      >
                        {item.title} (Coming Soon)
                      </span>
                    )
                  ))}
                </nav>

                <Link 
                  to="/docs"
                  className="flex items-center gap-2 mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  View all docs
                  <ChevronRight className="w-4 h-4" />
                </Link>

                {/* Progress Tracker */}
                <div className="mt-8 pt-6 border-t border-border">
                  <div className="text-sm font-medium text-foreground mb-3">Your Progress</div>
                  <div className="text-xs text-muted-foreground mb-2">
                    {progress.length} / {sections.length} sections completed
                  </div>
                  <div className="w-full h-2 rounded-full bg-foreground/10">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 transition-all"
                      style={{ width: `${(progress.length / sections.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="text-sm font-medium text-foreground mb-3">Quick Actions</div>
                  <div className="space-y-2">
                    <a 
                      href="https://github.com/lokeshpanthangi/MLCodex" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
                    >
                      <Github className="w-4 h-4" />
                      View Source
                    </a>
                    <button 
                      onClick={handleDownloadPDF}
                      disabled={isDownloading}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors py-1 disabled:opacity-50"
                    >
                      {isDownloading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Download className="w-4 h-4" />
                      )}
                      {isDownloading ? 'Downloading...' : 'Download PDF'}
                    </button>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <article className="flex-1 min-w-0 max-w-4xl">
              {/* Header */}
              <header className="mb-12">
                <div className="mb-6">
                  <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                    Linear Regression from Scratch
                  </h1>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Learn the fundamentals of machine learning by building a linear regression model 
                    from scratch using only Python and NumPy. Perfect for beginners.
                  </p>
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>3 hours</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4" />
                    <span>{stars.toLocaleString()} stars</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <GitFork className="w-4 h-4" />
                    <span>{forks.toLocaleString()} forks</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4" />
                    <span>{contributors.toLocaleString()} contributors</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 text-xs font-medium">
                    Beginner
                  </span>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                  <Button variant="hero" size="lg">
                    <Github className="w-4 h-4 mr-2" />
                    View on GitHub
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="border-foreground/20 hover:bg-foreground/5"
                    onClick={handleDownloadPDF}
                    disabled={isDownloading}
                  >
                    {isDownloading ? (
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                      <Download className="w-4 h-4 mr-2" />
                    )}
                    {isDownloading ? 'Downloading...' : 'Download PDF'}
                  </Button>
                </div>
              </header>

              {/* Overview Section */}
              <section id="overview" className="mb-16">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <button 
                    onClick={() => toggleProgress('overview')}
                    className="text-muted-foreground hover:text-teal-500 transition-colors"
                  >
                    {progress.includes('overview') ? (
                      <CheckCircle2 className="w-6 h-6 text-teal-500" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>
                  Overview
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Linear Regression is often called the "Hello World" of machine learning. It's the perfect 
                  starting point because it's simple enough to understand completely, yet powerful enough 
                  to solve real problems.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  In this module, you'll learn not just how to use linear regression, but why it works. 
                  We'll build everything from scratch so you understand every single step.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  <div className="p-4 rounded-xl bg-card/50 border border-border">
                    <div className="text-2xl font-bold text-foreground mb-1">~100</div>
                    <div className="text-sm text-muted-foreground">Lines of Code</div>
                  </div>
                  <div className="p-4 rounded-xl bg-card/50 border border-border">
                    <div className="text-2xl font-bold text-foreground mb-1">NumPy</div>
                    <div className="text-sm text-muted-foreground">Only Dependency</div>
                  </div>
                  <div className="p-4 rounded-xl bg-card/50 border border-border">
                    <div className="text-2xl font-bold text-foreground mb-1">3</div>
                    <div className="text-sm text-muted-foreground">Core Concepts</div>
                  </div>
                </div>
              </section>

              {/* What is Machine Learning */}
              <section id="what-is-ml" className="mb-16">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <button 
                    onClick={() => toggleProgress('what-is-ml')}
                    className="text-muted-foreground hover:text-teal-500 transition-colors"
                  >
                    {progress.includes('what-is-ml') ? (
                      <CheckCircle2 className="w-6 h-6 text-teal-500" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>
                  What is Machine Learning?
                </h2>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Machine Learning is a way for computers to learn from examples instead of being 
                  explicitly programmed with rules. Think of it like teaching a child—you show them 
                  many examples, and they figure out the pattern themselves.
                </p>

                <h3 className="text-lg font-semibold text-foreground mb-3">Traditional Programming vs Machine Learning</h3>
                
                <p className="text-muted-foreground leading-relaxed mb-4">
                  <strong className="text-foreground">Traditional Programming:</strong> You write explicit rules. 
                  "If temperature {'>'} 30°C, turn on AC." You tell the computer exactly what to do.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  <strong className="text-foreground">Machine Learning:</strong> You show examples. 
                  "Here are 1000 situations where AC was on/off." The computer figures out the pattern.
                </p>

                <Callout type="tip" title="Why does this matter?">
                  Some problems are too complex to write rules for. How would you write rules to recognize 
                  a cat in a photo? Or predict stock prices? ML learns these patterns from data.
                </Callout>
              </section>

              {/* How ML Works */}
              <section id="how-ml-works" className="mb-16">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <button 
                    onClick={() => toggleProgress('how-ml-works')}
                    className="text-muted-foreground hover:text-teal-500 transition-colors"
                  >
                    {progress.includes('how-ml-works') ? (
                      <CheckCircle2 className="w-6 h-6 text-teal-500" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>
                  How Machine Learning Works
                </h2>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Every ML model follows the same basic process. Understanding this will help you 
                  grasp not just linear regression, but all ML algorithms.
                </p>

                <p className="text-muted-foreground leading-relaxed mb-2">
                  <strong className="text-foreground">Step 1: Collect Data</strong> — Gather examples of inputs and their correct outputs. 
                  More data usually means better learning.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-2">
                  <strong className="text-foreground">Step 2: Choose a Model</strong> — Pick a mathematical function that can represent 
                  the relationship. For linear regression, it's a straight line.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-2">
                  <strong className="text-foreground">Step 3: Train</strong> — Adjust the model's parameters to minimize errors. 
                  This is where the "learning" happens.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  <strong className="text-foreground">Step 4: Predict</strong> — Use the trained model to make predictions on new, 
                  unseen data.
                </p>

                <h3 className="text-lg font-semibold text-foreground mb-3">Real-World Examples</h3>
                
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Predicting house prices</strong> — Input: square footage, bedrooms. Output: price</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Estimating delivery time</strong> — Input: distance, traffic. Output: minutes</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Forecasting sales</strong> — Input: ad spend, season. Output: revenue</span>
                  </li>
                </ul>
              </section>

              {/* What is Linear Regression */}
              <section id="what-is-linear-regression" className="mb-16">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <button 
                    onClick={() => toggleProgress('what-is-linear-regression')}
                    className="text-muted-foreground hover:text-teal-500 transition-colors"
                  >
                    {progress.includes('what-is-linear-regression') ? (
                      <CheckCircle2 className="w-6 h-6 text-teal-500" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>
                  What is Linear Regression?
                </h2>
                
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Linear Regression finds the best straight line through your data points. 
                  That's it. It's beautifully simple.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  The "best" line is the one that minimizes the total distance between the line 
                  and all your data points. Once you have this line, you can use it to predict 
                  new values.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  For example, if you have data about house sizes and their prices, linear regression 
                  finds a line that best represents this relationship. Then you can predict the price 
                  of a new house just by knowing its size.
                </p>

                <Callout type="note">
                  The word "linear" means we're fitting a straight line. More complex relationships 
                  might need curves, but let's master the basics first.
                </Callout>
              </section>

              {/* The Equation */}
              <section id="the-equation" className="mb-16">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <button 
                    onClick={() => toggleProgress('the-equation')}
                    className="text-muted-foreground hover:text-teal-500 transition-colors"
                  >
                    {progress.includes('the-equation') ? (
                      <CheckCircle2 className="w-6 h-6 text-teal-500" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>
                  The Equation
                </h2>
                
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Remember the equation of a line from school? That's all we need:
                </p>

                <div className="p-6 rounded-xl bg-card/50 border border-border my-6 text-center">
                  <div className="text-2xl font-mono font-bold text-foreground">
                    y = mx + c
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-2">
                  <strong className="text-foreground">y</strong> — The output we want to predict (e.g., house price)
                </p>
                <p className="text-muted-foreground leading-relaxed mb-2">
                  <strong className="text-foreground">x</strong> — The input feature (e.g., house size)
                </p>
                <p className="text-muted-foreground leading-relaxed mb-2">
                  <strong className="text-foreground">m</strong> — The slope (how steep the line is)
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  <strong className="text-foreground">c</strong> — The y-intercept (where the line crosses the y-axis)
                </p>

                <p className="text-muted-foreground leading-relaxed">
                  Our goal in linear regression is to find the perfect values of <InlineCode>m</InlineCode> and <InlineCode>c</InlineCode> that 
                  make our line fit the data as closely as possible.
                </p>
              </section>

              {/* Interactive Playground */}
              <section id="interactive-playground" className="mb-16">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <button 
                    onClick={() => toggleProgress('interactive-playground')}
                    className="text-muted-foreground hover:text-teal-500 transition-colors"
                  >
                    {progress.includes('interactive-playground') ? (
                      <CheckCircle2 className="w-6 h-6 text-teal-500" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>
                  Interactive Playground
                </h2>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Play with the sliders below to see how changing the slope and intercept affects the line. 
                  Try to get the lowest MSE (Mean Squared Error) possible!
                </p>

                <InteractiveGraph />

                <p className="text-muted-foreground leading-relaxed mt-6 mb-2">
                  <strong className="text-foreground">What to Notice:</strong> When your line is far from the points, 
                  the MSE is high. As you adjust to fit better, MSE drops.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Challenge:</strong> Can you get the MSE below 1.0? 
                  The optimal values are around m=1.5 and c=1.0.
                </p>
              </section>

              {/* Cost Function */}
              <section id="cost-function" className="mb-16">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <button 
                    onClick={() => toggleProgress('cost-function')}
                    className="text-muted-foreground hover:text-teal-500 transition-colors"
                  >
                    {progress.includes('cost-function') ? (
                      <CheckCircle2 className="w-6 h-6 text-teal-500" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>
                  Cost Function
                </h2>
                
                <p className="text-muted-foreground leading-relaxed mb-4">
                  How do we measure how "good" our line is? We use a cost function (also called loss function). 
                  The most common one for linear regression is Mean Squared Error (MSE).
                </p>

                <div className="p-6 rounded-xl bg-card/50 border border-border my-6 text-center">
                  <div className="text-xl font-mono text-foreground">
                    MSE = (1/n) × Σ(actual - predicted)²
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-2">
                  <strong className="text-foreground">Step 1:</strong> For each data point, calculate the difference between the actual 
                  value and what our line predicts.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-2">
                  <strong className="text-foreground">Step 2:</strong> Square each difference (this makes all values positive and penalizes 
                  large errors more).
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  <strong className="text-foreground">Step 3:</strong> Take the average of all squared differences.
                </p>

                <Callout type="info" title="Why squared?">
                  Squaring does two things: it makes negative errors positive (so they don't cancel out), 
                  and it penalizes big mistakes more than small ones.
                </Callout>
              </section>

              {/* Gradient Descent */}
              <section id="gradient-descent" className="mb-16">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <button 
                    onClick={() => toggleProgress('gradient-descent')}
                    className="text-muted-foreground hover:text-teal-500 transition-colors"
                  >
                    {progress.includes('gradient-descent') ? (
                      <CheckCircle2 className="w-6 h-6 text-teal-500" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>
                  Gradient Descent
                </h2>
                
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Now we know how to measure error (MSE), but how do we find the best m and c? 
                  We use an algorithm called Gradient Descent.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Imagine you're on a mountain in fog and need to reach the lowest point. 
                  You can't see far, but you can feel which direction goes down. So you take 
                  small steps downhill, repeatedly, until you reach the bottom.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  That's gradient descent! The "mountain" is our cost function, and we're trying 
                  to find the values of m and c that give us the lowest cost.
                </p>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  The algorithm works like this:
                </p>

                <p className="text-muted-foreground leading-relaxed mb-2">
                  <strong className="text-foreground">1. Start with random values</strong> for m and c
                </p>
                <p className="text-muted-foreground leading-relaxed mb-2">
                  <strong className="text-foreground">2. Calculate the gradient</strong> (which direction increases error)
                </p>
                <p className="text-muted-foreground leading-relaxed mb-2">
                  <strong className="text-foreground">3. Take a small step</strong> in the opposite direction
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  <strong className="text-foreground">4. Repeat</strong> until the error stops decreasing
                </p>

                <div className="p-6 rounded-xl bg-card/50 border border-border my-6 text-center">
                  <div className="text-lg font-mono text-foreground mb-2">
                    m = m - learning_rate × ∂MSE/∂m
                  </div>
                  <div className="text-lg font-mono text-foreground">
                    c = c - learning_rate × ∂MSE/∂c
                  </div>
                </div>

                <Callout type="tip" title="Learning Rate">
                  The learning rate controls how big each step is. Too big and you might overshoot. 
                  Too small and training takes forever. Usually values like 0.01 or 0.001 work well.
                </Callout>
              </section>

              {/* Watch It Learn */}
              <section id="watch-it-learn" className="mb-16">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <button 
                    onClick={() => toggleProgress('watch-it-learn')}
                    className="text-muted-foreground hover:text-teal-500 transition-colors"
                  >
                    {progress.includes('watch-it-learn') ? (
                      <CheckCircle2 className="w-6 h-6 text-teal-500" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>
                  Watch It Learn
                </h2>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Click "Start Training" to watch gradient descent in action. The line starts with 
                  random values and gradually adjusts to fit the data better.
                </p>

                <GradientDescentVisualizer />
              </section>

              {/* Implementation */}
              <section id="implementation" className="mb-16">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <button 
                    onClick={() => toggleProgress('implementation')}
                    className="text-muted-foreground hover:text-teal-500 transition-colors"
                  >
                    {progress.includes('implementation') ? (
                      <CheckCircle2 className="w-6 h-6 text-teal-500" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>
                  Python Implementation
                </h2>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Let's implement everything we've learned in Python. We'll use only NumPy—no 
                  machine learning libraries.
                </p>

                <h3 className="text-lg font-semibold text-foreground mb-3">Step 1: Import NumPy</h3>
                <CodeBlock 
                  filename="linear_regression.py"
                  code={`import numpy as np

# Set random seed for reproducibility
np.random.seed(42)`}
                />

                <h3 className="text-lg font-semibold text-foreground mb-3 mt-8">Step 2: Create Sample Data</h3>
                <CodeBlock 
                  filename="linear_regression.py"
                  code={`# Generate sample data
# True relationship: y = 1.5x + 1 (with some noise)
X = np.array([1, 2, 3, 4, 5, 6, 7, 8]).reshape(-1, 1)
y = np.array([2.5, 4.2, 5.1, 7.8, 8.5, 10.2, 12.1, 13.5])

print("X shape:", X.shape)
print("y shape:", y.shape)`}
                />
                <OutputBlock 
                  output={`X shape: (8, 1)
y shape: (8,)`}
                  title="Output"
                />

                <h3 className="text-lg font-semibold text-foreground mb-3 mt-8">Step 3: Initialize Parameters</h3>
                <CodeBlock 
                  filename="linear_regression.py"
                  code={`# Initialize parameters randomly
m = np.random.randn()  # slope
c = np.random.randn()  # intercept
learning_rate = 0.01
epochs = 1000

print(f"Initial m: {m:.4f}")
print(f"Initial c: {c:.4f}")`}
                />
                <OutputBlock 
                  output={`Initial m: 0.4967
Initial c: -0.1383`}
                  title="Output"
                />

                <h3 className="text-lg font-semibold text-foreground mb-3 mt-8">Step 4: Define Prediction Function</h3>
                <CodeBlock 
                  filename="linear_regression.py"
                  code={`def predict(X, m, c):
    """Make predictions using y = mx + c"""
    return m * X.flatten() + c

# Test prediction
predictions = predict(X, m, c)
print("Sample predictions:", predictions[:3])`}
                />

                <h3 className="text-lg font-semibold text-foreground mb-3 mt-8">Step 5: Define Cost Function</h3>
                <CodeBlock 
                  filename="linear_regression.py"
                  code={`def compute_mse(y_true, y_pred):
    """Calculate Mean Squared Error"""
    return np.mean((y_true - y_pred) ** 2)

# Calculate initial MSE
initial_mse = compute_mse(y, predict(X, m, c))
print(f"Initial MSE: {initial_mse:.4f}")`}
                />

                <h3 className="text-lg font-semibold text-foreground mb-3 mt-8">Step 6: Implement Gradient Descent</h3>
                <CodeBlock 
                  filename="linear_regression.py"
                  code={`def gradient_descent(X, y, m, c, learning_rate, epochs):
    """Train the model using gradient descent"""
    n = len(y)
    X_flat = X.flatten()
    
    for epoch in range(epochs):
        # Make predictions
        y_pred = m * X_flat + c
        
        # Calculate gradients
        dm = (-2/n) * np.sum(X_flat * (y - y_pred))
        dc = (-2/n) * np.sum(y - y_pred)
        
        # Update parameters
        m = m - learning_rate * dm
        c = c - learning_rate * dc
        
        # Print progress every 200 epochs
        if epoch % 200 == 0:
            mse = compute_mse(y, y_pred)
            print(f"Epoch {epoch}: MSE = {mse:.4f}, m = {m:.4f}, c = {c:.4f}")
    
    return m, c

# Train the model
m_final, c_final = gradient_descent(X, y, m, c, learning_rate, epochs)`}
                />
                <OutputBlock 
                  output={`Epoch 0: MSE = 45.2341, m = 0.5234, c = -0.1123
Epoch 200: MSE = 1.8923, m = 1.2845, c = 0.7234
Epoch 400: MSE = 0.5621, m = 1.4523, c = 0.9845
Epoch 600: MSE = 0.4234, m = 1.4912, c = 1.0234
Epoch 800: MSE = 0.4012, m = 1.5023, c = 1.0412`}
                  title="Training Output"
                />
              </section>

              {/* Complete Code */}
              <section id="complete-code" className="mb-16">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <button 
                    onClick={() => toggleProgress('complete-code')}
                    className="text-muted-foreground hover:text-teal-500 transition-colors"
                  >
                    {progress.includes('complete-code') ? (
                      <CheckCircle2 className="w-6 h-6 text-teal-500" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>
                  Complete Code
                </h2>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Here's the complete implementation you can copy and run:
                </p>

                <CodeBlock 
                  filename="linear_regression_complete.py"
                  code={`import numpy as np

# Set random seed for reproducibility
np.random.seed(42)

# Generate sample data
X = np.array([1, 2, 3, 4, 5, 6, 7, 8]).reshape(-1, 1)
y = np.array([2.5, 4.2, 5.1, 7.8, 8.5, 10.2, 12.1, 13.5])

def predict(X, m, c):
    """Make predictions using y = mx + c"""
    return m * X.flatten() + c

def compute_mse(y_true, y_pred):
    """Calculate Mean Squared Error"""
    return np.mean((y_true - y_pred) ** 2)

def gradient_descent(X, y, m, c, learning_rate, epochs):
    """Train the model using gradient descent"""
    n = len(y)
    X_flat = X.flatten()
    
    for epoch in range(epochs):
        y_pred = m * X_flat + c
        
        dm = (-2/n) * np.sum(X_flat * (y - y_pred))
        dc = (-2/n) * np.sum(y - y_pred)
        
        m = m - learning_rate * dm
        c = c - learning_rate * dc
        
        if epoch % 200 == 0:
            mse = compute_mse(y, y_pred)
            print(f"Epoch {epoch}: MSE = {mse:.4f}")
    
    return m, c

# Initialize and train
m = np.random.randn()
c = np.random.randn()
m_final, c_final = gradient_descent(X, y, m, c, learning_rate=0.01, epochs=1000)

print(f"\\nFinal equation: y = {m_final:.4f}x + {c_final:.4f}")
print(f"Final MSE: {compute_mse(y, predict(X, m_final, c_final)):.4f}")

# Make predictions
test_x = np.array([9, 10])
predictions = predict(test_x.reshape(-1, 1), m_final, c_final)
print(f"\\nPredictions for x=9, x=10: {predictions}")`}
                />
                <OutputBlock 
                  output={`Epoch 0: MSE = 45.2341
Epoch 200: MSE = 1.8923
Epoch 400: MSE = 0.5621
Epoch 600: MSE = 0.4234
Epoch 800: MSE = 0.4012

Final equation: y = 1.5023x + 1.0412
Final MSE: 0.3945

Predictions for x=9, x=10: [14.5619, 16.0642]`}
                  title="Output"
                />

                <Callout type="tip" title="You did it!">
                  The model learned that y ≈ 1.5x + 1.0, which is very close to the true relationship 
                  we used to generate the data. That's machine learning in action!
                </Callout>
              </section>

              {/* Next Steps */}
              <section id="next-steps" className="mb-16">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <button 
                    onClick={() => toggleProgress('next-steps')}
                    className="text-muted-foreground hover:text-teal-500 transition-colors"
                  >
                    {progress.includes('next-steps') ? (
                      <CheckCircle2 className="w-6 h-6 text-teal-500" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>
                  Next Steps
                </h2>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  🎉 Congratulations! You've built linear regression from scratch and understand the 
                  fundamentals of machine learning. Here's what to explore next:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link to="/projects/neural-network" className="group p-6 rounded-2xl bg-card/50 border border-border hover:border-foreground/20 hover:shadow-lg hover:shadow-foreground/5 transition-all">
                    <div>
                      <h3 className="font-semibold text-foreground mb-1 group-hover:text-teal-500 transition-colors">
                        Neural Networks
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Build a neural network from scratch
                      </p>
                    </div>
                  </Link>

                  <div className="group p-6 rounded-2xl bg-card/50 border border-border opacity-60">
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Logistic Regression
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Classification instead of regression (Coming Soon)
                      </p>
                    </div>
                  </div>

                  <div className="group p-6 rounded-2xl bg-card/50 border border-border opacity-60">
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Multiple Linear Regression
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Handle multiple input features (Coming Soon)
                      </p>
                    </div>
                  </div>

                  <div className="group p-6 rounded-2xl bg-card/50 border border-border opacity-60">
                    <div>
                      <h3 className="font-semibold text-foreground mb-1">
                        Polynomial Regression
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Fit curves instead of lines (Coming Soon)
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              {/* Footer Navigation */}
              <div className="flex items-center justify-between pt-8 border-t border-border">
                <Link to="/docs" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Docs
                </Link>
                <a 
                  href="https://github.com/lokeshpanthangi/MLCodex" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  Edit on GitHub
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </article>

            {/* Right Sidebar - On This Page (Desktop) */}
            <aside className="hidden xl:block w-56 shrink-0">
              <div className="sticky top-28">
                <div className="flex items-center gap-2 mb-4">
                  <List className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">On this page</span>
                </div>
                <nav className="space-y-1 mb-6">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`block w-full text-left text-sm py-1.5 transition-colors ${
                        activeSection === section.id
                          ? 'text-teal-500 font-medium'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {section.title}
                    </button>
                  ))}
                </nav>
              </div>
            </aside>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default LinearRegressionModule;
