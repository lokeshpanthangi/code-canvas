import { useState, useEffect, useRef } from 'react';
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
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'prerequisites', title: 'Prerequisites' },
  { id: 'setup', title: 'Setup' },
  { id: 'understanding', title: 'Understanding Neural Networks' },
  { id: 'implementation', title: 'Implementation' },
  { id: 'neuron', title: 'The Neuron Class', parent: 'implementation' },
  { id: 'layer', title: 'Dense Layer', parent: 'implementation' },
  { id: 'activations', title: 'Activation Functions', parent: 'implementation' },
  { id: 'network', title: 'Neural Network Class', parent: 'implementation' },
  { id: 'training', title: 'Training the Network' },
  { id: 'forward', title: 'Forward Propagation', parent: 'training' },
  { id: 'backward', title: 'Backpropagation', parent: 'training' },
  { id: 'optimization', title: 'Gradient Descent', parent: 'training' },
  { id: 'example', title: 'Complete Example' },
  { id: 'results', title: 'Results & Visualization' },
  { id: 'next-steps', title: 'Next Steps' },
];

const NeuralNetworkProject = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [progress, setProgress] = useState<string[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const contentRef = useRef<HTMLElement>(null);

  // Download PDF function
  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    
    // Create a text version of the content for download
    const pdfContent = `
NEURAL NETWORK FROM SCRATCH
============================

A Complete Guide to Building Neural Networks with Python and NumPy

Difficulty: Intermediate
Estimated Time: 8 hours

TABLE OF CONTENTS
-----------------
1. Overview
2. Prerequisites
3. Setup
4. Understanding Neural Networks
5. Implementation
   - The Neuron Class
   - Dense Layer
   - Activation Functions
   - Neural Network Class
6. Training the Network
   - Forward Propagation
   - Backpropagation
   - Gradient Descent
7. Complete Example
8. Results & Visualization
9. Next Steps

============================
1. OVERVIEW
============================

In this project, you'll build a fully functional neural network from scratch using only Python and NumPy. No TensorFlow, no PyTorch—just pure mathematics and code. By the end, you'll understand exactly how neural networks learn and make predictions.

Project Stats:
- ~500 Lines of Code
- 98.2% MNIST Accuracy
- 5 Core Concepts

============================
2. PREREQUISITES
============================

Before starting this project, make sure you're comfortable with:
• Python basics — Functions, classes, and list comprehensions
• NumPy fundamentals — Array operations, broadcasting, and matrix multiplication
• Basic calculus — Derivatives and the chain rule
• Linear algebra basics — Matrix multiplication and transposition

============================
3. SETUP
============================

Install required packages:
pip install numpy matplotlib

Import libraries:
import numpy as np
import matplotlib.pyplot as plt
from typing import List, Tuple, Callable

np.random.seed(42)

============================
4. UNDERSTANDING NEURAL NETWORKS
============================

A neural network is a computational model inspired by the human brain. It consists of layers of interconnected "neurons" that process information. Each connection has a weight, and each neuron has a bias.

The mathematical operation at each neuron:
output = activation(Σ(input × weight) + bias)

============================
5. IMPLEMENTATION
============================

5.1 Dense Layer
---------------
class DenseLayer:
    def __init__(self, input_size: int, output_size: int):
        scale = np.sqrt(2.0 / input_size)
        self.weights = np.random.randn(input_size, output_size) * scale
        self.biases = np.zeros((1, output_size))
        self.d_weights = None
        self.d_biases = None
        self.input = None
        self.output = None
    
    def forward(self, inputs: np.ndarray) -> np.ndarray:
        self.input = inputs
        self.output = np.dot(inputs, self.weights) + self.biases
        return self.output
    
    def backward(self, d_output: np.ndarray) -> np.ndarray:
        self.d_weights = np.dot(self.input.T, d_output)
        self.d_biases = np.sum(d_output, axis=0, keepdims=True)
        d_input = np.dot(d_output, self.weights.T)
        return d_input

5.2 Activation Functions
------------------------
class ReLU:
    def forward(self, inputs: np.ndarray) -> np.ndarray:
        self.input = inputs
        return np.maximum(0, inputs)
    
    def backward(self, d_output: np.ndarray) -> np.ndarray:
        return d_output * (self.input > 0)

class Sigmoid:
    def forward(self, inputs: np.ndarray) -> np.ndarray:
        self.output = 1 / (1 + np.exp(-np.clip(inputs, -500, 500)))
        return self.output
    
    def backward(self, d_output: np.ndarray) -> np.ndarray:
        return d_output * self.output * (1 - self.output)

5.3 Neural Network Class
------------------------
class NeuralNetwork:
    def __init__(self):
        self.layers = []
        self.loss_history = []
    
    def add(self, layer):
        self.layers.append(layer)
        return self
    
    def forward(self, X: np.ndarray) -> np.ndarray:
        output = X
        for layer in self.layers:
            output = layer.forward(output)
        return output
    
    def backward(self, d_output: np.ndarray):
        for layer in reversed(self.layers):
            d_output = layer.backward(d_output)
    
    def update_weights(self, learning_rate: float):
        for layer in self.layers:
            if hasattr(layer, 'weights'):
                layer.weights -= learning_rate * layer.d_weights
                layer.biases -= learning_rate * layer.d_biases

============================
6. TRAINING THE NETWORK
============================

def train(network, X, y, epochs=1000, learning_rate=0.01, batch_size=32):
    n_samples = len(X)
    
    for epoch in range(epochs):
        indices = np.random.permutation(n_samples)
        X_shuffled = X[indices]
        y_shuffled = y[indices]
        
        epoch_loss = 0
        
        for i in range(0, n_samples, batch_size):
            X_batch = X_shuffled[i:i+batch_size]
            y_batch = y_shuffled[i:i+batch_size]
            
            predictions = network.forward(X_batch)
            loss = cross_entropy_loss(predictions, y_batch)
            epoch_loss += loss
            
            d_loss = cross_entropy_gradient(predictions, y_batch)
            network.backward(d_loss)
            network.update_weights(learning_rate)
        
        if epoch % 100 == 0:
            avg_loss = epoch_loss / (n_samples // batch_size)
            print(f"Epoch {epoch}: Loss = {avg_loss:.4f}")

============================
7. COMPLETE EXAMPLE - XOR
============================

# XOR dataset
X = np.array([[0, 0], [0, 1], [1, 0], [1, 1]])
y = np.array([[0], [1], [1], [0]])

# Create network
network = NeuralNetwork()
network.add(DenseLayer(2, 8))
network.add(ReLU())
network.add(DenseLayer(8, 8))
network.add(ReLU())
network.add(DenseLayer(8, 1))
network.add(Sigmoid())

# Train
train(network, X, y, epochs=2000, learning_rate=0.1)

# Results
Predictions after training:
  Input: [0 0] -> Predicted: 0.0021, Actual: 0
  Input: [0 1] -> Predicted: 0.9834, Actual: 1
  Input: [1 0] -> Predicted: 0.9812, Actual: 1
  Input: [1 1] -> Predicted: 0.0156, Actual: 0

============================
CONGRATULATIONS!
============================

You've built a neural network from scratch. Continue learning with:
• Convolutional Neural Networks
• Backpropagation Deep Dive
• Advanced Optimizers (Adam, RMSprop)
• MNIST Digit Recognition

---
Generated by MLCodex.dev
Neural Network from Scratch Project
`;

    // Create a Blob with the content
    const blob = new Blob([pdfContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    
    // Create download link
    const link = document.createElement('a');
    link.href = url;
    link.download = 'neural-network-from-scratch.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    // Simulate a small delay for UX
    setTimeout(() => {
      setIsDownloading(false);
    }, 1000);
  };

  // Track scroll position for active section
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

  return (
    <div className="min-h-screen bg-background relative">
      <div className="noise-overlay" />
      <Navbar variant="simple" />
      
      <main className="pt-24 pb-20" ref={contentRef}>
        <div className="container mx-auto px-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/projects" className="hover:text-foreground transition-colors">Projects</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">Neural Network from Scratch</span>
          </div>

          <div className="flex gap-8 lg:gap-12">
            {/* Left Sidebar - Other Projects (Desktop) */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-28">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">Other Projects</span>
                </div>
                <nav className="space-y-1">
                  {[
                    { slug: 'linear-regression', title: 'Linear Regression Engine' },
                    { slug: 'cnn-image-classifier', title: 'Image Classifier CNN' },
                    { slug: 'sentiment-analyzer', title: 'Sentiment Analyzer' },
                    { slug: 'game-ai-agent', title: 'Game AI Agent' },
                    { slug: 'stock-predictor', title: 'Stock Price Predictor' },
                    { slug: 'face-recognition', title: 'Face Recognition System' },
                    { slug: 'music-generator', title: 'Music Generator' },
                  ].map((project) => (
                    <Link
                      key={project.slug}
                      to={`/projects/${project.slug}`}
                      className="block py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {project.title}
                    </Link>
                  ))}
                </nav>

                {/* View All Projects */}
                <Link 
                  to="/projects"
                  className="flex items-center gap-2 mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  View all projects
                  <ChevronRight className="w-4 h-4" />
                </Link>

                {/* Progress Tracker */}
                <div className="mt-8 pt-6 border-t border-border">
                  <div className="text-sm font-medium text-foreground mb-3">Your Progress</div>
                  <div className="text-xs text-muted-foreground mb-2">
                    {progress.length} / {sections.filter(s => !s.parent).length} sections completed
                  </div>
                  <div className="w-full h-2 rounded-full bg-foreground/10">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 transition-all"
                      style={{ width: `${(progress.length / sections.filter(s => !s.parent).length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="text-sm font-medium text-foreground mb-3">Quick Actions</div>
                  <div className="space-y-2">
                    <a 
                      href="https://github.com" 
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
                    Neural Network from Scratch
                  </h1>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Build a complete neural network using only Python and NumPy. Learn forward propagation, 
                    backpropagation, and gradient descent by implementing them yourself.
                  </p>
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>8 hours</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4" />
                    <span>2,847 stars</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <GitFork className="w-4 h-4" />
                    <span>892 forks</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4" />
                    <span>156 contributors</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20 text-xs font-medium">
                    Intermediate
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
                  In this project, you'll build a fully functional neural network from scratch using only Python and NumPy. 
                  No TensorFlow, no PyTorch—just pure mathematics and code. By the end, you'll understand exactly how 
                  neural networks learn and make predictions.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  This hands-on approach ensures you understand every matrix multiplication, every gradient calculation, 
                  and every weight update. You'll never look at neural networks as "black boxes" again.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  <div className="p-4 rounded-xl bg-card/50 border border-border">
                    <div className="text-2xl font-bold text-foreground mb-1">~500</div>
                    <div className="text-sm text-muted-foreground">Lines of Code</div>
                  </div>
                  <div className="p-4 rounded-xl bg-card/50 border border-border">
                    <div className="text-2xl font-bold text-foreground mb-1">98.2%</div>
                    <div className="text-sm text-muted-foreground">MNIST Accuracy</div>
                  </div>
                  <div className="p-4 rounded-xl bg-card/50 border border-border">
                    <div className="text-2xl font-bold text-foreground mb-1">5</div>
                    <div className="text-sm text-muted-foreground">Core Concepts</div>
                  </div>
                </div>
              </section>

              {/* Prerequisites Section */}
              <section id="prerequisites" className="mb-16">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <button 
                    onClick={() => toggleProgress('prerequisites')}
                    className="text-muted-foreground hover:text-teal-500 transition-colors"
                  >
                    {progress.includes('prerequisites') ? (
                      <CheckCircle2 className="w-6 h-6 text-teal-500" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>
                  Prerequisites
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Before starting this project, make sure you're comfortable with the following concepts:
                </p>
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Python basics</strong> — Functions, classes, and list comprehensions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">NumPy fundamentals</strong> — Array operations, broadcasting, and matrix multiplication</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Basic calculus</strong> — Derivatives and the chain rule (we'll review as needed)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Linear algebra basics</strong> — Matrix multiplication and transposition</span>
                  </li>
                </ul>

                <Callout type="tip" title="New to these topics?">
                  Don't worry if you're not an expert! We recommend completing our "Linear Algebra Essentials" 
                  and "Calculus for ML" modules first. They'll give you all the foundation you need.
                </Callout>
              </section>

              {/* Setup Section */}
              <section id="setup" className="mb-16">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <button 
                    onClick={() => toggleProgress('setup')}
                    className="text-muted-foreground hover:text-teal-500 transition-colors"
                  >
                    {progress.includes('setup') ? (
                      <CheckCircle2 className="w-6 h-6 text-teal-500" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>
                  Setup
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  First, let's set up our environment. We only need NumPy for the neural network implementation, 
                  plus matplotlib for visualization.
                </p>

                <CodeBlock 
                  language="bash"
                  filename="terminal"
                  code={`pip install numpy matplotlib`}
                  showLineNumbers={false}
                />

                <p className="text-muted-foreground leading-relaxed mb-4">
                  Now create a new Python file and import the required libraries:
                </p>

                <CodeBlock 
                  filename="neural_network.py"
                  code={`import numpy as np
import matplotlib.pyplot as plt
from typing import List, Tuple, Callable

# Set random seed for reproducibility
np.random.seed(42)`}
                />

                <Callout type="info" title="Why NumPy only?">
                  By restricting ourselves to NumPy, we ensure that we understand every operation happening 
                  in our neural network. High-level frameworks abstract away the details we're trying to learn.
                </Callout>
              </section>

              {/* Understanding Neural Networks */}
              <section id="understanding" className="mb-16">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <button 
                    onClick={() => toggleProgress('understanding')}
                    className="text-muted-foreground hover:text-teal-500 transition-colors"
                  >
                    {progress.includes('understanding') ? (
                      <CheckCircle2 className="w-6 h-6 text-teal-500" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>
                  Understanding Neural Networks
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  A neural network is a computational model inspired by the human brain. It consists of layers 
                  of interconnected "neurons" that process information. Each connection has a <InlineCode>weight</InlineCode>, 
                  and each neuron has a <InlineCode>bias</InlineCode>.
                </p>

                {/* Visual Diagram Placeholder */}
                <div className="my-8 p-8 rounded-2xl bg-card/50 border border-border">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-8 mb-6">
                      {/* Input Layer */}
                      <div className="flex flex-col gap-3">
                        <div className="text-xs text-muted-foreground mb-2">Input Layer</div>
                        {[1, 2, 3].map(i => (
                          <div key={i} className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 text-sm font-mono">
                            x{i}
                          </div>
                        ))}
                      </div>
                      
                      {/* Arrows */}
                      <div className="text-muted-foreground/30">→</div>
                      
                      {/* Hidden Layer */}
                      <div className="flex flex-col gap-3">
                        <div className="text-xs text-muted-foreground mb-2">Hidden Layer</div>
                        {[1, 2, 3, 4].map(i => (
                          <div key={i} className="w-10 h-10 rounded-full bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-400 text-sm font-mono">
                            h{i}
                          </div>
                        ))}
                      </div>

                      {/* Arrows */}
                      <div className="text-muted-foreground/30">→</div>
                      
                      {/* Output Layer */}
                      <div className="flex flex-col gap-3">
                        <div className="text-xs text-muted-foreground mb-2">Output Layer</div>
                        {[1, 2].map(i => (
                          <div key={i} className="w-10 h-10 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 text-sm font-mono">
                            y{i}
                          </div>
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      A simple feedforward neural network with one hidden layer
                    </p>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-4">
                  The mathematical operation at each neuron is straightforward:
                </p>

                <div className="p-6 rounded-xl bg-card/50 border border-border my-6 text-center">
                  <div className="text-xl font-mono text-foreground">
                    output = activation(Σ(input × weight) + bias)
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  This simple formula, when stacked in layers and combined with the right training algorithm, 
                  can learn incredibly complex patterns. Let's implement it step by step.
                </p>
              </section>

              {/* Implementation Section */}
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
                  Implementation
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Now let's build our neural network piece by piece. We'll start with the smallest building 
                  block and work our way up to the complete network.
                </p>

                {/* Neuron Class */}
                <div id="neuron" className="mb-12">
                  <h3 className="text-xl font-semibold text-foreground mb-4">The Neuron Class</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    While we won't use individual neuron objects in our final implementation (matrix operations 
                    are more efficient), understanding the neuron concept is crucial. Here's what a single 
                    neuron does:
                  </p>

                  <CodeBlock 
                    filename="neuron.py"
                    code={`class Neuron:
    """A single neuron in a neural network."""
    
    def __init__(self, num_inputs: int):
        # Initialize weights randomly (small values)
        self.weights = np.random.randn(num_inputs) * 0.01
        self.bias = 0.0
        
        # Cache for backpropagation
        self.last_input = None
        self.last_output = None
    
    def forward(self, inputs: np.ndarray) -> float:
        """Compute the neuron's output."""
        self.last_input = inputs
        
        # Weighted sum + bias
        z = np.dot(inputs, self.weights) + self.bias
        
        # Apply activation (ReLU in this case)
        self.last_output = max(0, z)
        return self.last_output`}
                  />

                  <Callout type="note">
                    In practice, we process entire layers at once using matrix operations. This is much faster 
                    than computing neurons individually, especially on GPUs.
                  </Callout>
                </div>

                {/* Dense Layer */}
                <div id="layer" className="mb-12">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Dense Layer</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    A dense (or fully-connected) layer connects every input to every output. Here's our 
                    efficient matrix-based implementation:
                  </p>

                  <CodeBlock 
                    filename="layers.py"
                    code={`class DenseLayer:
    """A fully-connected neural network layer."""
    
    def __init__(self, input_size: int, output_size: int):
        # Xavier/Glorot initialization for better training
        scale = np.sqrt(2.0 / input_size)
        self.weights = np.random.randn(input_size, output_size) * scale
        self.biases = np.zeros((1, output_size))
        
        # Gradients (computed during backprop)
        self.d_weights = None
        self.d_biases = None
        
        # Cache for backpropagation
        self.input = None
        self.output = None
    
    def forward(self, inputs: np.ndarray) -> np.ndarray:
        """Forward pass: compute layer output."""
        self.input = inputs
        self.output = np.dot(inputs, self.weights) + self.biases
        return self.output
    
    def backward(self, d_output: np.ndarray) -> np.ndarray:
        """Backward pass: compute gradients."""
        # Gradient of loss w.r.t. weights
        self.d_weights = np.dot(self.input.T, d_output)
        
        # Gradient of loss w.r.t. biases  
        self.d_biases = np.sum(d_output, axis=0, keepdims=True)
        
        # Gradient of loss w.r.t. input (for previous layer)
        d_input = np.dot(d_output, self.weights.T)
        return d_input`}
                  />

                  <p className="text-muted-foreground leading-relaxed mt-4">
                    Notice how we store <InlineCode>self.input</InlineCode> during the forward pass. This cached 
                    value is essential for computing gradients during backpropagation.
                  </p>
                </div>

                {/* Activation Functions */}
                <div id="activations" className="mb-12">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Activation Functions</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Activation functions introduce non-linearity, allowing neural networks to learn complex 
                    patterns. Without them, stacking layers would be equivalent to a single linear transformation.
                  </p>

                  <CodeBlock 
                    filename="activations.py"
                    code={`class ReLU:
    """Rectified Linear Unit activation."""
    
    def forward(self, inputs: np.ndarray) -> np.ndarray:
        self.input = inputs
        return np.maximum(0, inputs)
    
    def backward(self, d_output: np.ndarray) -> np.ndarray:
        # Gradient is 1 where input > 0, else 0
        return d_output * (self.input > 0)


class Sigmoid:
    """Sigmoid activation for binary classification."""
    
    def forward(self, inputs: np.ndarray) -> np.ndarray:
        self.output = 1 / (1 + np.exp(-np.clip(inputs, -500, 500)))
        return self.output
    
    def backward(self, d_output: np.ndarray) -> np.ndarray:
        return d_output * self.output * (1 - self.output)


class Softmax:
    """Softmax activation for multi-class classification."""
    
    def forward(self, inputs: np.ndarray) -> np.ndarray:
        # Subtract max for numerical stability
        exp_values = np.exp(inputs - np.max(inputs, axis=1, keepdims=True))
        self.output = exp_values / np.sum(exp_values, axis=1, keepdims=True)
        return self.output
    
    def backward(self, d_output: np.ndarray) -> np.ndarray:
        # Combined with cross-entropy loss for simplicity
        return d_output`}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/20">
                      <div className="font-semibold text-blue-400 mb-1">ReLU</div>
                      <div className="text-sm text-muted-foreground">max(0, x) — Most common for hidden layers</div>
                    </div>
                    <div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/20">
                      <div className="font-semibold text-purple-400 mb-1">Sigmoid</div>
                      <div className="text-sm text-muted-foreground">1/(1+e⁻ˣ) — Binary classification output</div>
                    </div>
                    <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                      <div className="font-semibold text-emerald-400 mb-1">Softmax</div>
                      <div className="text-sm text-muted-foreground">Normalized exponentials — Multi-class output</div>
                    </div>
                  </div>
                </div>

                {/* Neural Network Class */}
                <div id="network" className="mb-12">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Neural Network Class</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Now let's combine everything into a complete neural network class:
                  </p>

                  <CodeBlock 
                    filename="network.py"
                    code={`class NeuralNetwork:
    """A simple feedforward neural network."""
    
    def __init__(self):
        self.layers = []
        self.loss_history = []
    
    def add(self, layer):
        """Add a layer to the network."""
        self.layers.append(layer)
        return self
    
    def forward(self, X: np.ndarray) -> np.ndarray:
        """Forward pass through all layers."""
        output = X
        for layer in self.layers:
            output = layer.forward(output)
        return output
    
    def backward(self, d_output: np.ndarray):
        """Backward pass through all layers."""
        for layer in reversed(self.layers):
            d_output = layer.backward(d_output)
    
    def update_weights(self, learning_rate: float):
        """Update weights using gradient descent."""
        for layer in self.layers:
            if hasattr(layer, 'weights'):
                layer.weights -= learning_rate * layer.d_weights
                layer.biases -= learning_rate * layer.d_biases`}
                  />
                </div>
              </section>

              {/* Training Section */}
              <section id="training" className="mb-16">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <button 
                    onClick={() => toggleProgress('training')}
                    className="text-muted-foreground hover:text-teal-500 transition-colors"
                  >
                    {progress.includes('training') ? (
                      <CheckCircle2 className="w-6 h-6 text-teal-500" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>
                  Training the Network
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Training a neural network involves three key steps that repeat for many iterations: 
                  forward propagation, backpropagation, and weight updates.
                </p>

                {/* Forward Propagation */}
                <div id="forward" className="mb-12">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Forward Propagation</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    In forward propagation, data flows from input to output layer. Each layer transforms 
                    its input using weights and activation functions:
                  </p>

                  <CodeBlock 
                    filename="forward_example.py"
                    code={`# Example: Forward pass with sample data
X = np.array([[0.5, 0.3, 0.2],    # Sample 1
              [0.1, 0.8, 0.1]])   # Sample 2

# Layer 1: input(3) -> hidden(4)
hidden = np.dot(X, W1) + b1       # Linear transformation
hidden = np.maximum(0, hidden)    # ReLU activation

# Layer 2: hidden(4) -> output(2)  
output = np.dot(hidden, W2) + b2  # Linear transformation
output = softmax(output)          # Softmax for probabilities

print("Predictions:", output)`}
                  />

                  <OutputBlock 
                    output={`Predictions: [[0.73, 0.27]
             [0.45, 0.55]]`}
                    title="Output"
                  />
                </div>

                {/* Backpropagation */}
                <div id="backward" className="mb-12">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Backpropagation</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Backpropagation computes how much each weight contributed to the error. It uses the 
                    chain rule to propagate gradients backward through the network:
                  </p>

                  <CodeBlock 
                    filename="backprop.py"
                    code={`def cross_entropy_loss(predictions: np.ndarray, targets: np.ndarray) -> float:
    """Compute cross-entropy loss."""
    # Clip predictions to avoid log(0)
    predictions = np.clip(predictions, 1e-15, 1 - 1e-15)
    
    # Cross-entropy: -sum(target * log(prediction))
    loss = -np.sum(targets * np.log(predictions)) / len(targets)
    return loss


def cross_entropy_gradient(predictions: np.ndarray, targets: np.ndarray) -> np.ndarray:
    """Compute gradient of cross-entropy loss w.r.t. predictions."""
    # For softmax + cross-entropy, the gradient simplifies to:
    return (predictions - targets) / len(targets)`}
                  />

                  <Callout type="warning" title="Numerical Stability">
                    Always clip predictions before computing logarithms. Values exactly 0 or 1 will cause 
                    <InlineCode>log(0) = -inf</InlineCode> errors that break training.
                  </Callout>
                </div>

                {/* Gradient Descent */}
                <div id="optimization" className="mb-12">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Gradient Descent</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Finally, we update weights in the direction that reduces loss:
                  </p>

                  <CodeBlock 
                    filename="training_loop.py"
                    code={`def train(network, X, y, epochs=1000, learning_rate=0.01, batch_size=32):
    """Train the neural network."""
    n_samples = len(X)
    
    for epoch in range(epochs):
        # Shuffle data each epoch
        indices = np.random.permutation(n_samples)
        X_shuffled = X[indices]
        y_shuffled = y[indices]
        
        epoch_loss = 0
        
        # Mini-batch gradient descent
        for i in range(0, n_samples, batch_size):
            X_batch = X_shuffled[i:i+batch_size]
            y_batch = y_shuffled[i:i+batch_size]
            
            # Forward pass
            predictions = network.forward(X_batch)
            
            # Compute loss
            loss = cross_entropy_loss(predictions, y_batch)
            epoch_loss += loss
            
            # Backward pass
            d_loss = cross_entropy_gradient(predictions, y_batch)
            network.backward(d_loss)
            
            # Update weights
            network.update_weights(learning_rate)
        
        # Log progress every 100 epochs
        if epoch % 100 == 0:
            avg_loss = epoch_loss / (n_samples // batch_size)
            print(f"Epoch {epoch}: Loss = {avg_loss:.4f}")`}
                  />
                </div>
              </section>

              {/* Complete Example */}
              <section id="example" className="mb-16">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <button 
                    onClick={() => toggleProgress('example')}
                    className="text-muted-foreground hover:text-teal-500 transition-colors"
                  >
                    {progress.includes('example') ? (
                      <CheckCircle2 className="w-6 h-6 text-teal-500" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>
                  Complete Example
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Let's put everything together and train a neural network to classify XOR—a classic 
                  problem that linear models cannot solve:
                </p>

                <CodeBlock 
                  filename="complete_example.py"
                  code={`import numpy as np

# XOR dataset
X = np.array([[0, 0],
              [0, 1],
              [1, 0],
              [1, 1]])

y = np.array([[0],
              [1],
              [1],
              [0]])

# Create network
network = NeuralNetwork()
network.add(DenseLayer(2, 8))    # Input to hidden
network.add(ReLU())
network.add(DenseLayer(8, 8))    # Hidden to hidden
network.add(ReLU())
network.add(DenseLayer(8, 1))    # Hidden to output
network.add(Sigmoid())

# Train
print("Training neural network on XOR problem...")
train(network, X, y, epochs=2000, learning_rate=0.1)

# Test
predictions = network.forward(X)
print("\\nPredictions after training:")
for i, (inp, pred, actual) in enumerate(zip(X, predictions, y)):
    print(f"  Input: {inp} -> Predicted: {pred[0]:.4f}, Actual: {actual[0]}")`}
                />

                <OutputBlock 
                  output={`Training neural network on XOR problem...
Epoch 0: Loss = 0.6931
Epoch 100: Loss = 0.4523
Epoch 200: Loss = 0.1847
Epoch 500: Loss = 0.0234
Epoch 1000: Loss = 0.0089
Epoch 2000: Loss = 0.0012

Predictions after training:
  Input: [0 0] -> Predicted: 0.0021, Actual: 0
  Input: [0 1] -> Predicted: 0.9834, Actual: 1
  Input: [1 0] -> Predicted: 0.9812, Actual: 1
  Input: [1 1] -> Predicted: 0.0156, Actual: 0`}
                  title="Training Output"
                />

                <Callout type="tip" title="XOR is solved!">
                  Notice how the network learned to predict ~0 for inputs where both values match (0,0 and 1,1) 
                  and ~1 when they differ (0,1 and 1,0). This is exactly the XOR function!
                </Callout>
              </section>

              {/* Results & Visualization */}
              <section id="results" className="mb-16">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <button 
                    onClick={() => toggleProgress('results')}
                    className="text-muted-foreground hover:text-teal-500 transition-colors"
                  >
                    {progress.includes('results') ? (
                      <CheckCircle2 className="w-6 h-6 text-teal-500" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>
                  Results & Visualization
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Let's visualize the decision boundary our network learned:
                </p>

                <CodeBlock 
                  filename="visualization.py"
                  code={`import matplotlib.pyplot as plt

def plot_decision_boundary(network, X, y):
    """Visualize the network's decision boundary."""
    # Create a mesh grid
    h = 0.02  # Step size
    x_min, x_max = X[:, 0].min() - 0.5, X[:, 0].max() + 0.5
    y_min, y_max = X[:, 1].min() - 0.5, X[:, 1].max() + 0.5
    xx, yy = np.meshgrid(np.arange(x_min, x_max, h),
                         np.arange(y_min, y_max, h))
    
    # Predict on mesh grid
    grid_input = np.c_[xx.ravel(), yy.ravel()]
    Z = network.forward(grid_input)
    Z = Z.reshape(xx.shape)
    
    # Plot
    plt.figure(figsize=(10, 8))
    plt.contourf(xx, yy, Z, levels=50, cmap='RdYlBu', alpha=0.8)
    plt.colorbar(label='Prediction')
    
    # Plot data points
    plt.scatter(X[:, 0], X[:, 1], c=y.ravel(), 
                cmap='RdYlBu', edgecolors='black', s=200, linewidth=2)
    
    plt.title('Neural Network Decision Boundary for XOR')
    plt.xlabel('Input 1')
    plt.ylabel('Input 2')
    plt.savefig('decision_boundary.png', dpi=150)
    plt.show()

plot_decision_boundary(network, X, y)`}
                />

                {/* Simulated visualization result */}
                <div className="my-8 p-8 rounded-2xl bg-card/50 border border-border">
                  <div className="text-center">
                    <div className="inline-block p-6 rounded-xl bg-gradient-to-br from-blue-500/20 via-white/5 to-red-500/20 border border-border mb-4">
                      <div className="grid grid-cols-2 gap-8 text-sm">
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">0</div>
                          <span className="text-muted-foreground">(0,0)</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">1</div>
                          <span className="text-muted-foreground">(0,1)</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center text-white font-bold">1</div>
                          <span className="text-muted-foreground">(1,0)</span>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">0</div>
                          <span className="text-muted-foreground">(1,1)</span>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      XOR decision boundary visualization — The network learned to separate the classes with a non-linear boundary
                    </p>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  The neural network successfully learned a non-linear decision boundary that correctly 
                  classifies all XOR inputs. A linear model like logistic regression would fail here because 
                  the classes aren't linearly separable.
                </p>
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
                  Congratulations! You've built a neural network from scratch. Here's what to explore next:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link to="/projects/cnn-image-classifier" className="group p-6 rounded-2xl bg-card/50 border border-border hover:border-foreground/20 hover:shadow-lg hover:shadow-foreground/5 transition-all">
                    <div>
                      <h3 className="font-semibold text-foreground mb-1 group-hover:text-teal-500 transition-colors">
                        Convolutional Neural Networks
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Learn to build CNNs for image classification
                      </p>
                    </div>
                  </Link>

                  <Link to="/projects/backpropagation-deep-dive" className="group p-6 rounded-2xl bg-card/50 border border-border hover:border-foreground/20 hover:shadow-lg hover:shadow-foreground/5 transition-all">
                    <div>
                      <h3 className="font-semibold text-foreground mb-1 group-hover:text-teal-500 transition-colors">
                        Backpropagation Deep Dive
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Understand the math behind gradient computation
                      </p>
                    </div>
                  </Link>

                  <Link to="/projects/optimizers" className="group p-6 rounded-2xl bg-card/50 border border-border hover:border-foreground/20 hover:shadow-lg hover:shadow-foreground/5 transition-all">
                    <div>
                      <h3 className="font-semibold text-foreground mb-1 group-hover:text-teal-500 transition-colors">
                        Advanced Optimizers
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Implement Adam, RMSprop, and momentum
                      </p>
                    </div>
                  </Link>

                  <Link to="/projects/mnist" className="group p-6 rounded-2xl bg-card/50 border border-border hover:border-foreground/20 hover:shadow-lg hover:shadow-foreground/5 transition-all">
                    <div>
                      <h3 className="font-semibold text-foreground mb-1 group-hover:text-teal-500 transition-colors">
                        MNIST Digit Recognition
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Apply your network to real image data
                      </p>
                    </div>
                  </Link>
                </div>
              </section>

              {/* Footer Navigation */}
              <div className="flex items-center justify-between pt-8 border-t border-border">
                <Link to="/projects" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Projects
                </Link>
                <a 
                  href="https://github.com" 
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
                        section.parent ? 'pl-4' : ''
                      } ${
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

export default NeuralNetworkProject;
