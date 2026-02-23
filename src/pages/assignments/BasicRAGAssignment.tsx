import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Editor from '@monaco-editor/react';
import {
  ArrowLeft,
  RotateCcw,
  Loader2,
  Lightbulb,
  BookOpen,
  CheckCircle2,
  XCircle,
  Play,
  Sparkles,
  Trophy,
  Timer,
  Code2,
  Maximize2,
  Bookmark,
  Terminal,
  X,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { config } from '@/lib/config';
import AIEvalModal from '@/components/assignment/AIEvalModal';

/* ================================================================== */
/*  Assignment data                                                    */
/* ================================================================== */
interface Step {
  number: number;
  title: string;
  body: string;
}

interface Hint {
  step: number;
  title: string;
  tip: string;
}

const assignmentTitle = 'Basic RAG Building';
const assignmentDifficulty = 'Intermediate';

const assignmentDescription = `Build a complete Retrieval-Augmented Generation (RAG) pipeline using LangChain and a vector database.

Your pipeline should be able to:
• Accept a corpus of text documents
• Break them into meaningful chunks
• Store their embeddings in a vector store
• Answer natural-language questions by retrieving relevant context and passing it to an LLM

You are expected to import the necessary libraries, configure your environment (API keys, model settings), load & split documents, build the vector store, wire up a retrieval chain, and finally query it.`;

const steps: Step[] = [
  {
    number: 1,
    title: 'Set up your environment',
    body: 'Install and import the libraries you need. You will work with LangChain for orchestration, an OpenAI-compatible LLM, a vector database (Chroma), and a tokenizer. Set your API key via an environment variable.',
  },
  {
    number: 2,
    title: 'Load & chunk your documents',
    body: "Load one or more text files and split them into smaller, overlapping chunks that fit within the embedding model's context window. Choose sensible chunk and overlap sizes.",
  },
  {
    number: 3,
    title: 'Embed & store',
    body: 'Create vector embeddings for each chunk and persist them in a vector store so you can perform similarity search later.',
  },
  {
    number: 4,
    title: 'Build the retrieval chain',
    body: 'Instantiate your LLM and connect it to the vector store through a retrieval chain. The chain should fetch the most relevant chunks and feed them as context to the model.',
  },
  {
    number: 5,
    title: 'Query & verify',
    body: "Ask a question about the content of your documents. Print the LLM's answer and the source chunks that were retrieved.",
  },
];

const hints: Hint[] = [
  {
    step: 1,
    title: 'Libraries & API key',
    tip: 'You will need langchain, chromadb, openai, and tiktoken. Use os.environ["OPENAI_API_KEY"] to set your key. Import TextLoader, RecursiveCharacterTextSplitter, OpenAIEmbeddings, Chroma, ChatOpenAI, and RetrievalQA.',
  },
  {
    step: 2,
    title: 'Splitting documents',
    tip: 'Use RecursiveCharacterTextSplitter(chunk_size=500, chunk_overlap=50). Call loader.load() then splitter.split_documents(docs).',
  },
  {
    step: 3,
    title: 'Vector store',
    tip: 'Chroma.from_documents(chunks, OpenAIEmbeddings()) builds and stores everything in one call. Check count with vectorstore._collection.count().',
  },
  {
    step: 4,
    title: 'Retrieval chain',
    tip: 'Create the LLM with ChatOpenAI(model_name="gpt-3.5-turbo"). Get a retriever with vectorstore.as_retriever(search_kwargs={"k": 3}). Wire it with RetrievalQA.from_chain_type(llm, retriever=retriever, return_source_documents=True).',
  },
  {
    step: 5,
    title: 'Querying',
    tip: 'Call qa_chain({"query": "your question"}) — the result dict contains "result" (the answer) and "source_documents" (list of retrieved chunks).',
  },
];

const starterCode = `# Step 1 — Set up environment
# Import libraries and set your API key here


# Step 2 — Load & chunk documents
# Load a text file and split it into chunks


# Step 3 — Embed & store
# Create embeddings and build the vector store


# Step 4 — Build the retrieval chain
# Instantiate LLM, retriever, and chain


# Step 5 — Query & verify
# Ask a question and print the answer + sources
`;

/* ================================================================== */
/*  Component                                                          */
/* ================================================================== */
const BasicRAGAssignment = () => {
  const [leftTab, setLeftTab] = useState<'description' | 'hints'>('description');
  const [code, setCode] = useState(starterCode);
  const [aiEvaluating, setAiEvaluating] = useState(false);
  const [executing, setExecuting] = useState(false);
  const [evalResult, setEvalResult] = useState<null | 'pass' | 'fail'>(null);
  const [resultMsg, setResultMsg] = useState('');
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string>('');
  const [terminalVisible, setTerminalVisible] = useState(false);
  const [executionTime, setExecutionTime] = useState<number | null>(null);
  const [evalModalOpen, setEvalModalOpen] = useState(false);

  // Timer
  useEffect(() => {
    const interval = setInterval(() => setElapsedSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = useCallback((s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  }, []);

  const toggleStep = useCallback((stepNum: number) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(stepNum)) next.delete(stepNum);
      else next.add(stepNum);
      return next;
    });
  }, []);

  const progressPercent = Math.round((completedSteps.size / steps.length) * 100);

  const handleReset = () => {
    setCode(starterCode);
    setEvalResult(null);
    setResultMsg('');
  };

  const handleAiEval = () => {
    setEvalModalOpen(true);
  };

  const handleExecute = async () => {
    setExecuting(true);
    setTerminalVisible(true);
    setTerminalOutput('Running...');
    setExecutionTime(null);

    try {
      const res = await fetch(
        `${config.onecompiler.baseUrl}?access_token=${config.onecompiler.accessToken}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            language: 'python',
            stdin: '',
            files: [{ name: 'main.py', content: code }],
          }),
        },
      );

      const data = await res.json();

      let output = '';
      if (data.stderr) {
        output += data.stderr;
      }
      if (data.exception) {
        output += (output ? '\n' : '') + data.exception;
      }
      if (data.stdout) {
        output = data.stdout + (output ? '\n' + output : '');
      }
      if (!output) {
        output = '(No output)';
      }

      setTerminalOutput(output);
      setExecutionTime(data.executionTime ?? null);
    } catch (err) {
      setTerminalOutput(`Error: ${err instanceof Error ? err.message : 'Failed to connect to execution service'}`);
    } finally {
      setExecuting(false);
    }
  };

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
        e.preventDefault();
        handleAiEval();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [code]);

  return (
    <div className="h-screen flex flex-col bg-background text-foreground overflow-hidden">

      {/* AI Eval Modal */}
      <AIEvalModal open={evalModalOpen} onOpenChange={setEvalModalOpen} code={code} />

      {/* Confetti overlay */}
      {showConfetti && (
        <div className="fixed inset-0 z-50 pointer-events-none overflow-hidden">
          {Array.from({ length: 60 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                top: `-5%`,
                backgroundColor: ['#10b981', '#06b6d4', '#8b5cf6', '#f59e0b', '#ef4444', '#ec4899'][i % 6],
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* ====== LeetCode-style top bar ====== */}
      <header className="h-12 flex-shrink-0 flex items-center justify-between px-4 border-b border-border bg-card/80 backdrop-blur-md">
        {/* Left: back + title */}
        <div className="flex items-center gap-3">
          <Link
            to="/assignments"
            className="flex items-center justify-center w-8 h-8 rounded-lg hover:bg-foreground/5 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <span className="w-px h-5 bg-border" />
          <span className="text-sm font-semibold text-foreground truncate">{assignmentTitle}</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20 font-medium leading-none hidden sm:inline-flex">
            {assignmentDifficulty}
          </span>
        </div>

        {/* Center: Run + Submit */}
        <div className="hidden md:flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleExecute}
            disabled={executing || aiEvaluating}
            className="h-8 px-3 text-xs border-foreground/15 hover:bg-foreground/5"
          >
            {executing ? (
              <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
            ) : (
              <Play className="w-3.5 h-3.5 mr-1.5" />
            )}
            Run
          </Button>
          <Button
            variant="hero"
            size="sm"
            onClick={handleAiEval}
            disabled={aiEvaluating || executing}
            className="h-8 px-4 text-xs"
          >
            {aiEvaluating ? (
              <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" />
            ) : (
              <Sparkles className="w-3.5 h-3.5 mr-1.5" />
            )}
            AI Eval
          </Button>
        </div>

        {/* Right: progress + timer + icons */}
        <div className="flex items-center gap-3">
          {/* Progress bar */}
          <div className="hidden lg:flex items-center gap-2">
            <div className="w-20 h-1.5 rounded-full bg-foreground/10 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-teal-500 to-cyan-400 transition-all duration-500 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="text-[11px] font-medium text-muted-foreground">{progressPercent}%</span>
          </div>
          <span className="w-px h-5 bg-border hidden lg:block" />
          {/* Timer */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
            <Timer className="w-3.5 h-3.5" />
            {formatTime(elapsedSeconds)}
          </div>
          <span className="w-px h-5 bg-border" />
          <button className="text-muted-foreground hover:text-foreground transition-colors" title="Bookmark">
            <Bookmark className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* ====== Main split ====== */}
      <div className="flex-1 flex flex-col lg:flex-row min-h-0">

        {/* ---------- LEFT PANEL ---------- */}
        <div className="lg:w-[42%] flex flex-col border-r border-border min-h-0 hide-scrollbar">

          {/* Tabs */}
          <div className="flex items-center gap-0 px-4 border-b border-border bg-card/30 flex-shrink-0">
            <button
              onClick={() => setLeftTab('description')}
              className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium border-b-2 transition-colors ${
                leftTab === 'description'
                  ? 'border-teal-400 text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Description
            </button>
            <button
              onClick={() => setLeftTab('hints')}
              className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-medium border-b-2 transition-colors ${
                leftTab === 'hints'
                  ? 'border-teal-400 text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Lightbulb className="w-3.5 h-3.5" />
              Hints
            </button>
          </div>

          {/* Scrollable content */}
          <div className="flex-1 overflow-y-auto p-5 lg:p-6 hide-scrollbar">
            {leftTab === 'description' ? (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-1">{assignmentTitle}</h2>
                  <div className="flex items-center gap-2 mt-2">
                    <Trophy className="w-4 h-4 text-teal-400" />
                    <span className="text-sm text-muted-foreground">{completedSteps.size}/{steps.length} steps completed</span>
                  </div>
                </div>

                <p className="text-base text-muted-foreground leading-relaxed whitespace-pre-wrap">
                  {assignmentDescription}
                </p>

                <div className="space-y-4">
                  {steps.map((s) => (
                    <button
                      key={s.number}
                      onClick={() => toggleStep(s.number)}
                      className={`w-full flex gap-4 p-4 rounded-xl text-left transition-all duration-200 border ${
                        completedSteps.has(s.number)
                          ? 'bg-teal-500/5 border-teal-500/20'
                          : 'bg-foreground/[0.02] border-border hover:border-foreground/10'
                      }`}
                    >
                      <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold mt-0.5 transition-all duration-200 ${
                        completedSteps.has(s.number)
                          ? 'bg-teal-500 text-white'
                          : 'bg-teal-500/10 border border-teal-500/20 text-teal-400'
                      }`}>
                        {completedSteps.has(s.number) ? <CheckCircle2 className="w-4 h-4" /> : s.number}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className={`text-base font-semibold mb-1 transition-colors ${
                          completedSteps.has(s.number) ? 'text-teal-400' : 'text-foreground'
                        }`}>{s.title}</h4>
                        <p className="text-[15px] text-muted-foreground leading-relaxed">{s.body}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-5">
                <h3 className="text-xl font-bold text-foreground mb-3">Hints per Step</h3>
                {hints.map((h) => (
                  <div
                    key={h.step}
                    className="rounded-xl bg-foreground/[0.03] border border-border p-5 hover:border-foreground/10 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="w-6 h-6 rounded-full bg-amber-400/10 border border-amber-400/20 flex items-center justify-center text-[11px] font-bold text-amber-400">
                        {h.step}
                      </div>
                      <span className="text-base font-semibold text-foreground">{h.title}</span>
                    </div>
                    <p className="text-[15px] text-muted-foreground leading-relaxed pl-8">{h.tip}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* ---------- RIGHT PANEL (Code Editor) ---------- */}
        <div className="flex-1 flex flex-col min-h-0">

          {/* Code header — matches LeetCode style */}
          <div className="flex items-center justify-between px-4 h-10 border-b border-border bg-card/30 flex-shrink-0">
            <div className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Code</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-medium text-teal-400 bg-teal-400/10 px-2.5 py-1 rounded">Python3</span>
              </div>
              <span className="w-px h-4 bg-border" />
              <button
                onClick={handleReset}
                className="flex items-center justify-center w-7 h-7 rounded-md text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors"
                title="Reset to starter code"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                className="flex items-center justify-center w-7 h-7 rounded-md text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors"
                title="Fullscreen"
              >
                <Maximize2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Monaco Editor */}
          <div className={`min-h-0 ${terminalVisible ? 'flex-[3]' : 'flex-1'}`}>
            <Editor
              height="100%"
              defaultLanguage="python"
              theme="vs-dark"
              value={code}
              onChange={(value) => {
                setCode(value ?? '');
                setEvalResult(null);
                setResultMsg('');
              }}
              options={{
                fontSize: 14,
                fontFamily: "'Fira Code', 'Cascadia Code', 'JetBrains Mono', Menlo, Monaco, monospace",
                fontLigatures: true,
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                padding: { top: 16, bottom: 16 },
                lineNumbers: 'on',
                renderLineHighlight: 'line',
                cursorBlinking: 'smooth',
                cursorSmoothCaretAnimation: 'on',
                smoothScrolling: true,
                bracketPairColorization: { enabled: true },
                automaticLayout: true,
                wordWrap: 'on',
                tabSize: 4,
                insertSpaces: true,
                suggestOnTriggerCharacters: true,
                quickSuggestions: true,
              }}
              loading={
                <div className="flex items-center justify-center h-full bg-[#1e1e1e]">
                  <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                </div>
              }
            />
          </div>

          {/* Terminal Output Panel */}
          {terminalVisible && (
            <div className="flex-[2] flex flex-col min-h-0 border-t border-border">
              {/* Terminal header */}
              <div className="flex items-center justify-between px-4 h-9 bg-[#1e1e1e] border-b border-white/5 flex-shrink-0">
                <div className="flex items-center gap-2">
                  <Terminal className="w-3.5 h-3.5 text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground">Output</span>
                  {executionTime !== null && (
                    <span className="text-[10px] text-muted-foreground/60 font-mono ml-2">{executionTime}ms</span>
                  )}
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setTerminalOutput('')}
                    className="flex items-center justify-center w-6 h-6 rounded text-muted-foreground/60 hover:text-muted-foreground hover:bg-white/5 transition-colors"
                    title="Clear"
                  >
                    <RotateCcw className="w-3 h-3" />
                  </button>
                  <button
                    onClick={() => setTerminalVisible(false)}
                    className="flex items-center justify-center w-6 h-6 rounded text-muted-foreground/60 hover:text-muted-foreground hover:bg-white/5 transition-colors"
                    title="Close terminal"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
              {/* Terminal body */}
              <div className="flex-1 overflow-auto bg-[#1e1e1e] p-4 hide-scrollbar">
                <pre className="text-[13px] font-mono leading-relaxed whitespace-pre-wrap break-words">
                  {executing ? (
                    <span className="text-muted-foreground flex items-center gap-2">
                      <Loader2 className="w-3.5 h-3.5 animate-spin inline" />
                      Executing...
                    </span>
                  ) : (
                    <span className={terminalOutput.includes('Error') || terminalOutput.includes('Traceback') || terminalOutput.includes('error') ? 'text-red-400' : 'text-emerald-400'}>
                      {terminalOutput}
                    </span>
                  )}
                </pre>
              </div>
            </div>
          )}

          {/* Feedback area */}
          {(evalResult || resultMsg) && (
            <div className={`flex-shrink-0 px-4 py-3 border-t text-xs leading-relaxed ${
              evalResult === 'pass'
                ? 'border-emerald-500/30 bg-emerald-500/5 text-emerald-400'
                : evalResult === 'fail'
                ? 'border-red-500/30 bg-red-500/5 text-red-400'
                : 'border-border bg-card/40 text-muted-foreground'
            }`}>
              <div className="flex items-start gap-2">
                {evalResult === 'pass' && <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                {evalResult === 'fail' && <XCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />}
                <span>{resultMsg}</span>
              </div>
            </div>
          )}

          {/* Bottom status bar */}
          <div className="flex-shrink-0 border-t border-border bg-card/40 px-4 py-2 flex items-center justify-between">
            <span className="text-[11px] text-muted-foreground">Saved</span>
            <span className="text-[11px] text-muted-foreground font-mono">⌘+Enter to submit</span>
          </div>

          {/* Mobile-only buttons (hidden on desktop since they're in top bar) */}
          <div className="flex md:hidden items-center gap-2 px-4 py-3 border-t border-border bg-card/60">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExecute}
              disabled={executing || aiEvaluating}
              className="flex-1 h-9 text-xs border-foreground/15"
            >
              {executing ? <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> : <Play className="w-3.5 h-3.5 mr-1.5" />}
              Run
            </Button>
            <Button
              variant="hero"
              size="sm"
              onClick={handleAiEval}
              disabled={aiEvaluating || executing}
              className="flex-1 h-9 text-xs"
            >
              {aiEvaluating ? <Loader2 className="w-3.5 h-3.5 mr-1.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5 mr-1.5" />}
              AI Eval
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicRAGAssignment;

/* Confetti + scrollbar-hide styles */
const _style = document.createElement('style');
_style.textContent = `
  @keyframes confetti-fall {
    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
    100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
  }
  .animate-confetti {
    animation: confetti-fall linear forwards;
  }
  .hide-scrollbar::-webkit-scrollbar { display: none; }
  .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
`;
document.head.appendChild(_style);
