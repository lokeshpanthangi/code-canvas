import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { CodeBlock, Callout, OutputBlock, InlineCode } from '@/components/project/CodeBlock';
import { 
  ChevronRight, 
  Clock, 
  ArrowLeft,
  Github,
  BookOpen,
  List,
  CheckCircle2,
  Circle,
  Download,
  Loader2,
  ArrowRight
} from 'lucide-react';

const sections = [
  { id: 'introduction', title: 'Introduction' },
  { id: 'understanding-batch', title: 'Understanding Batch Inference' },
  { id: 'how-sagemaker-works', title: 'How SageMaker Works' },
  { id: 'prerequisites', title: 'Prerequisites' },
  { id: 'inference-script', title: 'The Inference Script' },
  { id: 'packaging', title: 'Packaging Your Model' },
  { id: 'uploading', title: 'Uploading to S3' },
  { id: 'running-job', title: 'Running the Batch Job' },
  { id: 'results', title: 'Getting Your Results' },
  { id: 'next-steps', title: 'Next Steps' },
];

const BatchDeploymentAWS = () => {
  const [activeSection, setActiveSection] = useState('introduction');
  const [progress, setProgress] = useState<string[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const contentRef = useRef<HTMLElement>(null);

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    setTimeout(() => setIsDownloading(false), 1000);
  };

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
            <Link to="/docs" className="hover:text-foreground transition-colors">Docs</Link>
            <ChevronRight className="w-4 h-4" />
            <Link to="/docs/model-deployment" className="hover:text-foreground transition-colors">Model Deployment</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">Batch Inference on AWS</span>
          </div>

          <div className="flex gap-8 lg:gap-12">
            {/* Left Sidebar */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-28">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">Related Docs</span>
                </div>
                <nav className="space-y-1">
                  {[
                    { slug: '/docs/batchdeployment/gcp', title: 'Batch Inference on GCP' },
                    { slug: '/docs/onlinedeployment/aws', title: 'Real-Time Inference on AWS' },
                    { slug: '/docs/onlinedeployment/gcp', title: 'Real-Time Inference on GCP' },
                  ].map((doc) => (
                    <Link
                      key={doc.slug}
                      to={doc.slug}
                      className="block py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {doc.title}
                    </Link>
                  ))}
                </nav>

                {/* Progress Tracker */}
                <div className="mt-8 pt-6 border-t border-border">
                  <div className="text-sm font-medium text-foreground mb-3">Your Progress</div>
                  <div className="text-xs text-muted-foreground mb-2">
                    {progress.length} / {sections.length} sections
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-foreground/10">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 transition-all"
                      style={{ width: `${(progress.length / sections.length) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="space-y-2">
                    <a 
                      href="https://github.com/lokeshpanthangi/MLCodex" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors py-1"
                    >
                      <Github className="w-4 h-4" />
                      View on GitHub
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
                      Download PDF
                    </button>
                  </div>
                </div>
              </div>
            </aside>

            {/* Main Content */}
            <article className="flex-1 min-w-0 max-w-3xl">
              {/* Header */}
              <header className="mb-12">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs px-2.5 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 font-medium uppercase tracking-wider">
                    AWS SageMaker
                  </span>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-foreground/10 text-muted-foreground border border-border font-medium">
                    Batch Inference
                  </span>
                </div>
                <h1 className="text-4xl font-bold tracking-tight mb-4">
                  Deploy Your ML Model for Batch Inference on AWS
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  A comprehensive guide to taking a machine learning model you've trained on your 
                  local machine and deploying it to AWS SageMaker for batch inference. We'll explain 
                  every concept and decision along the way.
                </p>
                <div className="flex items-center gap-4 mt-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>45-60 minutes</span>
                  </div>
                  <span className="text-border">•</span>
                  <span>Last updated: January 2026</span>
                </div>
              </header>

              {/* ==================== INTRODUCTION ==================== */}
              <section id="introduction" className="mb-16">
                <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
                  <button 
                    onClick={() => toggleProgress('introduction')}
                    className="text-muted-foreground hover:text-teal-500 transition-colors"
                  >
                    {progress.includes('introduction') ? (
                      <CheckCircle2 className="w-6 h-6 text-teal-500" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>
                  Introduction
                </h2>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  You've trained a machine learning model on your local machine. It works great when you 
                  run predictions in your Jupyter notebook or Python script. But now you need to run 
                  predictions on thousands—or even millions—of records. Running them locally would take 
                  forever, and your laptop would probably crash.
                </p>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  This is where <strong className="text-foreground">AWS SageMaker Batch Transform</strong> comes 
                  in. It allows you to take your locally trained model, upload it to AWS, and run predictions 
                  on massive datasets using AWS's infrastructure. Once the job is done, you get a file with 
                  all your predictions, and AWS shuts down the servers automatically.
                </p>

                <p className="text-muted-foreground leading-relaxed">
                  In this guide, we'll walk through the entire process step by step. More importantly, we'll 
                  explain <em>why</em> each step is necessary and what's happening behind the scenes, so you 
                  truly understand the deployment process rather than just copying code.
                </p>
              </section>

              {/* ==================== UNDERSTANDING BATCH ==================== */}
              <section id="understanding-batch" className="mb-16">
                <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
                  <button 
                    onClick={() => toggleProgress('understanding-batch')}
                    className="text-muted-foreground hover:text-teal-500 transition-colors"
                  >
                    {progress.includes('understanding-batch') ? (
                      <CheckCircle2 className="w-6 h-6 text-teal-500" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>
                  Understanding Batch Inference
                </h2>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  Before we dive into the implementation, let's understand what batch inference actually means 
                  and when you should use it.
                </p>

                <h3 className="text-lg font-medium text-foreground mb-3">What is Batch Inference?</h3>
                
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Batch inference is the process of running your ML model on a large collection of data all at 
                  once, rather than one record at a time. Think of it like this: instead of asking your model 
                  "What's the prediction for this single customer?" thousands of times, you give it a spreadsheet 
                  of all your customers and say "Give me predictions for everyone."
                </p>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  The key characteristic of batch inference is that it's <strong className="text-foreground">asynchronous</strong>. 
                  You submit a job, it runs in the background (potentially for minutes or hours depending on your 
                  data size), and you retrieve the results when it's done. This is different from real-time inference, 
                  where you send a request and get an immediate response.
                </p>

                <h3 className="text-lg font-medium text-foreground mb-3">When Should You Use Batch Inference?</h3>

                <p className="text-muted-foreground leading-relaxed mb-4">
                  Batch inference is the right choice when:
                </p>

                <ul className="space-y-3 text-muted-foreground mb-6">
                  <li className="flex items-start gap-3">
                    <span className="text-teal-500 font-bold mt-0.5">•</span>
                    <span>
                      <strong className="text-foreground">You don't need immediate results.</strong> If you're 
                      generating predictions for a nightly report, weekly analysis, or monthly scoring, waiting 
                      a few hours is perfectly fine.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-teal-500 font-bold mt-0.5">•</span>
                    <span>
                      <strong className="text-foreground">You have a large dataset.</strong> Processing 100,000+ 
                      records is where batch inference really shines. The cost per prediction is much lower than 
                      maintaining a real-time endpoint.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-teal-500 font-bold mt-0.5">•</span>
                    <span>
                      <strong className="text-foreground">Your predictions are scheduled.</strong> Running daily 
                      fraud detection on all transactions, weekly churn predictions, or monthly customer segmentation 
                      are perfect use cases.
                    </span>
                  </li>
                </ul>

                <p className="text-muted-foreground leading-relaxed">
                  On the other hand, if you need predictions in milliseconds (like a recommendation engine on a 
                  website), you should use real-time inference with a SageMaker endpoint instead. We cover that 
                  in the <Link to="/docs/onlinedeployment/aws" className="text-teal-500 hover:underline">Real-Time Inference guide</Link>.
                </p>
              </section>

              {/* ==================== HOW SAGEMAKER WORKS ==================== */}
              <section id="how-sagemaker-works" className="mb-16">
                <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
                  <button 
                    onClick={() => toggleProgress('how-sagemaker-works')}
                    className="text-muted-foreground hover:text-teal-500 transition-colors"
                  >
                    {progress.includes('how-sagemaker-works') ? (
                      <CheckCircle2 className="w-6 h-6 text-teal-500" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>
                  How SageMaker Batch Transform Works
                </h2>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  To successfully deploy your model, you need to understand what SageMaker expects and what it 
                  does behind the scenes. This understanding will help you debug issues and make informed decisions.
                </p>

                <h3 className="text-lg font-medium text-foreground mb-3">The Components</h3>

                <p className="text-muted-foreground leading-relaxed mb-4">
                  A SageMaker batch transform job involves four key components:
                </p>

                <div className="space-y-4 mb-6">
                  <div className="pl-4 border-l-2 border-teal-500/50">
                    <h4 className="font-medium text-foreground mb-1">1. Your Model Artifact</h4>
                    <p className="text-muted-foreground text-sm">
                      This is your trained model file (like a <InlineCode>.joblib</InlineCode> or <InlineCode>.pkl</InlineCode> file) 
                      packaged in a specific format. SageMaker needs this in a <InlineCode>.tar.gz</InlineCode> archive 
                      stored in S3.
                    </p>
                  </div>

                  <div className="pl-4 border-l-2 border-teal-500/50">
                    <h4 className="font-medium text-foreground mb-1">2. The Inference Script</h4>
                    <p className="text-muted-foreground text-sm">
                      A Python script that tells SageMaker how to load your model and how to process incoming data. 
                      This is crucial—SageMaker doesn't magically know how your model works. You need to tell it.
                    </p>
                  </div>

                  <div className="pl-4 border-l-2 border-teal-500/50">
                    <h4 className="font-medium text-foreground mb-1">3. A Container Image</h4>
                    <p className="text-muted-foreground text-sm">
                      SageMaker runs your model inside a Docker container. AWS provides pre-built containers for 
                      common frameworks like scikit-learn, PyTorch, and TensorFlow, so you typically don't need 
                      to build your own.
                    </p>
                  </div>

                  <div className="pl-4 border-l-2 border-teal-500/50">
                    <h4 className="font-medium text-foreground mb-1">4. Input Data in S3</h4>
                    <p className="text-muted-foreground text-sm">
                      The data you want predictions for must be uploaded to Amazon S3. SageMaker reads from S3, 
                      processes the data, and writes the results back to S3.
                    </p>
                  </div>
                </div>

                <h3 className="text-lg font-medium text-foreground mb-3">What Happens When You Start a Job</h3>

                <p className="text-muted-foreground leading-relaxed mb-4">
                  When you start a batch transform job, here's the sequence of events:
                </p>

                <ol className="space-y-3 text-muted-foreground mb-6">
                  <li className="flex items-start gap-3">
                    <span className="text-teal-500 font-medium">1.</span>
                    <span>
                      <strong className="text-foreground">SageMaker provisions EC2 instances</strong> based on the 
                      instance type and count you specified. These are temporary—they only exist for the duration 
                      of your job.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-teal-500 font-medium">2.</span>
                    <span>
                      <strong className="text-foreground">The container starts</strong> and downloads your model 
                      artifact from S3. It extracts the <InlineCode>.tar.gz</InlineCode> file and calls 
                      your <InlineCode>model_fn</InlineCode> function to load the model into memory.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-teal-500 font-medium">3.</span>
                    <span>
                      <strong className="text-foreground">SageMaker reads your input data from S3</strong> and 
                      splits it into batches. Each batch is sent to your inference script for processing.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-teal-500 font-medium">4.</span>
                    <span>
                      <strong className="text-foreground">Your inference script processes each batch</strong>—deserializing 
                      the input, running predictions, and serializing the output.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-teal-500 font-medium">5.</span>
                    <span>
                      <strong className="text-foreground">Results are written to S3</strong> as the job progresses. 
                      Once all data is processed, the instances are terminated automatically.
                    </span>
                  </li>
                </ol>

                <p className="text-muted-foreground leading-relaxed">
                  Understanding this flow is important because most errors occur during steps 2 or 4—either your 
                  model fails to load, or your inference script can't process the input format.
                </p>
              </section>

              {/* ==================== PREREQUISITES ==================== */}
              <section id="prerequisites" className="mb-16">
                <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
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

                <p className="text-muted-foreground leading-relaxed mb-6">
                  Before we begin, make sure you have the following set up. If you're missing any of these, 
                  complete the setup before continuing—trying to debug deployment issues while also dealing 
                  with authentication problems is frustrating.
                </p>

                <h3 className="text-lg font-medium text-foreground mb-3">AWS Account and Credentials</h3>

                <p className="text-muted-foreground leading-relaxed mb-4">
                  You need an AWS account with permissions to use SageMaker and S3. Specifically, your IAM user 
                  or role needs the <InlineCode>AmazonSageMakerFullAccess</InlineCode> policy (or equivalent 
                  custom permissions).
                </p>

                <p className="text-muted-foreground leading-relaxed mb-4">
                  Configure your credentials using the AWS CLI:
                </p>

                <CodeBlock 
                  language="bash"
                  filename="terminal"
                  code={`aws configure`}
                  showLineNumbers={false}
                />

                <p className="text-muted-foreground leading-relaxed mt-4 mb-6">
                  This will prompt you for your Access Key ID, Secret Access Key, default region, and output 
                  format. Your credentials are stored in <InlineCode>~/.aws/credentials</InlineCode>.
                </p>

                <h3 className="text-lg font-medium text-foreground mb-3">Python Environment</h3>

                <p className="text-muted-foreground leading-relaxed mb-4">
                  We'll use Python with the AWS SDK (boto3) and the SageMaker SDK. Install them in your 
                  virtual environment:
                </p>

                <CodeBlock 
                  language="bash"
                  filename="terminal"
                  code={`pip install boto3 sagemaker pandas scikit-learn joblib`}
                  showLineNumbers={false}
                />

                <p className="text-muted-foreground leading-relaxed mt-4 mb-6">
                  The <InlineCode>boto3</InlineCode> library is the general-purpose AWS SDK. 
                  The <InlineCode>sagemaker</InlineCode> library provides higher-level abstractions 
                  specifically for machine learning workflows. We use both.
                </p>

                <h3 className="text-lg font-medium text-foreground mb-3">A Trained Model</h3>

                <p className="text-muted-foreground leading-relaxed mb-4">
                  You should have a trained scikit-learn model saved locally. If you don't have one yet, 
                  here's a quick example to create a simple model for testing:
                </p>

                <CodeBlock 
                  filename="train_model.py"
                  code={`import joblib
from sklearn.datasets import load_iris
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

# Load sample data
iris = load_iris()
X_train, X_test, y_train, y_test = train_test_split(
    iris.data, iris.target, test_size=0.2, random_state=42
)

# Train a simple model
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Check accuracy
accuracy = model.score(X_test, y_test)
print(f"Model accuracy: {accuracy:.2%}")

# Save the model
joblib.dump(model, 'model.joblib')
print("Model saved to model.joblib")`}
                />

                <p className="text-muted-foreground leading-relaxed mt-4">
                  This creates a Random Forest classifier trained on the Iris dataset. The model file 
                  <InlineCode>model.joblib</InlineCode> is what we'll deploy to SageMaker.
                </p>
              </section>

              {/* ==================== INFERENCE SCRIPT ==================== */}
              <section id="inference-script" className="mb-16">
                <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
                  <button 
                    onClick={() => toggleProgress('inference-script')}
                    className="text-muted-foreground hover:text-teal-500 transition-colors"
                  >
                    {progress.includes('inference-script') ? (
                      <CheckCircle2 className="w-6 h-6 text-teal-500" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>
                  The Inference Script
                </h2>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  The inference script is the most important piece of your deployment. It's a Python file that 
                  tells SageMaker exactly how to work with your model. Without it, SageMaker has no idea how 
                  to load your model file or what format your input data will be in.
                </p>

                <h3 className="text-lg font-medium text-foreground mb-3">The Four Functions</h3>

                <p className="text-muted-foreground leading-relaxed mb-4">
                  For scikit-learn models, your inference script needs to define four functions. Let's understand 
                  what each one does before looking at the code:
                </p>

                <div className="space-y-4 mb-6">
                  <div className="pl-4 border-l-2 border-blue-500/50">
                    <h4 className="font-medium text-foreground mb-1">model_fn(model_dir)</h4>
                    <p className="text-muted-foreground text-sm">
                      Called once when the container starts. Its job is to load your model from disk and return 
                      the model object. The <InlineCode>model_dir</InlineCode> parameter is the path where 
                      SageMaker extracted your model artifact.
                    </p>
                  </div>

                  <div className="pl-4 border-l-2 border-blue-500/50">
                    <h4 className="font-medium text-foreground mb-1">input_fn(request_body, content_type)</h4>
                    <p className="text-muted-foreground text-sm">
                      Called for each batch of input data. Its job is to parse the raw input (which comes as a 
                      string or bytes) into a format your model can use (typically a NumPy array). 
                      The <InlineCode>content_type</InlineCode> tells you the format (CSV, JSON, etc.).
                    </p>
                  </div>

                  <div className="pl-4 border-l-2 border-blue-500/50">
                    <h4 className="font-medium text-foreground mb-1">predict_fn(input_data, model)</h4>
                    <p className="text-muted-foreground text-sm">
                      Called after input_fn. It receives the processed input data and the loaded model. 
                      This is where you actually call <InlineCode>model.predict()</InlineCode>. Return 
                      the predictions.
                    </p>
                  </div>

                  <div className="pl-4 border-l-2 border-blue-500/50">
                    <h4 className="font-medium text-foreground mb-1">output_fn(prediction, accept)</h4>
                    <p className="text-muted-foreground text-sm">
                      Called after predict_fn. Its job is to convert the predictions (usually a NumPy array) 
                      back into a string format for the output file. The <InlineCode>accept</InlineCode> parameter 
                      indicates the desired output format.
                    </p>
                  </div>
                </div>

                <h3 className="text-lg font-medium text-foreground mb-3">The Complete Inference Script</h3>

                <p className="text-muted-foreground leading-relaxed mb-4">
                  Here's a complete inference script with detailed comments explaining each part:
                </p>

                <CodeBlock 
                  filename="inference.py"
                  code={`import joblib
import os
import numpy as np
from io import StringIO

def model_fn(model_dir):
    """
    Load the model from the directory where SageMaker extracted model.tar.gz.
    
    This function is called once when the container starts, not for every prediction.
    The model is kept in memory and reused for all subsequent predictions.
    
    Parameters:
        model_dir (str): The path to the directory containing model artifacts.
                         SageMaker extracts model.tar.gz to this directory.
    
    Returns:
        The loaded model object.
    """
    # Construct the path to the model file
    model_path = os.path.join(model_dir, 'model.joblib')
    
    # Load and return the model
    model = joblib.load(model_path)
    print(f"Model loaded successfully from {model_path}")
    return model


def input_fn(request_body, content_type):
    """
    Parse the incoming request data into a format the model can use.
    
    For batch transform, SageMaker reads your input file from S3, splits it into
    chunks, and sends each chunk to this function. The content_type tells you
    what format the data is in.
    
    Parameters:
        request_body (str): The raw input data as a string.
        content_type (str): The MIME type of the input (e.g., 'text/csv').
    
    Returns:
        A NumPy array that can be passed to predict_fn.
    """
    if content_type == 'text/csv':
        # Parse CSV data into a NumPy array
        # We use StringIO to treat the string as a file
        lines = request_body.strip().split('\\n')
        data = []
        for line in lines:
            # Convert each line to a list of floats
            values = [float(x) for x in line.split(',')]
            data.append(values)
        return np.array(data)
    else:
        raise ValueError(f"Unsupported content type: {content_type}. Use 'text/csv'.")


def predict_fn(input_data, model):
    """
    Run predictions on the processed input data.
    
    This is called after input_fn. The input_data is whatever input_fn returned,
    and model is whatever model_fn returned.
    
    Parameters:
        input_data: The processed input from input_fn (a NumPy array).
        model: The loaded model from model_fn.
    
    Returns:
        The predictions (usually a NumPy array).
    """
    predictions = model.predict(input_data)
    return predictions


def output_fn(prediction, accept):
    """
    Convert predictions to the output format for the results file.
    
    SageMaker will write whatever this function returns to the output file in S3.
    Each line in the output corresponds to one prediction.
    
    Parameters:
        prediction: The predictions from predict_fn.
        accept (str): The desired output MIME type.
    
    Returns:
        A string representation of the predictions.
    """
    # Convert predictions to a newline-separated string
    # Each prediction goes on its own line
    return '\\n'.join(str(p) for p in prediction)`}
                />

                <h3 className="text-lg font-medium text-foreground mt-8 mb-3">Understanding the Data Flow</h3>

                <p className="text-muted-foreground leading-relaxed mb-4">
                  Let's trace how data flows through these functions. Say your input CSV looks like this:
                </p>

                <CodeBlock 
                  language="text"
                  filename="input.csv"
                  code={`5.1,3.5,1.4,0.2
4.9,3.0,1.4,0.2
6.2,3.4,5.4,2.3`}
                  showLineNumbers={false}
                />

                <ol className="space-y-3 text-muted-foreground mt-4">
                  <li className="flex items-start gap-3">
                    <span className="text-teal-500 font-medium">1.</span>
                    <span>
                      <InlineCode>input_fn</InlineCode> receives this as a string and converts it to a NumPy 
                      array with shape (3, 4) — three samples, four features each.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-teal-500 font-medium">2.</span>
                    <span>
                      <InlineCode>predict_fn</InlineCode> calls <InlineCode>model.predict()</InlineCode> on 
                      this array and gets back predictions like <InlineCode>[0, 0, 2]</InlineCode>.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-teal-500 font-medium">3.</span>
                    <span>
                      <InlineCode>output_fn</InlineCode> converts these predictions to the string 
                      <InlineCode>"0\n0\n2"</InlineCode>, which gets written to the output file.
                    </span>
                  </li>
                </ol>

                <Callout type="info" title="Customization">
                  This inference script handles simple CSV input. If your data has headers, missing values, 
                  or requires preprocessing (scaling, encoding), you'll need to modify <InlineCode>input_fn</InlineCode> accordingly.
                </Callout>
              </section>

              {/* ==================== PACKAGING ==================== */}
              <section id="packaging" className="mb-16">
                <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
                  <button 
                    onClick={() => toggleProgress('packaging')}
                    className="text-muted-foreground hover:text-teal-500 transition-colors"
                  >
                    {progress.includes('packaging') ? (
                      <CheckCircle2 className="w-6 h-6 text-teal-500" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>
                  Packaging Your Model
                </h2>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  SageMaker expects your model artifacts in a specific format: a gzipped tar archive 
                  (<InlineCode>.tar.gz</InlineCode>) containing your model file and inference script. 
                  This archive will be uploaded to S3 and downloaded by SageMaker when the job starts.
                </p>

                <h3 className="text-lg font-medium text-foreground mb-3">Why This Format?</h3>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  The <InlineCode>.tar.gz</InlineCode> format serves two purposes. First, it compresses your 
                  files, which is important when uploading large models over the network. Second, it bundles 
                  multiple files together—your model file, inference script, and any other dependencies—into 
                  a single artifact that SageMaker can download atomically.
                </p>

                <h3 className="text-lg font-medium text-foreground mb-3">Creating the Archive</h3>

                <p className="text-muted-foreground leading-relaxed mb-4">
                  First, make sure you have both files in the same directory:
                </p>

                <CodeBlock 
                  language="text"
                  filename="directory structure"
                  code={`my-project/
├── model.joblib      # Your trained model
└── inference.py      # The inference script we just created`}
                  showLineNumbers={false}
                />

                <p className="text-muted-foreground leading-relaxed my-4">
                  Now create the archive. On macOS/Linux, use the <InlineCode>tar</InlineCode> command:
                </p>

                <CodeBlock 
                  language="bash"
                  filename="terminal"
                  code={`tar -czvf model.tar.gz model.joblib inference.py`}
                  showLineNumbers={false}
                />

                <p className="text-muted-foreground leading-relaxed mt-4 mb-4">
                  Let's break down what each flag means:
                </p>

                <ul className="space-y-2 text-muted-foreground mb-6">
                  <li><InlineCode>-c</InlineCode> — Create a new archive</li>
                  <li><InlineCode>-z</InlineCode> — Compress with gzip</li>
                  <li><InlineCode>-v</InlineCode> — Verbose output (shows files being added)</li>
                  <li><InlineCode>-f model.tar.gz</InlineCode> — Output filename</li>
                </ul>

                <p className="text-muted-foreground leading-relaxed mb-4">
                  On Windows, you can use Python instead:
                </p>

                <CodeBlock 
                  filename="create_archive.py"
                  code={`import tarfile

# Create the tar.gz archive
with tarfile.open('model.tar.gz', 'w:gz') as tar:
    tar.add('model.joblib')
    tar.add('inference.py')

print("Created model.tar.gz")`}
                />

                <h3 className="text-lg font-medium text-foreground mt-8 mb-3">Verifying the Archive</h3>

                <p className="text-muted-foreground leading-relaxed mb-4">
                  Before uploading, verify that your archive contains the right files at the root level 
                  (not nested in subdirectories):
                </p>

                <CodeBlock 
                  language="bash"
                  filename="terminal"
                  code={`tar -tzvf model.tar.gz`}
                  showLineNumbers={false}
                />

                <OutputBlock 
                  title="Expected output"
                  output={`-rw-r--r-- user/group  12345 2026-01-30 10:00 model.joblib
-rw-r--r-- user/group   2048 2026-01-30 10:00 inference.py`}
                />

                <p className="text-muted-foreground leading-relaxed mt-4">
                  If your files are nested in a folder (like <InlineCode>my-project/model.joblib</InlineCode>), 
                  SageMaker won't find them. Make sure to run the tar command from within the directory 
                  containing your files, or adjust the paths accordingly.
                </p>
              </section>

              {/* ==================== UPLOADING ==================== */}
              <section id="uploading" className="mb-16">
                <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
                  <button 
                    onClick={() => toggleProgress('uploading')}
                    className="text-muted-foreground hover:text-teal-500 transition-colors"
                  >
                    {progress.includes('uploading') ? (
                      <CheckCircle2 className="w-6 h-6 text-teal-500" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>
                  Uploading to S3
                </h2>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  Now we need to upload two things to Amazon S3: your model archive and the input data 
                  you want predictions for. S3 is Amazon's cloud storage service, and it's where SageMaker 
                  reads and writes all data.
                </p>

                <h3 className="text-lg font-medium text-foreground mb-3">Understanding S3 Paths</h3>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  S3 organizes data into "buckets" (like top-level folders) and "keys" (like file paths). 
                  An S3 path looks like <InlineCode>s3://bucket-name/path/to/file.csv</InlineCode>. 
                  The bucket name must be globally unique across all of AWS.
                </p>

                <h3 className="text-lg font-medium text-foreground mb-3">Uploading Your Files</h3>

                <p className="text-muted-foreground leading-relaxed mb-4">
                  Here's a Python script that uploads both your model and input data. We'll explain 
                  each part:
                </p>

                <CodeBlock 
                  filename="upload_to_s3.py"
                  code={`import boto3
import sagemaker

# Initialize the SageMaker session
# This gives us helper methods and automatically detects your region
session = sagemaker.Session()

# Get the default bucket for your account
# SageMaker creates this bucket automatically: sagemaker-{region}-{account-id}
# You can also specify your own bucket if you prefer
bucket = session.default_bucket()

# Define a prefix (folder path) to organize your files
# This keeps all files for this project together
prefix = 'iris-batch-inference'

# Create an S3 client for uploading
s3 = boto3.client('s3')

# Upload the model archive
# This is what SageMaker will download and extract
model_key = f'{prefix}/model/model.tar.gz'
s3.upload_file('model.tar.gz', bucket, model_key)
print(f"Model uploaded to: s3://{bucket}/{model_key}")

# Upload the input data
# This is the data we want predictions for
input_key = f'{prefix}/input/input.csv'
s3.upload_file('input.csv', bucket, input_key)
print(f"Input data uploaded to: s3://{bucket}/{input_key}")

# Print the paths we'll need for the next step
model_s3_uri = f's3://{bucket}/{model_key}'
input_s3_uri = f's3://{bucket}/{prefix}/input/'
output_s3_uri = f's3://{bucket}/{prefix}/output/'

print(f"\\nPaths for batch transform:")
print(f"  Model URI:  {model_s3_uri}")
print(f"  Input URI:  {input_s3_uri}")
print(f"  Output URI: {output_s3_uri}")`}
                />

                <h3 className="text-lg font-medium text-foreground mt-8 mb-3">About the Input Data</h3>

                <p className="text-muted-foreground leading-relaxed mb-4">
                  Your input CSV should contain only the features—no headers and no target column. Each row 
                  is one sample. For our Iris model example:
                </p>

                <CodeBlock 
                  language="text"
                  filename="input.csv"
                  code={`5.1,3.5,1.4,0.2
4.9,3.0,1.4,0.2
7.0,3.2,4.7,1.4
6.3,3.3,6.0,2.5
5.8,2.7,5.1,1.9`}
                  showLineNumbers={false}
                />

                <p className="text-muted-foreground leading-relaxed mt-4">
                  Each line has four values corresponding to sepal length, sepal width, petal length, and 
                  petal width. Our model will predict the species (0, 1, or 2) for each row.
                </p>

                <Callout type="warning" title="Important">
                  The input data format must match what your <InlineCode>input_fn</InlineCode> expects. 
                  If you change the format (add headers, use JSON, etc.), you must update the inference 
                  script accordingly.
                </Callout>
              </section>

              {/* ==================== RUNNING JOB ==================== */}
              <section id="running-job" className="mb-16">
                <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
                  <button 
                    onClick={() => toggleProgress('running-job')}
                    className="text-muted-foreground hover:text-teal-500 transition-colors"
                  >
                    {progress.includes('running-job') ? (
                      <CheckCircle2 className="w-6 h-6 text-teal-500" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>
                  Running the Batch Transform Job
                </h2>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  Now we're ready to run the batch transform job. This is where SageMaker provisions servers, 
                  loads your model, processes all your input data, and saves the predictions.
                </p>

                <h3 className="text-lg font-medium text-foreground mb-3">The Deployment Script</h3>

                <p className="text-muted-foreground leading-relaxed mb-4">
                  Here's the complete script with detailed explanations:
                </p>

                <CodeBlock 
                  filename="run_batch_transform.py"
                  code={`import sagemaker
from sagemaker.sklearn import SKLearnModel

# ============================================================
# CONFIGURATION
# ============================================================

# Initialize session and get IAM role
session = sagemaker.Session()
role = sagemaker.get_execution_role()

# If you're running this locally (not in SageMaker), you'll need to 
# specify the role ARN manually:
# role = 'arn:aws:iam::123456789:role/SageMakerExecutionRole'

# S3 paths from the previous step
bucket = session.default_bucket()
prefix = 'iris-batch-inference'

model_s3_uri = f's3://{bucket}/{prefix}/model/model.tar.gz'
input_s3_uri = f's3://{bucket}/{prefix}/input/'
output_s3_uri = f's3://{bucket}/{prefix}/output/'

# ============================================================
# CREATE THE SAGEMAKER MODEL
# ============================================================

# This creates a model object that points to your artifact and tells
# SageMaker which container to use. For sklearn, AWS provides pre-built
# containers so you don't need to build your own.

model = SKLearnModel(
    model_data=model_s3_uri,      # Where your model.tar.gz is in S3
    role=role,                     # IAM role with SageMaker permissions
    entry_point='inference.py',    # Name of inference script inside the tar.gz
    framework_version='1.2-1',     # sklearn version (should match your local version)
    py_version='py3'               # Python version
)

print("SageMaker model created")

# ============================================================
# CREATE AND RUN THE TRANSFORMER
# ============================================================

# The transformer handles the actual batch inference job. We configure:
# - What type of instances to use
# - How many instances
# - Where to write output

transformer = model.transformer(
    instance_count=1,              # Number of instances (can parallelize with more)
    instance_type='ml.m5.large',   # Instance type (affects speed and cost)
    output_path=output_s3_uri,     # Where to write predictions in S3
    assemble_with='Line',          # How to combine output (Line = one prediction per line)
    accept='text/csv'              # Output format
)

print("Starting batch transform job...")
print(f"  Instance type: ml.m5.large")
print(f"  Input: {input_s3_uri}")
print(f"  Output: {output_s3_uri}")

# Start the job
# - data: S3 path to input data
# - content_type: Format of input data
# - split_type: How to split input file (Line = process line by line)
# - wait: If True, this call blocks until job completes
# - logs: If True, shows CloudWatch logs in real-time

transformer.transform(
    data=input_s3_uri,
    content_type='text/csv',
    split_type='Line',
    wait=True,
    logs=True
)

print("\\nBatch transform job completed!")
print(f"Results written to: {output_s3_uri}")`}
                />

                <h3 className="text-lg font-medium text-foreground mt-8 mb-3">Understanding the Configuration</h3>

                <p className="text-muted-foreground leading-relaxed mb-4">
                  Let's look at the key parameters and how to choose them:
                </p>

                <div className="space-y-4 mb-6">
                  <div className="pl-4 border-l-2 border-teal-500/50">
                    <h4 className="font-medium text-foreground mb-1">instance_type</h4>
                    <p className="text-muted-foreground text-sm">
                      Determines the compute resources. <InlineCode>ml.m5.large</InlineCode> is a good 
                      starting point (2 vCPUs, 8GB RAM, ~$0.10/hour). For larger models or faster processing, 
                      try <InlineCode>ml.m5.xlarge</InlineCode> or <InlineCode>ml.c5.xlarge</InlineCode>. 
                      For deep learning models, use GPU instances like <InlineCode>ml.p3.2xlarge</InlineCode>.
                    </p>
                  </div>

                  <div className="pl-4 border-l-2 border-teal-500/50">
                    <h4 className="font-medium text-foreground mb-1">instance_count</h4>
                    <p className="text-muted-foreground text-sm">
                      Number of instances to run in parallel. SageMaker automatically distributes your 
                      input data across instances. Using 2 instances roughly halves the processing time. 
                      Start with 1 for testing.
                    </p>
                  </div>

                  <div className="pl-4 border-l-2 border-teal-500/50">
                    <h4 className="font-medium text-foreground mb-1">split_type</h4>
                    <p className="text-muted-foreground text-sm">
                      How SageMaker splits your input file. <InlineCode>Line</InlineCode> sends one or 
                      more lines at a time to your inference script. <InlineCode>None</InlineCode> sends 
                      the entire file at once (useful for images or files that can't be split by line).
                    </p>
                  </div>
                </div>

                <h3 className="text-lg font-medium text-foreground mb-3">What to Expect</h3>

                <p className="text-muted-foreground leading-relaxed mb-4">
                  When you run the script, you'll see output like this:
                </p>

                <OutputBlock 
                  title="Console output"
                  output={`SageMaker model created
Starting batch transform job...
  Instance type: ml.m5.large
  Input: s3://sagemaker-us-east-1-123456789/iris-batch-inference/input/
  Output: s3://sagemaker-us-east-1-123456789/iris-batch-inference/output/

.....................
Batch transform job completed!
Results written to: s3://sagemaker-us-east-1-123456789/iris-batch-inference/output/`}
                />

                <p className="text-muted-foreground leading-relaxed mt-4">
                  Each dot represents a polling interval while SageMaker runs the job. For a small dataset, 
                  this takes 3-5 minutes (most of that is instance startup time). Larger datasets take longer 
                  but the per-record time is very fast once running.
                </p>
              </section>

              {/* ==================== RESULTS ==================== */}
              <section id="results" className="mb-16">
                <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
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
                  Getting Your Results
                </h2>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  Once the job completes, your predictions are stored in S3. SageMaker creates an output 
                  file with the same name as your input file, but with <InlineCode>.out</InlineCode> appended. 
                  So <InlineCode>input.csv</InlineCode> becomes <InlineCode>input.csv.out</InlineCode>.
                </p>

                <h3 className="text-lg font-medium text-foreground mb-3">Downloading Predictions</h3>

                <CodeBlock 
                  filename="download_results.py"
                  code={`import boto3
import pandas as pd

# Configuration
session_bucket = 'sagemaker-us-east-1-123456789'  # Replace with your bucket
prefix = 'iris-batch-inference'

# Initialize S3 client
s3 = boto3.client('s3')

# The output file has .out appended to the input filename
output_key = f'{prefix}/output/input.csv.out'

# Download the predictions
s3.download_file(session_bucket, output_key, 'predictions.csv')

# Load and view the results
predictions = pd.read_csv('predictions.csv', header=None, names=['prediction'])
print(f"Downloaded {len(predictions)} predictions")
print(predictions.head(10))`}
                />

                <OutputBlock 
                  title="Output"
                  output={`Downloaded 5 predictions
   prediction
0           0
1           0
2           1
3           2
4           2`}
                />

                <h3 className="text-lg font-medium text-foreground mt-8 mb-3">Joining Predictions with Original Data</h3>

                <p className="text-muted-foreground leading-relaxed mb-4">
                  Typically you'll want to combine the predictions with your original data. Since the 
                  predictions are in the same order as the input rows, you can simply concatenate:
                </p>

                <CodeBlock 
                  filename="join_results.py"
                  code={`import pandas as pd

# Load original input data
original_data = pd.read_csv('input.csv', header=None, 
                            names=['sepal_length', 'sepal_width', 
                                   'petal_length', 'petal_width'])

# Load predictions
predictions = pd.read_csv('predictions.csv', header=None, names=['predicted_species'])

# Combine them
results = pd.concat([original_data, predictions], axis=1)

# Map numeric predictions to species names
species_map = {0: 'setosa', 1: 'versicolor', 2: 'virginica'}
results['species_name'] = results['predicted_species'].map(species_map)

print(results)`}
                />

                <OutputBlock 
                  title="Output"
                  output={`   sepal_length  sepal_width  petal_length  petal_width  predicted_species species_name
0           5.1          3.5           1.4          0.2                  0       setosa
1           4.9          3.0           1.4          0.2                  0       setosa
2           7.0          3.2           4.7          1.4                  1   versicolor
3           6.3          3.3           6.0          2.5                  2    virginica
4           5.8          2.7           5.1          1.9                  2    virginica`}
                />

                <p className="text-muted-foreground leading-relaxed mt-4">
                  You now have a complete dataset with predictions that you can save, analyze, or use 
                  for downstream processes.
                </p>
              </section>

              {/* ==================== NEXT STEPS ==================== */}
              <section id="next-steps" className="mb-16">
                <h2 className="text-2xl font-semibold text-foreground mb-6 flex items-center gap-3">
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
                  Congratulations—you've deployed a locally trained model to AWS SageMaker and run batch 
                  inference. Here's where you can go from here:
                </p>

                <ul className="space-y-4 text-muted-foreground mb-8">
                  <li className="flex items-start gap-3">
                    <span className="text-teal-500 font-bold mt-0.5">•</span>
                    <span>
                      <strong className="text-foreground">Automate with scheduling.</strong> Use AWS 
                      EventBridge to trigger batch jobs on a schedule (daily, weekly) without manual intervention.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-teal-500 font-bold mt-0.5">•</span>
                    <span>
                      <strong className="text-foreground">Trigger on data arrival.</strong> Set up an S3 
                      event notification to start a batch job automatically when new data is uploaded.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-teal-500 font-bold mt-0.5">•</span>
                    <span>
                      <strong className="text-foreground">Try real-time inference.</strong> If you need 
                      immediate predictions for a web application, deploy a SageMaker endpoint instead.
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-teal-500 font-bold mt-0.5">•</span>
                    <span>
                      <strong className="text-foreground">Monitor with CloudWatch.</strong> Set up 
                      dashboards and alerts to track job success rates, duration, and costs.
                    </span>
                  </li>
                </ul>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link 
                    to="/docs/batchdeployment/gcp" 
                    className="p-4 rounded-xl border border-border hover:border-foreground/20 hover:bg-foreground/5 transition-all"
                  >
                    <h3 className="font-medium text-foreground mb-1">Batch Inference on GCP</h3>
                    <p className="text-sm text-muted-foreground">Same concept, different cloud</p>
                  </Link>

                  <Link 
                    to="/docs/onlinedeployment/aws" 
                    className="p-4 rounded-xl border border-border hover:border-foreground/20 hover:bg-foreground/5 transition-all"
                  >
                    <h3 className="font-medium text-foreground mb-1">Real-Time Inference on AWS</h3>
                    <p className="text-sm text-muted-foreground">Deploy an always-on endpoint</p>
                  </Link>
                </div>
              </section>

              {/* Footer Navigation */}
              <div className="flex items-center justify-between pt-8 border-t border-border">
                <Link to="/docs/model-deployment" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                  Model Deployment
                </Link>
                <Link to="/docs/batchdeployment/gcp" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                  Batch Inference on GCP
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </article>

            {/* Right Sidebar - Table of Contents */}
            <aside className="hidden xl:block w-48 shrink-0">
              <div className="sticky top-28">
                <div className="flex items-center gap-2 mb-4">
                  <List className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">On this page</span>
                </div>
                <nav className="space-y-1">
                  {sections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => scrollToSection(section.id)}
                      className={`block w-full text-left text-sm py-1 transition-colors ${
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

export default BatchDeploymentAWS;
