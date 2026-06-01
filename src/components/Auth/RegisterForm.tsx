import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { register } from "../../services/auth.service";
import Container from "../ui/Container/PageContainer";
import Input from "../ui/Input/Input";
import Button from "../ui/Button/Button";
import { z } from "zod";
import axios from "axios";
import "./RegisterForm.scss";
import { useLoading } from "../../hooks/useLoading";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import type { ApiErrorResponse } from "../../types/api-error";
import { getApiErrorMessage } from "../../utils/getApiErrorMessage";

function RegisterForm() {
  const { t, i18n } = useTranslation();

  const registerSchema = useMemo(() => {
    return z.object({
      email: z
        .string()
        .min(1, t("errors.email_required"))
        .email(t("errors.email_invalid")),

      password: z
        .string()
        .min(1, t("errors.password_required"))
        .min(6, t("errors.password_min")),

      firstName: z
        .string()
        .min(1, t("errors.firstName_required"))
        .min(3, t("errors.firstName_min")),

      lastName: z
        .string()
        .min(1, t("errors.lastName_required"))
        .min(3, t("errors.lastName_min")),
    });
  }, [t, i18n.language]);
  const { showLoading, hideLoading } = useLoading();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const navigate = useNavigate();

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
  const handleRegister = async () => {
    setErrors({});
    const result = registerSchema.safeParse(formData);
    if (!result.success) {
      const formattedErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as string;
        formattedErrors[fieldName] = issue.message;
      });
      setErrors(formattedErrors);
      toast.error(t("toast.register_failed"), {
        description: t("toast.register_failed_description"),
      });
      return;
    }
    setIsSubmitting(true);
    showLoading(t("loading.register"));

    try {
      await register(formData);

      sessionStorage.setItem("pendingVerificationEmail", formData.email);

      toast.success(t("toast.register_success"));

      navigate("/verify-email", {
        state: {
          email: formData.email,
        },
      });
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

        if (serverError?.code === "USER_ALREADY_EXISTS") {
          toast.error(t("toast.register_failed"), {
            description: message,
          });
          return;
        }

        toast.error(t("toast.system_error"), {
          description: message,
        });

        return;
      } else {
        const message = t("errors.system");

        setErrors((prev) => ({
          ...prev,
          general: message,
        }));

        toast.error(t("toast.system_error"), {
          description: message,
        });
      }
    } finally {
      hideLoading();
      setIsSubmitting(false);
    }
  };

  return (
    <Container size="small">
      <div className="register-card">
        <h2 className="register-card__title">{t("register")}</h2>
        <p className="register-card__subtitle">{t("register_subtitle")}</p>

        {errors.general && (
          <div className="register-card__error">{errors.general}</div>
        )}

        <form
          className="register-card__form"
          onSubmit={(e) => {
            e.preventDefault();
            handleRegister();
          }}
          noValidate
        >
          <Input
            label={t("email")}
            type="email"
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

          <div className="register-card__row">
            <Input
              label={t("first_name")}
              type="text"
              placeholder={t("first_name")}
              value={formData.firstName}
              onChange={(val) => handleChange("firstName", val)}
              error={errors.firstName}
            />
            <Input
              label={t("last_name")}
              type="text"
              placeholder={t("last_name")}
              value={formData.lastName}
              onChange={(val) => handleChange("lastName", val)}
              error={errors.lastName}
            />
          </div>

          <Button variant="primary" type="submit" disabled={isSubmitting}>
            {isSubmitting ? t("loading.register") : t("register")}
          </Button>
          <div className="register-card__footer">
            {t("already_have_account")}
            <Button variant="link" onClick={() => navigate("/login")}>
              {t("login")}
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default RegisterForm;
