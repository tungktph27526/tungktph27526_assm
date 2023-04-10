const mongoose = require('mongoose');
const ProductSchema = new mongoose.Schema({
    tensp: {
        type: String,
        required: true
    },
    dongia:{
        type: Number
    },
    mausac:{
        type: String,
    },
    loaisp: {
        type: String
    },
    tenkh:{
        type: String
    }
})
const productmodel = new mongoose.model('shopping', ProductSchema);
module.exports =  productmodel;