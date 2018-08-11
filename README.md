# dotnet-seed

基于.net core 的多租户云平台框架(企业即租户，服务即租户)

通过 EFCore 设计时类库，实现数据结构根据租户进行自动迁移功能，支持 Mysql 和 Sqlserver

集成 angularjs、bootstrap、jquery 等前端库，实现分模块开发单页应用，视图和脚本根据模块访问按需加载

所有前端改为嵌入式资源

targets 目录下某个地方有\*.project.json 文件是系统初始化定义，安装时选择后可建立不同功能的系统

现在业务定制器模块支持根据配置自动建表了
