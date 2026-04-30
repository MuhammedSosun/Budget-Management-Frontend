import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
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
