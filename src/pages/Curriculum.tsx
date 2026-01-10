import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import CurriculumSidebar from '@/components/curriculum/CurriculumSidebar';
import ModuleCard from '@/components/curriculum/ModuleCard';
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
  BarChart3
} from 'lucide-react';

const modules = [
  {
    id: 1,
    icon: Calculator,
    title: 'Linear Algebra Essentials',
    description: 'Master vectors, matrices, and transformations that form the backbone of ML computations.',
    difficulty: 'beginner' as const,
    codePreview: ['class Matrix:', 'def dot_product(self, other):', '    # Compute matrix multiplication'],
    estimatedTime: '3 hours',
    section: 'foundations',
  },
  {
    id: 2,
    icon: TrendingUp,
    title: 'Linear Regression',
    description: 'Build your first ML model from scratch. Understand gradient descent and optimization.',
    difficulty: 'beginner' as const,
    codePreview: ['class LinearRegression:', 'def fit(self, X, y):', '    # Minimize loss function'],
    estimatedTime: '2 hours',
    section: 'foundations',
  },
  {
    id: 3,
    icon: Binary,
    title: 'Logistic Regression',
    description: 'Learn classification with the sigmoid function and cross-entropy loss.',
    difficulty: 'beginner' as const,
    codePreview: ['class LogisticRegression:', 'def sigmoid(self, z):', '    # Apply activation'],
    estimatedTime: '2.5 hours',
    section: 'foundations',
  },
  {
    id: 4,
    icon: Network,
    title: 'Neural Networks',
    description: 'Build a multi-layer perceptron from scratch using NumPy matrices.',
    difficulty: 'intermediate' as const,
    codePreview: ['class NeuralNetwork:', 'def forward(self, X):', '    # Propagate through layers'],
    estimatedTime: '4 hours',
    section: 'neural-networks',
  },
  {
    id: 5,
    icon: Layers,
    title: 'Backpropagation',
    description: 'Implement the chain rule to compute gradients through your network.',
    difficulty: 'intermediate' as const,
    codePreview: ['class BackProp:', 'def backward(self, loss):', '    # Chain rule magic'],
    estimatedTime: '3.5 hours',
    section: 'neural-networks',
  },
  {
    id: 6,
    icon: Zap,
    title: 'Activation Functions',
    description: 'ReLU, Sigmoid, Tanh, and more. Understand when and why to use each.',
    difficulty: 'intermediate' as const,
    codePreview: ['class Activations:', 'def relu(self, x):', '    # Max(0, x)'],
    estimatedTime: '1.5 hours',
    section: 'neural-networks',
  },
  {
    id: 7,
    icon: Eye,
    title: 'Convolutional Networks',
    description: 'Build CNNs for image recognition. Learn convolutions, pooling, and feature maps.',
    difficulty: 'advanced' as const,
    codePreview: ['class Conv2D:', 'def convolve(self, input, kernel):', '    # Slide kernel over input'],
    estimatedTime: '5 hours',
    section: 'deep-learning',
  },
  {
    id: 8,
    icon: MessageSquare,
    title: 'Recurrent Networks',
    description: 'Sequence modeling with RNNs and LSTMs. Capture temporal dependencies.',
    difficulty: 'advanced' as const,
    codePreview: ['class LSTM:', 'def step(self, x, h_prev, c_prev):', '    # Update cell state'],
    estimatedTime: '4 hours',
    section: 'deep-learning',
  },
  {
    id: 9,
    icon: GitBranch,
    title: 'Attention Mechanism',
    description: 'The foundation of transformers. Learn self-attention and multi-head attention.',
    difficulty: 'advanced' as const,
    codePreview: ['class Attention:', 'def scaled_dot_product(self, Q, K, V):', '    # Compute attention scores'],
    estimatedTime: '4 hours',
    section: 'advanced',
  },
  {
    id: 10,
    icon: Box,
    title: 'Transformers',
    description: 'Build the architecture that powers modern LLMs from the ground up.',
    difficulty: 'advanced' as const,
    codePreview: ['class Transformer:', 'def encode(self, src):', '    # Multi-head self-attention'],
    estimatedTime: '6 hours',
    section: 'advanced',
  },
  {
    id: 11,
    icon: Cpu,
    title: 'GPU Optimization',
    description: 'Learn to optimize your implementations for modern hardware acceleration.',
    difficulty: 'advanced' as const,
    codePreview: ['class CUDAKernel:', 'def parallel_matmul(self, A, B):', '    # Tiled matrix multiply'],
    estimatedTime: '4 hours',
    section: 'advanced',
  },
  {
    id: 12,
    icon: BarChart3,
    title: 'Model Deployment',
    description: 'Take your models to production with proper serving infrastructure.',
    difficulty: 'intermediate' as const,
    codePreview: ['class ModelServer:', 'def predict(self, request):', '    # Batch inference'],
    estimatedTime: '3 hours',
    section: 'projects',
  },
];

const Curriculum = () => {
  const [activeSection, setActiveSection] = useState('all');

  const filteredModules = activeSection === 'all' 
    ? modules 
    : modules.filter(m => m.section === activeSection);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="flex pt-16">
        <CurriculumSidebar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection} 
        />

        {/* Main Content */}
        <main className="flex-1 min-w-0">
          <div className="p-8 lg:p-12">
            {/* Header */}
            <div className="mb-10">
              <h1 className="text-4xl font-bold text-foreground mb-3">ML Curriculum</h1>
              <p className="text-lg text-muted-foreground max-w-2xl">
                Master machine learning by building every algorithm from scratch. 
                No frameworks, just pure understanding.
              </p>
            </div>

            {/* Tabs for Mobile */}
            <div className="flex gap-2 mb-8 overflow-x-auto pb-2 lg:hidden">
              {['all', 'foundations', 'neural-networks', 'deep-learning', 'advanced'].map((section) => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                    activeSection === section
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-card border border-border text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {section === 'all' ? 'All' : section.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}
                </button>
              ))}
            </div>

            {/* Modules Grid */}
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredModules.map((module) => (
                <ModuleCard
                  key={module.id}
                  icon={module.icon}
                  title={module.title}
                  description={module.description}
                  difficulty={module.difficulty}
                  codePreview={module.codePreview}
                  estimatedTime={module.estimatedTime}
                />
              ))}
            </div>

            {filteredModules.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No modules found in this section.</p>
              </div>
            )}
          </div>

          <Footer />
        </main>
      </div>
    </div>
  );
};

export default Curriculum;
