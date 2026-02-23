import { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { 
  Copy, 
  Check, 
  ChevronRight,
  ExternalLink,
  Lightbulb,
  AlertCircle,
  Info,
  Play
} from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  filename?: string;
  showLineNumbers?: boolean;
}

export const CodeBlock = ({ code, language = 'python', filename, showLineNumbers = true }: CodeBlockProps) => {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split('\n');

  // Simple syntax highlighting
  const highlightLine = (line: string) => {
    const isDark = theme === 'dark';
    
    // Comments
    if (line.trim().startsWith('#')) {
      return <span className={isDark ? 'text-[#6A9955]' : 'text-[#008000]'}>{line}</span>;
    }
    
    // String literals
    if (line.includes("'") || line.includes('"')) {
      const parts = line.split(/(['"][^'"]*['"])/g);
      return parts.map((part, i) => {
        if (part.startsWith("'") || part.startsWith('"')) {
          return <span key={i} className={isDark ? 'text-[#CE9178]' : 'text-[#A31515]'}>{part}</span>;
        }
        return <span key={i}>{highlightKeywords(part, isDark)}</span>;
      });
    }
    
    return highlightKeywords(line, isDark);
  };

  const highlightKeywords = (text: string, isDark: boolean) => {
    const keywords = ['class', 'def', 'return', 'import', 'from', 'if', 'else', 'elif', 'for', 'while', 'in', 'self', 'True', 'False', 'None', 'and', 'or', 'not', 'as', 'with', 'try', 'except', 'raise', 'lambda', 'yield', 'assert', 'pass', 'break', 'continue'];
    const builtins = ['print', 'len', 'range', 'np', 'numpy', 'sum', 'max', 'min', 'abs', 'int', 'float', 'str', 'list', 'dict', 'tuple', 'set', 'type', 'isinstance', 'hasattr', 'getattr', 'setattr'];
    
    const pattern = new RegExp(`\\b(${[...keywords, ...builtins].join('|')})\\b`, 'g');
    const parts = text.split(pattern);
    
    return parts.map((part, i) => {
      if (keywords.includes(part)) {
        return <span key={i} className={isDark ? 'text-[#C586C0]' : 'text-[#AF00DB]'}>{part}</span>;
      }
      if (builtins.includes(part)) {
        return <span key={i} className={isDark ? 'text-[#DCDCAA]' : 'text-[#795E26]'}>{part}</span>;
      }
      // Numbers
      if (/^\d+(\.\d+)?$/.test(part)) {
        return <span key={i} className={isDark ? 'text-[#B5CEA8]' : 'text-[#098658]'}>{part}</span>;
      }
      return <span key={i} className={isDark ? 'text-foreground/90' : 'text-slate-800'}>{part}</span>;
    });
  };

  return (
    <div className={`rounded-xl border overflow-hidden my-6 ${
      theme === 'dark' 
        ? 'bg-[#0d0d0d] border-foreground/10' 
        : 'bg-slate-50 border-slate-200'
    }`}>
      {/* Header */}
      <div className={`flex items-center justify-between px-4 py-2 border-b ${
        theme === 'dark' ? 'border-foreground/10 bg-foreground/5' : 'border-slate-200 bg-slate-100'
      }`}>
        <div className="flex items-center gap-2">
          {filename && (
            <span className={`text-xs font-mono ${theme === 'dark' ? 'text-muted-foreground' : 'text-slate-600'}`}>
              {filename}
            </span>
          )}
          {!filename && (
            <span className={`text-xs font-mono ${theme === 'dark' ? 'text-muted-foreground' : 'text-slate-600'}`}>
              {language}
            </span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs transition-colors ${
            theme === 'dark' 
              ? 'hover:bg-foreground/10 text-muted-foreground hover:text-foreground' 
              : 'hover:bg-slate-200 text-slate-600 hover:text-slate-900'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-3.5 h-3.5" />
              Copy
            </>
          )}
        </button>
      </div>
      
      {/* Code */}
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm font-mono">
          <code>
            {lines.map((line, i) => (
              <div key={i} className="flex">
                {showLineNumbers && (
                  <span className={`select-none pr-4 text-right min-w-[2.5rem] ${
                    theme === 'dark' ? 'text-foreground/20' : 'text-slate-400'
                  }`}>
                    {i + 1}
                  </span>
                )}
                <span className="flex-1">{highlightLine(line)}</span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
};

interface CalloutProps {
  type: 'info' | 'tip' | 'warning' | 'note';
  title?: string;
  children: React.ReactNode;
}

export const Callout = ({ type, title, children }: CalloutProps) => {
  const styles = {
    info: {
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/30',
      icon: <Info className="w-5 h-5 text-blue-400" />,
      defaultTitle: 'Info'
    },
    tip: {
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/30',
      icon: <Lightbulb className="w-5 h-5 text-emerald-400" />,
      defaultTitle: 'Tip'
    },
    warning: {
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
      icon: <AlertCircle className="w-5 h-5 text-amber-400" />,
      defaultTitle: 'Warning'
    },
    note: {
      bg: 'bg-purple-500/10',
      border: 'border-purple-500/30',
      icon: <Info className="w-5 h-5 text-purple-400" />,
      defaultTitle: 'Note'
    }
  };

  const style = styles[type];

  return (
    <div className={`rounded-xl border ${style.bg} ${style.border} p-4 my-6`}>
      <div className="flex items-start gap-3">
        <div className="shrink-0 mt-0.5">{style.icon}</div>
        <div>
          <div className="font-semibold text-foreground mb-1">{title || style.defaultTitle}</div>
          <div className="text-sm text-muted-foreground leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
};

interface OutputBlockProps {
  output: string;
  title?: string;
}

export const OutputBlock = ({ output, title = 'Output' }: OutputBlockProps) => {
  return (
    <div className="rounded-xl border overflow-hidden my-6 bg-background border-emerald-500/30">
      <div className="flex items-center gap-2 px-4 py-2 border-b border-emerald-500/30 bg-background">
        <Play className="w-4 h-4 text-emerald-500" />
        <span className="text-xs font-medium text-emerald-400">
          {title}
        </span>
      </div>
      <pre className="p-4 text-sm font-mono overflow-x-auto text-emerald-400 bg-background">
        {output}
      </pre>
    </div>
  );
};

export const InlineCode = ({ children }: { children: React.ReactNode }) => {
  const { theme } = useTheme();
  return (
    <code className={`px-1.5 py-0.5 rounded text-sm font-mono ${
      theme === 'dark' 
        ? 'bg-foreground/10 text-teal-400' 
        : 'bg-slate-100 text-teal-700 border border-slate-200'
    }`}>
      {children}
    </code>
  );
};
