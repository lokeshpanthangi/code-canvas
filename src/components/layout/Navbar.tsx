import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Brain, Search, Github, Menu, X, Sun, Moon, Command, ArrowRight, Sparkles } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

interface NavbarProps {
  variant?: 'default' | 'simple';
}

const Navbar = ({ variant = 'default' }: NavbarProps) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/docs', label: 'Documentation' },
    { path: '/projects', label: 'Projects' },
    { path: '/assignments', label: 'Assignments' },
    { path: '/community', label: 'Community' },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle keyboard shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setSearchQuery('');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus input when search opens
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Handle search submit
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/docs?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  // Simple navbar for sub-pages (project details, etc.)
  if (variant === 'simple') {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-14">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${
                theme === 'dark' 
                  ? 'bg-gradient-to-br from-white/15 to-white/5' 
                  : 'bg-gradient-to-br from-teal-500/15 to-cyan-500/10'
              }`}>
                <Brain className={`w-4 h-4 ${theme === 'dark' ? 'text-white' : 'text-teal-600'}`} />
              </div>
              <div className="flex items-baseline gap-0.5">
                <span className="text-base font-semibold tracking-tight text-foreground">MLCodex</span>
                <span className="text-xs text-muted-foreground/70 font-medium">.dev</span>
              </div>
            </Link>

            {/* Right Side */}
            <div className="flex items-center gap-3">
              {/* Nav Links */}
              <div className="hidden md:flex items-center gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                      location.pathname === link.path
                        ? 'text-foreground font-medium'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              {/* Divider */}
              <div className="hidden md:block w-px h-5 bg-border" />

              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>

              {/* GitHub */}
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors"
              >
                <Github className="w-4 h-4" />
              </a>

              {/* Mobile Menu */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden w-8 h-8 rounded-lg flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-colors"
              >
                {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border bg-background">
            <div className="container mx-auto px-6 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-lg text-sm ${
                    location.pathname === link.path
                      ? 'text-foreground font-medium bg-foreground/5'
                      : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    );
  }

  return (
    <>
      {/* Navbar Container */}
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
        isScrolled ? 'px-0 pt-0' : 'px-4 pt-4'
      }`}>
        <nav className={`mx-auto transition-all duration-500 ease-out ${
          isScrolled 
            ? 'max-w-full bg-card/90 backdrop-blur-xl border-b border-border shadow-lg shadow-background/10 rounded-none' 
            : 'max-w-6xl bg-card/40 backdrop-blur-md border border-border/50 rounded-2xl'
        }`}>
          <div className="px-4 lg:px-6">
            <div className="flex items-center justify-between h-14">
              {/* Logo */}
              <Link to="/" className="flex items-center gap-2.5 group">
                <div className="relative">
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${
                    theme === 'dark' 
                      ? 'bg-gradient-to-br from-white/15 to-white/5 group-hover:from-white/20 group-hover:to-white/10' 
                      : 'bg-gradient-to-br from-teal-500/15 to-cyan-500/10 group-hover:from-teal-500/25 group-hover:to-cyan-500/15'
                  }`}>
                    <Brain className={`w-4 h-4 transition-colors ${theme === 'dark' ? 'text-white' : 'text-teal-600'}`} />
                  </div>
                </div>
                <div className="flex items-baseline gap-0.5">
                  <span className="text-base font-semibold tracking-tight text-foreground">MLCodex</span>
                  <span className="text-xs text-muted-foreground/70 font-medium">.dev</span>
                </div>
              </Link>

              {/* Center Navigation - Pill Style */}
              <div className="hidden md:flex items-center">
                <div className="flex items-center gap-0.5 p-1 rounded-xl bg-foreground/[0.03] border border-foreground/5">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      to={link.path}
                      className={`relative px-4 py-1.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                        location.pathname === link.path
                          ? 'text-foreground bg-foreground/10'
                          : 'text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Right Section */}
              <div className="flex items-center gap-2">
                {/* Search Trigger */}
                <button 
                  onClick={() => setIsSearchOpen(true)}
                  className="hidden lg:flex items-center gap-2 pl-3 pr-2 py-1.5 rounded-xl bg-foreground/[0.03] border border-foreground/10 hover:border-foreground/20 hover:bg-foreground/[0.06] transition-all cursor-pointer group"
                >
                  <Search className="w-3.5 h-3.5 text-muted-foreground/70" />
                  <span className="text-sm text-muted-foreground/70 pr-4">Search...</span>
                  <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-foreground/5 border border-foreground/10">
                    <Command className="w-3 h-3 text-muted-foreground/50" />
                    <span className="text-xs text-muted-foreground/50">K</span>
                  </div>
                </button>

                {/* Mobile Search */}
                <button
                  onClick={() => setIsSearchOpen(true)}
                  className="lg:hidden p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-all"
                >
                  <Search className="w-4 h-4" />
                </button>

                {/* Divider */}
                <div className="hidden lg:block w-px h-5 bg-border/50" />

                {/* Icon Buttons */}
                <div className="flex items-center gap-1">
                  <a
                    href="https://github.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-xl text-muted-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-all"
                    title="GitHub"
                  >
                    <Github className="w-4 h-4" />
                  </a>

                  {/* Theme Toggle */}
                  <button
                    onClick={toggleTheme}
                    className="p-2 rounded-xl text-muted-foreground/70 hover:text-foreground hover:bg-foreground/5 transition-all"
                    aria-label="Toggle theme"
                    title={theme === 'dark' ? 'Light mode' : 'Dark mode'}
                  >
                    {theme === 'dark' ? (
                      <Sun className="w-4 h-4" />
                    ) : (
                      <Moon className="w-4 h-4" />
                    )}
                  </button>
                </div>

                {/* CTA Button */}
                <Link to="/docs" className="hidden sm:block">
                  <button className={`flex items-center gap-1.5 px-4 py-1.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                    theme === 'dark'
                      ? 'bg-white text-black hover:bg-white/90'
                      : 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white hover:from-teal-600 hover:to-cyan-600'
                  }`}>
                    <span>Get Started</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </Link>

                {/* Mobile Menu Button */}
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden p-2 rounded-xl text-muted-foreground hover:text-foreground hover:bg-foreground/5 transition-all"
                >
                  {isMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
              <div className="md:hidden py-3 border-t border-border/30">
                <div className="flex flex-col gap-1">
                  {navLinks.map((link) => (
                    <Link
                      key={link.label}
                      to={link.path}
                      onClick={() => setIsMenuOpen(false)}
                      className={`px-3 py-2.5 text-sm font-medium rounded-xl transition-all ${
                        location.pathname === link.path
                          ? 'text-foreground bg-foreground/5'
                          : 'text-muted-foreground hover:text-foreground hover:bg-foreground/5'
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <Link
                    to="/docs"
                    onClick={() => setIsMenuOpen(false)}
                    className={`mt-2 flex items-center justify-center gap-2 px-3 py-2.5 text-sm font-medium rounded-xl transition-all ${
                      theme === 'dark'
                        ? 'bg-white text-black'
                        : 'bg-gradient-to-r from-teal-500 to-cyan-500 text-white'
                    }`}
                  >
                    Get Started
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>

      {/* Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[15vh]">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-background/60 backdrop-blur-md"
            onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
          />
          
          {/* Search Box */}
          <div className="relative w-full max-w-2xl mx-4 bg-card/95 backdrop-blur-xl border border-border rounded-2xl shadow-2xl overflow-hidden">
            {/* Search Header */}
            <form onSubmit={handleSearch}>
              <div className="flex items-center gap-3 p-5 border-b border-border/50">
                <div className={`p-2 rounded-xl ${theme === 'dark' ? 'bg-white/10' : 'bg-teal-500/10'}`}>
                  <Search className={`w-5 h-5 ${theme === 'dark' ? 'text-white/70' : 'text-teal-600'}`} />
                </div>
                <input
                  ref={searchInputRef}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search modules, topics, or concepts..."
                  className="flex-1 bg-transparent text-foreground text-lg placeholder:text-muted-foreground/50 focus:outline-none"
                />
                <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-foreground/5 border border-border/50">
                  <span className="text-xs text-muted-foreground/60">ESC</span>
                </div>
              </div>
            </form>
            
            {/* Quick Links */}
            <div className="p-5">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className={`w-3.5 h-3.5 ${theme === 'dark' ? 'text-white/40' : 'text-teal-500/60'}`} />
                <p className="text-xs text-muted-foreground/60 uppercase tracking-wider font-medium">Popular searches</p>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {['Neural Networks', 'Transformers', 'Backpropagation', 'Linear Regression', 'CNN Architecture', 'Gradient Descent'].map((term) => (
                  <button
                    key={term}
                    onClick={() => {
                      navigate(`/docs?search=${encodeURIComponent(term)}`);
                      setIsSearchOpen(false);
                      setSearchQuery('');
                    }}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-muted-foreground hover:text-foreground bg-foreground/[0.02] hover:bg-foreground/[0.06] border border-transparent hover:border-border/50 rounded-xl transition-all text-left"
                  >
                    <ArrowRight className="w-3.5 h-3.5 opacity-40" />
                    {term}
                  </button>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="px-5 py-3 border-t border-border/30 bg-foreground/[0.02]">
              <div className="flex items-center justify-between text-xs text-muted-foreground/50">
                <span>Type to search the documentation</span>
                <div className="flex items-center gap-3">
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-foreground/5 border border-border/50">↵</kbd>
                    <span>to select</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <kbd className="px-1.5 py-0.5 rounded bg-foreground/5 border border-border/50">esc</kbd>
                    <span>to close</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
