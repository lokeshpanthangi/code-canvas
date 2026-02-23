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
  Database,
  Search,
  FileText,
  Cpu,
  Layers,
  Zap,
  Target,
  ArrowRight,
  Brain,
  MessageSquare,
  HardDrive,
  Filter,
  BarChart3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

/* ------------------------------------------------------------------ */
/*  Table of contents                                                  */
/* ------------------------------------------------------------------ */
const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'chatbot-hook', title: 'Start With Chatbot' },
  { id: 'what-is-rag', title: 'What Is RAG?' },
  { id: 'understanding-embeddings', title: 'Understanding Embeddings' },
  { id: 'vector-databases', title: 'Vector Databases' },
  { id: 'rag-vs-finetuning', title: 'RAG vs Fine-Tuning' },
  { id: 'rag-pipeline', title: 'The RAG Pipeline' },
  { id: 'retrieval-strategies', title: 'Retrieval Strategies' },
  { id: 'chunking', title: 'Chunking Strategies', parent: 'retrieval-strategies' },
  { id: 'prerequisites', title: 'Prerequisites' },
  { id: 'setup', title: 'Setup & Installation' },
  { id: 'env-setup', title: 'Environment Variables', parent: 'setup' },
  { id: 'implementation', title: 'Implementation' },
  { id: 'step-ingest', title: 'Load & Split Docs', parent: 'implementation' },
  { id: 'step-embed', title: 'Embed & Store', parent: 'implementation' },
  { id: 'step-retrieve', title: 'Retrieval Logic', parent: 'implementation' },
  { id: 'step-chain', title: 'RAG Chain', parent: 'implementation' },
  { id: 'step-run', title: 'Query & Validate', parent: 'implementation' },
  { id: 'complete-project', title: 'Complete Script' },
  { id: 'next-steps', title: 'Next Steps' },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
const BasicRAG = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [progress, setProgress] = useState<string[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const contentRef = useRef<HTMLElement>(null);

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    const content = `IMPLEMENT BASIC RAG WITH LANGCHAIN\n==================================\nBuild a Retrieval-Augmented Generation pipeline.\n`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'basic-rag-langchain.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setTimeout(() => setIsDownloading(false), 1000);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections
        .map((s) => ({ id: s.id, element: document.getElementById(s.id) }))
        .filter((s) => s.element);
      for (const s of sectionElements.reverse()) {
        if (s.element && s.element.getBoundingClientRect().top <= 120) {
          setActiveSection(s.id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 100, behavior: 'smooth' });
  };

  const toggleProgress = (id: string) => {
    setProgress((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const SectionHeading = ({ id, children }: { id: string; children: React.ReactNode }) => (
    <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
      <button onClick={() => toggleProgress(id)} className="text-muted-foreground hover:text-teal-500 transition-colors">
        {progress.includes(id) ? <CheckCircle2 className="w-6 h-6 text-teal-500" /> : <Circle className="w-6 h-6" />}
      </button>
      {children}
    </h2>
  );

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
            <span className="text-foreground">Implement Basic RAG</span>
          </div>

          <div className="flex gap-8 lg:gap-12">
            {/* ── Left sidebar ── */}
            <aside className="hidden lg:block w-64 shrink-0">
              <div className="sticky top-28">
                <div className="flex items-center gap-2 mb-4">
                  <BookOpen className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">Gen AI Modules</span>
                </div>
                <nav className="space-y-1">
                  {[
                    { slug: 'basic-chatbot', title: 'Build a Basic Chatbot' },
                    { slug: 'basic-rag', title: 'Implement Basic RAG', active: true },
                    { slug: 'small-agent', title: 'Build a Small Agent' },
                    { slug: 'prompt-engineering', title: 'Prompt Engineering Patterns' },
                  ].map((doc) => (
                    <Link key={doc.slug} to={`/docs/${doc.slug}`}
                      className={`block py-1.5 text-sm transition-colors ${doc.active ? 'text-teal-500 font-medium' : 'text-muted-foreground hover:text-foreground'}`}>
                      {doc.title}
                    </Link>
                  ))}
                </nav>
                <Link to="/docs" className="flex items-center gap-2 mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  View all modules <ChevronRight className="w-4 h-4" />
                </Link>
                <div className="mt-8 pt-6 border-t border-border">
                  <div className="text-sm font-medium text-foreground mb-3">Your Progress</div>
                  <div className="text-xs text-muted-foreground mb-2">
                    {progress.length} / {sections.filter((s) => !s.parent).length} sections
                  </div>
                  <div className="w-full h-2 rounded-full bg-foreground/10">
                    <div className="h-full rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 transition-all"
                      style={{ width: `${(progress.length / sections.filter((s) => !s.parent).length) * 100}%` }} />
                  </div>
                </div>
                <div className="mt-6 pt-6 border-t border-border">
                  <div className="text-sm font-medium text-foreground mb-3">Quick Actions</div>
                  <div className="space-y-2">
                    <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors py-1">
                      <Github className="w-4 h-4" /> View Source
                    </a>
                    <button onClick={handleDownloadPDF} disabled={isDownloading}
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors py-1 disabled:opacity-50">
                      {isDownloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                      {isDownloading ? 'Downloading...' : 'Download PDF'}
                    </button>
                  </div>
                </div>
              </div>
            </aside>

            {/* ── Article ── */}
            <article className="flex-1 min-w-0 max-w-4xl">
              {/* Header */}
              <header className="mb-12">
                <div className="mb-6">
                  <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">Implement Basic RAG</h1>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Go beyond a simple chatbot. Learn what Retrieval-Augmented Generation actually is, how
                    embeddings and vector databases work under the hood, and build a complete RAG pipeline
                    step by step with <InlineCode>LangChain</InlineCode> + <InlineCode>langchain-openai</InlineCode>.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" /><span>3 hours</span></div>
                  <div className="flex items-center gap-1.5"><Star className="w-4 h-4" /><span>1,889 stars</span></div>
                  <div className="flex items-center gap-1.5"><GitFork className="w-4 h-4" /><span>620 forks</span></div>
                  <div className="flex items-center gap-1.5"><Users className="w-4 h-4" /><span>110 contributors</span></div>
                  <span className="px-2.5 py-1 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20 text-xs font-medium">Intermediate</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button variant="hero" size="lg"><Github className="w-4 h-4 mr-2" /> View on GitHub</Button>
                  <Button variant="outline" size="lg" className="border-foreground/20 hover:bg-foreground/5"
                    onClick={handleDownloadPDF} disabled={isDownloading}>
                    {isDownloading ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Download className="w-4 h-4 mr-2" />}
                    {isDownloading ? 'Downloading...' : 'Download PDF'}
                  </Button>
                </div>
              </header>

              {/* ═══════════════ OVERVIEW ═══════════════ */}
              <section id="overview" className="mb-16">
                <SectionHeading id="overview">Overview</SectionHeading>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  A vanilla chatbot sounds fluent but only knows what was in its training data. Ask it about your
                  company's refund policy, last quarter's sales, or an internal design doc — it will hallucinate
                  or refuse. <strong className="text-foreground">RAG fixes this</strong> by fetching relevant context
                  from your own documents and injecting it into the prompt before the LLM generates an answer.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="p-5 rounded-xl bg-card/50 border border-border">
                    <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center mb-3">
                      <FileText className="w-5 h-5 text-teal-500" />
                    </div>
                    <div className="text-2xl font-bold text-foreground mb-1">~120</div>
                    <div className="text-sm text-muted-foreground">Lines of Python</div>
                  </div>
                  <div className="p-5 rounded-xl bg-card/50 border border-border">
                    <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center mb-3">
                      <Layers className="w-5 h-5 text-violet-500" />
                    </div>
                    <div className="text-2xl font-bold text-foreground mb-1">5</div>
                    <div className="text-sm text-muted-foreground">Core Concepts</div>
                  </div>
                  <div className="p-5 rounded-xl bg-card/50 border border-border">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center mb-3">
                      <Zap className="w-5 h-5 text-amber-500" />
                    </div>
                    <div className="text-2xl font-bold text-foreground mb-1">1</div>
                    <div className="text-sm text-muted-foreground">Production Pattern</div>
                  </div>
                </div>
              </section>

              {/* ═══════════════ CHATBOT HOOK ═══════════════ */}
              <section id="chatbot-hook" className="mb-16">
                <SectionHeading id="chatbot-hook">Start With Chatbot</SectionHeading>
                <Callout type="warning" title="Prerequisite">
                  If you haven't built the basic chatbot yet, complete{' '}
                  <Link to="/docs/basic-chatbot" className="text-teal-400 hover:text-teal-300 underline">
                    Build a Basic Chatbot
                  </Link>{' '}
                  first. It covers prompts, memory, and streaming — the foundation for everything here.
                </Callout>
                <p className="text-muted-foreground leading-relaxed mt-4 mb-4">
                  A chatbot is a loop: the user sends a message, the LLM replies. <strong className="text-foreground">
                  Memory</strong> means we store previous turns and resend them so the model keeps context.
                  That helps continuity, but memory alone <em>cannot</em> inject new external knowledge.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Here's the minimal chatbot with memory you built in the previous module:
                </p>
                <CodeBlock filename="memory_recap.py" code={`from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain_community.chat_message_histories import ChatMessageHistory
from langchain_core.runnables.history import RunnableWithMessageHistory

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0.3)

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful assistant."),
    MessagesPlaceholder(variable_name="history"),
    ("human", "{input}"),
])

chain = prompt | llm
store = {}

def get_history(session_id: str) -> ChatMessageHistory:
    if session_id not in store:
        store[session_id] = ChatMessageHistory()
    return store[session_id]

chatbot = RunnableWithMessageHistory(
    chain, get_history,
    input_messages_key="input",
    history_messages_key="history",
)

config = {"configurable": {"session_id": "demo"}}
print(chatbot.invoke({"input": "My name is Sam."}, config=config).content)
print(chatbot.invoke({"input": "What is my name?"}, config=config).content)`} />

                <p className="text-muted-foreground leading-relaxed mt-4 mb-4">
                  Alright, let's break this down. We're creating a basic chatbot that can <em>remember</em> things across messages. The <InlineCode>ChatPromptTemplate</InlineCode> sets up a system message (telling the LLM who it is), a <InlineCode>MessagesPlaceholder</InlineCode> for conversation history, and a slot for the user's input. The clever part is <InlineCode>RunnableWithMessageHistory</InlineCode> — it automatically saves each message to a <InlineCode>ChatMessageHistory</InlineCode> object, keyed by session ID. So when you say "My name is Sam" and then ask "What is my name?", the LLM can look back at the history and answer correctly. Think of the session ID like a WhatsApp chat thread — each thread keeps its own history separately.
                </p>

                <div className="mt-6 p-4 rounded-xl bg-gradient-to-r from-teal-500/5 to-cyan-500/5 border border-teal-500/20">
                  <p className="text-sm text-foreground font-medium mb-1">Memory vs RAG — what's the difference?</p>
                  <p className="text-sm text-muted-foreground">
                    <strong className="text-foreground">Memory</strong> remembers what was said in the conversation.{' '}
                    <strong className="text-foreground">RAG</strong> remembers what's written in your documents.
                    In production you usually combine both.
                  </p>
                </div>
              </section>

              {/* ═══════════════ WHAT IS RAG ═══════════════ */}
              <section id="what-is-rag" className="mb-16">
                <SectionHeading id="what-is-rag">What Is RAG?</SectionHeading>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  <strong className="text-foreground">Retrieval-Augmented Generation</strong> (RAG) is a technique
                  where, instead of relying solely on the LLM's training data, we <em>retrieve</em> relevant
                  documents at query time and <em>augment</em> the prompt with that context before the model{' '}
                  <em>generates</em> a response.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Think of it like an <strong className="text-foreground">open-book exam</strong>: the LLM is smart,
                  but we give it the right reference pages so it can answer accurately about <em>your</em> specific data.
                </p>

                {/* Visual diagram */}
                <div className="my-8 p-6 rounded-2xl bg-card/50 border border-border">
                  <p className="text-sm font-semibold text-foreground mb-4">How RAG works (simplified)</p>
                  <div className="flex flex-col md:flex-row items-center gap-3 md:gap-4 text-sm">
                    <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 font-medium">
                      <MessageSquare className="w-4 h-4" /> User Question
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground hidden md:block" />
                    <ChevronRight className="w-4 h-4 text-muted-foreground md:hidden rotate-90" />
                    <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 font-medium">
                      <Brain className="w-4 h-4" /> Embed Query
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground hidden md:block" />
                    <ChevronRight className="w-4 h-4 text-muted-foreground md:hidden rotate-90" />
                    <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 font-medium">
                      <Search className="w-4 h-4" /> Retrieve Top-K
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground hidden md:block" />
                    <ChevronRight className="w-4 h-4 text-muted-foreground md:hidden rotate-90" />
                    <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 font-medium">
                      <Cpu className="w-4 h-4" /> LLM + Context
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-foreground hidden md:block" />
                    <ChevronRight className="w-4 h-4 text-muted-foreground md:hidden rotate-90" />
                    <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-medium">
                      <Zap className="w-4 h-4" /> Answer
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="p-5 rounded-xl bg-card/50 border border-border">
                    <h4 className="font-semibold text-foreground mb-2"><span className="text-red-400">Without RAG</span></h4>
                    <ul className="space-y-1.5 text-sm text-muted-foreground">
                      <li>&#x2022; LLM answers from training data only</li>
                      <li>&#x2022; Knowledge is frozen at training cutoff</li>
                      <li>&#x2022; Hallucinates on domain-specific questions</li>
                      <li>&#x2022; No way to cite sources</li>
                    </ul>
                  </div>
                  <div className="p-5 rounded-xl bg-card/50 border border-teal-500/20">
                    <h4 className="font-semibold text-foreground mb-2"><span className="text-teal-400">With RAG</span></h4>
                    <ul className="space-y-1.5 text-sm text-muted-foreground">
                      <li>&#x2022; Answers grounded in your actual documents</li>
                      <li>&#x2022; Knowledge updates instantly when docs change</li>
                      <li>&#x2022; Drastically reduces hallucinations</li>
                      <li>&#x2022; Can cite specific source documents</li>
                    </ul>
                  </div>
                </div>

                <Callout type="info" title="Real-world analogy">
                  Imagine asking a librarian (the LLM) a question. Without RAG, the librarian answers from
                  memory. With RAG, the librarian first looks up the relevant books, reads the relevant pages,
                  and <em>then</em> answers — with citations.
                </Callout>
              </section>

              {/* ═══════════════ EMBEDDINGS ═══════════════ */}
              <section id="understanding-embeddings" className="mb-16">
                <SectionHeading id="understanding-embeddings">Understanding Embeddings</SectionHeading>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Before we can retrieve relevant documents, we need a way to measure <em>how similar</em> a
                  user's question is to each document chunk. That's where <strong className="text-foreground">
                  embeddings</strong> come in.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  An embedding is a <strong className="text-foreground">dense numerical vector</strong> (a list of
                  numbers, typically 1536 dimensions for OpenAI's models) that captures the <em>meaning</em> of text.
                  Sentences with similar meanings land close together in this vector space, even if they use
                  completely different words.
                </p>

                {/* Visual example */}
                <div className="my-6 p-6 rounded-2xl bg-card/50 border border-border">
                  <p className="text-sm font-semibold text-foreground mb-4">How embeddings capture meaning</p>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="px-3 py-1.5 rounded-lg bg-teal-500/10 text-teal-400 text-xs font-mono shrink-0">
                        [0.23, -0.41, 0.87, ...]
                      </div>
                      <p className="text-sm text-muted-foreground">"How do I return a product?"</p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="px-3 py-1.5 rounded-lg bg-teal-500/10 text-teal-400 text-xs font-mono shrink-0">
                        [0.21, -0.39, 0.85, ...]
                      </div>
                      <p className="text-sm text-muted-foreground">"What is the refund policy?" <span className="text-teal-400 text-xs ml-1">&#8592; very close!</span></p>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 text-xs font-mono shrink-0">
                        [-0.61, 0.33, -0.12, ...]
                      </div>
                      <p className="text-sm text-muted-foreground">"What color is the sky?" <span className="text-red-400 text-xs ml-1">&#8592; far away</span></p>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-4">
                  When a user asks a question, we <strong className="text-foreground">embed the question</strong> into the
                  same vector space, then find the document chunks whose embeddings are <em>closest</em> (most similar)
                  to the question's embedding. This is called <strong className="text-foreground">semantic search</strong> —
                  it matches by meaning, not just keywords.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                  <div className="p-5 rounded-xl bg-card/50 border border-border">
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Search className="w-4 h-4 text-amber-400" /> Keyword Search (traditional)
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Matches exact words. "refund policy" won't match a doc that says "return process and
                      money-back guarantee".
                    </p>
                  </div>
                  <div className="p-5 rounded-xl bg-card/50 border border-teal-500/20">
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Brain className="w-4 h-4 text-teal-400" /> Semantic Search (embeddings)
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Matches <em>meaning</em>. "refund policy" successfully retrieves the "return process"
                      doc because the concepts are semantically close.
                    </p>
                  </div>
                </div>

                <Callout type="note">
                  OpenAI's <InlineCode>text-embedding-3-small</InlineCode> produces 1536-dimensional vectors and
                  costs about $0.02 per 1M tokens — very cheap. For higher accuracy, use{' '}
                  <InlineCode>text-embedding-3-large</InlineCode> (3072 dimensions).
                </Callout>
              </section>

              {/* ═══════════════ VECTOR DATABASES ═══════════════ */}
              <section id="vector-databases" className="mb-16">
                <SectionHeading id="vector-databases">Vector Databases</SectionHeading>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Once we embed our document chunks, we need somewhere to <em>store</em> those vectors and{' '}
                  <em>search</em> them efficiently. That's what a <strong className="text-foreground">vector database</strong>{' '}
                  (vector store) does.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Think of it as a specialized database optimized for one operation: <em>"given this vector,
                  find me the K most similar vectors"</em>. Regular SQL databases can't do this efficiently
                  because they're optimized for exact matches, not similarity searches.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  <div className="p-5 rounded-xl bg-card/50 border border-border">
                    <div className="flex items-center gap-2 mb-3">
                      <Database className="w-5 h-5 text-emerald-400" />
                      <h4 className="font-semibold text-foreground">Chroma</h4>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-400/10 text-emerald-400 border border-emerald-400/20 mb-2 inline-block">We use this</span>
                    <p className="text-sm text-muted-foreground mt-2">Open-source, runs locally, zero setup. Perfect for learning and prototyping.</p>
                  </div>
                  <div className="p-5 rounded-xl bg-card/50 border border-border">
                    <div className="flex items-center gap-2 mb-3">
                      <Database className="w-5 h-5 text-violet-400" />
                      <h4 className="font-semibold text-foreground">Pinecone</h4>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-violet-400/10 text-violet-400 border border-violet-400/20 mb-2 inline-block">Managed</span>
                    <p className="text-sm text-muted-foreground mt-2">Fully managed cloud service. Best for production — handles scaling, backups, and high availability.</p>
                  </div>
                  <div className="p-5 rounded-xl bg-card/50 border border-border">
                    <div className="flex items-center gap-2 mb-3">
                      <Database className="w-5 h-5 text-cyan-400" />
                      <h4 className="font-semibold text-foreground">Weaviate / Qdrant</h4>
                    </div>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-400/10 text-cyan-400 border border-cyan-400/20 mb-2 inline-block">Self-hosted</span>
                    <p className="text-sm text-muted-foreground mt-2">Open-source with Docker. Hybrid search (keyword + vector), great for advanced use cases.</p>
                  </div>
                </div>

                <Callout type="tip">
                  Start with <strong>Chroma</strong> locally — it needs zero config. When you move to production,
                  swap the vector store class with minimal code changes thanks to LangChain's abstraction layer.
                </Callout>
              </section>

              {/* ═══════════════ RAG vs FINE-TUNING ═══════════════ */}
              <section id="rag-vs-finetuning" className="mb-16">
                <SectionHeading id="rag-vs-finetuning">RAG vs Fine-Tuning</SectionHeading>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  People often ask: <em>"Why not just fine-tune the model on my data?"</em> Both have valid use
                  cases, but RAG is usually the right starting point.
                </p>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
                    <thead>
                      <tr className="bg-card/80">
                        <th className="text-left px-4 py-3 text-foreground font-semibold border-b border-border">Aspect</th>
                        <th className="text-left px-4 py-3 text-teal-400 font-semibold border-b border-border">RAG</th>
                        <th className="text-left px-4 py-3 text-amber-400 font-semibold border-b border-border">Fine-Tuning</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr className="border-b border-border">
                        <td className="px-4 py-3 text-foreground font-medium">Knowledge update</td>
                        <td className="px-4 py-3">Instant — just add/update docs</td>
                        <td className="px-4 py-3">Requires retraining (hours/days)</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="px-4 py-3 text-foreground font-medium">Cost</td>
                        <td className="px-4 py-3">Low — embedding + retrieval per query</td>
                        <td className="px-4 py-3">High — GPU training + hosting custom model</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="px-4 py-3 text-foreground font-medium">Hallucination risk</td>
                        <td className="px-4 py-3">Lower — answers cite retrieved sources</td>
                        <td className="px-4 py-3">Higher — knowledge baked into weights</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="px-4 py-3 text-foreground font-medium">Best for</td>
                        <td className="px-4 py-3">Q&A over docs, support bots, search</td>
                        <td className="px-4 py-3">Style/tone changes, domain-specific language</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-foreground font-medium">Setup time</td>
                        <td className="px-4 py-3">Minutes to hours</td>
                        <td className="px-4 py-3">Days to weeks</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* ═══════════════ THE RAG PIPELINE ═══════════════ */}
              <section id="rag-pipeline" className="mb-16">
                <SectionHeading id="rag-pipeline">The RAG Pipeline</SectionHeading>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  A RAG system has two phases: <strong className="text-foreground">Ingestion</strong> (done once
                  or periodically) and <strong className="text-foreground">Querying</strong> (done per user request).
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 rounded-2xl bg-card/50 border border-violet-500/20">
                    <h4 className="font-semibold text-violet-400 mb-4 flex items-center gap-2">
                      <HardDrive className="w-5 h-5" /> Phase 1: Ingestion (offline)
                    </h4>
                    <div className="space-y-3">
                      {[
                        { icon: FileText, label: '1. Load documents', desc: 'Read PDFs, text files, web pages, etc.' },
                        { icon: Filter, label: '2. Split into chunks', desc: 'Break into 500-1000 char pieces with overlap' },
                        { icon: Brain, label: '3. Embed each chunk', desc: 'Convert text to 1536-dim vector via OpenAI API' },
                        { icon: Database, label: '4. Store in vector DB', desc: 'Save vectors + metadata to Chroma/Pinecone' },
                      ].map(({ icon: Icon, label, desc }) => (
                        <div key={label} className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center shrink-0 mt-0.5">
                            <Icon className="w-4 h-4 text-violet-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{label}</p>
                            <p className="text-xs text-muted-foreground">{desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-6 rounded-2xl bg-card/50 border border-teal-500/20">
                    <h4 className="font-semibold text-teal-400 mb-4 flex items-center gap-2">
                      <Search className="w-5 h-5" /> Phase 2: Querying (per request)
                    </h4>
                    <div className="space-y-3">
                      {[
                        { icon: MessageSquare, label: '1. Receive question', desc: '"What is the refund window?"' },
                        { icon: Brain, label: '2. Embed the question', desc: 'Same embedding model produces question vector' },
                        { icon: Target, label: '3. Retrieve top-K chunks', desc: 'Find nearest vectors in the DB' },
                        { icon: Cpu, label: '4. Build augmented prompt', desc: 'Stuff retrieved chunks into the prompt' },
                        { icon: Zap, label: '5. LLM generates answer', desc: 'Model answers using the retrieved context' },
                      ].map(({ icon: Icon, label, desc }) => (
                        <div key={label} className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center shrink-0 mt-0.5">
                            <Icon className="w-4 h-4 text-teal-400" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground">{label}</p>
                            <p className="text-xs text-muted-foreground">{desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </section>

              {/* ═══════════════ RETRIEVAL STRATEGIES ═══════════════ */}
              <section id="retrieval-strategies" className="mb-16">
                <SectionHeading id="retrieval-strategies">Retrieval Strategies</SectionHeading>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  How you retrieve chunks matters as much as how you embed them. Different strategies
                  trade off between <em>precision</em>, <em>diversity</em>, and <em>speed</em>.
                </p>

                <div className="space-y-6 mb-8">
                  {[
                    {
                      name: 'Similarity Search',
                      icon: Target,
                      color: 'text-teal-400',
                      desc: 'Returns the K chunks whose embeddings are closest (cosine similarity) to the query. Simple and fast — the default baseline.',
                      pros: 'Fast, simple, works well for specific questions',
                      cons: 'Can return redundant/near-duplicate chunks',
                    },
                    {
                      name: 'MMR (Maximal Marginal Relevance)',
                      icon: BarChart3,
                      color: 'text-violet-400',
                      desc: 'Balances relevance with diversity. After finding similar chunks, it penalizes chunks that are too similar to ones already selected.',
                      pros: 'Reduces duplicate context, broader coverage',
                      cons: 'Slightly slower, needs lambda_mult tuning',
                    },
                    {
                      name: 'Score Threshold',
                      icon: Filter,
                      color: 'text-amber-400',
                      desc: 'Only returns chunks that pass a minimum similarity score. Avoids injecting irrelevant noise when no good matches exist.',
                      pros: 'Prevents garbage context from low-quality matches',
                      cons: 'May return zero results if threshold is too high',
                    },
                    {
                      name: 'Hybrid Search',
                      icon: Layers,
                      color: 'text-cyan-400',
                      desc: 'Combines keyword matching (BM25) with vector similarity. Gets the best of both keyword precision and semantic understanding.',
                      pros: 'Most robust for production, handles edge cases',
                      cons: 'Requires a vector DB that supports it (Weaviate, Qdrant)',
                    },
                  ].map(({ name, icon: Icon, color, desc, pros, cons }) => (
                    <div key={name}>
                      <h4 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                        <Icon className={`w-5 h-5 ${color}`} /> {name}
                      </h4>
                      <p className="text-sm text-muted-foreground mb-2 ml-7">{desc}</p>
                      <div className="flex flex-wrap gap-4 text-xs ml-7">
                        <span className="text-emerald-400">+ {pros}</span>
                        <span className="text-red-400">- {cons}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chunking */}
                <div id="chunking">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Chunking Strategies</h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    How you split documents into chunks also heavily impacts quality. The main tension:{' '}
                    <strong className="text-foreground">larger chunks</strong> retain more surrounding context but
                    may reduce precision. <strong className="text-foreground">Smaller chunks</strong> are more precise
                    but may lose important context.
                  </p>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold text-foreground text-sm">Small chunks (200–400)</h4>
                      <p className="text-sm text-muted-foreground">High precision, good for factual Q&A. May lose paragraph context.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-sm">Medium chunks (500–1000) <span className="text-teal-400 text-xs">(recommended start)</span></h4>
                      <p className="text-sm text-muted-foreground">Best general-purpose balance. Start here and tune based on results.</p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-foreground text-sm">Large chunks (1000–2000)</h4>
                      <p className="text-sm text-muted-foreground">More context per chunk. Good for summarization, worse for specific lookups.</p>
                    </div>
                  </div>
                  <Callout type="tip">
                    Always use <strong>chunk overlap</strong> (100-200 chars). Without overlap, sentences that span
                    a chunk boundary get split and lose meaning.
                  </Callout>
                </div>
              </section>

              {/* ═══════════════ PREREQUISITES ═══════════════ */}
              <section id="prerequisites" className="mb-16">
                <SectionHeading id="prerequisites">Prerequisites</SectionHeading>
                <ul className="space-y-3 text-muted-foreground">
                  {[
                    { label: 'Python 3.9+', detail: '' },
                    { label: 'OpenAI API key', detail: '' },
                    { label: 'A few text documents', detail: 'in a data/ folder (.txt, .md, .pdf)' },
                    { label: 'Basic Chatbot module completed', detail: '(recommended but not required)' },
                  ].map(({ label, detail }) => (
                    <li key={label} className="flex items-start gap-3">
                      <ChevronRight className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                      <span><strong className="text-foreground">{label}</strong>{detail && ` — ${detail}`}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* ═══════════════ SETUP ═══════════════ */}
              <section id="setup" className="mb-16">
                <SectionHeading id="setup">Setup & Installation</SectionHeading>
                <CodeBlock language="bash" filename="terminal" showLineNumbers={false}
                  code={`mkdir basic-rag && cd basic-rag
python -m venv venv
source venv/bin/activate   # Windows: venv\\Scripts\\activate

pip install langchain langchain-openai langchain-community langchain-chroma python-dotenv`} />

                <p className="text-muted-foreground leading-relaxed mt-4 mb-4">
                  We split the code into small, self-contained modules. Each file is runnable on its own —
                  you'll stitch them together in the final script.
                </p>

                <CodeBlock filename="project_structure" showLineNumbers={false}
                  code={`basic-rag/
├── data/                  # Your .txt documents go here
├── .env                   # API key (never commit this)
├── .gitignore
├── config.py              # Environment + constants
├── ingest.py              # Load & split documents
├── vector_store.py        # Embeddings + Chroma storage
├── retrieval.py           # Retrieval strategies
├── rag_chain.py           # RAG chain builder
└── app.py                 # Query loop`} />

                <div id="env-setup" className="mt-10">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Environment Variables</h3>
                  <CodeBlock filename=".env" showLineNumbers={false}
                    code={`OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`} />
                  <CodeBlock filename=".gitignore" showLineNumbers={false}
                    code={`.env
venv/
chroma_db/
__pycache__/`} />
                  <p className="text-muted-foreground leading-relaxed mt-4 mb-4">
                    Centralize all config so you only change things in one place:
                  </p>
                  <CodeBlock filename="config.py"
                    code={`import os
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise ValueError("OPENAI_API_KEY not set in .env")

DATA_DIR = "data"
CHROMA_DIR = "chroma_db"
EMBEDDING_MODEL = "text-embedding-3-small"  # 1536 dimensions, very cheap`} />
                  <p className="text-muted-foreground leading-relaxed mt-4 mb-4">
                    So what's happening here? We're loading our API key from a <InlineCode>.env</InlineCode> file using <InlineCode>python-dotenv</InlineCode> — this is a security best practice so you never accidentally hardcode secrets in your code. The <InlineCode>if not OPENAI_API_KEY</InlineCode> check is a safety net: if someone forgets to create the <InlineCode>.env</InlineCode> file, the app crashes immediately with a clear error instead of failing mysteriously later. We also define constants like <InlineCode>DATA_DIR</InlineCode>, <InlineCode>CHROMA_DIR</InlineCode>, and <InlineCode>EMBEDDING_MODEL</InlineCode> here so that every other file can import them from one place. If you ever want to switch to a different embedding model or change your data folder, you change it once here and it updates everywhere.
                  </p>
                </div>
              </section>

              {/* ═══════════════ IMPLEMENTATION ═══════════════ */}
              <section id="implementation" className="mb-16">
                <SectionHeading id="implementation">Implementation (Step by Step)</SectionHeading>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Each step is a real file. We explain <em>what</em> it does and <em>why</em> before showing
                  the code. At the end you'll see a single-file version that combines everything.
                </p>

                {/* Step 1: Ingest */}
                <div id="step-ingest" className="mb-14">
                  <h3 className="text-xl font-semibold text-foreground mb-2 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400 text-xs font-bold">1</span>
                    Load & Split Documents
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    First we load raw documents from a directory and split them into chunks. LangChain's{' '}
                    <InlineCode>DirectoryLoader</InlineCode> reads files and <InlineCode>RecursiveCharacterTextSplitter</InlineCode>{' '}
                    breaks them into overlapping pieces. The "recursive" part means it tries splitting on
                    paragraphs first, then sentences, then characters — preserving natural boundaries.
                  </p>
                  <CodeBlock filename="ingest.py"
                    code={`from langchain_community.document_loaders import DirectoryLoader, TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from config import DATA_DIR

def load_and_split(chunk_size: int = 800, chunk_overlap: int = 120):
    """Load all .txt files from data/ and split into overlapping chunks."""
    loader = DirectoryLoader(
        DATA_DIR,
        glob="**/*.txt",
        loader_cls=TextLoader,
    )
    documents = loader.load()
    print(f"Loaded {len(documents)} documents")

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=chunk_size,
        chunk_overlap=chunk_overlap,
    )
    chunks = splitter.split_documents(documents)
    print(f"Split into {len(chunks)} chunks")
    return chunks`} />
                  <p className="text-muted-foreground leading-relaxed mt-4 mb-4">
                    Let's walk through this. <InlineCode>DirectoryLoader</InlineCode> scans your <InlineCode>data/</InlineCode> folder and reads every <InlineCode>.txt</InlineCode> file it finds — you could have 5 files or 500, it handles all of them. Then <InlineCode>RecursiveCharacterTextSplitter</InlineCode> chops each document into smaller pieces. Why "recursive"? Because it tries to split at natural boundaries first — double newlines (paragraphs), then single newlines, then sentences, then individual characters. This way, your chunks preserve the natural flow of text as much as possible instead of cutting mid-sentence. The <InlineCode>chunk_overlap</InlineCode> parameter means each chunk shares some text with its neighbor, so no information falls through the cracks at boundaries. It's like overlapping tiles on a roof — no gap where rain can leak through.
                  </p>
                  <Callout type="tip">
                    Start with <InlineCode>chunk_size=800</InlineCode> and <InlineCode>chunk_overlap=120</InlineCode>.
                    If answers miss context, increase size. If retrieval returns irrelevant chunks, decrease size.
                    Overlap ensures no information is lost at chunk boundaries.
                  </Callout>
                </div>

                {/* Step 2: Embed & Store */}
                <div id="step-embed" className="mb-14">
                  <h3 className="text-xl font-semibold text-foreground mb-2 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400 text-xs font-bold">2</span>
                    Embed & Store
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Now we convert each chunk into an embedding vector using OpenAI's embedding model and store
                    everything in Chroma. <InlineCode>Chroma.from_documents()</InlineCode> does both steps in one
                    call — it embeds your chunks and saves them to disk. On subsequent runs, you can load the
                    existing database instead of re-embedding.
                  </p>
                  <CodeBlock filename="vector_store.py"
                    code={`from langchain_openai import OpenAIEmbeddings
from langchain_chroma import Chroma
from config import CHROMA_DIR, EMBEDDING_MODEL
from ingest import load_and_split

def build_vector_store():
    """Embed document chunks and persist to Chroma."""
    chunks = load_and_split()

    embeddings = OpenAIEmbeddings(model=EMBEDDING_MODEL)

    vector_store = Chroma.from_documents(
        documents=chunks,
        embedding=embeddings,
        persist_directory=CHROMA_DIR,
    )
    print(f"Stored {len(chunks)} vectors in {CHROMA_DIR}/")
    return vector_store

def load_vector_store():
    """Load an existing Chroma database (skip re-embedding)."""
    embeddings = OpenAIEmbeddings(model=EMBEDDING_MODEL)
    return Chroma(
        persist_directory=CHROMA_DIR,
        embedding_function=embeddings,
    )`} />
                  <p className="text-muted-foreground leading-relaxed mt-4 mb-4">
                    Here's the cool part. We have two functions: <InlineCode>build_vector_store()</InlineCode> and <InlineCode>load_vector_store()</InlineCode>. The first one takes your text chunks, sends each one to OpenAI's embedding API to convert it into a numerical vector, and saves everything into a Chroma database on disk. This is the expensive step — it costs API calls. That's why we have the second function: <InlineCode>load_vector_store()</InlineCode> just loads the already-saved database without re-embedding anything. Think of it this way — <InlineCode>build</InlineCode> is like building a library catalog from scratch, and <InlineCode>load</InlineCode> is like opening the catalog that's already been made. You run <InlineCode>build</InlineCode> once (or whenever your documents change), and use <InlineCode>load</InlineCode> for every subsequent query.
                  </p>
                  <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-violet-500/5 to-cyan-500/5 border border-violet-500/20">
                    <p className="text-sm text-foreground font-medium mb-1">What happens under the hood?</p>
                    <p className="text-sm text-muted-foreground">
                      Each chunk is sent to OpenAI's embedding API &#8594; gets back a 1536-dim vector &#8594;{' '}
                      Chroma stores the vector + original text + metadata in an SQLite + HNSW index
                      on disk. Queries then use approximate nearest neighbor search to find similar vectors
                      in milliseconds.
                    </p>
                  </div>
                </div>

                {/* Step 3: Retrieval */}
                <div id="step-retrieve" className="mb-14">
                  <h3 className="text-xl font-semibold text-foreground mb-2 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400 text-xs font-bold">3</span>
                    Retrieval Logic
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Here we configure <em>how</em> to search the vector store. We implement all three strategies
                    discussed earlier so you can compare them. In practice, start with MMR and switch only if needed.
                  </p>
                  <CodeBlock filename="retrieval.py"
                    code={`from vector_store import build_vector_store

def get_retrievers():
    """Create three retrievers to compare strategies."""
    vector_store = build_vector_store()

    # Strategy 1: Plain similarity — fast baseline
    retriever_similarity = vector_store.as_retriever(
        search_type="similarity",
        search_kwargs={"k": 4},
    )

    # Strategy 2: MMR — balances relevance + diversity
    retriever_mmr = vector_store.as_retriever(
        search_type="mmr",
        search_kwargs={"k": 6, "fetch_k": 20, "lambda_mult": 0.5},
    )

    # Strategy 3: Score threshold — skip weak matches
    retriever_threshold = vector_store.as_retriever(
        search_type="similarity_score_threshold",
        search_kwargs={"score_threshold": 0.35, "k": 6},
    )

    return {
        "similarity": retriever_similarity,
        "mmr": retriever_mmr,
        "threshold": retriever_threshold,
    }`} />
                  <p className="text-muted-foreground leading-relaxed mt-4 mb-4">
                    Okay, so we're creating three different "search strategies" and returning them as a dictionary so you can easily switch between them. <strong className="text-foreground">Similarity search</strong> is the simplest — it just finds the 4 most similar chunks and returns them. Good baseline, but sometimes it returns chunks that all say basically the same thing. <strong className="text-foreground">MMR</strong> (Maximal Marginal Relevance) is smarter — it fetches 20 candidates (<InlineCode>fetch_k=20</InlineCode>) but only keeps 6 that are both relevant AND diverse. The <InlineCode>lambda_mult=0.5</InlineCode> controls that balance — we'll explain that below. <strong className="text-foreground">Score threshold</strong> only returns chunks above a certain quality bar (0.35 here) — this prevents injecting garbage context when the user asks something completely unrelated to your documents.
                  </p>
                  <Callout type="info" title="What does lambda_mult do in MMR?">
                    <InlineCode>lambda_mult</InlineCode> controls the relevance-diversity tradeoff.{' '}
                    <strong className="text-foreground">1.0</strong> = pure similarity (no diversity),{' '}
                    <strong className="text-foreground">0.0</strong> = maximum diversity (may sacrifice relevance).{' '}
                    <strong className="text-foreground">0.5</strong> is a balanced default.
                  </Callout>
                </div>

                {/* Step 4: RAG Chain */}
                <div id="step-chain" className="mb-14">
                  <h3 className="text-xl font-semibold text-foreground mb-2 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400 text-xs font-bold">4</span>
                    Build the RAG Chain
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    The RAG chain ties retrieval + generation together. When a query comes in,{' '}
                    <InlineCode>RetrievalQA</InlineCode> automatically: retrieves relevant chunks &#8594; stuffs them
                    into a prompt &#8594; sends to the LLM &#8594; returns the answer + source documents.
                  </p>
                  <CodeBlock filename="rag_chain.py"
                    code={`from langchain_openai import ChatOpenAI
from langchain.chains import RetrievalQA
from retrieval import get_retrievers

def build_qa_chain(strategy: str = "mmr"):
    """Build a RetrievalQA chain with the chosen strategy."""
    retrievers = get_retrievers()
    retriever = retrievers[strategy]

    llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)

    return RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",   # concatenate chunks into one prompt
        retriever=retriever,
        return_source_documents=True,
    )`} />
                  <p className="text-muted-foreground leading-relaxed mt-4 mb-4">
                    This is where everything comes together. We call <InlineCode>get_retrievers()</InlineCode> to get our three search strategies, then pick the one we want (default is MMR). We create a <InlineCode>ChatOpenAI</InlineCode> instance with <InlineCode>temperature=0</InlineCode> — that means the model gives deterministic, factual answers instead of creative ones, which is exactly what you want for Q&A. Then <InlineCode>RetrievalQA.from_chain_type()</InlineCode> wires everything together: when you ask a question, it automatically retrieves relevant chunks, stuffs them into the prompt, and sends it to the LLM. Setting <InlineCode>return_source_documents=True</InlineCode> is really important — it gives you back the exact chunks the model used to generate its answer, so you can verify if the answer is actually supported by your data.
                  </p>
                  <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-teal-500/5 to-cyan-500/5 border border-teal-500/20">
                    <p className="text-sm text-foreground font-medium mb-2">Chain types explained</p>
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <p><strong className="text-foreground">Stuff:</strong> Concatenates all retrieved chunks into one prompt. Simple, works for most cases.</p>
                      <p><strong className="text-foreground">Map-reduce:</strong> Processes each chunk separately, then combines. Good for very large contexts.</p>
                      <p><strong className="text-foreground">Refine:</strong> Iteratively refines the answer with each chunk. Most accurate, but slowest.</p>
                    </div>
                  </div>
                </div>

                {/* Step 5: Run */}
                <div id="step-run" className="mb-14">
                  <h3 className="text-xl font-semibold text-foreground mb-2 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400 text-xs font-bold">5</span>
                    Query & Validate
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Finally, we send a question to the chain and display both the answer and the source documents
                    it retrieved. Being able to see the sources is a key advantage of RAG — it makes the system
                    auditable and debuggable.
                  </p>
                  <CodeBlock filename="app.py"
                    code={`from rag_chain import build_qa_chain

qa_chain = build_qa_chain(strategy="mmr")

query = "What is our refund policy window?"
result = qa_chain.invoke({"query": query})

print("\\nAnswer:\\n", result["result"])
print("\\nRetrieved Sources:")
for i, doc in enumerate(result["source_documents"], 1):
    source = doc.metadata.get("source", "unknown")
    snippet = doc.page_content[:180].replace("\\n", " ")
    print(f"{i}. {source} -> {snippet}...")`} />

                  <p className="text-muted-foreground leading-relaxed mt-4 mb-4">
                    Almost there! This is the file that actually runs your RAG pipeline. We build the chain with MMR strategy, send a question, and print both the answer <em>and</em> the sources. The source printing loop is super useful for debugging — it shows you which files the model pulled from and a 180-character snippet of each chunk. If the answer looks wrong, you can check: "Did it even retrieve the right documents?" If not, your chunking or embedding might need tuning. If it retrieved the right docs but answered wrong, your prompt or model choice might need adjusting. This is why RAG is so much more debuggable than fine-tuning — you can see exactly what went in and what came out.
                  </p>

                  <OutputBlock title="Sample Output"
                    output={`Answer:
Our refund policy allows full refunds within 14 days of purchase for annual plans,
provided usage stays below the fair-use threshold.

Retrieved Sources:
1. data/policy.txt -> Refunds are eligible within 14 calendar days from purchase...
2. data/billing.txt -> Annual plan customers can request cancellation and refund...
3. data/faq.txt -> Fair-use threshold applies to heavy enterprise usage...`} />
                </div>
              </section>

              {/* ═══════════════ COMPLETE SCRIPT ═══════════════ */}
              <section id="complete-project" className="mb-16">
                <SectionHeading id="complete-project">Complete Script</SectionHeading>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Here's everything in a single file for quick copy-paste. In production, keep the modular
                  version above — it's easier to test, debug, and extend.
                </p>
                <CodeBlock filename="rag.py"
                  code={`"""
Basic RAG with LangChain + OpenAI
=================================
Single-file version. For production, use the modular version above.
"""
import os
from dotenv import load_dotenv
from langchain_community.document_loaders import DirectoryLoader, TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_chroma import Chroma
from langchain.chains import RetrievalQA

# -- Config --
load_dotenv()
if not os.getenv("OPENAI_API_KEY"):
    raise ValueError("OPENAI_API_KEY not set in .env")

# -- Ingestion --
loader = DirectoryLoader("data", glob="**/*.txt", loader_cls=TextLoader)
documents = loader.load()

splitter = RecursiveCharacterTextSplitter(chunk_size=800, chunk_overlap=120)
chunks = splitter.split_documents(documents)

# -- Embedding & Storage --
embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
vector_store = Chroma.from_documents(chunks, embeddings, persist_directory="chroma_db")

# -- Retrieval --
retriever = vector_store.as_retriever(
    search_type="mmr",
    search_kwargs={"k": 4, "fetch_k": 16},
)

# -- RAG Chain --
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=retriever,
    return_source_documents=True,
)

# -- Interactive Loop --
while True:
    query = input("\\nAsk (or 'quit'): ").strip()
    if query.lower() in {"quit", "exit", "q"}:
        break

    result = qa_chain.invoke({"query": query})
    print("\\nAnswer:\\n", result["result"])
    print("\\nTop Sources:")
    for doc in result["source_documents"][:3]:
        print("-", doc.metadata.get("source", "unknown"))`} />
                <p className="text-muted-foreground leading-relaxed mt-4 mb-4">
                  This is the same pipeline from above, just combined into one file for convenience. It goes through the full flow: load environment variables → read documents from the <InlineCode>data/</InlineCode> folder → split them into chunks → embed and store in Chroma → create a retriever with MMR → build the QA chain → run an interactive loop where you type questions and get answers. The <InlineCode>while True</InlineCode> loop at the bottom lets you keep asking questions until you type "quit". For a real project, you'd want to keep the modular version above — it's much easier to test each piece independently and swap components. But this single-file version is great for quick experiments or when you just want to get something working fast.
                </p>
              </section>

              {/* ═══════════════ NEXT STEPS ═══════════════ */}
              <section id="next-steps" className="mb-16">
                <SectionHeading id="next-steps">Next Steps</SectionHeading>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link to="/docs/small-agent"
                    className="group p-6 rounded-2xl bg-card/50 border border-border hover:border-foreground/20 hover:shadow-lg hover:shadow-foreground/5 transition-all">
                    <h3 className="font-semibold text-foreground mb-1 group-hover:text-teal-500 transition-colors">
                      Build a Small Agent
                    </h3>
                    <p className="text-sm text-muted-foreground">Give your RAG pipeline the ability to use tools and make decisions</p>
                  </Link>
                  <Link to="/docs/prompt-engineering"
                    className="group p-6 rounded-2xl bg-card/50 border border-border hover:border-foreground/20 hover:shadow-lg hover:shadow-foreground/5 transition-all">
                    <h3 className="font-semibold text-foreground mb-1 group-hover:text-teal-500 transition-colors">
                      Prompt Engineering Patterns
                    </h3>
                    <p className="text-sm text-muted-foreground">Improve your RAG prompts with few-shot, structured output, and guardrails</p>
                  </Link>
                </div>
              </section>

              {/* Footer nav */}
              <div className="flex items-center justify-between pt-8 border-t border-border">
                <Link to="/docs" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="w-4 h-4" /> Back to Docs
                </Link>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                  Edit on GitHub <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </article>

            {/* ── Right sidebar (ToC) ── */}
            <aside className="hidden xl:block w-56 shrink-0">
              <div className="sticky top-28">
                <div className="flex items-center gap-2 mb-4">
                  <List className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium text-foreground">On this page</span>
                </div>
                <nav className="space-y-1 mb-6">
                  {sections.map((section) => (
                    <button key={section.id} onClick={() => scrollToSection(section.id)}
                      className={`block w-full text-left text-sm py-1.5 transition-colors ${section.parent ? 'pl-4' : ''} ${
                        activeSection === section.id ? 'text-teal-500 font-medium' : 'text-muted-foreground hover:text-foreground'
                      }`}>
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

export default BasicRAG;
