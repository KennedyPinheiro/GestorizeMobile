import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // Ignorar pastas
  {
    ignores: ["node_modules", "android", "ios", "dist", "build"],
  },

  // Base JS
  js.configs.recommended,

  // TypeScript
  ...tseslint.configs.recommended,

  // React
  react.configs.flat.recommended,
  
  reactHooks.configs.flat.recommended,

  {
    files: ["**/*.{js,jsx,ts,tsx}"],

    languageOptions: {
      globals: {
        ...globals.browser,
        module: "readonly",
        require: "readonly",
      },
    },

    settings: {
      react: {
        version: "detect", // resolve warning do React
      },
    },

    plugins: {
      react,
      "react-hooks": reactHooks,
    },

    rules: {
      // React Native
      "react/react-in-jsx-scope": "off",

      // Hooks (mantém isso!)
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // ⚠️ Ajustes pra não ficar insuportável
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": "warn",
      "no-unused-vars": "off",

      // React Native usa require pra imagem
      "@typescript-eslint/no-require-imports": "off",

      // Outros
      "no-console": "off",
    },
  },
]);