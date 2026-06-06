import { useCallback, useEffect, useMemo, useState } from "react";
import { generateMonthlyAIReview } from "../services/ai-review.service";
import type {
  AIReviewLanguage,
  AIReviewRequest,
  MonthlyAIReview,
} from "../types/ai-review.types";

interface UseAIReviewState {
  review: MonthlyAIReview | null;
  isLoading: boolean;
  error: string | null;
}

const AI_REVIEW_CACHE_PREFIX = "aiReviewCache";

const createAIReviewCacheKey = (
  workspaceId?: string | null,
  month?: string,
  currency?: string,
  provider?: string,
  language?: AIReviewLanguage,
) => {
  if (!workspaceId || !month || !currency || !provider || !language) {
    return null;
  }

  return [
    AI_REVIEW_CACHE_PREFIX,
    workspaceId,
    month,
    currency,
    provider,
    language,
  ].join(":");
};

export function useAIReview({
  workspaceId,
  month,
  currency,
  provider,
  language,
}: {
  workspaceId?: string | null;
  month?: string;
  currency?: string;
  provider?: string;
  language?: AIReviewLanguage;
}) {
  const cacheKey = useMemo(
    () =>
      createAIReviewCacheKey(workspaceId, month, currency, provider, language),
    [workspaceId, month, currency, provider, language],
  );

  const [state, setState] = useState<UseAIReviewState>({
    review: null,
    isLoading: false,
    error: null,
  });

  useEffect(() => {
    if (!cacheKey) {
      setState({
        review: null,
        isLoading: false,
        error: null,
      });
      return;
    }

    const cachedReview = sessionStorage.getItem(cacheKey);

    if (!cachedReview) {
      setState((currentState) => ({
        ...currentState,
        review: null,
        error: null,
      }));
      return;
    }

    try {
      const parsedReview = JSON.parse(cachedReview) as MonthlyAIReview;

      setState({
        review: parsedReview,
        isLoading: false,
        error: null,
      });
    } catch {
      sessionStorage.removeItem(cacheKey);

      setState({
        review: null,
        isLoading: false,
        error: null,
      });
    }
  }, [cacheKey]);

  const generateReview = useCallback(
    async (targetWorkspaceId: string, payload: AIReviewRequest) => {
      try {
        setState((currentState) => ({
          ...currentState,
          isLoading: true,
          error: null,
        }));

        const result = await generateMonthlyAIReview(
          targetWorkspaceId,
          payload,
        );

        const nextCacheKey = createAIReviewCacheKey(
          targetWorkspaceId,
          payload.month,
          payload.currency,
          payload.provider,
          payload.language,
        );

        if (nextCacheKey) {
          sessionStorage.setItem(nextCacheKey, JSON.stringify(result));
        }

        setState({
          review: result,
          isLoading: false,
          error: null,
        });

        return result;
      } catch (error) {
        setState((currentState) => ({
          ...currentState,
          isLoading: false,
          error:
            payload.language === "en"
              ? "An error occurred while generating the AI analysis."
              : "AI analizi oluşturulurken bir hata oluştu.",
        }));

        throw error;
      }
    },
    [],
  );

  const resetReview = useCallback(() => {
    if (cacheKey) {
      sessionStorage.removeItem(cacheKey);
    }

    setState({
      review: null,
      isLoading: false,
      error: null,
    });
  }, [cacheKey]);

  const clearError = useCallback(() => {
    setState((currentState) => ({
      ...currentState,
      error: null,
    }));
  }, []);

  return {
    review: state.review,
    isLoading: state.isLoading,
    error: state.error,
    generateReview,
    resetReview,
    clearError,
  };
}
