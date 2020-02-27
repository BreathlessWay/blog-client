# 使用node的镜像
FROM node:10.16.3-alpine
# 在镜像中创建目录
# -p表示递归创建
RUN mkdir -p blog-client
# 进入工作目录，类似cd blog-client
WORKDIR /blog-client
# 将package.json npmrc拷贝到镜像中
COPY package.json /blog-client/package.json
COPY .npmrc /blog-client/.npmrc
# 安装npm依赖
RUN npm i
# 将运行文件拷贝到镜像
# .dockerignore声明的文件不会被拷贝
COPY . /blog-client
# 对外暴露端口
EXPOSE 4000
# 启动时运行的命令
CMD npm run deploy

