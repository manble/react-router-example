/**
* @description：
* @author: manble@live.com
* @created: 2017-12-10
*/

'use strict';

module.exports = {
   cdn: 'http://127.0.0.1:7777/assets/',
   ftp: {
      connect: {
         secure: false,
         host: '127.0.0.1',
         port: 21,
         user: 'manble',
         password: '123456'
      },
      exclude: /\.(map|html)$/,
      localDir: './dist/',
      remoteDir: '/assets/'
   },
   development: {
      apiAddress: '//api-test.example.com',
      mode: 0
   },
   preview: {
      apiAddress: '//api-preview.example.com',
      mode: 1
   },
   production: {
      apiAddress: '//api.example.com',
      mode: 2
   }
};