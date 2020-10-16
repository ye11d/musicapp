# music
使用了咪咕音乐API:http://api.migu.jsososo.com/
所以音乐资源均由API爬取,服务器不存储任何音乐数据

# 开发环境
* Vue2

# 效果预览
[预览网站](http://175.24.16.52:3000/)

# 使用指南:
一.运行咪咕音乐API爬取音乐资源

[咪咕音乐API网站,按此网站首页说明安装]https://jsososo.github.io/MiguMusicApi/#/

[注]解决跨域问题: 在app.ts中的const app = express();之后加入此段代码

```
app.all("*", function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*")
  //允许的header类型
  res.header("Access-Control-Allow-Headers", "content-type")
  //跨域允许的请求方式
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS")
  if (req.method.toLowerCase() == 'options') {
    res.send(200);  //让options尝试请求快速结束
  } else {
    next()
  }
})
```

[注] 默认运行端口为3400

二.运行服务器文件
main分支下代码打包出前端文件, 放入back-end下的public文件中, 运行back-end的代码
1. 打开两个窗口, 第一个窗口下载back-end分支下的代码后
  > npm install
2. 另一个窗口下载main分支下的代码
  > npm install
  > npm build
  将打包出的dist内的文件复制到第一个窗口内的public文件夹内
3. 第一个窗口
  > npm start
[注] 默认挂载在8080端口


# 目前仍存在的问题
如项目要部署到服务器上, 需把代码中的127.0.0.1路径更改为服务器的公网IP,
不然服务器请求数据时有时会把127.0.0.1当公网IP而不是本机地址处理

