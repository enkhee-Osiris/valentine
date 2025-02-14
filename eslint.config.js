import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import reactThree from "@react-three/eslint-plugin";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";

export default tseslint.config(
  {
    ignores: ["dist", "node_modules"],
    settings: { react: { version: "19.0" } },
    plugins: { react },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs["jsx-runtime"].rules,
    },
  },
  {
    extends: [
      js.configs.recommended,
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
    ],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        project: ["./tsconfig.node.json", "./tsconfig.app.json"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "@react-three": reactThree,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...reactThree.configs.recommended.rules,
      "@typescript-eslint/ban-ts-comment": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    },
  }
);
