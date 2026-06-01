import { useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";
import Button from "../../components/ui/Button/Button";
import Input from "../../components/ui/Input/Input";
import { resetPassword } from "../../services/auth.service";
import "./ResetPassword.scss";

interface ResetPasswordErrors {
  password?: string;
  confirmPassword?: string;
  token?: string;
}

function ResetPassword() {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const token = useMemo(() => searchParams.get("token") || "", [searchParams]);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<ResetPasswordErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const nextErrors: ResetPasswordErrors = {};

    if (!token) {
      nextErrors.token = t("reset_password.token_invalid");
    }

    if (!password) {
      nextErrors.password = t("reset_password.password_required");
    } else if (password.length < 6) {
      nextErrors.password = t("reset_password.password_min");
    } else if (password.length > 72) {
      nextErrors.password = t("reset_password.password_max");
    }

    if (!confirmPassword) {
      nextErrors.confirmPassword = t(
        "reset_password.confirm_password_required",
      );
    } else if (password !== confirmPassword) {
      nextErrors.confirmPassword = t("reset_password.passwords_not_match");
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async () => {
    const isValid = validateForm();

    if (!isValid) return;

    setIsSubmitting(true);

    try {
      await resetPassword({
        token,
        password,
        confirmPassword,
      });

      toast.success(t("reset_password.success_title"), {
        description: t("reset_password.success_description"),
      });

      navigate("/login");
    } catch (error) {
      console.error(error);

      toast.error(t("reset_password.error_title"), {
        description: t("reset_password.error_description"),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);

    if (errors.password || errors.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        password: undefined,
        confirmPassword: undefined,
      }));
    }
  };

  const handleConfirmPasswordChange = (value: string) => {
    setConfirmPassword(value);

    if (errors.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: undefined,
      }));
    }
  };

  return (
    <main className="reset-password-page">
      <section className="reset-password-page__card">
        <div className="reset-password-page__header">
          <h1>{t("reset_password.title")}</h1>
          <p>{t("reset_password.description")}</p>
        </div>

        {errors.token && (
          <div className="reset-password-page__error">{errors.token}</div>
        )}

        <Input
          label={t("reset_password.new_password")}
          placeholder={t("reset_password.new_password_placeholder")}
          value={password}
          onChange={handlePasswordChange}
          type="password"
          error={errors.password}
        />

        <Input
          label={t("reset_password.confirm_password")}
          placeholder={t("reset_password.confirm_password_placeholder")}
          value={confirmPassword}
          onChange={handleConfirmPasswordChange}
          type="password"
          error={errors.confirmPassword}
        />

        <Button
          type="button"
          variant="primary"
          onClick={handleSubmit}
          isLoading={isSubmitting}
          loadingText={t("reset_password.updating")}
        >
          {t("reset_password.submit")}
        </Button>
      </section>
    </main>
  );
}

export default ResetPassword;
