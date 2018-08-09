# dotnet-seed

基于.net core的多租户云平台框架(企业即租户，服务即租户)

通过EFCore设计时类库，实现数据结构根据租户进行自动迁移功能，支持Mysql和Sqlserver

集成angularjs、bootstrap、jquery等前端库，实现分模块开发单页应用，视图和脚本根据模块访问按需加载

所有前端及静态内容改为嵌入式资源方式加载

targets目录下某个地方有*.project.json文件是系统初始化定义，安装时选择后可建立不同功能的系统

现在支持加载dll从后加载的程序集中读出模块的定义，把dll放到extensions下。没有就建一个

---
示例1：[仿某个云平台](http://www.fyl080801.top/referyun/index.html "Title") - 纯界面无后台，刷新清数据<br>
示例2：[可组态监控系统acc](http://www.fyl080801.top/acc/index.html "Title") - 开发中<br>
示例3：[项目管理系统](http://www.fyl080801.top/mind) - 没做完，用户名admin密码就是那个最常用的
