const express = require('express');
const router = express.Router();

const {
    createUser,
    loginUser,
    updateUser,
} =require('../controllers/usersController.js');

// const authenticate=require('../middlewares/authentication.js'); 

//User router
router.post('/users',createUser);
router.post('/users/login',loginUser);
router.put('/users',updateUser);

module.exports=router;