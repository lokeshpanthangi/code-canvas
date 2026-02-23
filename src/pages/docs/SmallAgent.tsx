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
  Wrench,
  RefreshCw,
  Eye,
  Cpu,
  Zap,
  ArrowRight,
  Brain,
  MessageSquare,
  Settings,
  Play,
  Layers,
  Shield,
  GitBranch,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

/* ------------------------------------------------------------------ */
/*  Table of contents                                                  */
/* ------------------------------------------------------------------ */
const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'chatbot-first', title: 'Start With Chatbot' },
  { id: 'what-is-agent', title: 'What Is an Agent?' },
  { id: 'agent-vs-chain', title: 'Agent vs Chain' },
  { id: 'what-are-tools', title: 'What Are Tools?' },
  { id: 'agent-loop', title: 'The Agent Loop' },
  { id: 'types-of-agents', title: 'Types of Agents' },
  { id: 'prerequisites', title: 'Prerequisites' },
  { id: 'setup', title: 'Setup & Installation' },
  { id: 'env-setup', title: 'Environment Variables', parent: 'setup' },
  { id: 'implementation', title: 'Implementation' },
  { id: 'step-tools', title: 'Define Tools', parent: 'implementation' },
  { id: 'step-agent', title: 'Build Agent', parent: 'implementation' },
  { id: 'step-run', title: 'Run the Agent', parent: 'implementation' },
  { id: 'complete-project', title: 'Complete Script' },
  { id: 'next-steps', title: 'Next Steps' },
];

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */
const SmallAgent = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [progress, setProgress] = useState<string[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const contentRef = useRef<HTMLElement>(null);

  const handleDownloadPDF = async () => {
    setIsDownloading(true);
    const content = `BUILD A SMALL AGENT WITH LANGCHAIN\n==================================\nA step-by-step guide to tool calling.\n`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'small-agent-langchain.txt';
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
            <span className="text-foreground">Build a Small Agent</span>
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
                    { slug: 'basic-rag', title: 'Implement Basic RAG' },
                    { slug: 'small-agent', title: 'Build a Small Agent', active: true },
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
                  <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">Build a Small Agent</h1>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Understand what agents are, why they need tools, how the agent reasoning loop works,
                    and build a working tool-calling agent from scratch with{' '}
                    <InlineCode>LangChain</InlineCode> + <InlineCode>langchain-openai</InlineCode>.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" /><span>3 hours</span></div>
                  <div className="flex items-center gap-1.5"><Star className="w-4 h-4" /><span>1,140 stars</span></div>
                  <div className="flex items-center gap-1.5"><GitFork className="w-4 h-4" /><span>390 forks</span></div>
                  <div className="flex items-center gap-1.5"><Users className="w-4 h-4" /><span>82 contributors</span></div>
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
                  A chatbot can only talk. A RAG pipeline can only retrieve-and-answer. But what if you need the
                  LLM to <strong className="text-foreground">take actions</strong> — look up real-time data, perform
                  calculations, call APIs, or read files? That's what <strong className="text-foreground">agents</strong> do.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  An agent is an LLM that can <em>decide</em> which tool to use, <em>call</em> that tool, <em>observe</em>
                  {' '}the result, and keep going until the task is done — all without you hard-coding the steps.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                  <div className="p-5 rounded-xl bg-card/50 border border-border">
                    <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center mb-3">
                      <Wrench className="w-5 h-5 text-teal-500" />
                    </div>
                    <div className="text-2xl font-bold text-foreground mb-1">2</div>
                    <div className="text-sm text-muted-foreground">Custom Tools</div>
                  </div>
                  <div className="p-5 rounded-xl bg-card/50 border border-border">
                    <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center mb-3">
                      <RefreshCw className="w-5 h-5 text-violet-500" />
                    </div>
                    <div className="text-2xl font-bold text-foreground mb-1">ReAct</div>
                    <div className="text-sm text-muted-foreground">Reasoning Loop</div>
                  </div>
                  <div className="p-5 rounded-xl bg-card/50 border border-border">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center mb-3">
                      <Eye className="w-5 h-5 text-amber-500" />
                    </div>
                    <div className="text-2xl font-bold text-foreground mb-1">Verbose</div>
                    <div className="text-sm text-muted-foreground">See Its Thinking</div>
                  </div>
                </div>
              </section>

              {/* ═══════════════ CHATBOT FIRST ═══════════════ */}
              <section id="chatbot-first" className="mb-16">
                <SectionHeading id="chatbot-first">Start With Chatbot</SectionHeading>
                <Callout type="warning" title="Prerequisite">
                  If you haven't built the basic chatbot yet, complete{' '}
                  <Link to="/docs/basic-chatbot" className="text-teal-400 hover:text-teal-300 underline">
                    Build a Basic Chatbot
                  </Link>{' '}
                  first. It covers prompts, memory, and streaming — all of which agents build on top of.
                </Callout>
              </section>

              {/* ═══════════════ WHAT IS AN AGENT ═══════════════ */}
              <section id="what-is-agent" className="mb-16">
                <SectionHeading id="what-is-agent">What Is an Agent?</SectionHeading>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  In plain terms, an <strong className="text-foreground">agent</strong> is an LLM that has been given
                  access to <strong className="text-foreground">tools</strong> and the ability to <strong className="text-foreground">
                  decide when and how to use them</strong>.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Think of the difference like this: a <strong className="text-foreground">chain</strong> (like a chatbot
                  or RAG pipeline) is a fixed sequence — step A, then step B, then step C, always the same order.
                  An <strong className="text-foreground">agent</strong> is a decision-maker — it reads the task,
                  thinks about which tool to call (if any), and adapts its approach based on intermediate results.
                </p>

                <div className="my-6 p-4 rounded-xl bg-gradient-to-r from-violet-500/5 to-cyan-500/5 border border-violet-500/20">
                  <p className="text-sm text-foreground font-medium mb-2">Simple analogy</p>
                  <p className="text-sm text-muted-foreground">
                    A <strong className="text-foreground">chain</strong> is like a recipe — follow steps in order.
                    An <strong className="text-foreground">agent</strong> is like a chef — reads the recipe, decides
                    to substitute ingredients, checks the oven, tastes, and adjusts. The chef <em>reasons</em> between steps.
                  </p>
                </div>
              </section>

              {/* ═══════════════ AGENT vs CHAIN ═══════════════ */}
              <section id="agent-vs-chain" className="mb-16">
                <SectionHeading id="agent-vs-chain">Agent vs Chain</SectionHeading>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="p-5 rounded-xl bg-card/50 border border-border">
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <GitBranch className="w-4 h-4 text-amber-400" /> <span className="text-amber-400">Chain</span> (Chatbot, RAG)
                    </h4>
                    <ul className="space-y-1.5 text-sm text-muted-foreground">
                      <li>&#x2022; Fixed sequence of steps</li>
                      <li>&#x2022; Always runs the same pipeline</li>
                      <li>&#x2022; Predictable — easy to debug</li>
                      <li>&#x2022; Cannot handle unexpected tasks</li>
                      <li>&#x2022; Best for well-defined workflows</li>
                    </ul>
                  </div>
                  <div className="p-5 rounded-xl bg-card/50 border border-teal-500/20">
                    <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <Brain className="w-4 h-4 text-teal-400" /> <span className="text-teal-400">Agent</span> (This module)
                    </h4>
                    <ul className="space-y-1.5 text-sm text-muted-foreground">
                      <li>&#x2022; Decides which steps to take dynamically</li>
                      <li>&#x2022; Chooses tools based on the question</li>
                      <li>&#x2022; Flexible — handles diverse queries</li>
                      <li>&#x2022; Can chain multiple tool calls together</li>
                      <li>&#x2022; Best for open-ended, multi-step tasks</li>
                    </ul>
                  </div>
                </div>
                <Callout type="info">
                  You don't have to choose one or the other. Many production systems use chains for well-defined
                  paths (like RAG) and agents for open-ended queries. The agent can even <em>call</em> a RAG chain
                  as one of its tools.
                </Callout>
              </section>

              {/* ═══════════════ WHAT ARE TOOLS ═══════════════ */}
              <section id="what-are-tools" className="mb-16">
                <SectionHeading id="what-are-tools">What Are Tools?</SectionHeading>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  A <strong className="text-foreground">tool</strong> is just a Python function with a name and a
                  description that the LLM can call. The LLM reads the description to decide <em>when</em> to use it,
                  and the function signature to know <em>what arguments</em> to pass.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Tools are how agents interact with the outside world — they bridge the gap between "knowledge"
                  (what the LLM knows) and "action" (what the LLM can <em>do</em>).
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {[
                    { icon: Wrench, color: 'text-teal-400', bg: 'bg-teal-500/10', name: 'Calculator', desc: 'Do math operations the LLM would get wrong' },
                    { icon: MessageSquare, color: 'text-violet-400', bg: 'bg-violet-500/10', name: 'Web Search', desc: 'Look up real-time information online' },
                    { icon: Settings, color: 'text-amber-400', bg: 'bg-amber-500/10', name: 'API Caller', desc: 'Hit any REST API and parse the response' },
                    { icon: Cpu, color: 'text-cyan-400', bg: 'bg-cyan-500/10', name: 'Code Executor', desc: 'Run Python snippets in a sandbox' },
                    { icon: Layers, color: 'text-emerald-400', bg: 'bg-emerald-500/10', name: 'RAG Retriever', desc: 'Search your document vector store' },
                    { icon: Shield, color: 'text-rose-400', bg: 'bg-rose-500/10', name: 'Database Query', desc: 'Run SQL against your database' },
                  ].map(({ icon: Icon, color, bg, name, desc }) => (
                    <div key={name} className="p-4 rounded-xl bg-card/50 border border-border">
                      <div className="flex items-center gap-2 mb-2">
                        <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center`}>
                          <Icon className={`w-4 h-4 ${color}`} />
                        </div>
                        <h4 className="font-semibold text-foreground text-sm">{name}</h4>
                      </div>
                      <p className="text-xs text-muted-foreground">{desc}</p>
                    </div>
                  ))}
                </div>

                <Callout type="tip">
                  The LLM never <em>executes</em> the tool itself — it <em>requests</em> the tool call with specific
                  arguments, and LangChain's executor runs the function and returns the result. This keeps the LLM
                  in a safe "thinking" role and the tools in a "doing" role.
                </Callout>
              </section>

              {/* ═══════════════ THE AGENT LOOP ═══════════════ */}
              <section id="agent-loop" className="mb-16">
                <SectionHeading id="agent-loop">The Agent Loop</SectionHeading>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Agents follow a reasoning pattern called <strong className="text-foreground">ReAct</strong>
                  {' '}(Reason + Act). At each step, the LLM thinks about what to do next, then acts on it.
                </p>

                <div className="my-8 p-6 rounded-2xl bg-card/50 border border-border">
                  <p className="text-sm font-semibold text-foreground mb-4">The ReAct loop</p>
                  <div className="space-y-4">
                    {[
                      { step: '1', icon: MessageSquare, color: 'text-violet-400', bg: 'bg-violet-500/10', label: 'Receive task', desc: 'User asks: "What is 15% of $1,247.50?"' },
                      { step: '2', icon: Brain, color: 'text-cyan-400', bg: 'bg-cyan-500/10', label: 'Reason (Think)', desc: 'LLM thinks: "I need to calculate 15% of 1247.50. I should use the calculator tool."' },
                      { step: '3', icon: Wrench, color: 'text-teal-400', bg: 'bg-teal-500/10', label: 'Act (Call Tool)', desc: 'LLM requests: add_numbers(1247.50 * 0.15) → Tool returns: 187.125' },
                      { step: '4', icon: Eye, color: 'text-amber-400', bg: 'bg-amber-500/10', label: 'Observe', desc: 'LLM sees the result: 187.125' },
                      { step: '5', icon: Zap, color: 'text-emerald-400', bg: 'bg-emerald-500/10', label: 'Respond or loop', desc: 'LLM decides it has the answer → "15% of $1,247.50 is $187.13"' },
                    ].map(({ step, icon: Icon, color, bg, label, desc }) => (
                      <div key={step} className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg ${bg} flex items-center justify-center shrink-0`}>
                          <Icon className={`w-5 h-5 ${color}`} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{step}. {label}</p>
                          <p className="text-xs text-muted-foreground">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      If the task needs multiple tools, the agent loops back to step 2 (Reason) and continues
                      until it has enough information to give a final answer.
                    </p>
                  </div>
                </div>
              </section>

              {/* ═══════════════ TYPES OF AGENTS ═══════════════ */}
              <section id="types-of-agents" className="mb-16">
                <SectionHeading id="types-of-agents">Types of Agents</SectionHeading>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  LangChain supports several agent architectures. Here are the main ones:
                </p>

                <div className="space-y-5 mb-6">
                  {[
                    {
                      name: 'Tool Calling Agent',
                      badge: 'We use this',
                      badgeColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
                      desc: 'Uses the LLM\'s native function/tool calling feature (like OpenAI\'s function calling). The model outputs structured JSON specifying which tool to call and with what arguments. Most reliable and fastest.',
                      best: 'Most use cases with modern LLMs (GPT-4o, Claude)',
                    },
                    {
                      name: 'ReAct Agent',
                      badge: 'Classic',
                      badgeColor: 'text-violet-400 bg-violet-400/10 border-violet-400/20',
                      desc: 'Uses the Reason+Act prompting pattern. The LLM writes out its thinking in natural language, then specifies an action. Works with any LLM, even those without native tool calling.',
                      best: 'Open-source models that lack function calling',
                    },
                    {
                      name: 'Plan-and-Execute',
                      badge: 'Advanced',
                      badgeColor: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
                      desc: 'First plans all the steps upfront, then executes them one by one. Better for complex, multi-step tasks where planning ahead helps avoid wasted tool calls.',
                      best: 'Complex research tasks, multi-step workflows',
                    },
                    {
                      name: 'Multi-Agent Systems',
                      badge: 'Advanced',
                      badgeColor: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
                      desc: 'Multiple specialized agents collaborate — one researches, one writes, one reviews. Each agent has its own tools and role. Frameworks like LangGraph, CrewAI, or AutoGen handle orchestration.',
                      best: 'Enterprise workflows, autonomous research',
                    },
                  ].map(({ name, badge, badgeColor, desc, best }) => (
                    <div key={name}>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-foreground">{name}</h4>
                        <span className={`text-xs px-2 py-0.5 rounded-full border ${badgeColor}`}>{badge}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{desc}</p>
                      <p className="text-xs text-muted-foreground"><strong className="text-foreground">Best for:</strong> {best}</p>
                    </div>
                  ))}
                </div>
              </section>

              {/* ═══════════════ PREREQUISITES ═══════════════ */}
              <section id="prerequisites" className="mb-16">
                <SectionHeading id="prerequisites">Prerequisites</SectionHeading>
                <ul className="space-y-3 text-muted-foreground">
                  {[
                    { label: 'Python 3.9+' },
                    { label: 'OpenAI API key' },
                    { label: 'Basic Chatbot module completed', detail: '(recommended)' },
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
                  code={`mkdir small-agent && cd small-agent
python -m venv venv
source venv/bin/activate   # Windows: venv\\Scripts\\activate

pip install langchain langchain-openai python-dotenv`} />

                <CodeBlock filename="project_structure" showLineNumbers={false}
                  code={`small-agent/
├── .env
├── .gitignore
├── config.py              # Environment + constants
├── tools.py               # Tool definitions
├── agent.py               # Agent builder
└── app.py                 # Run the agent`} />

                <div id="env-setup" className="mt-10">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Environment Variables</h3>
                  <CodeBlock filename=".env" showLineNumbers={false}
                    code={`OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`} />
                  <CodeBlock filename="config.py"
                    code={`import os
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise ValueError("OPENAI_API_KEY not set in .env")

MODEL_NAME = "gpt-4o-mini"`} />
                  <p className="text-muted-foreground leading-relaxed mt-4 mb-4">
                    Pretty simple, right? We're loading our OpenAI API key from a <InlineCode>.env</InlineCode> file and doing a quick sanity check — if the key isn't there, we crash immediately with a helpful error instead of failing later with some cryptic API message. The <InlineCode>MODEL_NAME</InlineCode> constant means you can switch models (say from <InlineCode>gpt-4o-mini</InlineCode> to <InlineCode>gpt-4o</InlineCode>) in one place and it updates everywhere. This is a small project, but building habits like this saves you hours in bigger ones.
                  </p>
                </div>
              </section>

              {/* ═══════════════ IMPLEMENTATION ═══════════════ */}
              <section id="implementation" className="mb-16">
                <SectionHeading id="implementation">Implementation (Step by Step)</SectionHeading>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  We'll build a small agent with two tools: a calculator and a text summarizer. Each file is
                  independently runnable. We explain the <em>why</em> before the code.
                </p>

                {/* Step 1: Tools */}
                <div id="step-tools" className="mb-14">
                  <h3 className="text-xl font-semibold text-foreground mb-2 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400 text-xs font-bold">1</span>
                    Define Tools
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    A tool is a Python function decorated with <InlineCode>@tool</InlineCode>. The key parts are:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                      <span><strong className="text-foreground">Function name</strong> — the LLM sees this name and uses it to request the tool</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                      <span><strong className="text-foreground">Docstring</strong> — the LLM reads this to understand <em>when</em> to use the tool. Be clear and specific!</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                      <span><strong className="text-foreground">Type hints</strong> — the LLM uses these to know what arguments to pass</span>
                    </li>
                  </ul>
                  <CodeBlock filename="tools.py"
                    code={`from langchain_core.tools import tool

@tool
def add_numbers(a: float, b: float) -> float:
    """Add two numbers together. Use this whenever the user asks
    to add, sum, or total numerical values."""
    return a + b

@tool
def summarize_text(text: str) -> str:
    """Return a short summary of the input text (first 200 chars).
    Use this when the user wants a quick overview of longer text."""
    if not text.strip():
        return "No text provided."
    return text[:200] + ("..." if len(text) > 200 else "")`} />
                  <p className="text-muted-foreground leading-relaxed mt-4 mb-4">
                    Let's unpack this. The <InlineCode>@tool</InlineCode> decorator is the magic ingredient — it tells LangChain "hey, this function can be called by an AI agent." The LLM doesn't see your Python code; instead, it sees three things: the function <em>name</em>, the <em>docstring</em>, and the <em>type hints</em>. So when the user says "add 5 and 3", the LLM reads the name <InlineCode>add_numbers</InlineCode> and the docstring "Add two numbers together..." and thinks "yep, this is the right tool." It then looks at the type hints (<InlineCode>a: float, b: float</InlineCode>) to know it needs to pass two numbers. The summarize tool works the same way — it just grabs the first 200 characters as a quick summary. These are toy examples, but in real projects your tools could search databases, call APIs, send emails, anything.
                  </p>
                  <Callout type="tip">
                    The docstring is the most important part of a tool. The LLM reads it to decide <em>whether</em>
                    to use the tool. A vague docstring like "does stuff" will confuse the agent. Be specific about
                    when the tool should be used.
                  </Callout>
                </div>

                {/* Step 2: Agent */}
                <div id="step-agent" className="mb-14">
                  <h3 className="text-xl font-semibold text-foreground mb-2 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400 text-xs font-bold">2</span>
                    Build the Agent
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    The agent needs three things: an LLM (for reasoning), a list of tools (for acting),
                    and a prompt (to set its personality and instructions). We wrap it all in an{' '}
                    <InlineCode>AgentExecutor</InlineCode> which handles the ReAct loop for us.
                  </p>
                  <CodeBlock filename="agent.py"
                    code={`from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.agents import create_tool_calling_agent, AgentExecutor
from tools import add_numbers, summarize_text
from config import MODEL_NAME

def build_agent():
    """Build a tool-calling agent with AgentExecutor."""
    llm = ChatOpenAI(model=MODEL_NAME, temperature=0)
    tools = [add_numbers, summarize_text]

    prompt = ChatPromptTemplate.from_messages([
        ("system", "You are a helpful agent. Use tools when needed."),
        ("human", "{input}"),
        MessagesPlaceholder(variable_name="agent_scratchpad"),
    ])

    agent = create_tool_calling_agent(llm, tools, prompt)
    return AgentExecutor(agent=agent, tools=tools, verbose=True)`} />

                  <p className="text-muted-foreground leading-relaxed mt-4 mb-4">
                    Okay, this is the brain of the operation. We set up three things: an LLM (<InlineCode>ChatOpenAI</InlineCode>), a list of tools, and a prompt template. The prompt has three parts — a system message telling the agent how to behave, the user's input, and the <InlineCode>agent_scratchpad</InlineCode>. That last one is key — it's where LangChain puts all the agent's intermediate reasoning and tool results as it loops through its think-act-observe cycle. Then <InlineCode>create_tool_calling_agent</InlineCode> creates the agent logic, and we wrap it in an <InlineCode>AgentExecutor</InlineCode> that handles the entire loop for us. Setting <InlineCode>verbose=True</InlineCode> means you can watch the agent "think out loud" in your terminal — super helpful for understanding what's going on and debugging when things go wrong.
                  </p>

                  <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-violet-500/5 to-cyan-500/5 border border-violet-500/20">
                    <p className="text-sm text-foreground font-medium mb-2">What is <InlineCode>agent_scratchpad</InlineCode>?</p>
                    <p className="text-sm text-muted-foreground">
                      It's a special placeholder where LangChain puts the agent's intermediate thoughts and tool
                      results. As the agent loops through Reason &#8594; Act &#8594; Observe steps, each interaction
                      is appended to the scratchpad so the LLM can see what it's already done and decide what to do next.
                    </p>
                  </div>

                  <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-teal-500/5 to-cyan-500/5 border border-teal-500/20">
                    <p className="text-sm text-foreground font-medium mb-2">What does <InlineCode>verbose=True</InlineCode> do?</p>
                    <p className="text-sm text-muted-foreground">
                      It prints the agent's reasoning at every step — which tool it chose, what arguments it passed,
                      what it got back. This is invaluable for debugging. Turn it off in production.
                    </p>
                  </div>
                </div>

                {/* Step 3: Run */}
                <div id="step-run" className="mb-14">
                  <h3 className="text-xl font-semibold text-foreground mb-2 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400 text-xs font-bold">3</span>
                    Run the Agent
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Now let's give the agent a task that requires <em>multiple</em> tool calls. Notice how it
                    decides on its own which tools to use and in what order:
                  </p>
                  <CodeBlock filename="app.py"
                    code={`from agent import build_agent

executor = build_agent()

# This task requires TWO tool calls — the agent figures that out on its own
result = executor.invoke({
    "input": "Add 12.5 and 7.3, then summarize this: 'Agents call tools to do work.'"
})

print("\\nFinal Answer:\\n", result["output"])`} />
                  <p className="text-muted-foreground leading-relaxed mt-4 mb-4">
                    Here we're putting the agent to the test. We give it a task that requires <em>two</em> tool calls — adding numbers AND summarizing text. The beautiful part? We don't tell it which tools to use or in what order. We just describe what we want in plain English, and the agent figures out: "Okay, I need to call <InlineCode>add_numbers</InlineCode> with 12.5 and 7.3, and I also need to call <InlineCode>summarize_text</InlineCode> on that sentence." It makes both calls, collects the results, and combines them into one clean final answer. This is what separates an agent from a simple chain — a chain always follows the same fixed steps, but an agent <em>decides</em> what to do based on the input.
                  </p>
                  <OutputBlock title="Sample Output (verbose)"
                    output={`> Entering new AgentExecutor chain...

Invoking: 'add_numbers' with {'a': 12.5, 'b': 7.3}
19.8

Invoking: 'summarize_text' with {'text': 'Agents call tools to do work.'}
Agents call tools to do work.

Final Answer:
The sum of 12.5 and 7.3 is 19.8. Summary: Agents call tools to do work.`} />

                  <Callout type="info">
                    Notice the agent made <em>two</em> separate tool calls — one for math, one for summarization —
                    then combined both results into a coherent final answer. You never told it to call tools in this order;
                    it figured that out from the task description.
                  </Callout>
                </div>
              </section>

              {/* ═══════════════ COMPLETE SCRIPT ═══════════════ */}
              <section id="complete-project" className="mb-16">
                <SectionHeading id="complete-project">Complete Script</SectionHeading>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Here's everything in a single file. In production, keep the modular version above.
                </p>
                <CodeBlock filename="small_agent.py"
                  code={`"""Small Agent with LangChain + OpenAI"""
import os
from dotenv import load_dotenv
from langchain_core.tools import tool
from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder
from langchain.agents import create_tool_calling_agent, AgentExecutor

load_dotenv()
if not os.getenv("OPENAI_API_KEY"):
    raise ValueError("OPENAI_API_KEY not set in .env")

# -- Tools --
@tool
def add_numbers(a: float, b: float) -> float:
    """Add two numbers together."""
    return a + b

@tool
def summarize_text(text: str) -> str:
    """Return a short summary of the input text."""
    return text[:200] + ("..." if len(text) > 200 else "")

# -- Agent --
llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
tools = [add_numbers, summarize_text]

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are a helpful agent. Use tools when needed."),
    ("human", "{input}"),
    MessagesPlaceholder(variable_name="agent_scratchpad"),
])

agent = create_tool_calling_agent(llm, tools, prompt)
executor = AgentExecutor(agent=agent, tools=tools, verbose=True)

# -- Run --
result = executor.invoke({
    "input": "Add 12.5 and 7.3, then summarize: 'Agents call tools to do work.'"
})

print("\\nFinal Answer:\\n", result["output"])`} />                <p className="text-muted-foreground leading-relaxed mt-4 mb-4">
                  This is the whole thing in one file — same agent, same tools, same logic we built above, just combined for easy copy-pasting. The flow is: load the API key → define tools with <InlineCode>@tool</InlineCode> → set up the LLM and prompt → create the agent and executor → invoke with a task. For learning and quick experiments, this single-file version is perfect. But for real projects, stick with the modular version above — having tools, agent logic, and the runner in separate files makes it way easier to add new tools, swap models, or write tests.
                </p>              </section>

              {/* ═══════════════ NEXT STEPS ═══════════════ */}
              <section id="next-steps" className="mb-16">
                <SectionHeading id="next-steps">Next Steps</SectionHeading>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link to="/docs/basic-rag"
                    className="group p-6 rounded-2xl bg-card/50 border border-border hover:border-foreground/20 hover:shadow-lg hover:shadow-foreground/5 transition-all">
                    <h3 className="font-semibold text-foreground mb-1 group-hover:text-teal-500 transition-colors">
                      Implement Basic RAG
                    </h3>
                    <p className="text-sm text-muted-foreground">Add a RAG retriever as a tool your agent can use</p>
                  </Link>
                  <Link to="/docs/prompt-engineering"
                    className="group p-6 rounded-2xl bg-card/50 border border-border hover:border-foreground/20 hover:shadow-lg hover:shadow-foreground/5 transition-all">
                    <h3 className="font-semibold text-foreground mb-1 group-hover:text-teal-500 transition-colors">
                      Prompt Engineering Patterns
                    </h3>
                    <p className="text-sm text-muted-foreground">Improve your agent's system prompt for better reasoning</p>
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

export default SmallAgent;
