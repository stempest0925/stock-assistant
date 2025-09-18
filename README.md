### 数据库账号密码

- 开发环境下，mongodb容器和代码会读取.env.development的配置
- 生产环境下，通过CI/CD Docker引擎注入到env, 覆盖.env.production的配置
