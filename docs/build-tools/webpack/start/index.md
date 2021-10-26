# 搭建一个简单项目

*webpack版本：v4.23.1*

*node.js以及npm的安装不再整理*

## 第一步，初始化项目

```bash
	#在项目目录下打开命令行，执行如下命令
	npm init
	#接下来会输入项目的一些信息，英语翻译就好，或者所有都回车选默认
	#可以使用下面的命令，直接生成一个默认的项目
	npm init -y
```

执行完上述命令后，会生成一个`package.json`文件，内容如下

```json
	{
	  "name": "sinon",
	  "version": "1.0.0",
	  "description": "",
	  "main": "index.js",
	  "scripts": {
	    "test": "echo \"Error: no test specified\" && exit 1"
	  },
	  "author": "",
	  "license": "ISC"
	}

```

## 第二步，创建文件目录

sinon是根目录文件名

![dir](./images/dir.png)

## 第三步，安装

```bash
	npm install webpack webpack-cli -D
```

如此执行后，可以在`package.json`中已经添加了开发依赖（devDependencies），并且项目中多了`node_modules`目录。

因为我们安装了cli，所以此时已经可以进行打包操作：

```bash
	npx webpack

	# 或者在package中添加命令，这里加 '--config webpack.config.js'可以指定webpack的配置文件，默认是webpack.config.js
	
	#package.json
	"script":{
		"build": "webpack"
	}

	# 下面我们就可以使用npm run build 来构建项目了
	# webpack后面加 --watch，可以是webpack进入观察者模式，这样当我们修改文件内容的时候，不需要每次都执行npm run build，直接刷新浏览器即可。
```

执行完上面的命令后可以在文件夹中看到，多出了dist目录，里面后有一个`main.js`，也就是说该命令和将我们的脚本作为入口起点，然后输出为`main.js`。

## 第四步，添加配置文件

webpack现在支持无配置文件也可运行的情况，但是我们的需求各不相同，所以基本上我们都需要配置自己的webpack配置文件，根目录下创建`webpack.config.js`。

```javascript
	//webpack.config.js
	const path = require('path');

	module.exports = {
		entry:'./src/index.js',
		//这里是省略写法，等价于
		//entry: {
		//	main:'./src/index.js'
		//}
		output:{
			filename:'[name].bundle.js', // 根据入口名，生成不同的文件，这里示例的入口名是main被省略了，所以生成的是main.js而不是index.js
			path: path.resolve(__dirname,'dist')
		}
	}
```

## 第五步，安装插件

1. `html-webpack-plugin`，自动在dist目录生成`index.html`文件，而且会自动更新，不需要我们手动添加或修改`index.html`文件。

```javascript
	// npm install -D html-webpack-plugin
	
	// webpack.config.js
	const HtmlWebpackPlugin = require('html-webpack-plugin');

	plugins:[
		new HtmlWebpackPlugin({
			title:'hello world',
      template:'index.html' // 模板文件，将根据这个文件生成
		})
	]
```

按上面的设置完后，执行`npm run build`可以看到dist目录下多出了index.html文件，内容如下：

```html
	<!DOCTYPE html>
	<html>
	  <head>
	    <meta charset="UTF-8">
	    <title>hello world</title>
	  </head>
	  <body>
	  <script type="text/javascript" src="main.js"></script></body>
	</html>
```

可以看到生成的文件中自动引入了我们打包出去的`main.js`文件

2. `clean-webpack-plugin`插件清理dist目录

开发过程中不断的build，可能会导致dist目录多出一些多余的历史文件，使用`clean-webpack-plugin`插件会在我们每次执行构建的时候，删除dist目录，如此便免去了手动删除的麻烦。

```javascript
	// npm install -D clean-webpack-plugin
	 
	const CleanWebpackPlugin = require('clean-webpack-plugin');

	plugins: [
		new CleanWebpackPlugin(['dist'])
	]
```

完成上面配置后，执行`npm run build`可以看到dist目录先被干掉然后在重新根据配置生成。

3. `webpack-dev-server`搭建一个简单的web服务器

为了方便开发我们要搭建一个webpack服务器，该插件支持实时重新加载。

```javascript
	// npm install -D webpack-dev-server
	
	// webpack.config.json
	devServer: {
		contentBase: './dist', // 服务器目录
		open: true // 自动打开浏览器
	}

	// package.json
	"scripts": {
		"start": "webpack-dev-server"
	}
```

完成上面配置后，便可以通过命令`npm run start`来启动服务器

4. 开启模块热替换（HMR:Hot Module Replacement)

完成上面配置后，修改index.js文件刷新页面并不会更新，需要重新启动项目才可把更新同步过去，为了方便开发避免每次修改都重启项目，所以就有了模块热替换。现在`webpack-dev-server`封装了`webpack-dev-middle`和`webpack-dev-middleware`，所以我们不需要安装插件，可以直接开启HMR。

```javascript
	//webpack.config.js
	const webpack = require('webpack');

	devServer:{
		contentBase:'./dist',
		open:true,
		hot:true
	},
	plugins:[
		new webpack.NamedModulesPlugin(),
		new webpack.HotModuleReplacementPlugin()
	]
```

配置完成后我们执行`npm run start`，然后修改index.js文件的内容可以看到浏览器自动刷新。

## 结果

*目录结构*

![dir_hole](./images/all-dir.png)

*package.json*

```json
	{
		"name": "sinon",
		"version": "1.0.0",
		"description": "",
		"main": "index.js",
		"scripts": {
			"test": "echo \"Error: no test specified\" && exit 1",
			"build": "webpack",
			"start":"webpack-dev-server"
		},
		"author": "",
		"license": "ISC",
		"devDependencies": {
			"clean-webpack-plugin": "^0.1.19",
			"html-webpack-plugin": "^3.2.0",
			"webpack": "^4.23.1",
			"webpack-cli": "^3.1.2",
			"webpack-dev-server": "^3.1.10"
		}
	}
```

*webpack.config.js*

```javascript
	const path = require('path');
	const HtmlWebpackPlugin = require('html-webpack-plugin');
	const CleanWebpackPlugin = require('clean-webpack-plugin');
	const webpack = require('webpack');

	module.exports = {
		entry:'./src/index.js',
		output:{
			filename:'[name].js',
			path:path.resolve(__dirname,'dist')
		},
		plugins:[
			new HtmlWebpackPlugin({
				template:'./index.html'
			}),
			new CleanWebpackPlugin(['dist']),
			new webpack.NamedModulesPlugin(),
			new webpack.HotModuleReplacementPlugin()
		],
		devServer:{
			contentBase:'./dist',
			open:true,
			hot:true
		}
	}
```

> 参考文档：[https://www.webpackjs.com/guides/](https://www.webpackjs.com/guides/)