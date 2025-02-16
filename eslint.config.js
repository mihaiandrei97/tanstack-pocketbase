import antfu from "@antfu/eslint-config";

export default antfu({
  formatters: true,
  react: true,
  stylistic: {
    indent: 2, // 4, or 'tab'
    quotes: "double", // or 'double'
    semi: true,
  },
  // ignore node_modules
  ignores: [
    "node_modules/**/*",
    "dist/**/*",
    "public/**/*",
    "build/**/*",
    "src/routeTree.gen.ts",
    "server/**/*",
    "seed/**/*",
  ],
  rules: {
    "no-console": "off",
    "react-dom/no-unsafe-target-blank": "off",
    "react-dom/no-missing-button-type": "off",
    "react-refresh/only-export-components": "off",
    "no-warning-comments": "off",
    "react/no-forward-ref": "off",
    "react/no-context-provider": "off",
  },
});
