const mongoose = require('mongoose')

const DataSchema = new mongoose.Schema({
    projectName:{
        type:String,
        unique:true
    }
})
const Data = mongoose.model('Data',DataSchema)
module.exports = {Data}