/**
 * @description：
 * @author: manble@live.com
 * @created: 2017-12-23
 */

'use strict';

import request from 'utils/request';

module.exports = {
   /**
    * example
    * @param {string} type 数据类型
    * @param {string} example 请求参数
    * @return {promise} promise
    */
   example: (type = 1) => request.get('/api/example', {
      data: {
         type
      }
   })
};