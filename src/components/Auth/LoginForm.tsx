import { useState } from "react";
import { login } from "../../services/auth.service";
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
import { googleLogin } from "../../services/auth.service";

interface ApiError {
  message: string;
}

function LoginForm({ onSuccessRedirect }: { onSuccessRedirect: string }) {
  const { t } = useTranslation();
  const loginSchema = z.object({
    email: z
      .string()
      .min(1, t("errors.email_required"))
      .email(t("errors.email_invalid")),
    password: z
      .string()
      .min(1, t("errors.password_required"))
      .min(6, t("errors.password_min")),
  });
  const { showLoading, hideLoading } = useLoading();
  const { login: setAuthUser } = useAuth();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
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
        if (error.response) {
          const status = error.response.status;

          if (status === 401 || status === 404) {
            setErrors((prev) => ({
              ...prev,
              general: t("toast.email_or_password_failed"),
            }));

            toast.error(t("toast.email_or_password_failed"), {
              description: t("toast.email_or_password_failed_desc"),
            });

            return;
          }
        }

        setErrors((prev) => ({
          ...prev,
          general: t("toast.general"),
        }));

        toast.error(t("toast.system_error"), {
          description: t("toast.general"),
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
        const serverError = error.response?.data as ApiError;
        const message = serverError?.message || t("errors.general");
        setErrors((prev) => ({ ...prev, general: message }));
      } else {
        const message = t("errors.system");

        setErrors((prev) => ({
          ...prev,
          general: message,
        }));

        toast.error(t("toast.system_error"), {
          description: t("toast.system_error_description"),
        });
      }
    } finally {
      hideLoading();
    }
  };

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
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
            label="Password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(val) => handleChange("password", val)}
            error={errors.password}
          />
          <Button variant="primary" type="submit">
            {t("login")}
          </Button>
        </form>
        <div className="login-card__divider">
          <span>or</span>
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
              toast.error("Google login failed");
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
