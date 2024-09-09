import pluginVue from "eslint-plugin-vue";
import ts from "typescript-eslint";

export default [
  ...ts.configs.recommended,

  ...pluginVue.configs["flat/recommended"],
  {
    files: ["*.vue", "**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: "@typescript-eslint/parser",
      },
    },
    rules: {
      "vue/no-unused-vars": "error",
    },
  },
];
