const mongoose = require('mongoose')
const md5 = require('js-md5')

const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        unique:true
    },
    password:{
        type:String,
        // 设置bcrypt加密
        set(Val) {
            return require('bcrypt').hashSync(Val,10)
          }
    }
})

const User = mongoose.model('User',UserSchema)

module.exports = {User}