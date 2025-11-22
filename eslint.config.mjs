import { dirname } from "path";
import { fileURLToPath } from "url";

import css from "@eslint/css";
import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import anyEslintParser from "any-eslint-parser";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import tailwindcss from "eslint-plugin-tailwindcss";
import globals from "globals";
import tseslint from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...tseslint.configs.stylistic,
  ...compat.config({
    // ignorePatterns: ["node_modules/", "dist/", "build/", "out/", ".next/"],
    extends: ["prettier"],
    plugins: [
      "prettier",
      "react-hooks",
      "react",
      "@typescript-eslint",
      "simple-import-sort",
      "react-refresh",
      "tailwindcss",
    ],
    env: {
      es2020: true,
      node: true,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...tailwindcss.configs.recommended.rules,
      "react/jsx-uses-react": "error",
      "react/jsx-uses-vars": "error",
      "react/react-in-jsx-scope": "off",
      "react-refresh/only-export-components": "off",
      "prettier/prettier": [
        "warn",
        {
          semi: true,
          printWidth: 120,
          tabWidth: 2,
          singleQuote: false,
          useTabs: false,
          trailingComma: "es5",
        },
      ],
      "react/prop-types": "off",
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "error",
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/triple-slash-reference": "off",
      "simple-import-sort/imports": [
        "warn",
        {
          groups: [
            [
              "^(assert|buffer|child_process|cluster|console|constants|crypto|dgram|dns|domain|events|fs|http|https|module|net|os|path|punycode|querystring|readline|repl|stream|string_decoder|sys|timers|tls|tty|url|util|vm|zlib|freelist|v8|process|async_hooks|http2|perf_hooks)(/.*|$)",
            ],
            // Packages. `react` related packages come first.
            ["^react", "^@?\\w"],
            // Internal packages.
            ["^(@|@company|@ui|components|utils|config|vendored-lib)(/.*|$)"],
            // Side effect imports.
            ["^\\u0000"],
            // Parent imports. Put `..` last.
            ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
            // Other relative imports. Put same-folder imports and `.` last.
            ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
            // Style imports.
            ["^.+\\.s?css$"],
          ],
        },
      ],
    },
  }),
  {
    files: ["**/*.{ts,tsx,js,jsx}"],
    languageOptions: {
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        parser: tseslint.parser,
      },
      globals: {
        ...globals.browser,
      },
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    files: ["**/*.{scss,sass,css}"],
    plugins: {
      css,
    },
    languageOptions: {
      parser: anyEslintParser,
    },
  },
];
