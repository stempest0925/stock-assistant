### 数据库账号密码

- 开发环境下，mongodb容器和代码会读取.env.development的配置
- 生产环境下，通过CI/CD Docker引擎注入到env, 覆盖.env.production的配置

悬浮板块/股票 侧滑出股票popup

悬浮 板块card，展开其下面股票和板块

### Web方面

取消使用 lightweight-charts：因为功能太少，自定义配置需要自己实现。
取消使用 highcharts-vue：因为该组件刚升级到2.0版本，文档太少还是选项式，与Vue 3的配合目前还不是很好，问题很多，Cursor都修复不好。
