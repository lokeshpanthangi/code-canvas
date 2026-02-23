import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import {
  ArrowUpRight,
  Clock,
  FileCode2,
} from 'lucide-react';

interface Assignment {
  id: number;
  title: string;
  slug: string;
  description: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
  tags: string[];
  estimatedTime: string;
  totalQuestions: number;
  color: string;
}

const assignments: Assignment[] = [
  {
    id: 1,
    title: 'Basic RAG Building',
    slug: 'basic-rag',
    description:
      'Build a Retrieval-Augmented Generation pipeline from scratch. Load documents, create embeddings, store them in a vector database, and query an LLM with retrieved context.',
    difficulty: 'intermediate',
    category: 'Generative AI',
    tags: ['LangChain', 'Embeddings', 'Vector DB', 'LLM'],
    estimatedTime: '2 hours',
    totalQuestions: 5,
    color: 'teal',
  },
  {
    id: 2,
    title: 'Linear Regression on a Dataset',
    slug: 'linear-regression',
    description:
      'Implement linear regression from first principles on a real-world dataset. Perform EDA, feature engineering, model training, evaluation, and visualization.',
    difficulty: 'beginner',
    category: 'Fundamentals',
    tags: ['NumPy', 'Pandas', 'Scikit-learn', 'Matplotlib'],
    estimatedTime: '1.5 hours',
    totalQuestions: 4,
    color: 'cyan',
  },
];

const difficultyStyles: Record<string, string> = {
  beginner: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
  intermediate: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  advanced: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
};

const colorGradient: Record<string, string> = {
  teal: 'from-teal-500/10',
  cyan: 'from-cyan-500/10',
};

const Assignments = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <div className="noise-overlay" />
      <Navbar />

      <main className="pt-32 lg:pt-40 pb-20">
        {/* Header — left-aligned */}
        <section className="container mx-auto px-6 mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            Assignments{' '}
            <span className="bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-500 bg-clip-text text-transparent">
              & Challenges
            </span>
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Put your knowledge to the test. Each assignment gives you a real problem, expected outputs, and a code editor — write, run and evaluate your solution right here.
          </p>
        </section>

        {/* Cards grid — same layout as Projects page */}
        <section className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {assignments.map((assignment) => (
              <Link
                key={assignment.id}
                to={`/assignments/${assignment.slug}`}
                className="group relative rounded-3xl bg-card/50 border border-border overflow-hidden cursor-pointer hover:border-foreground/20 hover:shadow-lg hover:shadow-foreground/5 transition-all"
              >
                {/* Gradient overlay on hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
                    colorGradient[assignment.color] ?? 'from-teal-500/10'
                  } to-transparent`}
                />

                <div className="relative z-10 p-6">
                  {/* Top row */}
                  <div className="flex items-start justify-between mb-5">
                    <span className="text-xs text-muted-foreground font-medium uppercase tracking-wider">
                      {assignment.category}
                    </span>
                    <span
                      className={`text-xs px-2.5 py-1 rounded-full border font-medium ${difficultyStyles[assignment.difficulty]}`}
                    >
                      {assignment.difficulty.charAt(0).toUpperCase() + assignment.difficulty.slice(1)}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-foreground transition-colors">
                    {assignment.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground leading-relaxed mb-5">
                    {assignment.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {assignment.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-0.5 rounded-full bg-foreground/5 text-foreground/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/30">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{assignment.estimatedTime}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FileCode2 className="w-3.5 h-3.5" />
                        <span>{assignment.totalQuestions} tasks</span>
                      </div>
                    </div>
                    <span className="flex items-center gap-1 text-sm font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                      Start
                      <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Assignments;
