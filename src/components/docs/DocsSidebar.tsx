import { Search, ChevronRight, BookOpen, Code, Brain, Cpu, Database, Layers, Sparkles } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const sections = [
  { id: 'all', label: 'All Modules', icon: BookOpen, count: 12 },
  { id: 'foundations', label: 'Foundations', icon: Code, count: 3 },
  { id: 'neural-networks', label: 'Neural Networks', icon: Brain, count: 3 },
  { id: 'deep-learning', label: 'Deep Learning', icon: Layers, count: 2 },
  { id: 'advanced', label: 'Advanced Topics', icon: Cpu, count: 3 },
  { id: 'projects', label: 'Projects', icon: Database, count: 1 },
];

const DocsSidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
  return (
    <aside className="w-72 shrink-0 border-r border-border/50 bg-background/50 backdrop-blur-sm sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto hidden lg:block">
      <div className="p-6 space-y-8">
        {/* Search */}
        <div className="relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-foreground transition-colors" />
          <input
            type="text"
            placeholder="Search modules..."
            className="w-full pl-11 pr-4 py-3 text-sm rounded-xl bg-foreground/5 border border-foreground/10 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground/20 focus:bg-foreground/[0.07] transition-all"
          />
        </div>

        {/* Navigation */}
        <div className="space-y-2">
          <p className="text-xs uppercase tracking-widest text-muted-foreground font-medium px-3 mb-4">Categories</p>
          <nav className="space-y-1">
            {sections.map((section) => {
              const Icon = section.icon;
              const isActive = activeSection === section.id;
              
              return (
                <button
                  key={section.id}
                  onClick={() => onSectionChange(section.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all duration-200 group/item ${
                    isActive
                      ? 'bg-foreground/10 text-foreground border-l-2 border-foreground ml-[-2px]'
                      : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                    isActive ? 'bg-foreground/10' : 'bg-foreground/5 group-hover/item:bg-foreground/10'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="flex-1 text-left font-medium">{section.label}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full transition-colors ${
                    isActive ? 'bg-foreground/10 text-foreground' : 'bg-foreground/5 text-muted-foreground'
                  }`}>
                    {section.count}
                  </span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Quick Stats */}
        <div className="pt-6 border-t border-border/50">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-4 h-4 text-muted-foreground" />
            <span className="text-xs uppercase tracking-widest text-muted-foreground font-medium">Your Progress</span>
          </div>
          <div className="p-4 rounded-xl bg-foreground/5 border border-foreground/10 space-y-4">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Completed</span>
              <span className="text-foreground font-semibold">12/50</span>
            </div>
            <div className="h-2 bg-background rounded-full overflow-hidden">
              <div 
                className="h-full w-[24%] bg-gradient-to-r from-foreground/80 to-foreground rounded-full transition-all duration-500" 
                style={{ boxShadow: '0 0 10px rgba(255,255,255,0.3)' }}
              />
            </div>
            <p className="text-xs text-muted-foreground">Keep going! You're making great progress.</p>
          </div>
        </div>

        {/* Pro tip */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-foreground/5 to-transparent border border-foreground/10">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <span className="text-foreground font-medium">Pro tip:</span> Complete modules in order for the best learning experience.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default DocsSidebar;
