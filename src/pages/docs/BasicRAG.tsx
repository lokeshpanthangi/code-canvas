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
  { id: 'chatbot-hook', title: 'Chatbot Hook' },
  { id: 'why-rag', title: 'Why We Need RAG' },
  { id: 'internals', title: 'What RAG Does Internally' },
  { id: 'prerequisites', title: 'Prerequisites' },
  { id: 'setup', title: 'Setup & Installation' },
  { id: 'env-setup', title: 'Environment Variables', parent: 'setup' },
  { id: 'implementation', title: 'Implementation' },
  { id: 'load-split', title: 'Load & Split Docs', parent: 'implementation' },
  { id: 'embeddings-storage', title: 'Embeddings & Storage', parent: 'implementation' },
  { id: 'retrieval-types', title: 'Types of Retrieval', parent: 'implementation' },
  { id: 'rag-chain', title: 'Build RAG Chain', parent: 'implementation' },
  { id: 'query-run', title: 'Query & Validate', parent: 'implementation' },
  { id: 'complete-project', title: 'Complete Script' },
  { id: 'next-steps', title: 'Next Steps' },
];

const BasicRAG = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [progress, setProgress] = useState<string[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const contentRef = useRef<HTMLElement>(null);

  const handleDownloadPDF = async () => {
    setIsDownloading(true);

    const content = `
IMPLEMENT BASIC RAG WITH LANGCHAIN
==================================

Build a Retrieval-Augmented Generation pipeline using LangChain + OpenAI.

1. Why RAG
2. How RAG works internally
3. Setup and env
4. Step-by-step implementation
5. Retrieval strategies
6. Vector stores + embedding model choices
`;

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
            <span className="text-foreground">Implement Basic RAG</span>
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
                    { slug: 'basic-rag', title: 'Implement Basic RAG', active: true },
                    { slug: 'small-agent', title: 'Build a Small Agent' },
                    { slug: 'prompt-engineering', title: 'Prompt Engineering Patterns' },
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
                  <h1 className="text-4xl lg:text-5xl font-bold tracking-tight mb-4">Implement Basic RAG</h1>
                  <p className="text-lg text-muted-foreground leading-relaxed">
                    Build a complete Retrieval-Augmented Generation pipeline with <InlineCode>LangChain</InlineCode>
                    {' '}+ <InlineCode>langchain-openai</InlineCode>. Learn why RAG matters, what happens internally,
                    and how to choose retrieval and storage strategies for production.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    <span>3 hours</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Star className="w-4 h-4" />
                    <span>1,889 stars</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <GitFork className="w-4 h-4" />
                    <span>620 forks</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Users className="w-4 h-4" />
                    <span>110 contributors</span>
                  </div>
                  <span className="px-2.5 py-1 rounded-full bg-amber-400/10 text-amber-400 border border-amber-400/20 text-xs font-medium">
                    Intermediate
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

                <p className="text-muted-foreground leading-relaxed mb-4">
                  A vanilla chatbot can sound fluent, but it only knows what was in training data and current
                  prompt context. With RAG, your chatbot can answer from your own docs, policies, manuals,
                  and product notes — with fresher, grounded responses.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  <div className="p-4 rounded-xl bg-card/50 border border-border">
                    <div className="text-2xl font-bold text-foreground mb-1">~120</div>
                    <div className="text-sm text-muted-foreground">Lines of Code</div>
                  </div>
                  <div className="p-4 rounded-xl bg-card/50 border border-border">
                    <div className="text-2xl font-bold text-foreground mb-1">4</div>
                    <div className="text-sm text-muted-foreground">Core Stages</div>
                  </div>
                  <div className="p-4 rounded-xl bg-card/50 border border-border">
                    <div className="text-2xl font-bold text-foreground mb-1">1</div>
                    <div className="text-sm text-muted-foreground">Production Pattern</div>
                  </div>
                </div>
              </section>

              <section id="chatbot-hook" className="mb-16">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <button
                    onClick={() => toggleProgress('chatbot-hook')}
                    className="text-muted-foreground hover:text-teal-500 transition-colors"
                  >
                    {progress.includes('chatbot-hook') ? (
                      <CheckCircle2 className="w-6 h-6 text-teal-500" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>
                  Quick Hook: Chatbot + Memory
                </h2>

                <p className="text-muted-foreground leading-relaxed mb-4">
                  If you have not built the chatbot yet, start with
                  <Link to="/docs/basic-chatbot" className="text-teal-400 hover:text-teal-300"> Build a Basic Chatbot</Link>.
                  That module covers the foundation: prompts, memory, and streaming.
                </p>

                <p className="text-muted-foreground leading-relaxed mb-4">
                  A chatbot is just a loop: user message → LLM response. Memory means we keep previous turns
                  and send them again so the model remembers context. That helps continuity, but memory alone
                  cannot inject new external knowledge. RAG solves that part.
                </p>

                <CodeBlock
                  filename="memory_hook.py"
                  code={`from langchain_openai import ChatOpenAI
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
    chain,
    get_history,
    input_messages_key="input",
    history_messages_key="history",
)

config = {"configurable": {"session_id": "demo"}}
print(chatbot.invoke({"input": "My name is Sam."}, config=config).content)
print(chatbot.invoke({"input": "What is my name?"}, config=config).content)`}
                />

                <Callout type="note">
                  Memory remembers conversation context. RAG adds document context.
                  In real apps you usually combine both.
                </Callout>
              </section>

              <section id="why-rag" className="mb-16">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <button
                    onClick={() => toggleProgress('why-rag')}
                    className="text-muted-foreground hover:text-teal-500 transition-colors"
                  >
                    {progress.includes('why-rag') ? (
                      <CheckCircle2 className="w-6 h-6 text-teal-500" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>
                  Why We Need RAG
                </h2>

                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Fresh knowledge:</strong> update docs without retraining the model.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Grounded answers:</strong> responses are tied to retrieved sources, reducing hallucinations.</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Cost control:</strong> retrieve only relevant chunks instead of stuffing huge prompts.</span>
                  </li>
                </ul>
              </section>

              <section id="internals" className="mb-16">
                <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-3">
                  <button
                    onClick={() => toggleProgress('internals')}
                    className="text-muted-foreground hover:text-teal-500 transition-colors"
                  >
                    {progress.includes('internals') ? (
                      <CheckCircle2 className="w-6 h-6 text-teal-500" />
                    ) : (
                      <Circle className="w-6 h-6" />
                    )}
                  </button>
                  What RAG Does Internally
                </h2>

                <div className="my-6 p-6 rounded-2xl bg-card/50 border border-border">
                  <p className="text-sm text-muted-foreground mb-3">RAG pipeline:</p>
                  <div className="text-sm font-mono text-foreground overflow-x-auto whitespace-nowrap">
                    Query → Embed query → Retrieve top-k chunks → Build context prompt → LLM generate answer
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  This separation is powerful: storage/indexing happens once during ingestion, while retrieval
                  + generation happen per user query. That means you can keep adding docs and improve answers
                  continuously.
                </p>
              </section>

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
                <ul className="space-y-3 text-muted-foreground">
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">Python 3.9+</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">OpenAI API key</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-teal-500 shrink-0 mt-0.5" />
                    <span><strong className="text-foreground">A few text docs</strong> in a <InlineCode>data/</InlineCode> folder</span>
                  </li>
                </ul>
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
                  code={`mkdir basic-rag && cd basic-rag
python -m venv venv
source venv/bin/activate   # Windows: venv\\Scripts\\activate

pip install langchain langchain-openai langchain-community langchain-chroma python-dotenv`}
                  showLineNumbers={false}
                />

                <p className="text-muted-foreground leading-relaxed mt-4">
                  We will split the code into small, real modules so each step is easy to understand. At the end,
                  you will also see a single-file version that combines everything.
                </p>

                <CodeBlock
                  filename="project_structure"
                  code={`basic-rag/
├── data/                  # Your .txt files
├── .env
├── .gitignore
├── config.py              # Env + constants
├── ingest.py              # Load & split docs
├── vector_store.py        # Embeddings + storage
├── retrieval.py           # Retrieval strategies
├── rag_chain.py           # RAG chain builder
└── app.py                 # Query loop`}
                  showLineNumbers={false}
                />

                <div id="env-setup" className="mt-10">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Environment Variables</h3>
                  <CodeBlock
                    filename=".env"
                    code={`OPENAI_API_KEY=sk-proj-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`}
                    showLineNumbers={false}
                  />

                  <CodeBlock
                    filename=".gitignore"
                    code={`.env
venv/
chroma_db/
__pycache__/`}
                    showLineNumbers={false}
                  />

                  <p className="text-muted-foreground leading-relaxed mt-4">
                    Create a tiny config module to keep constants in one place:
                  </p>

                  <CodeBlock
                    filename="config.py"
                    code={`import os
from dotenv import load_dotenv

load_dotenv()

OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise ValueError("OPENAI_API_KEY not set in .env")

DATA_DIR = "data"
CHROMA_DIR = "chroma_db"
EMBEDDING_MODEL = "text-embedding-3-small"`}
                  />
                </div>
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
                  Each step is a real, runnable file. You will stitch them together at the end in a single
                  script, but we keep things modular while learning.
                </p>

                <div id="load-split" className="mb-12">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Step 1 — Load & Split Documents</h3>
                  <CodeBlock
                  filename="ingest.py"
                  code={`from langchain_community.document_loaders import DirectoryLoader, TextLoader
        from langchain_text_splitters import RecursiveCharacterTextSplitter
        from config import DATA_DIR

        def load_and_split(chunk_size: int = 800, chunk_overlap: int = 120):
          loader = DirectoryLoader(
            DATA_DIR,
            glob="**/*.txt",
            loader_cls=TextLoader,
          )

          documents = loader.load()

          splitter = RecursiveCharacterTextSplitter(
            chunk_size=chunk_size,
            chunk_overlap=chunk_overlap,
          )

          return splitter.split_documents(documents)`}
                  />

                  <Callout type="tip">
                    Larger chunks keep more context but may reduce retrieval precision. Smaller chunks improve precision
                    but may lose surrounding meaning. Start around 500-1000 chars and tune from query quality.
                  </Callout>
                </div>

                <div id="embeddings-storage" className="mb-12">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Step 2 — Embeddings & Storage</h3>
                  <CodeBlock
                  filename="vector_store.py"
                  code={`from langchain_openai import OpenAIEmbeddings
        from langchain_chroma import Chroma
        from config import CHROMA_DIR, EMBEDDING_MODEL
        from ingest import load_and_split

        def build_vector_store():
          chunks = load_and_split()

          embeddings = OpenAIEmbeddings(model=EMBEDDING_MODEL)

          return Chroma.from_documents(
            documents=chunks,
            embedding=embeddings,
            persist_directory=CHROMA_DIR,
          )`}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-5">
                    <div className="p-4 rounded-xl bg-card/50 border border-border">
                      <h4 className="font-semibold text-foreground mb-2">Vector DB Providers</h4>
                      <p className="text-sm text-muted-foreground">
                        Chroma (local), Pinecone (managed), Weaviate, Qdrant, Milvus. Use local for learning,
                        managed services for scale and reliability.
                      </p>
                    </div>
                    <div className="p-4 rounded-xl bg-card/50 border border-border">
                      <h4 className="font-semibold text-foreground mb-2">Storage Size Basics</h4>
                      <p className="text-sm text-muted-foreground">
                        Storage grows with chunk count × vector dimension × metadata. More overlap and larger docs
                        increase index size; measure before production rollouts.
                      </p>
                    </div>
                  </div>
                </div>

                <div id="retrieval-types" className="mb-12">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Step 3 — Types of Retrieval</h3>

                  <CodeBlock
                  filename="retrieval.py"
                  code={`from vector_store import build_vector_store

        def get_retrievers():
          vector_store = build_vector_store()

          retriever_similarity = vector_store.as_retriever(
            search_type="similarity",
            search_kwargs={"k": 4},
          )

          retriever_mmr = vector_store.as_retriever(
            search_type="mmr",
            search_kwargs={"k": 6, "fetch_k": 20, "lambda_mult": 0.5},
          )

          retriever_threshold = vector_store.as_retriever(
            search_type="similarity_score_threshold",
            search_kwargs={"score_threshold": 0.35, "k": 6},
          )

          return {
            "similarity": retriever_similarity,
            "mmr": retriever_mmr,
            "threshold": retriever_threshold,
          }`}
                  />

                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Retrieval strategy affects answer quality a lot:
                  </p>
                  <ul className="space-y-2 text-muted-foreground mb-4">
                    <li><strong className="text-foreground">Similarity:</strong> fastest baseline, top nearest chunks.</li>
                    <li><strong className="text-foreground">MMR:</strong> balances relevance + diversity, reduces duplicate context.</li>
                    <li><strong className="text-foreground">Score threshold:</strong> skips weak matches to avoid noisy context.</li>
                    <li><strong className="text-foreground">Hybrid retrieval:</strong> combine keyword/BM25 + vector retrieval for best robustness.</li>
                  </ul>
                </div>

                <div id="rag-chain" className="mb-12">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Step 4 — Build the RAG Chain</h3>
                  <CodeBlock
                  filename="rag_chain.py"
                  code={`from langchain_openai import ChatOpenAI
        from langchain.chains import RetrievalQA
        from retrieval import get_retrievers

        def build_qa_chain(strategy: str = "mmr"):
          retrievers = get_retrievers()
          retriever = retrievers[strategy]

          llm = ChatOpenAI(
            model="gpt-4o-mini",
            temperature=0,
          )

          return RetrievalQA.from_chain_type(
            llm=llm,
            chain_type="stuff",
            retriever=retriever,
            return_source_documents=True,
          )`}
                  />

                  <Callout type="info" title="What chain_type='stuff' means">
                    It concatenates retrieved chunks into one context block and sends them in a single prompt.
                    Great for small/medium context windows. For larger corpora, consider map-reduce/refine variants.
                  </Callout>
                </div>

                <div id="query-run" className="mb-12">
                  <h3 className="text-xl font-semibold text-foreground mb-4">Step 5 — Query & Validate</h3>
                  <CodeBlock
                    filename="app.py"
                    code={`from rag_chain import build_qa_chain

qa_chain = build_qa_chain(strategy="mmr")

query = "What is our refund policy window?"
result = qa_chain.invoke({"query": query})

print("\nAnswer:\n", result["result"])
print("\nRetrieved Sources:")
for i, doc in enumerate(result["source_documents"], 1):
    source = doc.metadata.get("source", "unknown")
    snippet = doc.page_content[:180].replace("\n", " ")
    print(f"{i}. {source} -> {snippet}...")`}
                  />

                  <OutputBlock
                    title="Sample Output"
                    output={`Answer:
Our refund policy allows full refunds within 14 days of purchase for annual plans,
provided usage stays below the fair-use threshold.

Retrieved Sources:
1. data/policy.txt -> Refunds are eligible within 14 calendar days from purchase...
2. data/billing.txt -> Annual plan customers can request cancellation and refund...
3. data/faq.txt -> Fair-use threshold applies to heavy enterprise usage...`}
                  />
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
                  filename="rag.py"
                  code={`"""
Basic RAG with LangChain + OpenAI
=================================
1) Load docs
2) Split docs
3) Embed + store in Chroma
4) Retrieve + answer with RetrievalQA
"""

import os
from dotenv import load_dotenv
from langchain_community.document_loaders import DirectoryLoader, TextLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_openai import OpenAIEmbeddings, ChatOpenAI
from langchain_chroma import Chroma
from langchain.chains import RetrievalQA

load_dotenv()
if not os.getenv("OPENAI_API_KEY"):
    raise ValueError("OPENAI_API_KEY not set in .env")

loader = DirectoryLoader("data", glob="**/*.txt", loader_cls=TextLoader)
documents = loader.load()

splitter = RecursiveCharacterTextSplitter(chunk_size=800, chunk_overlap=120)
chunks = splitter.split_documents(documents)

embeddings = OpenAIEmbeddings(model="text-embedding-3-small")
vector_store = Chroma.from_documents(chunks, embeddings, persist_directory="chroma_db")

retriever = vector_store.as_retriever(search_type="mmr", search_kwargs={"k": 4, "fetch_k": 16})

llm = ChatOpenAI(model="gpt-4o-mini", temperature=0)
qa_chain = RetrievalQA.from_chain_type(
    llm=llm,
    chain_type="stuff",
    retriever=retriever,
    return_source_documents=True,
)

while True:
    query = input("\nAsk (or 'quit'): ").strip()
    if query.lower() in {"quit", "exit", "q"}:
      break

    result = qa_chain.invoke({"query": query})
    print("\nAnswer:\n", result["result"])
    print("\nTop Sources:")
    for doc in result["source_documents"][:3]:
      print("-", doc.metadata.get("source", "unknown"))`}
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
                    to="/docs/basic-chatbot"
                    className="group p-6 rounded-2xl bg-card/50 border border-border hover:border-foreground/20 hover:shadow-lg hover:shadow-foreground/5 transition-all"
                  >
                    <h3 className="font-semibold text-foreground mb-1 group-hover:text-teal-500 transition-colors">
                      Build a Basic Chatbot
                    </h3>
                    <p className="text-sm text-muted-foreground">Combine memory + RAG into one assistant</p>
                  </Link>

                  <Link
                    to="/docs/model-deployment"
                    className="group p-6 rounded-2xl bg-card/50 border border-border hover:border-foreground/20 hover:shadow-lg hover:shadow-foreground/5 transition-all"
                  >
                    <h3 className="font-semibold text-foreground mb-1 group-hover:text-teal-500 transition-colors">
                      Model Deployment
                    </h3>
                    <p className="text-sm text-muted-foreground">Ship your RAG API to production</p>
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

export default BasicRAG;
