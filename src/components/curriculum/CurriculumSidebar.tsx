import { Search, ChevronRight, BookOpen, Code, Brain, Cpu, Database, Layers } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const sections = [
  { id: 'all', label: 'All Modules', icon: BookOpen },
  { id: 'foundations', label: 'Foundations', icon: Code },
  { id: 'neural-networks', label: 'Neural Networks', icon: Brain },
  { id: 'deep-learning', label: 'Deep Learning', icon: Layers },
  { id: 'advanced', label: 'Advanced Topics', icon: Cpu },
  { id: 'projects', label: 'Projects', icon: Database },
];

const CurriculumSidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
  return (
    <aside className="w-64 shrink-0 border-r border-border bg-background sticky top-16 h-[calc(100vh-4rem)] overflow-y-auto hidden lg:block">
      <div className="p-4 space-y-6">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search modules..."
            className="w-full pl-10 pr-4 py-2.5 text-sm rounded-lg bg-card border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50 transition-all"
          />
        </div>

        {/* Navigation */}
        <nav className="space-y-1">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            
            return (
              <button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                  isActive
                    ? 'nav-link-active bg-secondary text-foreground'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="flex-1 text-left">{section.label}</span>
                {isActive && <ChevronRight className="w-4 h-4" />}
              </button>
            );
          })}
        </nav>

        {/* Quick Stats */}
        <div className="pt-4 border-t border-border">
          <div className="text-xs uppercase text-muted-foreground font-medium mb-3">Your Progress</div>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Completed</span>
              <span className="text-foreground font-medium">12/50</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div className="h-full w-[24%] bg-primary rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default CurriculumSidebar;
