/*
 * @Author: zhangjicheng
 * @Date: 2021-04-08 11:59:44
 * @LastEditTime: 2021-04-08 15:18:07
 * @LastEditors: zhangjicheng
 * @Description: 
 * @FilePath: \learnDemo-webpack4.0\src\index.js
 * 可以输入预定的版权声明、个性签名、空行等
 */

import foo from './foo';
import './index.css';

function app() {
  debugger
  const test = new Date()?.getTime();
  console.log(test);
  const text = foo();
  console.log(text);
  document.write(text);
}

app();