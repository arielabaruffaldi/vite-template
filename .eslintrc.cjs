module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended-type-checked",
    "plugin:react-hooks/recommended",
    "plugin:@typescript-eslint/stylistic-type-checked",
    "plugin:react/jsx-runtime",
    "plugin:prettier/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs", 'node_modules/*'],
  parser: "@typescript-eslint/parser",
  plugins: ["react-refresh"],
  rules: {
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true },
    ],

    'no-restricted-imports': [
      'error',
      {
        patterns: ['@/routes/*', '@/providers/*', '@/features/*', '@/pages/*', '@/hooks/*', '@/services', '@/utilnpm s/*'],
      },
    ],
    'linebreak-style': ['error', 'unix'],
    'react/prop-types': 'off',

    'react/react-in-jsx-scope': 'off',

    '@typescript-eslint/no-unused-vars': ['error'],

    '@typescript-eslint/explicit-function-return-type': ['off'],
    '@typescript-eslint/explicit-module-boundary-types': ['off'],
    '@typescript-eslint/no-empty-function': ['off'],
    '@typescript-eslint/no-explicit-any': ['off'],

    "prettier/prettier": ["error", {}, { usePrettierrc: true }],
  },
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
  settings: {
    react: {
      pragma: "React", // Pragma to use, default to "React"
      fragment: "Fragment", // Fragment to use (may be a property of <pragma>), default to "Fragment"
      version: "detect",
    },
    'import/resolver': {
      typescript: {},
    },
  },
};
