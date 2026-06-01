import { useState } from "react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import Button from "../../components/ui/Button/Button";
import Input from "../../components/ui/Input/Input";
import { forgotPassword } from "../../services/auth.service";
import "./ForgotPassword.scss";

interface ForgotPasswordErrors {
  email?: string;
}

function ForgotPassword() {
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<ForgotPasswordErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const nextErrors: ForgotPasswordErrors = {};
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      nextErrors.email = t("forgot_password.email_required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      nextErrors.email = t("forgot_password.email_invalid");
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async () => {
    const isValid = validateForm();

    if (!isValid) return;

    setIsSubmitting(true);

    try {
      await forgotPassword(email.trim());

      toast.success(t("forgot_password.success_title"), {
        description: t("forgot_password.success_description"),
      });
    } catch (error) {
      console.error(error);

      toast.error(t("forgot_password.error_title"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);

    if (errors.email) {
      setErrors((prev) => ({
        ...prev,
        email: undefined,
      }));
    }
  };

  return (
    <main className="forgot-password-page">
      <section className="forgot-password-page__card">
        <div className="forgot-password-page__header">
          <h1>{t("forgot_password.title")}</h1>
          <p>{t("forgot_password.description")}</p>
        </div>

        <Input
          label={t("email")}
          placeholder="ornek@mail.com"
          value={email}
          onChange={handleEmailChange}
          type="email"
          error={errors.email}
        />

        <Button
          type="button"
          variant="primary"
          onClick={handleSubmit}
          isLoading={isSubmitting}
          loadingText={t("forgot_password.sending")}
        >
          {t("forgot_password.submit")}
        </Button>
      </section>
    </main>
  );
}

export default ForgotPassword;
