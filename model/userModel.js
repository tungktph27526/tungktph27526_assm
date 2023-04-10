const mongoose = require('mongoose');
const UserSchema = new mongoose.Schema({
    ten:{
        type:String,
        require:true
    },
    matkhau:{
        type:String,
        require:true
    },
})
const usermodel = new mongoose.model('nguoidung',UserSchema);
module.exports = usermodel;