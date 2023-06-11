const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
    {
        userid : {type:String,required:true},
        email : {type:String},
        phone : {type:String},
        products : [
            {
                title: {type:String,default:""},
                description: {type:String,default:""},
                img: {type:String,default:""},
                categories: {type:Array,default:[]},
                size: {type:Array,default:[]},
                color: {type:Array,default:[]},
                price: {type:Number,default:0},
                instock : {type:Boolean,default:true},
                amount : {type:Number,default:0},

            }
        ],
        total : {type:Number,required:true},
        address : {type:Object,required:true},
        status : {type:String,default:"pending"}
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Order",OrderSchema);