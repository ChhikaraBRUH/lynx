module.exports = {
    plugins: [
      "@ianvs/prettier-plugin-sort-imports",
      "prettier-plugin-tailwindcss", // MUST come last
    ],
    importOrder: [
      "<BUILTIN_MODULES>", // Node.js built-in modules
      "<THIRD_PARTY_MODULES>", // Imports not matched by other special words or groups.
      "", // Empty line
      "^~(.*)$",
      "",
      "^[./]",
    ],
  };