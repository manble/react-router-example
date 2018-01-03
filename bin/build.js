#!/usr/bin/env node

/**
* @description：
* @author: manble@live.com
* @created: 2017-12-10
*/

'use strict';
process.env.NODE_ENV = 'production';

const webpack = require('webpack');
const webpackConf = require('../webpack.config');
const appConf = require('../app.config');
const ftp = require('../dependencies/ftp');
const argv = require('minimist')(process.argv.slice(2));
const rm = require('rimraf');
const chalk = require('chalk');
const ora = require('ora');

argv.cdn && (webpackConf.output.publicPath = appConf.cdn);

console.log(chalk.yellow('------ del dist --------------------'));
rm(webpackConf.output.path, (err) => {
   if (err) {
      console.error(chalk.red(err));
      process.exit(1);
   }
   console.log(chalk.green('------ del successully -------------'));
   console.log(chalk.yellow('------ building --------------------'));
   const spinner = ora();
   spinner.start();
   webpack(webpackConf).run((err, stats) => {
      let jsonStats = stats.toJson();
      if (err || jsonStats.errors.length) {
         console.error(err||jsonStats.errors);
         process.exit(1);
      }
      jsonStats.warnings.length > 0 && console.warn(chalk.orange(jsonStats.warnings));
      spinner.stop();
      console.log(stats.toString({
         colors: true,
         modules: false,
         children: false,
         chunks: false,
         chunModules: false
      }));
      console.log(chalk.green('------ build successfully ----------'));
      argv.cdn && ftp(appConf.ftp, (err) => {
         if (err) {
            console.error(chalk.red(err));
            process.exit(1);
         }
         console.log(chalk.green('------ all successfully ------------'));
         process.exit(0);
      });
   });
});