import { useState } from "react";
import {
  AlertTriangle,
  Bot,
  BrainCircuit,
  CheckCircle2,
  ChevronRight,
  Lightbulb,
  Loader2,
  RefreshCcw,
  ShieldAlert,
  Sparkles,
  WalletCards,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { useAIReview } from "../../hooks/useAIReview";
import {
  type AIReviewLanguage,
  type CurrencyCode,
} from "../../types/ai-review.types";
import { useWorkspace } from "../../hooks/useWorkspace";
import "./AIReviewPage.scss";

const currencyOptions: CurrencyCode[] = ["TRY", "USD", "EUR"];

function getCurrentMonthValue() {
  const currentDate = new Date();

  return `${currentDate.getFullYear()}-${String(
    currentDate.getMonth() + 1,
  ).padStart(2, "0")}`;
}

function getReviewLanguage(language: string): AIReviewLanguage {
  return language.startsWith("en") ? "en" : "tr";
}

export default function AIReviewPage() {
  const { t, i18n } = useTranslation();

  const { activeWorkspaceId, activeWorkspace, isWorkspaceLoading } =
    useWorkspace();

  const selectedWorkspaceId = activeWorkspaceId || "";

  const [selectedMonth, setSelectedMonth] = useState(getCurrentMonthValue());
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyCode>("TRY");

  const reviewLanguage = getReviewLanguage(i18n.language);

  const { review, isLoading, error, generateReview } = useAIReview({
    workspaceId: selectedWorkspaceId,
    month: selectedMonth,
    currency: selectedCurrency,
    provider: "gemini",
    language: reviewLanguage,
  });

  const hasReview = Boolean(review);

  const handleGenerateReview = async () => {
    if (!selectedWorkspaceId || isWorkspaceLoading) {
      return;
    }

    await generateReview(selectedWorkspaceId, {
      month: selectedMonth,
      currency: selectedCurrency,
      provider: "gemini",
      language: reviewLanguage,
    });
  };

  return (
    <main className="ai-review-page">
      <section className="ai-review-page__hero">
        <div className="ai-review-page__hero-content">
          <span className="ai-review-page__eyebrow">
            <BrainCircuit size={17} />
            {t("AI_ANALYTICS")}
          </span>

          <h1>{t("AI_FINANCIAL_REVIEW")}</h1>

          <p>{t("AI_REVIEW_DESCRIPTION")}</p>
        </div>

        <div className="ai-review-page__hero-badge">
          <Sparkles size={18} />

          <span>
            {activeWorkspace
              ? t("AI_REVIEW_WORKSPACE_BADGE", {
                  workspaceName: activeWorkspace.name,
                })
              : t("AI_REVIEW_SMART_INSIGHTS")}
          </span>
        </div>
      </section>

      <section className="ai-review-page__control-panel">
        <div className="ai-review-page__control-group">
          <label htmlFor="ai-review-month">{t("AI_REVIEW_MONTH")}</label>

          <input
            id="ai-review-month"
            type="month"
            value={selectedMonth}
            onChange={(event) => {
              setSelectedMonth(event.target.value);
            }}
          />
        </div>

        <div className="ai-review-page__control-group">
          <label htmlFor="ai-review-currency">{t("AI_REVIEW_CURRENCY")}</label>

          <select
            id="ai-review-currency"
            value={selectedCurrency}
            onChange={(event) => {
              setSelectedCurrency(event.target.value as CurrencyCode);
            }}
          >
            {currencyOptions.map((currency) => (
              <option key={currency} value={currency}>
                {currency}
              </option>
            ))}
          </select>
        </div>

        <button
          type="button"
          className="ai-review-page__generate-button"
          onClick={handleGenerateReview}
          disabled={isLoading || isWorkspaceLoading || !selectedWorkspaceId}
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="ai-review-page__spin-icon" />
              {t("AI_REVIEW_GENERATING")}
            </>
          ) : (
            <>
              <Bot size={18} />
              {t("AI_REVIEW_GENERATE")}
            </>
          )}
        </button>
      </section>

      {!isWorkspaceLoading && !selectedWorkspaceId && (
        <section className="ai-review-page__notice ai-review-page__notice--warning">
          <AlertTriangle size={18} />

          <div>
            <strong>{t("AI_REVIEW_NO_WORKSPACE_TITLE")}</strong>
            <p>{t("AI_REVIEW_NO_WORKSPACE_DESCRIPTION")}</p>
          </div>
        </section>
      )}

      {error && (
        <section className="ai-review-page__notice ai-review-page__notice--error">
          <ShieldAlert size={18} />

          <div>
            <strong>{t("AI_REVIEW_ERROR_TITLE")}</strong>
            <p>{error}</p>
          </div>
        </section>
      )}

      <section className="ai-review-page__provider-card">
        <div className="ai-review-page__provider-card-icon">
          <Bot size={20} />
        </div>

        <div>
          <strong>{t("AI_PROVIDER_GEMINI_LABEL")}</strong>
          <p>{t("AI_PROVIDER_GEMINI_DESCRIPTION")}</p>
        </div>

        <span className="ai-review-page__provider-pill">
          {t("AI_PROVIDER_GEMINI_BADGE")}
        </span>
      </section>

      {!hasReview && !isLoading && (
        <section className="ai-review-page__empty">
          <div className="ai-review-page__empty-orb">
            <BrainCircuit size={38} />
          </div>

          <h2>{t("AI_REVIEW_EMPTY_TITLE")}</h2>

          <p>{t("AI_REVIEW_EMPTY_DESCRIPTION")}</p>

          <button
            type="button"
            className="ai-review-page__empty-button"
            onClick={handleGenerateReview}
            disabled={isWorkspaceLoading || !selectedWorkspaceId}
          >
            <Sparkles size={18} />
            {t("AI_REVIEW_EMPTY_BUTTON")}
          </button>
        </section>
      )}

      {isLoading && (
        <section className="ai-review-page__loading-card">
          <div className="ai-review-page__loading-orb">
            <Loader2 size={34} className="ai-review-page__spin-icon" />
          </div>

          <h2>{t("AI_REVIEW_LOADING_TITLE")}</h2>

          <p>{t("AI_REVIEW_LOADING_DESCRIPTION")}</p>
        </section>
      )}

      {review && !isLoading && (
        <section className="ai-review-page__result">
          <div className="ai-review-page__result-header">
            <div>
              <span className="ai-review-page__result-eyebrow">
                <Sparkles size={16} />
                {t("AI_REVIEW_GENERATED_REVIEW")}
              </span>

              <h2>{review.month}</h2>

              <p>
                {t("AI_REVIEW_POWERED_BY")} Gemini · {review.model}
              </p>
            </div>

            <button
              type="button"
              className="ai-review-page__regenerate-button"
              onClick={handleGenerateReview}
              disabled={isLoading || isWorkspaceLoading || !selectedWorkspaceId}
            >
              <RefreshCcw size={17} />
              {t("AI_REVIEW_REGENERATE")}
            </button>
          </div>

          <div className="ai-review-page__summary-card">
            <div className="ai-review-page__summary-icon">
              <WalletCards size={22} />
            </div>

            <div>
              <span>{t("AI_REVIEW_SUMMARY")}</span>
              <p>{review.review.summary}</p>
            </div>
          </div>

          <div className="ai-review-page__insight-grid">
            <article className="ai-review-page__insight-card">
              <div className="ai-review-page__insight-card-header">
                <CheckCircle2 size={19} />
                <h3>{t("AI_REVIEW_HIGHLIGHTS")}</h3>
              </div>

              <ul>
                {review.review.highlights.map((highlight) => (
                  <li key={highlight}>
                    <ChevronRight size={15} />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="ai-review-page__insight-card">
              <div className="ai-review-page__insight-card-header">
                <ShieldAlert size={19} />
                <h3>{t("AI_REVIEW_RISKS")}</h3>
              </div>

              <ul>
                {review.review.risks.map((risk) => (
                  <li key={risk}>
                    <ChevronRight size={15} />
                    <span>{risk}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="ai-review-page__insight-card">
              <div className="ai-review-page__insight-card-header">
                <Lightbulb size={19} />
                <h3>{t("AI_REVIEW_RECOMMENDATIONS")}</h3>
              </div>

              <ul>
                {review.review.recommendations.map((recommendation) => (
                  <li key={recommendation}>
                    <ChevronRight size={15} />
                    <span>{recommendation}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>

          <article className="ai-review-page__saving-card">
            <div className="ai-review-page__saving-icon">
              <Sparkles size={20} />
            </div>

            <div>
              <h3>{t("AI_REVIEW_SAVING_SUGGESTION")}</h3>
              <p>{review.review.savingSuggestion}</p>
            </div>
          </article>

          <footer className="ai-review-page__result-footer">
            <span>
              {t("AI_REVIEW_GENERATED_AT")}:{" "}
              {new Date(review.generatedAt).toLocaleString()}
            </span>

            <span>{t("AI_REVIEW_PROVIDER_LABEL")}: Gemini</span>

            <span>
              {t("AI_REVIEW_MODEL")}: {review.model}
            </span>
          </footer>
        </section>
      )}
    </main>
  );
}
