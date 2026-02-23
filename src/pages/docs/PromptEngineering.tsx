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
  Loader2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'chatbot-first', title: 'Start With Chatbot' },
  { id: 'prompt-anatomy', title: 'Prompt Anatomy' },
  { id: 'system-style', title: 'System + Style', parent: 'prompt-anatomy' },
  { id: 'few-shot', title: 'Few-Shot', parent: 'prompt-anatomy' },
  { id: 'structure', title: 'Structured Output', parent: 'prompt-anatomy' },
  { id: 'setup', title: 'Setup & Installation' },
  { id: 'implementation', title: 'Implementation' },
  { id: 'template', title: 'Prompt Templates', parent: 'implementation' },
  { id: 'guardrails', title: 'Guardrails', parent: 'implementation' },
  { id: 'complete-project', title: 'Complete Script' },
  { id: 'next-steps', title: 'Next Steps' },
];

const PromptEngineering = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [progress, setProgress] = useState<string[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const contentRef = useRef<HTMLElement>(null);

  const handleDownloadPDF = async () => {
    setIsDownloading(true);

    const content = `
PROMPT ENGINEERING PATTERNS
===========================

Real, modular examples using LangChain + OpenAI.
`;

    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'prompt-engineering-patterns.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setTimeout(() => setIsDownloading(false), 1000);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections
        .map((section) => ({ id: section.id, element: document.getElementById(section.id) }))
        .filter((section) => section.element);

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
    setProgress((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId]
    );
  };

  return (
    <div className="min-h-screen bg-background relative">
      <div className="noise-overlay" />
      <Navbar variant="simple" />

      <main className="pt-24 pb-20" ref={contentRef}>
        <div className="container mx-auto px-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
            <Link to="/docs" className="hover:text-foreground transition-colors">
              Docs
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">Prompt Engineering Patterns</span>
          </div>

          <div className="flex gap-8 lg:gap-12">
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-28">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">Gen AI Modules</span>
                </div>

                <nav className="space-y-1">
                  {[
                    { slug: 'basic-chatbot', title: 'Build a Basic Chatbot' },
                    { slug: 'basic-rag', title: 'Implement Basic RAG' },
                    { slug: 'small-agent', title: 'Build a Small Agent' },
                    { slug: 'prompt-engineering', title: 'Prompt Engineering Patterns', active: true },
                  ].map((doc) => (
                    <Link
                      key={doc.slug}
                      to={`/docs/${doc.slug}`}
                      className={`block py-1.5 text-sm transition-colors ${
                        doc.active
                          ? 'text-teal-500 font-medium'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {doc.title}
                    </Link>
                  ))}
                </nav>

                <Link
                  to="/docs"
                  className="flex items-center gap-2 mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  View all modules
                  <ChevronRight className="w-4 h-4" />
                </Link>

                <div className="mt-8 pt-6 border-t border-border">
                  <div className="text-sm font-medium text-foreground mb-3">Your Progress</div>
                  <div className="text-xs text-muted-foreground mb-2">
                    {progress.length} / {sections.filter((s) => !s.parent).length} sections completed
                  </div>
                  <div className="w-full h-2 rounded-full bg-foreground/10">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 transition-all"
                      style={{ width: `${(progress.length / sections.filter((s) => !s.parent).length) * 100}%` }}
                    />
                  </div>
                </div>

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

            <article className="flex-1 min-w-0 max-w-4xl">
              <header className="mb-12">
                <div className="mb-6">
                  <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">Prompt Engineering Patterns</h1>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Practical, real prompt patterns using <InlineCode>LangChain</InlineCode> +
                    <InlineCode> langchain-openai</InlineCode>. We keep the code modular and show a combined
                    script at the end.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>2 hours</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4" />
                    <span>980 stars</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <GitFork className="w-4 h-4" />
                    <span>310 forks</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4" />
                    <span>70 contributors</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 text-xs font-medium">
                    Beginner
                  </span>
                </div>

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

                <p className="text-muted-foreground leading-relaxed">
                  Prompting is the interface to an LLM. With a few reliable patterns you can dramatically improve
                  output quality, reduce hallucinations, and get consistent formatting.
                </p>
              </section>

              <section id="chatbot-first" className="mb-16">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <button
                    onClick={() => toggleProgress('chatbot-first')}
                    className="text-muted-foreground hover:text-teal-500 transition-colors"
                  >
                    {progress.includes('chatbot-first') ? (
                      <CheckCircle2 className="w-6 h-6 text-teal-500" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>
                  Start With Chatbot
                </h2>

                <p className="text-muted-foreground leading-relaxed">
                  If you have not built the chatbot yet, start with
                  <Link to="/docs/basic-chatbot" className="text-teal-400 hover:text-teal-300"> Build a Basic Chatbot</Link>.
                  It teaches prompts, memory, and streaming.
                </p>
              </section>

              <section id="prompt-anatomy" className="mb-16">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <button
                    onClick={() => toggleProgress('prompt-anatomy')}
                    className="text-muted-foreground hover:text-teal-500 transition-colors"
                  >
                    {progress.includes('prompt-anatomy') ? (
                      <CheckCircle2 className="w-6 h-6 text-teal-500" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>
                  Prompt Anatomy
                </h2>

                <div id="system-style" className="mb-10">
                  <h3 className="text-xl font-semibold text-foreground mb-4">System + Style</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    System prompts define role, scope, and style. Keep them short and explicit.
                  </p>
                  <CodeBlock
                    filename="prompts.py"
                    code={`SYSTEM_PROMPT = (
    "You are a concise programming tutor. "
    "Answer in 3-5 bullets, use simple words, no filler."
)`}
                  />
                </div>

                <div id="few-shot" className="mb-10">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Few-Shot</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Provide 1-3 examples to steer format and tone. Keep examples short.
                  </p>
                  <CodeBlock
                    filename="prompts.py"
                    code={`FEW_SHOT = [
    {"input": "Explain a loop", "output": "A loop repeats work. Example: for i in range(3): ..."},
    {"input": "Explain a list", "output": "A list stores items in order. Example: [1, 2, 3]"},
]`}
                  />
                </div>

                <div id="structure" className="mb-10">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Structured Output</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Tell the model exactly how to format output and provide a template.
                  </p>
                  <CodeBlock
                    filename="prompts.py"
                    code={`OUTPUT_TEMPLATE = (
    "Return JSON with keys: title, bullets (array). "
    "No extra keys."
)`}
                  />
                </div>
              </section>

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
                  Setup & Installation
                </h2>

                <CodeBlock
                  language="bash"
                  filename="terminal"
                  code={`mkdir prompt-patterns && cd prompt-patterns
python -m venv venv
source venv/bin/activate   # Windows: venv\\Scripts\\activate

pip install langchain langchain-openai python-dotenv`}
                  showLineNumbers={false}
                />

                <CodeBlock
                  filename="project_structure"
                  code={`prompt-patterns/
├── .env
├── config.py
├── prompts.py
└── run.py`}
                  showLineNumbers={false}
                />
              </section>

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
                  Implementation (Step by Step)
                </h2>

                <p className="text-muted-foreground leading-relaxed mb-8">
                  Each step is a real, runnable file. We combine them at the end into a single script.
                </p>

                <div id="template" className="mb-12">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Step 1 — Prompt Templates</h3>
                  <CodeBlock
                    filename="run.py"
                    code={`from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from config import MODEL_NAME
from prompts import SYSTEM_PROMPT, OUTPUT_TEMPLATE

llm = ChatOpenAI(model=MODEL_NAME, temperature=0.2)

prompt = ChatPromptTemplate.from_messages([
    ("system", SYSTEM_PROMPT),
    ("human", OUTPUT_TEMPLATE + "\nQuestion: {question}"),
])

chain = prompt | llm | StrOutputParser()

print(chain.invoke({"question": "Explain recursion"}))`}
                  />

                  <OutputBlock
                    title="Sample Output"
                    output={`{"title":"Recursion","bullets":["A function calls itself","It needs a base case","It breaks a big task into smaller ones"]}`}
                  />
                </div>

                <div id="guardrails" className="mb-12">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Step 2 — Guardrails</h3>
                  <CodeBlock
                    filename="run.py"
                    code={`def validate_json_like(text: str) -> bool:
            return text.strip().startswith("{") and text.strip().endswith("}")

          result = chain.invoke({"question": "Explain a stack"})
          if not validate_json_like(result):
            raise ValueError("Output not in JSON format")

          print(result)`}
                  />

                  <Callout type="tip">
                    Prompting is not enough for reliability. Add small validators to catch format drift.
                  </Callout>
                </div>
              </section>

              <section id="complete-project" className="mb-16">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <button
                    onClick={() => toggleProgress('complete-project')}
                    className="text-muted-foreground hover:text-teal-500 transition-colors"
                  >
                    {progress.includes('complete-project') ? (
                      <CheckCircle2 className="w-6 h-6 text-teal-500" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>
                  Complete Script
                </h2>

                <CodeBlock
                  filename="prompt_patterns.py"
                  code={`"""Prompt Engineering Patterns"""

        import os
        from dotenv import load_dotenv
        from langchain_openai import ChatOpenAI
        from langchain_core.prompts import ChatPromptTemplate
        from langchain_core.output_parsers import StrOutputParser

        load_dotenv()
        if not os.getenv("OPENAI_API_KEY"):
          raise ValueError("OPENAI_API_KEY not set in .env")

        SYSTEM_PROMPT = (
          "You are a concise programming tutor. "
          "Answer in 3-5 bullets, use simple words, no filler."
        )

        OUTPUT_TEMPLATE = (
          "Return JSON with keys: title, bullets (array). "
          "No extra keys."
        )

        llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.2)
        prompt = ChatPromptTemplate.from_messages([
          ("system", SYSTEM_PROMPT),
          ("human", OUTPUT_TEMPLATE + "\nQuestion: {question}"),
        ])

        chain = prompt | llm | StrOutputParser()
        result = chain.invoke({"question": "Explain recursion"})

        if not (result.strip().startswith("{") and result.strip().endswith("}")):
          raise ValueError("Output not in JSON format")

        print(result)`}
                />
              </section>

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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link
                    to="/docs/small-agent"
                    className="group p-6 rounded-2xl bg-card/50 border border-border hover:border-foreground/20 hover:shadow-lg hover:shadow-foreground/5 transition-all"
                  >
                    <h3 className="font-semibold text-foreground mb-1 group-hover:text-teal-500 transition-colors">
                      Build a Small Agent
                    </h3>
                    <p className="text-sm text-muted-foreground">Use prompts + tools together</p>
                  </Link>

                  <Link
                    to="/docs/basic-rag"
                    className="group p-6 rounded-2xl bg-card/50 border border-border hover:border-foreground/20 hover:shadow-lg hover:shadow-foreground/5 transition-all"
                  >
                    <h3 className="font-semibold text-foreground mb-1 group-hover:text-teal-500 transition-colors">
                      Implement Basic RAG
                    </h3>
                    <p className="text-sm text-muted-foreground">Add retrieval and sources to answers</p>
                  </Link>
                </div>
              </section>

              <div className="flex items-center justify-between pt-8 border-t border-border">
                <Link to="/docs" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                  Back to Docs
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

export default PromptEngineering;
