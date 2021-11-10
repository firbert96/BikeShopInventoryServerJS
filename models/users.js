var mongoose = require('mongoose');
const Schema = mongoose.Schema;

var validateEmail = function(email) {
    var re = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/;
    return re.test(email)
};

const usersSchema= new Schema({
    uuid:{
        type:"string",
        required:true
    },
    fullname:{
        type:"string",
        required:true
    },
    email:{
        type:"string",
        required:'Email address is required',
        unique:true,
        lowercase:true,
        trim:true,
        validate:[validateEmail,'Invalid format email']
    },
    phone:{
        type:"number",
    },
    password:{
        type:"string",
        required:true
    },
},
    {
        timestamps: true
    }
)

const Users = mongoose.model("users",usersSchema);
module.exports=Users;