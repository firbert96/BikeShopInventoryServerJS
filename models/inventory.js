var mongoose = require('mongoose');
const Schema = mongoose.Schema;

const inventorySchema= new Schema({
    uuid:{
        type:"string",
        required:true
    },
    user_id:{
        type:Schema.Types.ObjectId,
        ref:'users'
    },
    product_name:{
        type:"string",
        required:true
    },
    product	:{
        type:"Boolean",
        required:true
    },
    quantity:{
        type:"number"
    },
},
    {
        timestamps: true
    }
)

const Inventory = mongoose.model("inventory",inventorySchema);
module.exports=Inventory;