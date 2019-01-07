# dotnet-seed

## 功能介绍

基于.net core 的多租户云平台框架(企业即租户，服务即租户)  
通过 EFCore 设计时类库，实现数据结构根据租户进行自动迁移功能，支持 Mysql 和 Sqlserver  
集成 angularjs、bootstrap、jquery 等前端库，实现分模块开发单页应用，视图和脚本根据模块访问按需加载  
所有前端及静态内容改为嵌入式资源方式加载  
targets 目录下某个地方有\*.project.json 文件是系统初始化定义，安装时选择后可建立不同功能的系统  
现在业务定制器模块支持根据配置自动建表了  
targets 目录下某个地方有\*.project.json 文件是系统初始化定义，安装时选择后可建立不同功能的系统  
现在支持加载 dll 从后加载的程序集中读出模块的定义，把 dll 放到 extensions 目录下。没有就建一个  

## 单页应用打包规则

options.json - 前端打包呈现配置
options.dist.json - 生产环境下才会引用的前端配置

```json
{
  // requirejs及打包相关配置
  "configs": {
    "名称": {
      "path": "", // 界面引用脚本的路径，不设置路径则引用的js会一起打包
      "shim": {
        "pack": true // 打包时是否将shim的设置引用到打包规则中，要是不判断全都引用构建起来会非常慢
      },
      "noDebug": true // 生产环境下，界面加载时不会在脚本路径加入.min
    }
  },
  // 如果是ie8则引用
  "patchs": [],
  // 强制包含的非模块项
  "include": ["tv4", "objectpath"],
  // 访问界面时默认引用的require模块
  "requires": [
    "app/application",
    "rcss!SeedModules.AngularUI/css/fontawesome-all.min.css",
    "rcss!SeedModules.AngularUI/css/ng-ui.css",
    "SeedModules.AngularUI/modules/module"
  ],
  // 应用名称
  "application": "app.application"
}
```

## 示例

示例 1：[仿某个云平台](http://www.fyl080801.top/referyun/index.html 'Title') - 纯界面无后台，刷新清数据  
示例 2：[可组态监控系统 acc](http://www.fyl080801.top/acc/index.html 'Title') - 开发中  
示例 3：[项目管理系统](http://www.fyl080801.top/mind) - 没做完，用户名 admin 密码就是那个最常用的
