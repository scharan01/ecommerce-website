const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema(
    {
        id: {type:String, unique:true,required:true},
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
            },
        ],
        quantity : {type:Number},
        total : {type:Number}
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Cart",CartSchema);