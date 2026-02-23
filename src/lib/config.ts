// Central configuration — all secrets are loaded from .env (VITE_ prefix required for Vite)
export const config = {
  openai: {
    apiKey: import.meta.env.VITE_OPENAI_API_KEY as string,
    model: (import.meta.env.VITE_OPENAI_MODEL as string) || 'gpt-4o-mini',
    // In-browser requests are routed through the Vite proxy to avoid CORS
    baseUrl: `${window.location.origin}/api/openai/v1`,
  },
  onecompiler: {
    accessToken: import.meta.env.VITE_ONECOMPILER_ACCESS_TOKEN as string,
    baseUrl: '/api/onecompiler',
  },
} as const;
