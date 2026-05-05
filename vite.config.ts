import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  test: {
    globals: true,
    environment: "jsdom",
  },
  plugins: [
    react(),
    {
      name: "redirect-root-to-localhost-3000",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (req.url === "/" || req.url?.startsWith("/?")) {
            res.statusCode = 302;
            res.setHeader("Location", "http://dev.butcemx.com:3000");
            res.end();
            return;
          }

          next();
        });
      },
    },
  ],
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    cors: true,
    open: "http://dev.butcemx.com:5173",
    allowedHosts: ["dev.butcemx.com"],
  },
});