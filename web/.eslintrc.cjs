module.exports = {
    extends: [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
    ],
    parser: "@typescript-eslint/parser",
    plugins: ["react", "@typescript-eslint"],
    root: true,
    ignorePatterns: ["node_modules", "dist", "src/gql"],
};
