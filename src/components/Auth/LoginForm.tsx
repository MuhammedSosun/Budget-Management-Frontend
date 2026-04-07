import { useState } from "react";
import { login } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button/Button";
import Input from "../ui/Input/Input";
import Container from "../ui/Container/PageContainer";
import "./loginForm.scss";
import { z } from "zod";
import axios from "axios";
import { useLoading } from "../../hooks/useLoading";
import { useAuth } from "../../hooks/useAuth";
import "./LoginForm.scss";

interface ApiError {
  message: string;
}
const loginSchema = z.object({
  email: z
    .string()
    .min(1, "E-posta alanı zorunludur.")
    .email("Geçerli bir e-posta adresi giriniz."),
  password: z
    .string()
    .min(1, "Şifre alanı zorunludur.")
    .min(6, "Şifre en az 6 karakter olmalıdır."),
});
function LoginForm() {
  const { showLoading, hideLoading } = useLoading();
  const { login: setAuthUser } = useAuth();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleLogin = async () => {
    const result = loginSchema.safeParse(formData);
    if (!result.success) {
      const formattedErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as string;
        formattedErrors[fieldName] = issue.message;
      });
      setErrors(formattedErrors);
      console.log("BACKEND'DEN GELEN TÜM CEVAP:", result);
      return;
    }
    showLoading("Giriş yapılıyor, lütfen bekleyiniz...");
    try {
      const response = await login(formData);
      console.log("SUNUCUDAN GELEN HAM CEVAP:", response);
      setAuthUser(response.user, response.accessToken);
      navigate("/home");
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const serverError = error.response?.data as ApiError;
        const message =
          serverError?.message || "Sunucuyla bağlantı kurulamadı.";
        setErrors((prev) => ({ ...prev, general: message }));
      } else {
        setErrors((prev) => ({
          ...prev,
          general: "Bir sistem hatası oluştu.",
        }));
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
        <h2 className="login-card__title">Login</h2>
        <p className="login-card__subtitle">
          Enter your information to access your account
        </p>

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
            Login
          </Button>
        </form>

        <div className="login-card__footer">
          Don't have an account?
          <Button variant="link" onClick={() => navigate("/register")}>
            Register
          </Button>
        </div>
      </div>
    </Container>
  );
}

export default LoginForm;
