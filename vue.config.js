module.exports = {
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-pxtorem')({ // 把px单位换算成rem单位
                        rootValue: 75, // 换算的基数(设计图750的根字体为32)
                        selectorBlackList: ['mint-'], // 忽略转换正则匹配项
                        propList: ['*']
                    })
                ]
            }
        }
    },
    lintOnSave: false,
    publicPath: "./",
}