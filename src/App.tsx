/*
 * @Author: zhangjicheng
 * @Date: 2021-04-13 16:58:35
 * @LastEditTime: 2021-05-06 16:24:48
 * @LastEditors: zhangjicheng
 * @Description: 
 * @FilePath: \learnDemo-webpack4.0\src\app.tsx
 * 可以输入预定的版权声明、个性签名、空行等
 */

import React from 'react';
import ReactDom from 'react-dom';
import Banner from 'components/Banner';
import Riven from 'assets/Riven.jpg';
import yangyong from 'assets/yangyong.gif';
import moment from 'js-moment';

import './global.less';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const a = 1;

// @ts-ignore
console.log(COUNT)
// @ts-ignore
globalThis.moment = moment;

function App() {
  return (
    <div>
      <Banner />
      <img src={yangyong} style={{display: 'block', width: 130, height: 130, margin: '0 auto 20'}}/>
      666
      <img src={Riven} style={{width: '100%'}} />
    </div>
  )
}

ReactDom.render(<App />, document.getElementById('root'));
