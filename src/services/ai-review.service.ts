import api from "../api";
import type {
  AIReviewRequest,
  AIReviewResponse,
  MonthlyAIReview,
} from "../types/ai-review.types";

export async function generateMonthlyAIReview(
  workspaceId: string,
  payload: AIReviewRequest,
): Promise<MonthlyAIReview> {
  const response = await api.post<AIReviewResponse>(
    `/workspaces/${workspaceId}/ai-review/monthly`,
    payload,
  );

  return response.data.data;
}
