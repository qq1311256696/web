const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const resolve = dir => {
    return path.join(__dirname, dir)
}

module.exports = {
    publicPath: './',
    lintOnSave: process.env.NODE_ENV !== 'production',
    productionSourceMap: false,
    filenameHashing: false,
    configureWebpack: {
	    plugins: [
	    		new CopyWebpackPlugin([
	            {
	                from: 'static',
	                to: 'static'
	            }
	        ])
	    ]
	},
	css: {
	    // 是否开启支持 foo.module.css 样式
	    modules: false,
	    // 是否使用 css 分离插件 ExtractTextPlugin，采用独立样式文件载入，不采用 <style> 方式内联至 html 文件中
	    extract: false,
	    // 是否构建样式地图，false 将提高构建速度
	    sourceMap: false,
	    // css预设器配置项
	    loaderOptions: {
		    css: {
		       // options here will be passed to css-loader
		    },
		    postcss: {
		       // options here will be passed to postcss-loader
		    }
	    }
	},
	devServer: {
        port: 1024,
        host: 'localhost',
        https: false,
        open: true
    }
}
