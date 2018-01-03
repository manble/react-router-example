
#### Usage：
```
1. git clone https://github.com/manble/react-router-example.git
2. cd react-router-example
3. npm install
4. npm run dev
5. http://localhost:8000
```
#### Summary：

This is a simple example of react-router-dom and code splitting. It is a front-end project with webpack-dev-server, react, react-router and scss. In this project you can develop the web page quickly, and you need to know two configuration files that webpack.config.js and app.config.js which you can develop web page according to your requirement.
Use `npm run build` command, you can build front-end files that contains chunkhash. If you want to upload static resources to the CDN, please use `npm run release`, but you need to set the ftp configuration in app.config.js.

这是一个简单的react-router-dom，code splitting学习示例，是一个基于webpack-dev-server，react，react-router，scss为基础的前端工程，在此工程上可以快速的进行web页面开发，但是需要了解一下两个配置文件webpack.config.js和app.config.js以便于按照你的意愿来使用。
`npm run build`可以构建最终包含chunkhash的前端文件, 如果你想把静态资源上传到CDN，请使用npm`run release`，但是你需要在app.config.js里配置ftp的相关信息。

#### Directory Structure：
```
/bin
/dependencies
/src
   /images
   /scripts
   /scss
   index.html
/dist 
tpl.html
```