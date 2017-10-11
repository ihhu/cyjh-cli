### cyjh-cli介绍
`cyjh-cli`可以一键生成项目目录的脚手架工具

目前包含`PC`和`Mobile`两套项目目录模版可以选择生成

同时也可以自定义添加模版文件

### cyjh-cli安裝
```
//安装cyjh-cli模块到全局
npm install cyjh-cli -g

//使用淘宝镜向源安装
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
- 在需要添加模版的目录下：创建 **模版文件夹**及**模版文件**，如果存在*空文件*夹时,请在*空文件*下创建名为：`.empty`文件
- 执行`cyjh add`或`cyjh add <template-name>`可添加当前目录模版到全局
- 执行`cyjh remove`可删除模版
- 执行`cyjh init`可选择添加的模版生成项目目录

### 自动化编译`*.scss`文件

生成`PC`和`Mobile`项目的根目录存在`_FolderWatchConfig.jscompress`配置文件，该配置文件是**JSCompress软件**[(官网)](https://www.jscompress.cn/)配置生成的。

下载安装**JSCompress软件**打开后，将`_FolderWatchConfig.jscompress`配置文件拖入软件即可**自动化编译`*.scss`文件**。

编译后的`*.css`文件会存放在`Style/Css`目录下。

### 自动化合并压缩`*.png`文件并生成相应的css文件

生成`PC`和`Mobile`项目的`Style/Images`目录下存在`icon.png.jscompress`配置文件。将该配置文件拖入**JSCompress软件**[(官网)](https://www.jscompress.cn/)即可。

**JSCompress软件**会自动合并压缩`Delete/Icon`目录下的图片至`Style/Images`目录。并且会在`Style/Scss`目录下生成`_Icon.scss`文件。

---
**要求**：
- node >= 4.0
- npm >= 3.0
