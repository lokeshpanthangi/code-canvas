import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { 
  ArrowLeft,
  ArrowRight,
  Cloud,
  Globe,
  Play,
  Layers,
  Settings,
  Terminal,
  LucideIcon
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Doc {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  tags: string[];
  comingSoon?: boolean;
  route: string;
}

const batchDocs: Doc[] = [
  {
    id: 'aws-deployment',
    title: 'Deploy on AWS',
    description: 'Deploy ML models on Amazon Web Services using SageMaker, Lambda, and EC2. Learn about auto-scaling and cost optimization.',
    icon: Cloud,
    difficulty: 'intermediate',
    tags: ['AWS', 'SageMaker', 'Lambda', 'EC2'],
    route: '/docs/batchdeployment/aws',
  },
  {
    id: 'gcp-deployment',
    title: 'Deploy on GCP',
    description: 'Use Google Cloud Platform services like Vertex AI, Cloud Run, and Cloud Functions to serve your ML models at scale.',
    icon: Globe,
    difficulty: 'intermediate',
    tags: ['GCP', 'Vertex AI', 'Cloud Run'],
    route: '/docs/batchdeployment/gcp',
  },
  {
    id: 'docker-containerization',
    title: 'Docker Containerization',
    description: 'Package your ML application into Docker containers for consistent deployment across any environment.',
    icon: Layers,
    difficulty: 'intermediate',
    tags: ['Docker', 'Containers', 'DevOps'],
    comingSoon: true,
    route: '#',
  },
  {
    id: 'kubernetes-orchestration',
    title: 'Kubernetes Orchestration',
    description: 'Scale your ML deployments with Kubernetes. Learn about pods, services, and horizontal pod autoscaling.',
    icon: Settings,
    difficulty: 'advanced',
    tags: ['Kubernetes', 'K8s', 'Orchestration'],
    comingSoon: true,
    route: '#',
  },
];

const onlineDocs: Doc[] = [
  {
    id: 'aws-online-deployment',
    title: 'Deploy on AWS',
    description: 'Deploy ML models for real-time inference on AWS using SageMaker endpoints, API Gateway, and Lambda.',
    icon: Cloud,
    difficulty: 'intermediate',
    tags: ['AWS', 'SageMaker', 'API Gateway'],
    route: '/docs/onlinedeployment/aws',
  },
  {
    id: 'gcp-online-deployment',
    title: 'Deploy on GCP',
    description: 'Serve ML models in real-time using Google Cloud Vertex AI endpoints, Cloud Run, and Cloud Functions.',
    icon: Globe,
    difficulty: 'intermediate',
    tags: ['GCP', 'Vertex AI', 'Cloud Run'],
    route: '/docs/onlinedeployment/gcp',
  },
];

const DocCard = ({ doc, index }: { doc: Doc; index: number }) => {
  const Icon = doc.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
    >
      <Link 
        to={doc.comingSoon ? '#' : doc.route}
        className={doc.comingSoon ? 'cursor-not-allowed' : ''}
      >
        <div className={`group relative h-full rounded-2xl bg-card/50 border border-border overflow-hidden transition-all duration-300 ${
          doc.comingSoon 
            ? 'opacity-60' 
            : 'cursor-pointer hover:border-foreground/20 hover:shadow-lg hover:shadow-foreground/5 hover:-translate-y-1'
        }`}>
          <div className="p-6">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-foreground/5 border border-foreground/10 flex items-center justify-center ${
                !doc.comingSoon ? 'group-hover:bg-teal-500/10 group-hover:border-teal-500/20' : ''
              } transition-colors duration-300`}>
                <Icon className={`w-6 h-6 text-muted-foreground ${
                  !doc.comingSoon ? 'group-hover:text-teal-400' : ''
                } transition-colors duration-300`} />
              </div>
              {doc.comingSoon && (
                <span className="text-[10px] px-2 py-1 rounded-full bg-foreground/5 text-foreground/50 border border-foreground/10 font-medium uppercase tracking-wider">
                  Coming Soon
                </span>
              )}
            </div>

            {/* Title & Description */}
            <h3 className={`text-lg font-semibold text-foreground mb-2 ${
              !doc.comingSoon ? 'group-hover:text-teal-400' : ''
            } transition-colors duration-300`}>
              {doc.title}
            </h3>
            <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
              {doc.description}
            </p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {doc.tags.slice(0, 3).map((tag) => (
                <span 
                  key={tag}
                  className="text-[10px] px-2 py-0.5 rounded-md bg-foreground/5 text-foreground/60 border border-foreground/10"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-end pt-4 border-t border-border/50">
              {!doc.comingSoon && (
                <div className="flex items-center gap-1 text-sm font-medium text-muted-foreground group-hover:text-teal-400 transition-colors duration-300">
                  <span>Read</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const ModelDeployment = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <div className="noise-overlay" />
      <Navbar />
      
      <main className="pt-24 lg:pt-32 pb-20">
        <div className="container mx-auto px-6">
          {/* Back Link */}
          <Link 
            to="/docs" 
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Docs</span>
          </Link>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[10px] px-2.5 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 font-medium uppercase tracking-wider">
                Advanced
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Model Deployment
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
              Take your ML models from notebook to production. Learn industry-standard deployment patterns, 
              cloud platforms, API design, and MLOps best practices.
            </p>
          </motion.div>
          {/* Batch Deployment Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-foreground mb-2">Batch Deployment</h2>
            <p className="text-muted-foreground mb-6">Deploy pre-trained models for batch inference and scheduled predictions</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {batchDocs.map((doc, index) => (
                <DocCard key={doc.id} doc={doc} index={index} />
              ))}
            </div>
          </motion.div>

          {/* Online Training Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-foreground mb-2">Online Deployment</h2>
            <p className="text-muted-foreground mb-6">Deploy models for real-time inference with low-latency endpoints</p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {onlineDocs.map((doc, index) => (
                <DocCard key={doc.id} doc={doc} index={index} />
              ))}
            </div>
          </motion.div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-20"
          >
            <div className="rounded-2xl bg-card/50 border border-border p-8 text-center">
              <Terminal className="w-12 h-12 text-teal-400 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-2">Ready to Deploy?</h3>
              <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
                Start with any doc that interests you, or follow our recommended learning path for a structured experience.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link to="/docs/batchdeployment/aws">
                  <Button className="bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white">
                    <Play className="w-4 h-4 mr-2" />
                    Start First Doc
                  </Button>
                </Link>
                <Link to="/projects">
                  <Button variant="outline" className="border-foreground/10 hover:bg-foreground/5">
                    View Related Projects
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
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

export default ModelDeployment;
