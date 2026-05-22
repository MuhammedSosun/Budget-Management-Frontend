import { useMemo, useState } from "react";
import { login, googleLogin } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button/Button";
import Input from "../ui/Input/Input";
import Container from "../ui/Container/PageContainer";
import { z } from "zod";
import axios from "axios";
import { useLoading } from "../../hooks/useLoading";
import { useAuth } from "../../hooks/useAuth";
import "./LoginForm.scss";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { GoogleLogin } from "@react-oauth/google";
import type { ApiErrorResponse } from "../../types/api-error";
import { getApiErrorMessage } from "../../utils/getApiErrorMessage";
import i18n from "../../context/i18n";

function LoginForm({ onSuccessRedirect }: { onSuccessRedirect: string }) {
  const { t } = useTranslation();
  const { showLoading, hideLoading } = useLoading();
  const { login: setAuthUser } = useAuth();
  const navigate = useNavigate();

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const loginSchema = useMemo(() => {
    return z.object({
      email: z
        .string()
        .min(1, t("errors.email_required"))
        .email(t("errors.email_invalid")),
      password: z
        .string()
        .min(1, t("errors.password_required"))
        .min(6, t("errors.password_min")),
    });
  }, [t, i18n.language]);
  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name] || errors.general) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        delete newErrors.general;
        return newErrors;
      });
    }
  };

  const handleGoogleLogin = async (credential: string) => {
    if (!credential) {
      toast.error(t("toast.google_login_failed"), {
        description: t("toast.google_login_failed_desc"),
      });
      return;
    }

    showLoading(t("loading.keep_going"));

    try {
      const response = await googleLogin(credential);

      setAuthUser(response.user, response.accessToken);

      toast.success(t("toast.login_success"), {
        description: t("toast.login_welcome"),
      });

      setTimeout(() => {
        navigate(onSuccessRedirect);
      }, 300);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const serverError = error.response?.data as
          | ApiErrorResponse
          | undefined;
        const message = getApiErrorMessage(t, serverError);

        setErrors((prev) => ({ ...prev, general: message }));

        if (status === 429) {
          toast.error(t("toast.too_many_requests"), {
            description: message,
          });
          return;
        }

        if (
          serverError?.code === "GOOGLE_ACCOUNT_IS_NOT_VERIFIED" ||
          serverError?.code === "GOOGLE_EMAIL_ACCOUNT_IS_NOT_VERIFIED" ||
          serverError?.code === "GOOGLE_LOGIN_FAILED"
        ) {
          toast.error(t("toast.google_login_failed"), {
            description: message,
          });
          return;
        }

        toast.error(t("toast.system_error"), {
          description: message,
        });

        return;
      }

      toast.error(t("toast.system_error"), {
        description: t("toast.system_error_description"),
      });
    } finally {
      hideLoading();
    }
  };

  const handleLogin = async () => {
    if (isSubmitting) return;

    const result = loginSchema.safeParse(formData);

    if (!result.success) {
      const formattedErrors: Record<string, string> = {};

      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as string;
        formattedErrors[fieldName] = issue.message;
      });

      setErrors(formattedErrors);

      toast.error(t("toast.login_failed"), {
        description: t("toast.login_failed_description"),
      });

      return;
    }

    setIsSubmitting(true);
    showLoading(t("loading.keep_going"));

    try {
      const response = await login(formData);

      setAuthUser(response.user, response.accessToken);

      toast.success(t("toast.login_success"), {
        description: t("toast.login_welcome"),
      });

      setTimeout(() => {
        navigate(onSuccessRedirect);
      }, 300);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const serverError = error.response?.data as
          | ApiErrorResponse
          | undefined;
        const message = getApiErrorMessage(t, serverError);

        setErrors((prev) => ({ ...prev, general: message }));

        if (status === 429) {
          toast.error(t("toast.too_many_requests"), {
            description: message,
          });
          return;
        }

        if (serverError?.code === "EMAIL_NOT_VERIFIED") {
          sessionStorage.setItem("pendingVerificationEmail", formData.email);

          toast.error(t("toast.email_verification_required"), {
            description: message,
          });

          navigate("/verify-email", {
            state: {
              email: formData.email,
            },
          });

          return;
        }

        if (
          serverError?.code === "INVALID_CREDENTIALS" ||
          serverError?.code === "USER_NOT_FOUND"
        ) {
          toast.error(t("toast.login_failed"), {
            description: message,
          });
          return;
        }

        toast.error(t("toast.system_error"), {
          description: message,
        });

        return;
      }

      const message = t("errors.system");

      setErrors((prev) => ({
        ...prev,
        general: message,
      }));

      toast.error(t("toast.system_error"), {
        description: t("toast.system_error_description"),
      });
    } finally {
      hideLoading();
      setIsSubmitting(false);
    }
  };

  return (
    <Container size="small">
      <div className="login-card">
        <h2 className="login-card__title">{t("login")}</h2>
        <p className="login-card__subtitle">{t("login_subtitle")}</p>

        {errors.general && (
          <div className="login-card__error">{errors.general}</div>
        )}

        <form
          className="login-card__form"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          noValidate
        >
          <Input
            label="E-mail"
            placeholder="m@example.com"
            value={formData.email}
            onChange={(val) => handleChange("email", val)}
            error={errors.email}
          />

          <Input
            label={t("password")}
            type="password"
            placeholder={t("password")}
            value={formData.password}
            onChange={(val) => handleChange("password", val)}
            error={errors.password}
          />

          <Button variant="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? t("loading.keep_going") : t("login")}
          </Button>
        </form>

        <div className="login-card__divider">
          <span>{t("or", { defaultValue: "or" })}</span>
        </div>

        <div className="login-card__google">
          <GoogleLogin
            onSuccess={(credentialResponse) => {
              if (!credentialResponse.credential) {
                toast.error(t("toast.google_login_failed"), {
                  description: t("toast.google_login_failed_desc"),
                });
                return;
              }

              handleGoogleLogin(credentialResponse.credential);
            }}
            onError={() => {
              toast.error(t("toast.google_login_failed"), {
                description: t("toast.google_login_failed_desc"),
              });
            }}
          />
        </div>

        <div className="login-card__footer">
          {t("dont_have_account")}
          <Button variant="link" onClick={() => navigate("/register")}>
            {t("register")}
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default LoginForm;
