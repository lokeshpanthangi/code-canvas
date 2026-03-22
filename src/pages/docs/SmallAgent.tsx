import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useGitHubStats } from '@/hooks/useGitHubStats';
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
  Zap,
  ArrowRight,
  Brain,
  MessageSquare,
  Settings,
  Play,
  Layers,
  Shield,
  GitBranch,
  AlertTriangle,
  Search,
  Database,
  Terminal,
  Lightbulb,
  Workflow,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

/* ------------------------------------------------------------------ */
/*  Table of contents                                                  */
/* ------------------------------------------------------------------ */
const sections = [
  { id: 'overview', title: 'Overview' },
  { id: 'chatbot-first', title: 'From Chatbot to Agent' },
  { id: 'why-tools', title: 'Why LLMs Need Tools' },
  { id: 'what-is-agent', title: 'What Is an Agent?' },
  { id: 'agent-vs-chain', title: 'Agent vs Chain' },
  { id: 'what-are-tools', title: 'What Are Tools?' },
  { id: 'how-tool-calling-works', title: 'How Tool Calling Works' },
  { id: 'agent-loop', title: 'The Agent Loop (ReAct)' },
  { id: 'types-of-agents', title: 'Types of Agents' },
  { id: 'agent-memory', title: 'Memory in Agents' },
  { id: 'common-pitfalls', title: 'Common Pitfalls' },
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
  const { stars, forks, contributors } = useGitHubStats();

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
                    <a href="https://github.com/lokeshpanthangi/MLCodex" target="_blank" rel="noopener noreferrer"
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
                    Go beyond chatbots and RAG. Learn what agents truly are, why LLMs need tools to be useful
                    in the real world, how the reasoning loop works under the hood, and build a fully working
                    tool-calling agent from scratch with{' '}
                    <InlineCode>LangChain</InlineCode> + <InlineCode>langchain-openai</InlineCode>.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-1.5"><Clock className="w-4 h-4" /><span>3 hours</span></div>
                  <div className="flex items-center gap-1.5"><Star className="w-4 h-4" /><span>{stars} stars</span></div>
                  <div className="flex items-center gap-1.5"><GitFork className="w-4 h-4" /><span>{forks} forks</span></div>
                  <div className="flex items-center gap-1.5"><Users className="w-4 h-4" /><span>{contributors} contributors</span></div>
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
                <p className="text-muted-foreground leading-relaxed mb-4">
                  A chatbot can hold a conversation. A RAG pipeline can answer questions from your documents.
                  But neither can <strong className="text-foreground">take actions in the real world</strong>.
                  Ask them to calculate something, check the weather, query a database, or send an email —
                  they'll either hallucinate, refuse, or give you the wrong answer.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  <strong className="text-foreground">Agents</strong> change that. An agent is an LLM that can
                  {' '}<em>reason</em> about a task, <em>decide</em> which tool to use, <em>call</em> that tool,
                  {' '}<em>observe</em> the result, and keep going until the job is done — without you
                  hardcoding any of the steps. It's the difference between giving someone a script to read
                  vs. giving them a toolkit and saying "figure it out."
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

                <p className="text-muted-foreground leading-relaxed mt-6">
                  By the end of this module you'll understand not just <em>how</em> to build an agent, but
                  {' '}<em>why</em> agents are structured the way they are — and you'll have a working
                  tool-calling agent you can extend with your own tools.
                </p>
              </section>

              {/* ═══════════════ FROM CHATBOT TO AGENT ═══════════════ */}
              <section id="chatbot-first" className="mb-16">
                <SectionHeading id="chatbot-first">From Chatbot to Agent</SectionHeading>
                <Callout type="warning" title="Prerequisite">
                  If you haven't built the basic chatbot yet, complete{' '}
                  <Link to="/docs/basic-chatbot" className="text-teal-400 hover:text-teal-300 underline">
                    Build a Basic Chatbot
                  </Link>{' '}
                  first. It covers prompts, memory, and streaming — all of which agents build on top of.
                </Callout>

                <p className="text-muted-foreground leading-relaxed mt-6 mb-4">
                  Here's how the progression works. Each step adds a new capability:
                </p>

                <div className="my-6 p-6 rounded-2xl bg-card/50 border border-border">
                  <p className="text-sm font-semibold text-foreground mb-5">The AI application progression</p>
                  <div className="flex flex-col md:flex-row items-stretch gap-3 md:gap-2">
                    {[
                      { icon: MessageSquare, color: 'text-violet-400', bg: 'bg-violet-500/10', border: 'border-violet-500/20', label: 'Chatbot', desc: 'Can talk, remember context', limit: 'Only knows its training data' },
                      { icon: Search, color: 'text-teal-400', bg: 'bg-teal-500/10', border: 'border-teal-500/20', label: 'RAG', desc: 'Can search your documents', limit: 'Can only retrieve & answer' },
                      { icon: Brain, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', label: 'Agent', desc: 'Can reason, decide & act', limit: 'You are here ✨' },
                    ].map(({ icon: Icon, color, bg, border, label, desc, limit }, i) => (
                      <div key={label} className="flex-1 flex flex-col md:flex-row items-center gap-2">
                        <div className={`flex-1 w-full p-4 rounded-xl ${bg} border ${border}`}>
                          <div className="flex items-center gap-2 mb-2">
                            <Icon className={`w-5 h-5 ${color}`} />
                            <span className={`font-semibold text-sm ${color}`}>{label}</span>
                          </div>
                          <p className="text-xs text-muted-foreground mb-1">{desc}</p>
                          <p className="text-xs text-foreground/60 italic">{limit}</p>
                        </div>
                        {i < 2 && (
                          <ArrowRight className="w-4 h-4 text-muted-foreground hidden md:block shrink-0" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  A chatbot can <em>talk</em>. RAG lets it <em>search your data</em>. But an agent can
                  {' '}<em>take actions</em> — call APIs, run code, search the web, use calculators,
                  interact with databases. It decides what to do on its own. That's the fundamental leap
                  we're making in this module.
                </p>
              </section>

              {/* ═══════════════ WHY LLMs NEED TOOLS ═══════════════ */}
              <section id="why-tools" className="mb-16">
                <SectionHeading id="why-tools">Why Do LLMs Need Tools?</SectionHeading>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  LLMs are <em>incredibly</em> good at understanding language, reasoning, summarizing, and
                  generating text. But they have real, fundamental limitations that no amount of training
                  data will fix:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="p-5 rounded-xl bg-card/50 border border-red-500/20">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                      <h4 className="font-semibold text-foreground">Math is unreliable</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      Ask GPT-4 "What is 1,247 × 0.15?" and it might say 187.05 instead of the correct
                      answer. LLMs don't <em>calculate</em>; they <em>predict</em> the most likely next
                      token. For simple math that often works, but for anything complex (multi-step, large
                      numbers, percentages), it's unreliable.
                    </p>
                    <p className="text-xs text-red-400/70 italic">
                      Solution: Give it a calculator tool
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-card/50 border border-red-500/20">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                      <h4 className="font-semibold text-foreground">No real-time knowledge</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      An LLM's knowledge is frozen at its training cutoff. Ask it about today's stock price,
                      current weather, or breaking news — it literally does not have that data. It might
                      confidently give you <em>last year's</em> stock price and present it as current.
                    </p>
                    <p className="text-xs text-red-400/70 italic">
                      Solution: Give it a web search or API tool
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-card/50 border border-red-500/20">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                      <h4 className="font-semibold text-foreground">Can't interact with systems</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      An LLM on its own can't send an email, update a database, create a file,
                      or call an API. It can <em>generate</em> the code or the email text, but it has no
                      hands to actually press the button. It's a brain in a jar.
                    </p>
                    <p className="text-xs text-red-400/70 italic">
                      Solution: Give it action tools (email, DB, file system)
                    </p>
                  </div>

                  <div className="p-5 rounded-xl bg-card/50 border border-red-500/20">
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="w-5 h-5 text-red-400" />
                      <h4 className="font-semibold text-foreground">Can't verify its own output</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      When an LLM writes code, it can't run it to check if it actually works.
                      When it generates SQL, it can't execute it to verify the results.
                      It just produces text and hopes it's correct.
                    </p>
                    <p className="text-xs text-red-400/70 italic">
                      Solution: Give it a code execution tool
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-gradient-to-r from-teal-500/5 to-cyan-500/5 border border-teal-500/20">
                  <p className="text-sm text-foreground font-medium mb-2">The key insight</p>
                  <p className="text-sm text-muted-foreground">
                    Tools turn an LLM from a <strong className="text-foreground">"smart text generator"</strong>
                    {' '}into a <strong className="text-foreground">"smart assistant that can actually do things."</strong>
                    {' '}The LLM handles the <em>thinking</em> and <em>language understanding</em>. The tools
                    handle the <em>doing</em>. Together, they can solve problems that neither could alone.
                  </p>
                </div>
              </section>

              {/* ═══════════════ WHAT IS AN AGENT ═══════════════ */}
              <section id="what-is-agent" className="mb-16">
                <SectionHeading id="what-is-agent">What Is an Agent?</SectionHeading>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  In plain terms, an <strong className="text-foreground">agent</strong> is an LLM that has been given
                  access to <strong className="text-foreground">tools</strong> and the ability to <strong className="text-foreground">
                  decide when and how to use them</strong>. It's not just an LLM that can call functions —
                  it's an LLM that can <em>reason</em> about <em>which</em> functions to call, <em>when</em>,
                  and <em>in what order</em>, based on the task at hand.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Think about it this way: when you give a regular LLM a task, it generates one response
                  and it's done. When you give an <em>agent</em> a task, it might think: "Hmm, I need to
                  first look up some data, then do a calculation with that data, then format the result."
                  It breaks the problem down on its own and calls the right tools in sequence.
                </p>

                <div className="my-6 p-5 rounded-xl bg-gradient-to-r from-violet-500/5 to-cyan-500/5 border border-violet-500/20">
                  <p className="text-sm text-foreground font-medium mb-2">Real-world analogy: the intern</p>
                  <p className="text-sm text-muted-foreground mb-3">
                    Imagine you hire an extremely smart intern. They know a lot of theory but they've never
                    used your company's internal tools.
                  </p>
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <p>
                      <strong className="text-foreground">Without tools (just an LLM):</strong> You ask "What were our sales
                      last quarter?" The intern guesses based on whatever they remember from past conversations.
                      They might be close, or they might fabricate a number entirely.
                    </p>
                    <p>
                      <strong className="text-foreground">With tools (an agent):</strong> You ask the same question.
                      The intern thinks: "I should check the sales dashboard." They open the dashboard tool, pull
                      the actual numbers, and report: "$2.4M, up 12% from Q2." Real data, no guessing.
                    </p>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  The three ingredients of any agent are: an <strong className="text-foreground">LLM</strong> (the
                  brain that reasons), a set of <strong className="text-foreground">tools</strong> (the hands that
                  act), and a <strong className="text-foreground">prompt</strong> (the instructions that tell it
                  how to behave). LangChain's <InlineCode>AgentExecutor</InlineCode> wires these together and
                  handles the reasoning loop automatically.
                </p>
              </section>

              {/* ═══════════════ AGENT vs CHAIN ═══════════════ */}
              <section id="agent-vs-chain" className="mb-16">
                <SectionHeading id="agent-vs-chain">Agent vs Chain</SectionHeading>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Before agents, everything in LangChain was a <strong className="text-foreground">chain</strong>
                  {' '}— a fixed pipeline where step A always leads to step B, then step C, every single time.
                  Your chatbot? A chain. Your RAG pipeline? A chain. They work great for predictable workflows.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  But chains break down when the task isn't predictable. What if sometimes you need a calculator
                  and sometimes you don't? What if the first API call determines which second API call to make?
                  That's where agents shine — they <em>adapt</em>.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="p-5 rounded-xl bg-card/50 border border-border">
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <GitBranch className="w-4 h-4 text-amber-400" /> <span className="text-amber-400">Chain</span> (Chatbot, RAG)
                    </h4>
                    <ul className="space-y-1.5 text-sm text-muted-foreground">
                      <li>&#x2022; Fixed sequence of steps, always the same</li>
                      <li>&#x2022; <InlineCode>prompt → LLM → output</InlineCode></li>
                      <li>&#x2022; Predictable and easy to debug</li>
                      <li>&#x2022; Cannot handle tasks it wasn't designed for</li>
                      <li>&#x2022; Best for well-defined, repeatable workflows</li>
                    </ul>
                    <div className="mt-3 pt-3 border-t border-border">
                      <p className="text-xs text-muted-foreground italic">
                        "Every order goes through the same kitchen process, no exceptions."
                      </p>
                    </div>
                  </div>
                  <div className="p-5 rounded-xl bg-card/50 border border-teal-500/20">
                    <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                      <Brain className="w-4 h-4 text-teal-400" /> <span className="text-teal-400">Agent</span> (This module)
                    </h4>
                    <ul className="space-y-1.5 text-sm text-muted-foreground">
                      <li>&#x2022; Decides which steps to take dynamically</li>
                      <li>&#x2022; <InlineCode>think → act → observe → repeat</InlineCode></li>
                      <li>&#x2022; Flexible — handles diverse, open-ended queries</li>
                      <li>&#x2022; Can chain multiple tool calls together</li>
                      <li>&#x2022; Best for tasks that vary per request</li>
                    </ul>
                    <div className="mt-3 pt-3 border-t border-teal-500/10">
                      <p className="text-xs text-muted-foreground italic">
                        "The chef reads the order, decides what to cook, checks the pantry, adapts."
                      </p>
                    </div>
                  </div>
                </div>

                <Callout type="info">
                  You don't have to choose one or the other. Many production systems use chains for well-defined
                  paths (like RAG) and agents for open-ended queries. The agent can even <em>call</em> a RAG chain
                  as one of its tools — giving it access to document search as an action it can take.
                </Callout>

                <div className="overflow-x-auto mt-6">
                  <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
                    <thead>
                      <tr className="bg-card/80">
                        <th className="text-left px-4 py-3 text-foreground font-semibold border-b border-border">Situation</th>
                        <th className="text-left px-4 py-3 text-foreground font-semibold border-b border-border">Use a…</th>
                        <th className="text-left px-4 py-3 text-foreground font-semibold border-b border-border">Why</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr className="border-b border-border">
                        <td className="px-4 py-3">"Summarize this document"</td>
                        <td className="px-4 py-3 text-amber-400">Chain</td>
                        <td className="px-4 py-3">Single predictable step</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="px-4 py-3">"Answer from my docs"</td>
                        <td className="px-4 py-3 text-amber-400">Chain (RAG)</td>
                        <td className="px-4 py-3">Always: retrieve → generate</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="px-4 py-3">"What's 15% tip on $82.50?"</td>
                        <td className="px-4 py-3 text-teal-400">Agent</td>
                        <td className="px-4 py-3">Needs a calculator tool</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="px-4 py-3">"Research X, then email Y"</td>
                        <td className="px-4 py-3 text-teal-400">Agent</td>
                        <td className="px-4 py-3">Multi-tool, multi-step</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3">"Search docs, then calculate savings"</td>
                        <td className="px-4 py-3 text-teal-400">Agent</td>
                        <td className="px-4 py-3">RAG + calculator in one task</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* ═══════════════ WHAT ARE TOOLS ═══════════════ */}
              <section id="what-are-tools" className="mb-16">
                <SectionHeading id="what-are-tools">What Are Tools?</SectionHeading>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  A <strong className="text-foreground">tool</strong> is a Python function that you expose to the
                  agent. It has three parts the LLM reads to decide how to use it:
                </p>
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-teal-400">1</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Name</p>
                      <p className="text-xs text-muted-foreground">The function name (e.g., <InlineCode>search_web</InlineCode>). The LLM uses this to <em>request</em> the tool.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-violet-500/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-violet-400">2</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Description (docstring)</p>
                      <p className="text-xs text-muted-foreground">This is <em>critical</em>. The LLM reads this to decide <em>when</em> to call the tool. A vague description = confused agent.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-amber-400">3</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Input schema (type hints)</p>
                      <p className="text-xs text-muted-foreground">The LLM reads the parameter types to know <em>what arguments</em> to pass (e.g., <InlineCode>query: str</InlineCode>).</p>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  Tools are how agents interact with the outside world — they bridge the gap between "understanding"
                  (what the LLM is good at) and "doing" (what requires real computation or external access).
                  Here are some common tool categories:
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                  {[
                    { icon: Wrench, color: 'text-teal-400', bg: 'bg-teal-500/10', name: 'Calculator', desc: 'Arithmetic the LLM would get wrong — percentages, compound interest, unit conversions' },
                    { icon: Search, color: 'text-violet-400', bg: 'bg-violet-500/10', name: 'Web Search', desc: 'Look up real-time data — news, stock prices, weather, documentation' },
                    { icon: Settings, color: 'text-amber-400', bg: 'bg-amber-500/10', name: 'API Caller', desc: 'Hit any REST/GraphQL API — Stripe charges, Slack messages, GitHub issues' },
                    { icon: Terminal, color: 'text-cyan-400', bg: 'bg-cyan-500/10', name: 'Code Executor', desc: 'Run Python/JS snippets in a sandbox and return the output' },
                    { icon: Database, color: 'text-emerald-400', bg: 'bg-emerald-500/10', name: 'Database Query', desc: 'Generate and execute SQL to get real data from your DB' },
                    { icon: Layers, color: 'text-rose-400', bg: 'bg-rose-500/10', name: 'RAG Retriever', desc: 'Search your private document store — make RAG a tool the agent can use' },
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
                  arguments, and LangChain's executor runs the function and returns the result. The LLM stays in
                  a "thinking" role, the tools do the "doing". This is both a safety feature and a clean
                  architectural boundary.
                </Callout>
              </section>

              {/* ═══════════════ HOW TOOL CALLING WORKS ═══════════════ */}
              <section id="how-tool-calling-works" className="mb-16">
                <SectionHeading id="how-tool-calling-works">How Tool Calling Works Under the Hood</SectionHeading>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  When you give an agent tools, here's what actually happens behind the scenes. Understanding
                  this helps you debug when things go wrong:
                </p>

                <div className="space-y-4 mb-6">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-violet-500/10 flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-violet-400">1</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">Tool definitions are sent to the API</p>
                      <p className="text-sm text-muted-foreground">
                        When you call the OpenAI API, LangChain sends your tool definitions along with the prompt.
                        The API receives a JSON schema describing each tool — its name, description, and parameters.
                        The LLM sees this schema and knows what tools are available.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-cyan-500/10 flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-cyan-400">2</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">The LLM decides to call a tool</p>
                      <p className="text-sm text-muted-foreground">
                        Instead of generating a text response, the model generates a <strong className="text-foreground">
                        structured tool call</strong> — a JSON object with the tool name and arguments.
                        For example: <InlineCode>{`{"tool": "add_numbers", "args": {"a": 12.5, "b": 7.3}}`}</InlineCode>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-teal-400">3</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">LangChain executes the function</p>
                      <p className="text-sm text-muted-foreground">
                        The <InlineCode>AgentExecutor</InlineCode> catches this tool call, finds the matching
                        Python function, calls it with those arguments, and gets back the result (e.g., <InlineCode>19.8</InlineCode>).
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center shrink-0">
                      <span className="text-sm font-bold text-amber-400">4</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground mb-1">Result goes back to the LLM</p>
                      <p className="text-sm text-muted-foreground">
                        The tool result is appended to the conversation (in the <InlineCode>agent_scratchpad</InlineCode>)
                        and sent back to the LLM. The model now sees: "I called add_numbers, got 19.8." It
                        decides whether it needs more tool calls or can produce a final answer.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="my-6 p-5 rounded-2xl bg-card/50 border border-border">
                  <p className="text-sm font-semibold text-foreground mb-4">What the LLM actually sees</p>
                  <div className="space-y-3 text-sm font-mono">
                    <div className="p-3 rounded-lg bg-violet-500/5 border border-violet-500/20">
                      <p className="text-xs text-violet-400 mb-1">System prompt (your instructions)</p>
                      <p className="text-muted-foreground text-xs">"You are a helpful agent. Use tools when needed."</p>
                    </div>
                    <div className="p-3 rounded-lg bg-teal-500/5 border border-teal-500/20">
                      <p className="text-xs text-teal-400 mb-1">Available tools (auto-generated from your @tool functions)</p>
                      <p className="text-muted-foreground text-xs whitespace-pre-wrap">{`add_numbers(a: float, b: float) → float
  "Add two numbers together."

summarize_text(text: str) → str
  "Return a short summary of the input text."`}</p>
                    </div>
                    <div className="p-3 rounded-lg bg-amber-500/5 border border-amber-500/20">
                      <p className="text-xs text-amber-400 mb-1">User input</p>
                      <p className="text-muted-foreground text-xs">"Add 12.5 and 7.3"</p>
                    </div>
                    <div className="p-3 rounded-lg bg-cyan-500/5 border border-cyan-500/20">
                      <p className="text-xs text-cyan-400 mb-1">Agent scratchpad (builds up as the agent works)</p>
                      <p className="text-muted-foreground text-xs">[Tool call: add_numbers(a=12.5, b=7.3) → 19.8]</p>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  This is why <strong className="text-foreground">docstrings matter so much</strong>. The
                  tool definition (name + description + type hints) is <em>all</em> the LLM has to decide
                  whether to call your tool. If the description is vague, the agent will either skip the
                  tool or call it at the wrong time. Write your docstrings like you're explaining the
                  tool to a new team member.
                </p>
              </section>

              {/* ═══════════════ THE AGENT LOOP ═══════════════ */}
              <section id="agent-loop" className="mb-16">
                <SectionHeading id="agent-loop">The Agent Loop (ReAct)</SectionHeading>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Agents follow a reasoning pattern called <strong className="text-foreground">ReAct</strong>
                  {' '}(Reason + Act). It was introduced in a{' '}
                  <a href="https://arxiv.org/abs/2210.03629" target="_blank" rel="noopener noreferrer" className="text-teal-400 hover:text-teal-300 underline">
                    2022 research paper
                  </a>
                  {' '}and became the standard way agents operate. The idea is simple:
                </p>

                <p className="text-muted-foreground leading-relaxed mb-6">
                  At every step, the agent <strong className="text-foreground">reasons</strong> about what it
                  knows so far, <strong className="text-foreground">acts</strong> by calling a tool, and{' '}
                  <strong className="text-foreground">observes</strong> the result. Then it loops back and
                  reasons again — "given what I now know, what should I do next?" — until it has enough
                  information to answer.
                </p>

                <div className="my-8 p-6 rounded-2xl bg-card/50 border border-border">
                  <p className="text-sm font-semibold text-foreground mb-5">The ReAct loop — step by step</p>
                  <div className="space-y-4">
                    {[
                      { step: '1', icon: MessageSquare, color: 'text-violet-400', bg: 'bg-violet-500/10', label: 'Receive task', desc: 'User says: "Add 12.5 and 7.3, then summarize \'Agents call tools to do work.\'"' },
                      { step: '2', icon: Brain, color: 'text-cyan-400', bg: 'bg-cyan-500/10', label: 'Reason (Think)', desc: 'The LLM reads the task and thinks: "This has two parts. I need to add numbers and summarize text. Let me start with the addition."' },
                      { step: '3', icon: Wrench, color: 'text-teal-400', bg: 'bg-teal-500/10', label: 'Act (Call Tool)', desc: 'LLM outputs: call add_numbers(a=12.5, b=7.3). LangChain runs the function → returns 19.8' },
                      { step: '4', icon: Eye, color: 'text-amber-400', bg: 'bg-amber-500/10', label: 'Observe', desc: 'The result "19.8" is added to the agent scratchpad. The LLM sees: "add_numbers returned 19.8."' },
                      { step: '5', icon: RefreshCw, color: 'text-rose-400', bg: 'bg-rose-500/10', label: 'Reason again', desc: '"I have the sum (19.8), but I still need to summarize that text. Let me call summarize_text."' },
                      { step: '6', icon: Wrench, color: 'text-teal-400', bg: 'bg-teal-500/10', label: 'Act again', desc: 'LLM outputs: call summarize_text(text="Agents call tools..."). Function returns the summary.' },
                      { step: '7', icon: Zap, color: 'text-emerald-400', bg: 'bg-emerald-500/10', label: 'Final answer', desc: '"The sum is 19.8. Summary: Agents call tools to do work." — both parts done, agent responds.' },
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
                      The loop continues until the agent decides it has enough information. If the task
                      needed 5 tool calls, it would loop 5 times. If no tools are needed, it skips straight
                      to a final answer.
                    </p>
                  </div>
                </div>

                <Callout type="info" title="Why is this called ReAct?">
                  <strong className="text-foreground">Re</strong>asoning + <strong className="text-foreground">Act</strong>ing
                  = ReAct. Before this approach, systems would either reason (chain-of-thought) <em>or</em> act
                  (call tools), but not both. ReAct interleaves thinking and doing, which dramatically improves
                  accuracy because the model can course-correct at every step based on real tool results.
                </Callout>
              </section>

              {/* ═══════════════ TYPES OF AGENTS ═══════════════ */}
              <section id="types-of-agents" className="mb-16">
                <SectionHeading id="types-of-agents">Types of Agents</SectionHeading>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Not all agents work the same way. As the field has evolved, different architectures have
                  emerged for different use cases. Here's the landscape:
                </p>

                <div className="space-y-6 mb-8">
                  <div className="p-5 rounded-xl bg-card/50 border border-emerald-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Wrench className="w-5 h-5 text-emerald-400" />
                      <h4 className="font-semibold text-foreground">Tool Calling Agent</h4>
                      <span className="text-xs px-2 py-0.5 rounded-full text-emerald-400 bg-emerald-400/10 border border-emerald-400/20">We use this</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Uses the LLM's <strong className="text-foreground">native function calling</strong> feature.
                      When GPT-4 or Claude decides to use a tool, it outputs structured JSON specifying which
                      tool to call and with what arguments — no parsing needed. This is the most reliable approach
                      because the model was specifically trained for it.
                    </p>
                    <div className="flex flex-wrap gap-3 text-xs">
                      <span className="text-emerald-400">+ Most reliable</span>
                      <span className="text-emerald-400">+ Fastest</span>
                      <span className="text-emerald-400">+ Native model support</span>
                      <span className="text-red-400">- Requires modern LLMs</span>
                    </div>
                  </div>

                  <div className="p-5 rounded-xl bg-card/50 border border-violet-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Brain className="w-5 h-5 text-violet-400" />
                      <h4 className="font-semibold text-foreground">ReAct Agent (Text-based)</h4>
                      <span className="text-xs px-2 py-0.5 rounded-full text-violet-400 bg-violet-400/10 border border-violet-400/20">Classic</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Uses the Reason+Act prompting pattern in plain text. The LLM writes out its thinking in
                      natural language ("I should use the calculator"), then specifies an action. LangChain
                      parses the text to extract the tool call. Works with any LLM, even those without native
                      function calling — like open-source models.
                    </p>
                    <div className="flex flex-wrap gap-3 text-xs">
                      <span className="text-emerald-400">+ Works with any LLM</span>
                      <span className="text-emerald-400">+ Visible chain-of-thought</span>
                      <span className="text-red-400">- Parsing can fail</span>
                      <span className="text-red-400">- Slower</span>
                    </div>
                  </div>

                  <div className="p-5 rounded-xl bg-card/50 border border-amber-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Workflow className="w-5 h-5 text-amber-400" />
                      <h4 className="font-semibold text-foreground">Plan-and-Execute Agent</h4>
                      <span className="text-xs px-2 py-0.5 rounded-full text-amber-400 bg-amber-400/10 border border-amber-400/20">Advanced</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Instead of reacting step-by-step, this agent first <strong className="text-foreground">
                      creates a complete plan</strong> ("Step 1: search web, Step 2: extract data, Step 3:
                      calculate"), then executes each step. Good for complex, multi-step tasks where planning
                      ahead avoids wasted API calls and dead ends.
                    </p>
                    <div className="flex flex-wrap gap-3 text-xs">
                      <span className="text-emerald-400">+ Better for complex tasks</span>
                      <span className="text-emerald-400">+ Fewer wasted steps</span>
                      <span className="text-red-400">- Plan may need revision</span>
                      <span className="text-red-400">- More complex setup</span>
                    </div>
                  </div>

                  <div className="p-5 rounded-xl bg-card/50 border border-cyan-500/20">
                    <div className="flex items-center gap-2 mb-2">
                      <Layers className="w-5 h-5 text-cyan-400" />
                      <h4 className="font-semibold text-foreground">Multi-Agent Systems</h4>
                      <span className="text-xs px-2 py-0.5 rounded-full text-cyan-400 bg-cyan-400/10 border border-cyan-400/20">Advanced</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">
                      Multiple specialized agents collaborate — one researches, one writes, one reviews, one
                      codes. Each has its own tools and role. Think of it as a team of AI employees. Frameworks
                      like <strong className="text-foreground">LangGraph</strong>,{' '}
                      <strong className="text-foreground">CrewAI</strong>, and{' '}
                      <strong className="text-foreground">AutoGen</strong> handle the orchestration.
                    </p>
                    <div className="flex flex-wrap gap-3 text-xs">
                      <span className="text-emerald-400">+ Handles complex workflows</span>
                      <span className="text-emerald-400">+ Specialization</span>
                      <span className="text-red-400">- Higher cost</span>
                      <span className="text-red-400">- Complex to build</span>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm border border-border rounded-xl overflow-hidden">
                    <thead>
                      <tr className="bg-card/80">
                        <th className="text-left px-4 py-3 text-foreground font-semibold border-b border-border">Type</th>
                        <th className="text-left px-4 py-3 text-foreground font-semibold border-b border-border">Best For</th>
                        <th className="text-left px-4 py-3 text-foreground font-semibold border-b border-border">Complexity</th>
                      </tr>
                    </thead>
                    <tbody className="text-muted-foreground">
                      <tr className="border-b border-border">
                        <td className="px-4 py-3 text-emerald-400">Tool Calling</td>
                        <td className="px-4 py-3">Most use cases with modern LLMs</td>
                        <td className="px-4 py-3">Low</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="px-4 py-3 text-violet-400">ReAct (Text)</td>
                        <td className="px-4 py-3">Open-source models, visible reasoning</td>
                        <td className="px-4 py-3">Low</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="px-4 py-3 text-amber-400">Plan-and-Execute</td>
                        <td className="px-4 py-3">Complex research, multi-step analysis</td>
                        <td className="px-4 py-3">Medium</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3 text-cyan-400">Multi-Agent</td>
                        <td className="px-4 py-3">Enterprise workflows, autonomous teams</td>
                        <td className="px-4 py-3">High</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* ═══════════════ MEMORY IN AGENTS ═══════════════ */}
              <section id="agent-memory" className="mb-16">
                <SectionHeading id="agent-memory">Memory in Agents</SectionHeading>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Agents actually use <strong className="text-foreground">two types of memory</strong>, and
                  it's important to understand the difference:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="p-5 rounded-xl bg-card/50 border border-violet-500/20">
                    <div className="flex items-center gap-2 mb-3">
                      <Brain className="w-5 h-5 text-violet-400" />
                      <h4 className="font-semibold text-foreground">Working memory (Scratchpad)</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      The <InlineCode>agent_scratchpad</InlineCode> stores the agent's thoughts and tool results
                      <em> within a single task</em>. It's like short-term memory — "I called the calculator and
                      got 19.8, now I need to summarize."
                    </p>
                    <p className="text-xs text-violet-400/70">Lives only during one invoke() call. Resets between tasks.</p>
                  </div>
                  <div className="p-5 rounded-xl bg-card/50 border border-teal-500/20">
                    <div className="flex items-center gap-2 mb-3">
                      <MessageSquare className="w-5 h-5 text-teal-400" />
                      <h4 className="font-semibold text-foreground">Conversation memory</h4>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">
                      If you add a <InlineCode>ChatMessageHistory</InlineCode> (like we did in the chatbot module),
                      the agent can remember past conversations. "You asked about refund policies earlier" — that
                      context persists across multiple invoke() calls.
                    </p>
                    <p className="text-xs text-teal-400/70">Persists across multiple tasks. Like chat history.</p>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed mb-4">
                  In this module we only use the scratchpad (working memory) — the agent starts fresh with each
                  task. Adding conversation memory is straightforward once you've done the chatbot module: you
                  wrap the agent in <InlineCode>RunnableWithMessageHistory</InlineCode> the same way you did
                  with a regular chain.
                </p>

                <Callout type="tip">
                  The scratchpad is <em>critical</em> for multi-step tasks. Without it, the agent
                  would forget what tools it already called and might call them again, or lose the
                  results it needs for the final answer. It's what makes the ReAct loop actually work.
                </Callout>
              </section>

              {/* ═══════════════ COMMON PITFALLS ═══════════════ */}
              <section id="common-pitfalls" className="mb-16">
                <SectionHeading id="common-pitfalls">Common Pitfalls</SectionHeading>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Agents are powerful but they have sharp edges. Here are the mistakes everyone makes when
                  starting out (and how to avoid them):
                </p>

                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-card/50 border border-border">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground mb-1">Vague tool descriptions</p>
                        <p className="text-sm text-muted-foreground">
                          A docstring like "does computation" gives the LLM nothing to work with. Be specific:
                          "Add two numbers together. Use this whenever the user asks to add, sum, or total
                          numerical values." The more context, the better the agent's tool selection.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-card/50 border border-border">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground mb-1">Too many tools at once</p>
                        <p className="text-sm text-muted-foreground">
                          Giving an agent 50 tools overwhelms the LLM — the tool descriptions eat up
                          context window and make selection harder. Start with 3-5 tools. If you need more,
                          consider grouping related tools or using a routing agent.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-card/50 border border-border">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground mb-1">No error handling in tools</p>
                        <p className="text-sm text-muted-foreground">
                          If your tool raises an unhandled exception, the entire agent crashes. Always wrap
                          tool logic in try/except and return a helpful error message. The agent can then
                          reason about the error and try a different approach.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-card/50 border border-border">
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground mb-1">Infinite loops</p>
                        <p className="text-sm text-muted-foreground">
                          If the agent gets confused, it might keep calling the same tool over and over.
                          Always set <InlineCode>max_iterations</InlineCode> on the <InlineCode>AgentExecutor</InlineCode>
                          {' '}(default is 15). In production, add timeouts and cost limits too.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-card/50 border border-border">
                    <div className="flex items-start gap-3">
                      <Lightbulb className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm font-medium text-foreground mb-1">Pro tip: Always start with verbose=True</p>
                        <p className="text-sm text-muted-foreground">
                          When developing, keep <InlineCode>verbose=True</InlineCode> on the executor. It
                          prints every reasoning step, every tool call, and every result. This lets you see
                          exactly what the agent is thinking and catch problems early. Turn it off in production.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* ═══════════════ PREREQUISITES ═══════════════ */}
              <section id="prerequisites" className="mb-16">
                <SectionHeading id="prerequisites">Prerequisites</SectionHeading>
                <ul className="space-y-3 text-muted-foreground">
                  {[
                    { label: 'Python 3.9+' },
                    { label: 'OpenAI API key', detail: 'with access to gpt-4o-mini or gpt-4o' },
                    { label: 'Basic Chatbot module completed', detail: '(recommended — covers prompts and memory)' },
                    { label: 'Familiarity with Python decorators', detail: '(@tool uses the decorator pattern)' },
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
                <p className="text-muted-foreground leading-relaxed mt-4 mb-6">
                  We only need three packages: <InlineCode>langchain</InlineCode> for the agent framework,{' '}
                  <InlineCode>langchain-openai</InlineCode> for the OpenAI LLM, and <InlineCode>python-dotenv</InlineCode>
                  {' '}to load our API key securely. No vector databases or embedding models needed — agents
                  are lighter weight than RAG.
                </p>

                <CodeBlock filename="project_structure" showLineNumbers={false}
                  code={`small-agent/
├── .env                   # API key (never commit this)
├── .gitignore
├── config.py              # Environment + constants
├── tools.py               # Tool definitions
├── agent.py               # Agent builder
└── app.py                 # Run the agent`} />

                <p className="text-muted-foreground leading-relaxed mt-4 mb-4">
                  We split the code into four files. This isn't just for organization — it means you can add
                  new tools to <InlineCode>tools.py</InlineCode> without touching the agent logic, or swap
                  the model in <InlineCode>config.py</InlineCode> without changing anything else. In production
                  projects, this separation becomes essential.
                </p>

                <div id="env-setup" className="mt-10">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Environment Variables</h3>
                  <CodeBlock filename=".env" showLineNumbers={false}
                    code={`OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`} />
                  <p className="text-muted-foreground leading-relaxed mt-4 mb-4">
                    Never hardcode your API key in a Python file. The <InlineCode>.env</InlineCode> file
                    keeps it separate, and <InlineCode>.gitignore</InlineCode> prevents it from ending up
                    in your Git repo. This is standard practice for any project that uses API keys.
                  </p>

                  <CodeBlock filename="config.py"
                    code={`import os
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise ValueError("OPENAI_API_KEY not set in .env")

MODEL_NAME = "gpt-4o-mini"`} />
                  <p className="text-muted-foreground leading-relaxed mt-4 mb-4">
                    Pretty straightforward. We load the API key from <InlineCode>.env</InlineCode> and
                    immediately check if it exists — if someone forgets to create the file, the app crashes
                    with a clear error instead of failing later with a confusing API message.{' '}
                    <InlineCode>MODEL_NAME</InlineCode> is centralized here so you can switch from{' '}
                    <InlineCode>gpt-4o-mini</InlineCode> to <InlineCode>gpt-4o</InlineCode> in one place.
                  </p>
                </div>
              </section>

              {/* ═══════════════ IMPLEMENTATION ═══════════════ */}
              <section id="implementation" className="mb-16">
                <SectionHeading id="implementation">Implementation (Step by Step)</SectionHeading>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  We'll build a small agent with two tools: a calculator and a text summarizer. These are
                  simple tools by design — the focus here is on understanding <em>how agents work</em>,
                  not on building complex tools. Once you get the pattern, swapping in real tools
                  (API callers, database queries, web scrapers) is trivial.
                </p>

                {/* Step 1: Tools */}
                <div id="step-tools" className="mb-14">
                  <h3 className="text-xl font-semibold text-foreground mb-2 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400 text-xs font-bold">1</span>
                    Define Tools
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Every tool in LangChain is just a Python function decorated with{' '}
                    <InlineCode>@tool</InlineCode>. The decorator wraps your function and exposes three
                    things to the LLM:
                  </p>
                  <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                      <span><strong className="text-foreground">Function name</strong> — the LLM sees this name and uses it to request the tool</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                      <span><strong className="text-foreground">Docstring</strong> — the LLM reads this to understand <em>when</em> to use the tool. This is the most important part!</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                      <span><strong className="text-foreground">Type hints</strong> — the LLM uses these to know what arguments to pass and in what format</span>
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
                    Let's unpack this. The <InlineCode>@tool</InlineCode> decorator is the magic ingredient —
                    it tells LangChain "hey, this function can be called by an AI agent." The LLM doesn't
                    see your Python code — it only sees three things: the function <em>name</em>, the{' '}
                    <em>docstring</em>, and the <em>type hints</em>. So when the user says "add 5 and 3",
                    the LLM reads the name <InlineCode>add_numbers</InlineCode> and the docstring
                    "Add two numbers together..." and thinks "yep, this is the right tool." It then looks
                    at the type hints (<InlineCode>a: float, b: float</InlineCode>) to know it needs to
                    pass two numbers.
                  </p>
                  <p className="text-muted-foreground leading-relaxed mt-2 mb-4">
                    These are toy examples, but in real projects your tools could search databases, call APIs,
                    send emails — anything. The pattern is always the same: write a function, add{' '}
                    <InlineCode>@tool</InlineCode>, write a clear docstring.
                  </p>
                  <Callout type="tip">
                    The docstring is the most important part of a tool. The LLM reads it to decide <em>whether</em>
                    {' '}to use the tool. A vague docstring like "does stuff" will confuse the agent. Be specific
                    about when the tool should be used — include example trigger phrases if possible.
                  </Callout>
                </div>

                {/* Step 2: Agent */}
                <div id="step-agent" className="mb-14">
                  <h3 className="text-xl font-semibold text-foreground mb-2 flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-violet-500/10 flex items-center justify-center text-violet-400 text-xs font-bold">2</span>
                    Build the Agent
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Now we wire everything together: an LLM (for reasoning), a list of tools (for acting),
                    and a prompt (to set the agent's behavior). We wrap it all in an{' '}
                    <InlineCode>AgentExecutor</InlineCode> which handles the ReAct loop automatically.
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
                    This is the brain of the operation. Let's walk through each piece:
                  </p>
                  <ul className="space-y-3 text-sm text-muted-foreground mb-4">
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-foreground"><InlineCode>ChatOpenAI(temperature=0)</InlineCode></strong>
                        {' '}— we use temperature 0 so the agent is deterministic. You don't want creative
                        decision-making when it's choosing tools — you want reliable, consistent behavior.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-foreground"><InlineCode>tools = [...]</InlineCode></strong>
                        {' '}— the list of tool functions we defined. The agent sees their names,
                        descriptions, and schemas.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-foreground"><InlineCode>agent_scratchpad</InlineCode></strong>
                        {' '}— this is where LangChain stores intermediate results as the agent loops.
                        Each tool result gets appended here so the LLM can see what it's already done.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <ChevronRight className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-foreground"><InlineCode>AgentExecutor</InlineCode></strong>
                        {' '}— the orchestrator that runs the full loop: prompt the LLM → parse tool calls →
                        execute tools → add results to scratchpad → repeat until done.
                      </span>
                    </li>
                  </ul>

                  <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-violet-500/5 to-cyan-500/5 border border-violet-500/20">
                    <p className="text-sm text-foreground font-medium mb-2">What is <InlineCode>agent_scratchpad</InlineCode>?</p>
                    <p className="text-sm text-muted-foreground">
                      Think of it like a whiteboard the agent writes on. As it loops through Reason →
                      Act → Observe steps, each tool call and its result is written on the whiteboard.
                      The LLM reads this whiteboard at every step so it knows what it's already done and
                      can decide what to do next. Without it, the agent would suffer from amnesia between steps.
                    </p>
                  </div>

                  <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-teal-500/5 to-cyan-500/5 border border-teal-500/20">
                    <p className="text-sm text-foreground font-medium mb-2">What does <InlineCode>verbose=True</InlineCode> do?</p>
                    <p className="text-sm text-muted-foreground">
                      It prints the agent's reasoning at every step — which tool it chose, what arguments it passed,
                      what it got back. This is invaluable for debugging. You'll see the full chain of thought
                      in your terminal. Turn it off in production to avoid noisy logs.
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
                    Now let's give the agent a task that requires <em>multiple</em> tool calls. This is where
                    agents really shine — we describe what we want in plain English, and the agent figures
                    out which tools to call and in what order:
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
                    Notice what's happening here — we give it <em>one</em> sentence that actually contains
                    {' '}<em>two</em> tasks: adding numbers AND summarizing text. We don't tell it which tools
                    to use or in what order. The agent reads the input, thinks "I need to call{' '}
                    <InlineCode>add_numbers</InlineCode> with 12.5 and 7.3, and also call{' '}
                    <InlineCode>summarize_text</InlineCode> on that sentence," makes both calls, collects
                    the results, and combines them into one clean answer. This is what separates an agent from
                    a chain — a chain always follows the same steps, but an agent <em>decides</em> what to do
                    based on the input.
                  </p>

                  <OutputBlock title="Sample Output (verbose)"
                    output={`> Entering new AgentExecutor chain...

Invoking: 'add_numbers' with {'a': 12.5, 'b': 7.3}
19.8

Invoking: 'summarize_text' with {'text': 'Agents call tools to do work.'}
Agents call tools to do work.

Final Answer:
The sum of 12.5 and 7.3 is 19.8. Summary: Agents call tools to do work.`} />
                  <p className="text-muted-foreground leading-relaxed mt-4 mb-4">
                    See the verbose output? You can trace the agent's entire thought process. It entered the
                    AgentExecutor chain, invoked <InlineCode>add_numbers</InlineCode> first, got 19.8, then
                    invoked <InlineCode>summarize_text</InlineCode>, got the summary, and combined everything
                    into a final answer. Two tool calls, zero hardcoding. This is the power of agents.
                  </p>

                  <Callout type="info">
                    The agent made <em>two</em> separate tool calls — one for math, one for summarization —
                    then combined both results into a coherent final answer. You never told it to call tools
                    in this order; it figured that out from the task description. Try changing the input and
                    watch it adapt.
                  </Callout>
                </div>
              </section>

              {/* ═══════════════ COMPLETE SCRIPT ═══════════════ */}
              <section id="complete-project" className="mb-16">
                <SectionHeading id="complete-project">Complete Script</SectionHeading>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  Here's everything combined in a single file for quick experiments. In production, use the
                  modular version above — separate files for tools, agent, and runner make it easier to test,
                  extend, and maintain.
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

print("\\nFinal Answer:\\n", result["output"])`} />
                <p className="text-muted-foreground leading-relaxed mt-4 mb-4">
                  The full flow in one file: load API key → define tools with{' '}
                  <InlineCode>@tool</InlineCode> → set up LLM and prompt → create agent
                  and executor → invoke with a task. For learning and quick experiments, this single-file
                  version is perfect. For real projects, stick with the modular version — separate files
                  for tools, agent, and runner makes it way easier to add new tools, swap models, or write tests.
                </p>
              </section>

              {/* ═══════════════ NEXT STEPS ═══════════════ */}
              <section id="next-steps" className="mb-16">
                <SectionHeading id="next-steps">Next Steps</SectionHeading>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  You've built a working agent! Here are two directions to explore next:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Link to="/docs/basic-rag"
                    className="group p-6 rounded-2xl bg-card/50 border border-border hover:border-foreground/20 hover:shadow-lg hover:shadow-foreground/5 transition-all">
                    <h3 className="font-semibold text-foreground mb-1 group-hover:text-teal-500 transition-colors">
                      Implement Basic RAG
                    </h3>
                    <p className="text-sm text-muted-foreground">Add a RAG retriever as a tool your agent can use — give it access to your private documents</p>
                  </Link>
                  <Link to="/docs/prompt-engineering"
                    className="group p-6 rounded-2xl bg-card/50 border border-border hover:border-foreground/20 hover:shadow-lg hover:shadow-foreground/5 transition-all">
                    <h3 className="font-semibold text-foreground mb-1 group-hover:text-teal-500 transition-colors">
                      Prompt Engineering Patterns
                    </h3>
                    <p className="text-sm text-muted-foreground">Improve your agent's system prompt for better reasoning and more reliable tool selection</p>
                  </Link>
                </div>
              </section>

              {/* Footer nav */}
              <div className="flex items-center justify-between pt-8 border-t border-border">
                <Link to="/docs" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
                  <ArrowLeft className="w-4 h-4" /> Back to Docs
                </Link>
                <a href="https://github.com/lokeshpanthangi/MLCodex" target="_blank" rel="noopener noreferrer"
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
