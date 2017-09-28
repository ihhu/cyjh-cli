# cyjh-cli安裝

```
//安装cyjh-cli模块到全局
npm install cyjh-cli -g
//或者
npm install cyjh-cli -g --registry=https://registry.npm.taobao.org

//查看版本号
cyjh -V

//查看使用帮助
cyjh -h
cyjh-init -h
```

### 创建生成目录

在需要创建生成项目的文件夹下，打开`cmd`命令控制台，执行如下命令：
```
//创建项目目录并选择加载模版文件
cyjh init

//创建PC目录并加载pc端模版文件
cyjh init -P

//创建Mobile目录并加载Mobile端模版文件
cyjh init -M 

//同时创建PC和Mobile目录，并加载PC和Mobile端模版文件
cyjh init -P -M

```

### 添加自定义模版文件
- 创建 **模版文件夹**，如果存在*空文件*夹时,请在*空文件*下创建名为：`.empty`文件
- 将**模版文件夹**复制到`cyjh-cli`目录template文件夹下（注意：**PC**和**Mobile**文件夹请误删除或者改名）
- 在`cyjh-cli`目录下打开命令控制命执行`npm install -g`命令将自定义模版添加到全局
- 使用`cyjh init`即可选择加载 自定义的模版

---
**要求**：
- node.js 版本 大于 4.0
- npm 版本 大于 3.0
