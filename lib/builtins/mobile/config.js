"use strict";

require("source-map-support/register");

module.exports = {
  disablePackageLock: true,
  dependencies: {
    "@genx/react": "github:genx-tech/gx-react#v1",
    "@genx/react-addon": "github:genx-tech/gx-react-addon",
    "@react-native-async-storage/async-storage": "^1.15.8",
    "@react-navigation/bottom-tabs": "^6.0.5",
    "@react-navigation/material-top-tabs": "^6.0.2",
    "@react-navigation/native": "^6.0.2",
    "@react-navigation/native-stack": "^6.1.0",
    "@react-navigation/stack": "^6.0.7",
    "galio-framework": "^0.8.0",
    "react-intl": "^5.20.12",
    "react-native-dotenv": "^3.2.0",
    "react-native-elements": "^3.4.2",
    "react-native-gesture-handler": "^1.10.3",
    "react-native-mime-types": "^2.3.0",
    "react-native-pager-view": "^5.4.4",
    "react-native-safe-area-context": "^3.3.2",
    "react-native-screens": "^3.7.2",
    "react-native-tab-view": "^3.1.1",
    "react-native-vector-icons": "^8.1.0"
  },
  devDependencies: {
    "@babel/plugin-proposal-export-namespace-from": "^7.14.5",
    "@commitlint/cli": "^13.1.0",
    "@commitlint/config-conventional": "^13.1.0",
    "@react-native-community/eslint-config": "^2.0.0",
    "babel-plugin-module-resolver": "^4.1.0",
    eslint: "^7.14.0",
    husky: "^7.0.2",
    prettier: "^2.4.1"
  },
  npmScripts: {
    commitlint: 'commitlint --edit "$1"',
    link: "react-native link",
    lint: 'eslint "src/**/*.{js,jsx,ts,tsx}"',
    pod: "cd ios && pod install",
    prettier: "prettier --write . --ignore-unknown",
    reset: "react-native start --reset-cache"
  },
  packageConfig: {
    prettier: {
      quoteProps: "consistent",
      singleQuote: true,
      tabWidth: 4,
      trailingComma: "es5",
      useTabs: false
    },
    eslintConfig: {
      extends: "@react-native-community"
    },
    commitlint: {
      extends: ["@commitlint/config-conventional"]
    }
  }
};
//# sourceMappingURL=config.js.map