### 数据库账号密码

- 开发环境下，mongodb容器和代码会读取.env.development的配置
- 生产环境下，通过CI/CD Docker引擎注入到env, 覆盖.env.production的配置

### Web 方面

取消使用 lightweight-charts：因为功能太少，自定义配置需要自己实现。
取消使用 highcharts-vue：因为该组件刚升级到2.0版本，文档太少还是选项式，与Vue 3的配合目前还不是很好，问题很多，Cursor都修复不好。

### Vue 方面

Vue 回归练手阶段，AUC用KeepAlive缓存，板块数据用pinia管理，图表数据因量大且需要即时更新，因此不进行缓存。
除了全局和内部组件管理数据，要试一下Props、Emit、Provide、Inject等数据传递方法，确保每个文档中的知识点运用到。

### Webpack
ts-node是为了加载webpack.config.ts，webpack编译node_modules出错可能与pnpm有关。