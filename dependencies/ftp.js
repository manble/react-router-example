/**
* @description：
* @author: manble@live.com
* @created: 2017-12-10
*/

'use strict';

'use strict';
const path = require('path');
const fs = require('fs');
const Ftp = require('ftp');
const ftp = new Ftp();
const slash = require('slash');
const chalk = require('chalk');
const utils = require('./utils');

module.exports = function(config = {}, cb) {
   let uploadList = [];
   let uploadDirectory = path.resolve(process.cwd(), config.localDir);
   let push = function() {
      if (uploadList.length) {
         console.log(chalk.green('------ ' + chalk.red(uploadList.length) + ' files need to upload  ----'));
         uploadList.map(function(item, idx, arr) {
            mkdir(path.dirname(item.remotePath), function() {
               ftp.put(item.path, item.remotePath, function(err) {
                  err && cb(err);
                  console.log(chalk.green('------ uploaded: ' + item.remotePath));
                  end(idx, arr.length);
               });
            });
         });
      } else {
         console.log(chalk.green('------ no file need to upload ------'));
         end(0, 0);
      };
   };

   let upload = function() {
      let files = [];
      utils.getFiles(uploadDirectory, function(_path) {
         !config.exclude.test(_path) && files.push(slash(_path));
      });

      files.forEach(function(_path, idx) {
         let remotePath = _path.replace(slash(uploadDirectory) + '/', '');
         ftp.list(remotePath, function(err, file) {
            err && uploadList.push({
               path: _path,
               remotePath: remotePath
            });
            idx >= files.length - 1 && push();
         });
      });
   };

   let end = function(idx, len) {
      if (idx >= len - 1) {
         console.log(chalk.green('------ upload:done -----------------'));
         ftp.end();
         typeof cb == 'function' && cb(null);
      }
   };

   let mkdir = function(_path, callback) {
      ftp.mkdir(_path, true, callback);
   };

   let ready = function() {
      console.log(chalk.yellow('------ upload:ready ----------------'));
      ftp.cwd(config.remoteDir, function(err) {
         err ? mkdir(config.remoteDir, function() {
            ftp.cwd(config.remoteDir, function(err) {
               upload();
            });
         }) : upload();
      });
   };

   ftp.on('ready', ready);
   ftp.connect(Object.assign({
      pasvTimeout: 20000,
      keepalive: 20000,
      secure: true,
      secureOptions: {
         key: undefined,
         cert: undefined,
         requestCert: true,
         rejectUnauthorized: false
      }
   }, config.connect));
};