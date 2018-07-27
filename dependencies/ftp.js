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

module.exports = (config = {}, cb) => {
    let uploadList = [];
    let uploadDirectory = path.resolve(process.cwd(), config.localDir);
    let push = () => {
        if (uploadList.length) {
            console.log(chalk.green('------ ' + chalk.red(uploadList.length) + ' files need to upload  ----'));
            uploadList.forEach((item, idx, arr) => {
                mkdir(path.dirname(item.remotePath), ()=> {
                    ftp.put(item.path, item.remotePath, (err)=> {
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

    let upload = () => {
        let files = [];
        utils.getFiles(uploadDirectory, (_path) => {
            !config.exclude.test(_path) && files.push(slash(_path));
        });

        files.forEach((_path, idx) => {
            let remotePath = _path.replace(slash(uploadDirectory) + '/', '');
            ftp.list(remotePath, (err, file)=> {
                err && uploadList.push({
                    path: _path,
                    remotePath: remotePath
                });
                idx >= files.length - 1 && push();
            });
        });
    };

    let end = (idx, len) => {
        if (idx >= len - 1) {
            console.log(chalk.green('------ upload:done -----------------'));
            ftp.end();
            typeof cb === 'function' && cb(null);
        }
    };

    let mkdir = (_path, callback) => {
        ftp.mkdir(_path, true, callback);
    };

    let ready = () => {
        console.log(chalk.yellow('------ upload:ready ----------------'));
        ftp.cwd(config.remoteDir, (err) => {
            err ? mkdir(config.remoteDir, () => {
                ftp.cwd(config.remoteDir, (err) => {
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