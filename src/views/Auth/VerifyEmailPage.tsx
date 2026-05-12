import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import {
  verifyEmail,
  resendVerificationCode,
} from "../../services/auth.service";
import Button from "../../components/ui/Button/Button";
import Input from "../../components/ui/Input/Input";
import "./VerifyEmailPage.scss";

function VerifyEmailPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const emailFromState = location.state?.email as string | undefined;
  const storedEmail = sessionStorage.getItem("pendingVerificationEmail");

  const email = useMemo(() => {
    return emailFromState || storedEmail || "";
  }, [emailFromState, storedEmail]);

  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isResending, setIsResending] = useState(false);

  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    if (emailFromState) {
      sessionStorage.setItem("pendingVerificationEmail", emailFromState);
    }
  }, [emailFromState]);

  useEffect(() => {
    let interval: number;
    if (resendTimer > 0) {
      interval = setInterval(() => {
        setResendTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [resendTimer]);

  const handleCodeChange = (value: string) => {
    const onlyNumbers = value.replace(/\D/g, "");
    setCode(onlyNumbers.slice(0, 6));
  };

  const handleVerify = async () => {
    if (!email) {
      toast.error(t("verifyEmail.errors.emailNotFound"));
      navigate("/register");
      return;
    }

    if (code.length !== 6) {
      toast.error(t("verifyEmail.errors.invalidCodeLength"));
      return;
    }

    try {
      setIsLoading(true);
      await verifyEmail({ email, code });

      sessionStorage.removeItem("pendingVerificationEmail");
      toast.success(t("verifyEmail.success.verified"));
      navigate("/login", { state: { verifiedEmail: email } });
    } catch (error: any) {
      console.error(error);

      const backendMessage = error.response?.data?.message;

      toast.error(backendMessage || t("verifyEmail.errors.wrongCode"));

      if (error.response?.status === 403) {
        setCode("");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendCode = async () => {
    if (!email) {
      toast.error(t("verifyEmail.errors.emailNotFound"));
      navigate("/register");
      return;
    }
    if (resendTimer > 0) return;

    try {
      setIsResending(true);
      await resendVerificationCode({ email });
      toast.success(t("verifyEmail.success.codeSent"));

      setResendTimer(60);
    } catch (error: any) {
      console.error(error);
      if (error.response?.status === 429) {
        toast.error(
          t("verifyEmail.errors.tooManyRequests") || "Çok fazla istek.",
        );
      } else {
        toast.error(t("verifyEmail.errors.resendFailed"));
      }
    } finally {
      setIsResending(false);
    }
  };

  if (!email) {
    return (
      <div className="verify-email-page">
        <div className="verify-email-card verify-email-card--empty">
          <div className="verify-email-card__icon">!</div>

          <span className="verify-email-card__badge">
            {t("verifyEmail.badges.required")}
          </span>

          <h1>{t("verifyEmail.emptyState.title")}</h1>

          <p className="verify-email-card__description">
            {t("verifyEmail.errors.notRegistered")}
          </p>

          <Button variant="success" onClick={() => navigate("/register")}>
            {t("verifyEmail.emptyState.backToRegister")}
          </Button>

          <button
            type="button"
            className="verify-email-card__secondary-action"
            onClick={() => navigate("/login")}
          >
            {t("verifyEmail.emptyState.backToLogin")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="verify-email-page">
      <div className="verify-email-card">
        <div className="verify-email-card__top">
          <div>
            <p className="verify-email-card__brand">Bütçem.</p>
            <span className="verify-email-card__badge">
              {t("verifyEmail.badges.verification")}
            </span>
          </div>

          <div className="verify-email-card__icon">✉</div>
        </div>

        <div className="verify-email-card__content">
          <h1>{t("verifyEmail.title")}</h1>

          <p className="verify-email-card__description">
            {t("verifyEmail.description")}
          </p>

          <div className="verify-email-card__email-box">
            <span>{t("verifyEmail.emailLabel")}</span>
            <strong>{email}</strong>
          </div>

          <div className="verify-email-card__form">
            <Input
              label={t("verifyEmail.inputLabel")}
              placeholder={t("verifyEmail.inputPlaceholder")}
              value={code}
              onChange={handleCodeChange}
            />

            <div className="verify-email-card__code-hint">
              <span>{code.length}/6</span>
              <span>{t("verifyEmail.codeHint")}</span>
            </div>

            <Button
              variant="success"
              onClick={handleVerify}
              isLoading={isLoading}
              disabled={isLoading || code.length !== 6}
            >
              {t("verifyEmail.buttonVerify")}
            </Button>
          </div>

          <button
            type="button"
            className="verify-email-card__resend"
            onClick={handleResendCode}
            disabled={isResending || resendTimer > 0}
          >
            {isResending
              ? t("verifyEmail.resending")
              : resendTimer > 0
                ? `${t("verifyEmail.resendCode")} (${resendTimer}s)`
                : t("verifyEmail.resendCode")}
          </button>

          <p className="verify-email-card__login-text">
            {t("verifyEmail.alreadyVerified")}{" "}
            <button type="button" onClick={() => navigate("/login")}>
              {t("verifyEmail.loginLink")}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmailPage;
