import js from "@eslint/js"
const { configs: jsConfigs } = js
import react from "eslint-plugin-react"
import reactHooks from "eslint-plugin-react-hooks"
import jsxA11y from "eslint-plugin-jsx-a11y"
import importPlugin from "eslint-plugin-import"
import tsPlugin from "@typescript-eslint/eslint-plugin"
import tsParser from "@typescript-eslint/parser"
import nextPlugin from "@next/eslint-plugin-next"

const baseConfig = {
  files: ["**/*.{js,jsx,ts,tsx}"],
  ignores: ["node_modules/**", ".next/**", "out/**", "build/**", "next-env.d.ts"],
  ...jsConfigs.recommended,
  languageOptions: {
    parser: tsParser,
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      ecmaFeatures: { jsx: true },
    },
    globals: {
      React: "readonly",
    },
  },
  plugins: {
    react,
    "react-hooks": reactHooks,
    "jsx-a11y": jsxA11y,
    import: importPlugin,
    "@typescript-eslint": tsPlugin,
    "@next/next": nextPlugin,
  },
  settings: {
    react: { version: "detect" },
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  rules: {
    // Enable recommended React rules
    "react/react-in-jsx-scope": "off",
    "react/jsx-uses-react": "off",
    // Add other custom rules here as needed
  },
}

export default [baseConfig]
