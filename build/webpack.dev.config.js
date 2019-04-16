const webpack           = require('webpack')
const merge             = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.config')

const devWebpackConfig  = merge(baseWebpackConfig, {
    
    mode:'development',
    devtool:'cheap-eval-source-map',
    
    devServer:{
        // contentBase: baseWebpackConfig.externals.paths.dist, 
        overlay:{
            port:8081,
            warnings:true,
            errors:true
        }
    },
    plugins:[
        new webpack.SourceMapDevToolPlugin({
            filename:'[file].map'
        })
    ],
})

module.exports = new Promise((resolve, reject)=>{
    resolve(devWebpackConfig)
})