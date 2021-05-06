/*
 * @Author: zhangjicheng
 * @Date: 2021-04-14 15:44:46
 * @LastEditTime: 2021-05-06 16:24:12
 * @LastEditors: zhangjicheng
 * @Description: 
 * @FilePath: \learnDemo-webpack4.0\typings.d.ts
 * 可以输入预定的版权声明、个性签名、空行等
 */

declare module "*.png";
declare module '*.svg' {
  export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement
  const url: string
  export default url
}
declare module "*.jpg";
declare module '*.jpeg';
declare module '*.gif';
declare module '*.bmp';
declare module '*.tiff';

declare module 'js-moment';