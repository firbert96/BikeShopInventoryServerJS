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
    inventory_id:{
        type:Schema.Types.ObjectId,
        ref:'inventory'
    },
    quantity:{
        type:"number",
        required:true
    },
    changer_name:{
        type:"string",
        required:true
    },
    changer:{
        type:"Boolean",
        required:true
    },
    timestamps: true
},
    {
        timestamps: true
    }
)

const Inventory = mongoose.model("inventory_flows",inventorySchema);
module.exports=Inventory;