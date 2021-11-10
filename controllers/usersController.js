const Users = require('../models/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {success, error}=require('../helpers/response');
const { v4: uuidv4 } = require('uuid');

function createUser (req,res){
    const {fullname,email,phone,password} = req.body;
    let salt = bcrypt.genSaltSync(10);
    let passwordDigest = bcrypt.hashSync(password,salt);
    let uuid = uuidv4();
    let users = new Users({
        uuid,
        fullname,
        email,
        phone,
        password:passwordDigest
    })
    users.save()
    .then(responses=>{
        return success(res,responses,201);
    })
    .catch(errors=>{
        return error(res,errors,422);
    })
}

async function loginUser (req,res){
    const {email,password}=req.body;
    let login = await Users.findOne({email});

    // validator email
    if(!login){
        return error(res,'Email not found',404);
    }
    
    let result = bcrypt.compareSync(password,login.password);
    
    if(result){
        var token = jwt.sign({ _id: login._id }, process.env.SECRET_KEY);
        return success(res,token,200);
    }
    else{
        return error(res,'Password isn\'t match',406);
    }
}

function updateUser (req,res){
    let uuid = req.query.uuid;
    Users.updateOne({uuid},req.body)
    .then(()=>{
        return success(res,`Successfully update data with uuid: ${uuid}`,200);
    })
    .catch(err=>{
        return error(res,err,404);
    })
}


module.exports={
    createUser,
    loginUser,
    updateUser,
}