import { ChatOpenAI } from '@langchain/openai';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { z } from 'zod';
import { config } from '@/lib/config';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
export interface EvalTip {
  text: string;
  codeSnippet?: string | null;
}

export interface EvalCategory {
  name: string;
  score: number;          // 0-10
  label: string;          // e.g. "Excellent", "Good", "Needs Work"
  tips: EvalTip[];
}

export interface EvalResult {
  overallScore: number;   // 0-100
  summary: string;
  categories: EvalCategory[];
}

/* ------------------------------------------------------------------ */
/*  Zod schema for structured output                                   */
/* ------------------------------------------------------------------ */
const tipSchema = z.object({
  text: z.string().describe('A concise, actionable tip for improvement'),
  codeSnippet: z
    .string()
    .nullable()
    .describe('A Python code snippet illustrating the tip, or null if not needed'),
});

const categorySchema = z.object({
  name: z.string().describe('Category name'),
  score: z.number().min(0).max(10).describe('Score from 0-10'),
  label: z.string().describe('Human-readable label like Excellent, Good, Needs Work, Poor'),
  tips: z.array(tipSchema).min(3).max(4).describe('3-4 actionable tips with optional code snippets'),
});

const evalResultSchema = z.object({
  overallScore: z.number().min(0).max(100).describe('Overall score from 0-100'),
  summary: z
    .string()
    .describe('A 2-3 sentence overall summary of the submission quality'),
  categories: z
    .array(categorySchema)
    .length(6)
    .describe('Exactly 6 evaluation categories'),
});

/* ------------------------------------------------------------------ */
/*  Prompt                                                             */
/* ------------------------------------------------------------------ */
const SYSTEM_PROMPT = `You are a senior ML engineer and code reviewer specializing in LangChain and RAG pipelines.

You will evaluate a student's Python code submission for a "Basic RAG Building" assignment.

The assignment asks the student to:
1. Set up the environment (imports, API key)
2. Load & chunk documents (TextLoader + splitter)
3. Embed & store (vector store like Chroma)
4. Build the retrieval chain (LLM + retriever + chain)
5. Query & verify (ask a question, print answer + sources)

Evaluate the code across exactly these 6 categories:
1. **Code Clarity** — Is the code clean, well-commented, and readable?
2. **Concept Understanding** — Does the student demonstrate a solid grasp of RAG concepts (retrieval, embeddings, chunking, chaining)?
3. **Completeness** — Are all 5 assignment steps fully implemented?
4. **Production Readiness** — Is the code structured in a way that could be adapted for production use (env vars, error handling, configurability)?
5. **Best Practices** — Does the code follow Python + LangChain best practices (proper imports, idiomatic usage, secure key management)?
6. **Error Handling & Edge Cases** — Does the code handle potential failures (missing files, API errors, empty results)?

For each category:
- Give a score from 0-10
- Give a label: "Excellent" (8-10), "Good" (6-7), "Needs Work" (4-5), "Poor" (0-3)
- Provide 3-4 specific, actionable tips. Include a Python code snippet when it helps illustrate the improvement.

Also provide:
- An overall score from 0 to 100
- A 2-3 sentence summary

Be encouraging but honest. If the code is mostly empty / just starter comments, score very low and give concrete guidance on what to write.

IMPORTANT: Return ONLY strict JSON (no markdown fences and no extra commentary).
Use these top-level keys exactly: overallScore, summary, categories.
Each item in categories must include: name, score, label, tips.
Each tip must include: text and codeSnippet (use null when no snippet is needed).
categories must contain exactly 6 items, and each category must have 3-4 tips.`;

const humanTemplate = `Here is the student's code submission:

\`\`\`python
{code}
\`\`\`

Please evaluate this code.`;

/* ------------------------------------------------------------------ */
/*  Chain                                                              */
/* ------------------------------------------------------------------ */
let _chain: ReturnType<typeof buildChain> | null = null;

function buildChain() {
  const model = new ChatOpenAI({
    model: config.openai.model,
    temperature: 0.3,
    apiKey: config.openai.apiKey,
    configuration: {
      baseURL: config.openai.baseUrl,
    },
  });

  const structuredModel = model.withStructuredOutput(evalResultSchema, {
    name: 'code_evaluation',
  });

  const prompt = ChatPromptTemplate.fromMessages([
    ['system', SYSTEM_PROMPT],
    ['human', humanTemplate],
  ]);

  return prompt.pipe(structuredModel);
}

/* ------------------------------------------------------------------ */
/*  Public API                                                         */
/* ------------------------------------------------------------------ */
export async function evaluateCode(code: string): Promise<EvalResult> {
  if (!_chain) {
    _chain = buildChain();
  }

  const result = await _chain.invoke({ code });

  return result as EvalResult;
}

/**
 * Streaming evaluation — calls OpenAI with streaming enabled and
 * invokes `onPartial` with progressively more-complete partial JSON.
 * Returns the final complete result.
 */
export async function evaluateCodeStream(
  code: string,
  onPartial: (partial: Partial<EvalResult>) => void,
): Promise<EvalResult> {
  const model = new ChatOpenAI({
    model: config.openai.model,
    temperature: 0.3,
    apiKey: config.openai.apiKey,
    streaming: true,
    configuration: {
      baseURL: config.openai.baseUrl,
    },
  });

  const prompt = ChatPromptTemplate.fromMessages([
    ['system', SYSTEM_PROMPT],
    ['human', humanTemplate],
  ]);

  // Stream raw text tokens, accumulate, and try to parse partial JSON
  const chain = prompt.pipe(model);
  let accumulated = '';

  const stream = await chain.stream({ code });

  for await (const chunk of stream) {
    const token = typeof chunk.content === 'string' ? chunk.content : '';
    accumulated += token;

    // Try to parse the accumulated text as JSON
    try {
      const cleaned = accumulated
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/i, '')
        .replace(/```\s*$/, '')
        .trim();
      const parsed = JSON.parse(cleaned);
      onPartial(parsed);
    } catch {
      // Not valid JSON yet — try a lenient parse
      try {
        const cleaned = accumulated
          .replace(/^```json\s*/i, '')
          .replace(/^```\s*/i, '')
          .replace(/```\s*$/, '')
          .trim();
        // Attempt to close open braces/brackets for partial parsing
        const fixed = closeBraces(cleaned);
        const parsed = JSON.parse(fixed);
        onPartial(parsed);
      } catch {
        // Still not parseable, keep accumulating
      }
    }
  }

  // Final parse
  const cleaned = accumulated
    .replace(/^```json\s*/i, '')
    .replace(/^```\s*/i, '')
    .replace(/```\s*$/, '')
    .trim();
  const final = JSON.parse(cleaned) as EvalResult;
  onPartial(final);
  return final;
}

/** Best-effort closing of open JSON braces/brackets for partial parsing */
function closeBraces(s: string): string {
  const opens: string[] = [];
  let inString = false;
  let escape = false;
  for (const ch of s) {
    if (escape) { escape = false; continue; }
    if (ch === '\\') { escape = true; continue; }
    if (ch === '"') { inString = !inString; continue; }
    if (inString) continue;
    if (ch === '{') opens.push('}');
    else if (ch === '[') opens.push(']');
    else if (ch === '}' || ch === ']') opens.pop();
  }
  // Remove any trailing comma before we close
  let result = s.replace(/,\s*$/, '');
  // Also strip any incomplete key-value (trailing unfinished string)
  result = result.replace(/,?\s*"[^"]*$/, '');
  return result + opens.reverse().join('');
}
