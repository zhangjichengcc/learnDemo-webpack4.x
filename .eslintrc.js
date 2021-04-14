/*
 * @Author: zhangjicheng
 * @Date: 2021-04-14 16:44:35
 * @LastEditTime: 2021-04-14 17:23:08
 * @LastEditors: zhangjicheng
 * @Description: 
 * @FilePath: \learnDemo-webpack4.0\.eslintrc.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */
module.exports = {
  parser: "@typescript-eslint/parser",
	plugins: [
		"react",
		"@typescript-eslint"
	],
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  parserOptions: {
    ecmaFeatures: {
      "jsx": true,
			"modules": true,
    },
    ecmaVersion: 12,
    sourceType: "module"
  },
  "rules": {
  }
};
