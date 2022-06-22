module.exports = app => {
    const mongoose = require('mongoose')
    mongoose.connect('mongodb://localhost:27017/bigscreen', {
        useNewUrlParser: true,
        // useUnifiedTopology: true,
        // useFindAndModify: false
    }).then(() => {
        console.log('数据库连接成功')
    }).catch(err => {
        console.log('数据库连接失败')
    })
    require('require-all')(__dirname + '/../models')
}