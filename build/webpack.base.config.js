const path = require('path');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PATHS = {
    src:path.join(__dirname, '../src'),
    dist:path.join(__dirname, '../dist'),
    assets:'assets/'

}
module.exports ={
    externals:{
        path:PATHS
    },
    entry:{
        app:PATHS.src
    },
    output:{
        filename:`${PATHS.assets}js/[name].js`,
        path: PATHS.dist,
        publicPath: "/"
    },
    module:{
        rules:[
        {
            test:/\.(img|jpg|gif|svg)$/,
            loader:"file-loader",
            options:{
                name:'[name].[ext]'
            }
        },
        {
            test:/\.js$/,
            loader:"babel-loader",
            exclude:"/node_modules/"
        },
        {
            test: /\.scss$/,
            use: [
                "style-loader",
                MiniCssExtractPlugin.loader,
               
             {
                loader: "css-loader",
                options: {sourceMap:true}
            },
            {
                loader: "postcss-loader",
                options: {sourceMap:true, config:{path: `${PATHS.src}/js/postcss.config.js`}}
            },
            {
                loader: "sass-loader",
                options: {sourceMap:true}
            }]
        },
        {   
            test: /\.css$/,
            use: [
                'style-loader',
                MiniCssExtractPlugin.loader,
                {
                  loader: 'css-loader',
                  options: { sourceMap: true }
                }, {
                  loader: 'postcss-loader',
                  options: { sourceMap: true, config: { path: `${PATHS.src}/js/postcss.config.js` } }
                }
              ]
            }]
           
       
    },
    plugins: [
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename:`${PATHS.assets}css/[name].css`,
          //chunkFilename: "[id].css"
        }),
        new CopyWebpackPlugin([
            {
                from: `${PATHS.src}/img`,  to:`${PATHS.assets}img`
            },
            {
                from: `${PATHS.src}/static`,  to: ''
            }
        ]),
        new HtmlWebpackPlugin({
            hash:false,
            template : `${PATHS.src}/index.html`,
            filename:'./index.html'
        })
      ],
    
}