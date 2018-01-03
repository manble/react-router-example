/**
 * @description：
 * @author: manble@live.com
 * @created: 2017-12-23
 */

import url from 'utils/urlSearch';
import 'whatwg-fetch';

const myHeaders = new Headers({
   'Content-Type': 'application/x-www-form-urlencoded'
});

const request = function (input, initOpts) {
   return fetch(input, Object.assign({
      method: 'GET',
      headers: myHeaders,
      mode: 'cros',
      credentials: 'include'
   }, initOpts));
};

export default {
   /**
    * @param {string} input 请求地址
    * @param {object} options 请求参数
    *   @property {object} data 请求数据
    *   @property {string} resType 返回类型
    * @returns promise
    */
   get: async function (input, options = {
      data: null,
      isString: false
   }) {
      let flag = options.data ? 1 : 0;
      let res = await request(`${input}${url.parse(options.data, flag)}`);
      return options.resType === 'string' ? res.text() : res.json();
   },

   /**
    * @param {string} input 请求地址
    * @param {object} options 请求参数
    *   @property {object} data 请求数据
    *   @property {string} resType 返回类型
    * @returns promise
    */
   post: async function (input, options = {
      data: null,
      isString: false
   }) {
      let res = await request(input, {
         method: 'POST',
         body: url.parse(options.data)
      });
      return options.resType === 'string' ? res.text() : res.json();
   }
}