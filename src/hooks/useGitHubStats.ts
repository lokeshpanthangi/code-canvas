import { useState, useEffect } from 'react';

interface GitHubStats {
  stars: number;
  forks: number;
  contributors: number;
  openIssues: number;
  watchers: number;
  loading: boolean;
}

const REPO_API = 'https://api.github.com/repos/lokeshpanthangi/MLCodex';
const CACHE_KEY = 'mlcodex_github_stats';
const CACHE_DURATION_MS = 5 * 60 * 1000; // 5 minutes

interface CachedStats {
  data: Omit<GitHubStats, 'loading'>;
  timestamp: number;
}

function getCachedStats(): Omit<GitHubStats, 'loading'> | null {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (!cached) return null;
    const parsed: CachedStats = JSON.parse(cached);
    if (Date.now() - parsed.timestamp > CACHE_DURATION_MS) {
      localStorage.removeItem(CACHE_KEY);
      return null;
    }
    return parsed.data;
  } catch {
    return null;
  }
}

function setCachedStats(data: Omit<GitHubStats, 'loading'>) {
  try {
    const cacheEntry: CachedStats = { data, timestamp: Date.now() };
    localStorage.setItem(CACHE_KEY, JSON.stringify(cacheEntry));
  } catch {
    // localStorage may be unavailable
  }
}

export function useGitHubStats(): GitHubStats {
  const [stats, setStats] = useState<GitHubStats>(() => {
    const cached = getCachedStats();
    if (cached) {
      return { ...cached, loading: false };
    }
    return { stars: 0, forks: 0, contributors: 0, openIssues: 0, watchers: 0, loading: true };
  });

  useEffect(() => {
    // If we already have cached data, skip fetch
    const cached = getCachedStats();
    if (cached) {
      setStats({ ...cached, loading: false });
      return;
    }

    let cancelled = false;

    async function fetchStats() {
      try {
        const [repoRes, contribRes] = await Promise.all([
          fetch(REPO_API),
          fetch(`${REPO_API}/contributors?per_page=1&anon=true`),
        ]);

        if (!repoRes.ok) throw new Error('GitHub API error');

        const repoData = await repoRes.json();

        // GitHub returns contributor count via Link header for pagination
        // For simplicity, we'll count the array or use the header
        let contributorCount = 0;
        if (contribRes.ok) {
          // Check Link header for total pages
          const linkHeader = contribRes.headers.get('Link');
          if (linkHeader) {
            const lastMatch = linkHeader.match(/&page=(\d+)>; rel="last"/);
            if (lastMatch) {
              contributorCount = parseInt(lastMatch[1], 10);
            }
          }
          if (contributorCount === 0) {
            // Fallback: fetch all contributors and count
            const contribFullRes = await fetch(`${REPO_API}/contributors?per_page=100`);
            if (contribFullRes.ok) {
              const contribs = await contribFullRes.json();
              contributorCount = Array.isArray(contribs) ? contribs.filter((c: { type: string }) => c.type !== 'Bot').length : 0;
            }
          }
        }

        if (!cancelled) {
          const newStats = {
            stars: repoData.stargazers_count ?? 0,
            forks: repoData.forks_count ?? 0,
            contributors: contributorCount,
            openIssues: repoData.open_issues_count ?? 0,
            watchers: repoData.subscribers_count ?? 0,
          };
          setCachedStats(newStats);
          setStats({ ...newStats, loading: false });
        }
      } catch {
        if (!cancelled) {
          setStats({ stars: 0, forks: 0, contributors: 0, openIssues: 0, watchers: 0, loading: false });
        }
      }
    }

    fetchStats();
    return () => { cancelled = true; };
  }, []);

  return stats;
}
