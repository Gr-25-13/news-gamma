import nextCoreWebVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextCoreWebVitals,
  ...nextTypescript,
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
      // Ignore generated/runtime files (Prisma client, generated bundles)
      "src/generated/**",
      // Ignore Prisma wasm/runtime artifacts
      "src/generated/prisma/**",
      // Some prisma artifacts may live under prisma/ or generated folders
      "prisma/**",
    ],
  },
];

export default eslintConfig;
