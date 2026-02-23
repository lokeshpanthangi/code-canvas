import { useState, useEffect, useRef } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Sparkles,
  Loader2,
  Trophy,
  Eye,
  BookOpen,
  ShieldCheck,
  Code2,
  AlertTriangle,
  Zap,
  Copy,
  Check,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { EvalResult, EvalCategory } from '@/lib/aiEval';
import { evaluateCodeStream } from '@/lib/aiEval';

/* ------------------------------------------------------------------ */
/*  Category icon + colour mapping                                     */
/* ------------------------------------------------------------------ */
const categoryMeta: Record<
  string,
  { icon: React.ElementType; color: string; bg: string; border: string; ring: string }
> = {
  'Code Clarity': {
    icon: Eye,
    color: 'text-sky-400',
    bg: 'bg-sky-400/10',
    border: 'border-sky-400/20',
    ring: 'ring-sky-400/30',
  },
  'Concept Understanding': {
    icon: BookOpen,
    color: 'text-violet-400',
    bg: 'bg-violet-400/10',
    border: 'border-violet-400/20',
    ring: 'ring-violet-400/30',
  },
  Completeness: {
    icon: Trophy,
    color: 'text-amber-400',
    bg: 'bg-amber-400/10',
    border: 'border-amber-400/20',
    ring: 'ring-amber-400/30',
  },
  'Production Readiness': {
    icon: ShieldCheck,
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10',
    border: 'border-emerald-400/20',
    ring: 'ring-emerald-400/30',
  },
  'Best Practices': {
    icon: Code2,
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10',
    border: 'border-cyan-400/20',
    ring: 'ring-cyan-400/30',
  },
  'Error Handling & Edge Cases': {
    icon: AlertTriangle,
    color: 'text-rose-400',
    bg: 'bg-rose-400/10',
    border: 'border-rose-400/20',
    ring: 'ring-rose-400/30',
  },
};

const fallbackMeta = {
  icon: Zap,
  color: 'text-teal-400',
  bg: 'bg-teal-400/10',
  border: 'border-teal-400/20',
  ring: 'ring-teal-400/30',
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
function scoreColor(score: number) {
  if (score >= 8) return 'text-emerald-400';
  if (score >= 6) return 'text-amber-400';
  if (score >= 4) return 'text-orange-400';
  return 'text-red-400';
}

function scoreBarColor(score: number) {
  if (score >= 8) return 'bg-emerald-400';
  if (score >= 6) return 'bg-amber-400';
  if (score >= 4) return 'bg-orange-400';
  return 'bg-red-400';
}

function overallGrade(score: number) {
  if (score >= 90) return { label: 'Outstanding', color: 'text-emerald-400', bg: 'bg-emerald-400/10' };
  if (score >= 75) return { label: 'Great', color: 'text-teal-400', bg: 'bg-teal-400/10' };
  if (score >= 60) return { label: 'Good', color: 'text-amber-400', bg: 'bg-amber-400/10' };
  if (score >= 40) return { label: 'Needs Work', color: 'text-orange-400', bg: 'bg-orange-400/10' };
  return { label: 'Keep Going', color: 'text-red-400', bg: 'bg-red-400/10' };
}

/* ------------------------------------------------------------------ */
/*  Code snippet copy button                                           */
/* ------------------------------------------------------------------ */
function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }}
      className="absolute top-2 right-2 p-1 rounded bg-white/5 hover:bg-white/10 transition-colors"
      title="Copy snippet"
    >
      {copied ? (
        <Check className="w-3 h-3 text-emerald-400" />
      ) : (
        <Copy className="w-3 h-3 text-muted-foreground" />
      )}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Tips panel for selected category                                   */
/* ------------------------------------------------------------------ */
function TipsPanel({ cat }: { cat: EvalCategory }) {
  const meta = categoryMeta[cat.name] ?? fallbackMeta;

  return (
    <div className="space-y-3 animate-in fade-in-0 slide-in-from-bottom-2 duration-200">
      {/* Score bar header */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 flex-1 min-w-0">
          <div className="flex-1 h-1.5 rounded-full bg-foreground/10 overflow-hidden">
            <div
              className={`h-full rounded-full ${scoreBarColor(cat.score)} transition-all duration-700 ease-out`}
              style={{ width: `${cat.score * 10}%` }}
            />
          </div>
          <span className={`text-sm font-bold tabular-nums ${scoreColor(cat.score)}`}>{cat.score}/10</span>
          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${scoreColor(cat.score)} bg-foreground/5`}>
            {cat.label}
          </span>
        </div>
      </div>

      {/* Tips list */}
      <div className="space-y-3">
        {cat.tips.map((tip, i) => (
          <div key={i} className="space-y-2">
            <div className="flex items-start gap-2">
              <div className={`w-5 h-5 rounded-md ${meta.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                <span className={`text-[10px] font-bold ${meta.color}`}>{i + 1}</span>
              </div>
              <p className="text-[13px] text-muted-foreground leading-relaxed">{tip.text}</p>
            </div>
            {tip.codeSnippet && (
              <div className="relative ml-7">
                <CopyButton text={tip.codeSnippet} />
                <pre className="text-[12px] font-mono leading-relaxed bg-[#1e1e1e] border border-white/5 rounded-lg p-3 pr-10 overflow-x-auto text-emerald-300/90 whitespace-pre-wrap">
                  {tip.codeSnippet}
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main modal                                                         */
/* ------------------------------------------------------------------ */
interface AIEvalModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  code: string;
}

export default function AIEvalModal({ open, onOpenChange, code }: AIEvalModalProps) {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<EvalResult | null>(null);
  const [partial, setPartial] = useState<Partial<EvalResult> | null>(null);
  const [error, setError] = useState('');
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const abortRef = useRef(false);

  const runEvaluation = async () => {
    setLoading(true);
    setError('');
    setResult(null);
    setPartial(null);
    setSelectedCat(null);
    abortRef.current = false;

    try {
      const final = await evaluateCodeStream(code, (p) => {
        if (!abortRef.current) {
          setPartial({ ...p });
          // Auto-select first category as it streams in
          if (p.categories && p.categories.length > 0 && !abortRef.current) {
            const firstName = p.categories[0]?.name;
            if (typeof firstName === 'string' && firstName.trim()) {
              setSelectedCat((prev) => prev ?? firstName);
            }
          }
        }
      });
      setResult(final);
      setPartial(null);
      if (final.categories.length > 0) {
        const firstName = final.categories[0]?.name;
        if (typeof firstName === 'string' && firstName.trim()) {
          setSelectedCat((prev) => prev ?? firstName);
        }
      }
    } catch (err) {
      if (!abortRef.current) {
        setError(err instanceof Error ? err.message : 'Evaluation failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // Auto-evaluate when modal opens
  useEffect(() => {
    if (open && !result && !loading) {
      runEvaluation();
    }
    if (!open) {
      abortRef.current = true;
      setResult(null);
      setPartial(null);
      setError('');
      setSelectedCat(null);
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  // Use final result or partial
  const data = result ?? partial;
  const grade = data?.overallScore != null ? overallGrade(data.overallScore) : null;
  const categories = (Array.isArray(data?.categories) ? data.categories : []).map((cat, index) => {
    const safeName = typeof cat?.name === 'string' && cat.name.trim() ? cat.name : `Category ${index + 1}`;
    const safeScore = typeof cat?.score === 'number' ? cat.score : 0;
    const safeLabel = typeof cat?.label === 'string' && cat.label.trim() ? cat.label : 'Pending';
    const safeTips = Array.isArray(cat?.tips)
      ? cat.tips
          .filter((tip) => tip && typeof tip.text === 'string' && tip.text.trim())
          .map((tip) => ({
            text: tip.text,
            codeSnippet: typeof tip.codeSnippet === 'string' ? tip.codeSnippet : null,
          }))
      : [];

    return {
      name: safeName,
      score: safeScore,
      label: safeLabel,
      tips: safeTips,
    };
  });
  const activeCat = categories.find((c) => c.name === selectedCat);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[92vw] max-w-5xl h-[92vh] max-h-[92vh] overflow-hidden flex flex-col bg-background border-border p-0">
        {/* Header */}
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border flex-shrink-0">
          <DialogTitle className="flex items-center gap-2.5 text-lg font-bold">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500/20 to-cyan-500/20 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-violet-400" />
            </div>
            AI Code Evaluation
            {loading && (
              <span className="ml-2 inline-flex items-center gap-1.5 text-xs font-normal text-muted-foreground">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-violet-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-violet-400" />
                </span>
                Streaming
              </span>
            )}
          </DialogTitle>
          <p className="text-sm text-muted-foreground mt-1">
            Powered by LangChain + GPT-4o-mini
          </p>
        </DialogHeader>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto px-6 py-5 space-y-5 hide-scrollbar">
          {/* Initial loading (no data yet) */}
          {loading && !data && (
            <div className="flex flex-col items-center justify-center py-16 gap-4">
              <div className="relative">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500/10 to-cyan-500/10 flex items-center justify-center">
                  <Loader2 className="w-7 h-7 text-violet-400 animate-spin" />
                </div>
                <div className="absolute -inset-2 rounded-3xl bg-gradient-to-br from-violet-500/5 to-cyan-500/5 animate-pulse" />
              </div>
              <div className="text-center space-y-1">
                <p className="text-sm font-medium text-foreground">Evaluating your code…</p>
                <p className="text-xs text-muted-foreground">
                  Analyzing clarity, completeness, best practices & more
                </p>
              </div>
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="space-y-3">
              <div className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3">
                <p className="text-sm text-red-400">{error}</p>
              </div>
              <Button
                variant="hero"
                size="sm"
                onClick={runEvaluation}
                className="h-8 text-xs"
              >
                <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                Retry
              </Button>
            </div>
          )}

          {/* Results (streams in progressively) */}
          {data && (
            <>
              {/* Overall score hero */}
              {data.overallScore != null && (
                <div className="rounded-xl border border-border bg-foreground/[0.02] p-5">
                  <div className="flex items-center gap-5">
                    {/* Circular score */}
                    <div className="relative w-20 h-20 flex-shrink-0">
                      <svg className="w-20 h-20 -rotate-90" viewBox="0 0 80 80">
                        <circle
                          cx="40" cy="40" r="34"
                          fill="none" stroke="currentColor" strokeWidth="6"
                          className="text-foreground/10"
                        />
                        <circle
                          cx="40" cy="40" r="34"
                          fill="none" stroke="currentColor" strokeWidth="6"
                          strokeDasharray={`${(data.overallScore / 100) * 213.6} 213.6`}
                          strokeLinecap="round"
                          className={grade!.color}
                          style={{ transition: 'stroke-dasharray 1s ease-out' }}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className={`text-xl font-bold tabular-nums ${grade!.color}`}>
                          {data.overallScore}
                        </span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`text-sm font-bold ${grade!.color}`}>{grade!.label}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${grade!.bg} ${grade!.color}`}>
                          {data.overallScore}/100
                        </span>
                      </div>
                      {data.summary && (
                        <p className="text-[13px] text-muted-foreground leading-relaxed">
                          {data.summary}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Category tags — single horizontal row */}
              {categories.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
                    <Zap className="w-4 h-4 text-teal-400" />
                    Detailed Breakdown
                    {loading && <Loader2 className="w-3 h-3 animate-spin text-muted-foreground ml-1" />}
                  </h3>

                  {/* Tag row */}
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => {
                      const meta = categoryMeta[cat.name] ?? fallbackMeta;
                      const Icon = meta.icon;
                      const isActive = selectedCat === cat.name;

                      return (
                        <button
                          key={cat.name}
                          onClick={() => setSelectedCat(cat.name)}
                          className={`group flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs font-medium transition-all duration-200 ${
                            isActive
                              ? `${meta.bg} ${meta.border} ${meta.color} ring-1 ${meta.ring}`
                              : 'border-border bg-foreground/[0.02] text-muted-foreground hover:bg-foreground/[0.05] hover:text-foreground'
                          }`}
                        >
                          <Icon className={`w-3.5 h-3.5 ${isActive ? meta.color : 'text-muted-foreground group-hover:text-foreground'}`} />
                          <span className="hidden sm:inline">{cat.name}</span>
                          <span className="sm:hidden">{cat.name.split(' ')[0]}</span>
                          <span className={`ml-0.5 text-[10px] font-bold tabular-nums ${isActive ? scoreColor(cat.score) : scoreColor(cat.score)}`}>
                            {cat.score}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Selected category tips */}
                  {activeCat && activeCat.tips && activeCat.tips.length > 0 && (
                    <TipsPanel cat={activeCat} />
                  )}
                </div>
              )}

              {/* Re-evaluate (only after streaming is done) */}
              {result && (
                <div className="flex items-center justify-end pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={runEvaluation}
                    className="h-8 text-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                    Re-evaluate
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
