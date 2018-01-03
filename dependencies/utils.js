/**
* @description：
* @author: manble@live.com
* @created: 2017-12-10
*/

'use strict';

const fs = require('fs');
const path = require('path');
const slash = require('slash');

const getFiles = (dir, cb) => {
   let isDir = (dir) => (fs.statSync(dir).isDirectory());
   dir = slash(dir);
   if (isDir(dir)) {
      let files = fs.readdirSync(dir);
      files.forEach((src) => {
         src = path.join(dir, src);
         isDir(src) ? getFiles(src, cb) : cb(src);
      });
   } else {
      cb(dir);
   }
};

module.exports = {
   getFiles
};