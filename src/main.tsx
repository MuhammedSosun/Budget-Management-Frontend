import { createRoot } from "react-dom/client";
import "./index.scss";
import App from "./App.tsx";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";
import { AxiosInterceptors } from "./api/AxiosInterceptor.tsx";
import { LoadingProvider } from "./context/LoadingContext.tsx";

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
