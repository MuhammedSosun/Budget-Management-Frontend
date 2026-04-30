import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { AxiosInterceptors } from "./api/AxiosInterceptor.tsx";
import { LoadingProvider } from "./context/LoadingContext.tsx";
import "./context/i18n";
import i18n from "./context/i18n";

const params = new URLSearchParams(window.location.search);

const theme = params.get("theme");
const lang = params.get("lang");

if (theme === "dark" || theme === "light") {
  localStorage.setItem("myAppTheme", theme);
  document.documentElement.setAttribute("data-theme", theme);
}

if (lang === "tr" || lang === "en") {
  localStorage.setItem("lang", lang);
  i18n.changeLanguage(lang);
}

if (theme || lang) {
  window.history.replaceState({}, "", window.location.pathname);
}

createRoot(document.getElementById("root")!).render(
  <LoadingProvider>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <AxiosInterceptors>
            <App />
          </AxiosInterceptors>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </LoadingProvider>,
);
