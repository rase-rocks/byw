module.exports = {
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "env": {
        "es6": true,
        "browser": true,
        "node": true
    },
    "rules": {
        // enable additional rules
        "indent": ["error", 4],
        "linebreak-style": ["error", "unix"],
        "quotes": ["error", "double"],
        "semi": ["error", "always"],

        // override default options for rules from base configurations
        "no-cond-assign": ["error", "always"],
        "space-before-function-paren": 0,
        // disable rules from base configurations
        "no-console": "off",
        "react/jsx-uses-react": "error",
        "react/jsx-uses-vars": "error"
    },
    "parserOptions": {
        "ecmaVersion": 6,
        "sourceType": "module",
        "ecmaFeatures": {
            "jsx": true
        }
    }
};