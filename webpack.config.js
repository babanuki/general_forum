const path = require("path")
const MiniCssExtractPlugin  = require("mini-css-extract-plugin")

module.exports = {
    mode: "development",
    entry: [
        '@babel/polyfill',
        "./web/app.js"
    ],
    output: {
        filename: "project0.js",
        path: path.resolve(__dirname, "static"),
        publicPath: "/static/"
    },
//	resolve:{
//		extensions:['js','jsx']
//	},
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: [{
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                        plugins: [
                            ['@babel/plugin-proposal-decorators', {legacy: true}],
                            ['@babel/plugin-proposal-class-properties', {loose: true}]
                        ]
                    }
                }]
            },
            {
                test: /\.(png|jpg|ico|svg|eot|woff|woff2|ttf)$/,
                use: ['file-loader']
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "project0.css",
            chunkFilename: "[id].css"
        })
    ],
	devServer:{
		contentBase:path.resolve("./build"),
		index:"index.html",
		port:8080,
		proxy:{
			'/create':{
target:'http://localhost:8080/',
					changeOrigin:true
			}
		}
	}
}
