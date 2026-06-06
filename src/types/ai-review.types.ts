export type AIProvider = "ollama" | "gemini";

export type AIReviewLanguage = "tr" | "en";

export type CurrencyCode = "TRY" | "USD" | "EUR";

export interface AIReviewRequest {
  month: string;
  currency: CurrencyCode;
  provider: AIProvider;
  language: AIReviewLanguage;
}

export interface AIReviewResult {
  summary: string;
  highlights: string[];
  risks: string[];
  recommendations: string[];
  savingSuggestion: string;
}

export interface MonthlyAIReview {
  month: string;
  currency: CurrencyCode;
  review: AIReviewResult;
  generatedAt: string;
  provider: AIProvider | string;
  model: string;
}

export interface AIReviewResponse {
  message: string;
  data: MonthlyAIReview;
}

export interface AIProviderOption {
  label: string;
  value: AIProvider;
  description: string;
  isAvailable: boolean;
  badge?: string;
}

export const AI_PROVIDER_OPTIONS: AIProviderOption[] = [
  {
    label: "Gemini",
    value: "gemini",
    description: "Google AI model integration",
    isAvailable: true,
    badge: "Cloud",
  },
];
