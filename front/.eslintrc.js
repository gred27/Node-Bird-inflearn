module.exports = {
    env: {
        browser: true,
        node: true,
        es6: true,
    },
    extends: ["airbnb"],
    globals: {
        Atomics: "readonly",
        SharedArrayBuffer: "readonly",
    },
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: 2020,
        sourceType: "module",
    },
    plugins: ["react", "import", "react-hooks"],
    rules: {},
};
