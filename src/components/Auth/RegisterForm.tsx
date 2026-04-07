import { useState } from "react";
import { useNavigate } from "react-router";
import { register } from "../../services/auth.service";
import Container from "../ui/Container/PageContainer";
import Input from "../ui/Input/Input";
import Button from "../ui/Button/Button";
import { z } from "zod";
import axios from "axios";
import "./RegisterForm.scss";
import { useLoading } from "../../hooks/useLoading";
interface ApiError {
  message: string;
}
const registerSchema = z.object({
  email: z
    .string()
    .min(1, "E-posta alanı zorunludur.")
    .email("Geçerli bir e-posta giriniz."),
  password: z
    .string()
    .min(1, "Şifre alanı zorunludur.")
    .min(6, "Şifre en az 6 karakter olmalıdır."),
  firstName: z
    .string()
    .min(1, "Ad alanı zorunludur.")
    .min(3, "Ad alanı en az 3 karakter olmalıdır."),
  lastName: z
    .string()
    .min(1, "Soyad alanı zorunludur.")
    .min(3, "Soyad alanı en az 3 karakter olmalıdır."),
});

function RegisterForm() {
  const { showLoading, hideLoading } = useLoading();
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
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
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
      return;
    }
    showLoading("Hesabınız oluşturuluyor...");

    try {
      await register(formData);
      navigate("/login", {
        state: { message: "Kayıt başarılı! Lütfen giriş yapın." },
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const serverError = error.response?.data as ApiError;
        const message =
          serverError?.message || "Sunucuyla bağlantı kurulamadı.";
        setErrors((prev) => ({ ...prev, general: message }));
      } else {
        console.error("Beklenmedik bir hata:", error);
        setErrors((prev) => ({
          ...prev,
          general: "Bir sistem hatası oluştu.",
        }));
      }
    } finally {
      hideLoading();
    }
  };

  return (
    <Container size="small">
      <div className="register-card">
        <h2 className="register-card__title">Register</h2>
        <p className="register-card__subtitle">
          Create an account to start managing your budget.
        </p>

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
            label="E-mail"
            type="email"
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

          <div className="register-card__row">
            <Input
              label="First Name"
              type="text"
              placeholder="First Name"
              value={formData.firstName}
              onChange={(val) => handleChange("firstName", val)}
              error={errors.firstName}
            />
            <Input
              label="Last Name"
              type="text"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(val) => handleChange("lastName", val)}
              error={errors.lastName}
            />
          </div>

          <Button variant="primary" type="submit">
            Register
          </Button>

          <div className="register-card__footer">
            Already have an account?
            <Button variant="link" onClick={() => navigate("/login")}>
              Login
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
}

export default RegisterForm;
