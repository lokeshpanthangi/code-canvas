const CodeTerminal = () => {
  return (
    <div className="terminal-window shadow-2xl animate-float">
      {/* Terminal Header */}
      <div className="terminal-header">
        <div className="flex gap-2">
          <div className="terminal-dot terminal-dot-red" />
          <div className="terminal-dot terminal-dot-yellow" />
          <div className="terminal-dot terminal-dot-green" />
        </div>
        <span className="text-xs text-muted-foreground ml-4 font-mono">neural_network.py</span>
      </div>

      {/* Terminal Content */}
      <div className="p-5 font-mono text-sm leading-relaxed overflow-x-auto">
        <div className="space-y-1">
          <div>
            <span className="syntax-keyword">import</span>
            <span className="text-foreground"> numpy </span>
            <span className="syntax-keyword">as</span>
            <span className="text-foreground"> np</span>
          </div>
          <div className="h-3" />
          <div>
            <span className="syntax-keyword">class</span>
            <span className="syntax-class"> NeuralNetwork</span>
            <span className="text-foreground">:</span>
          </div>
          <div className="pl-4">
            <span className="syntax-keyword">def</span>
            <span className="syntax-function"> __init__</span>
            <span className="text-foreground">(</span>
            <span className="syntax-variable">self</span>
            <span className="text-foreground">, layers):</span>
          </div>
          <div className="pl-8">
            <span className="syntax-variable">self</span>
            <span className="text-foreground">.weights = []</span>
          </div>
          <div className="pl-8">
            <span className="syntax-keyword">for</span>
            <span className="text-foreground"> i </span>
            <span className="syntax-keyword">in</span>
            <span className="syntax-function"> range</span>
            <span className="text-foreground">(</span>
            <span className="syntax-function">len</span>
            <span className="text-foreground">(layers) - </span>
            <span className="syntax-number">1</span>
            <span className="text-foreground">):</span>
          </div>
          <div className="pl-12">
            <span className="text-foreground">w = np.random.</span>
            <span className="syntax-function">randn</span>
            <span className="text-foreground">(layers[i], layers[i+</span>
            <span className="syntax-number">1</span>
            <span className="text-foreground">])</span>
          </div>
          <div className="pl-12">
            <span className="syntax-variable">self</span>
            <span className="text-foreground">.weights.</span>
            <span className="syntax-function">append</span>
            <span className="text-foreground">(w * </span>
            <span className="syntax-number">0.01</span>
            <span className="text-foreground">)</span>
          </div>
          <div className="h-3" />
          <div className="pl-4">
            <span className="syntax-keyword">def</span>
            <span className="syntax-function"> forward</span>
            <span className="text-foreground">(</span>
            <span className="syntax-variable">self</span>
            <span className="text-foreground">, X):</span>
          </div>
          <div className="pl-8">
            <span className="syntax-comment"># Propagate through layers</span>
          </div>
          <div className="pl-8">
            <span className="text-foreground">activation = X</span>
          </div>
          <div className="pl-8">
            <span className="syntax-keyword">for</span>
            <span className="text-foreground"> w </span>
            <span className="syntax-keyword">in</span>
            <span className="syntax-variable"> self</span>
            <span className="text-foreground">.weights:</span>
          </div>
          <div className="pl-12">
            <span className="text-foreground">z = np.</span>
            <span className="syntax-function">dot</span>
            <span className="text-foreground">(activation, w)</span>
          </div>
          <div className="pl-12">
            <span className="text-foreground">activation = </span>
            <span className="syntax-variable">self</span>
            <span className="text-foreground">.</span>
            <span className="syntax-function">relu</span>
            <span className="text-foreground">(z)</span>
          </div>
          <div className="pl-8">
            <span className="syntax-keyword">return</span>
            <span className="text-foreground"> activation</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeTerminal;
