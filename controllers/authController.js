const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
require('dotenv').config();


exports.registerUser = async (req, res)=>{
     const {name,email,password} = req.body;

     try{
        const userExists = await User.findOne({email});
        if(userExists) return res.status(409).json({message:'User already exists'});

        const user = new User({name, email,password});
        

        const newUser = await user.save();
       
        res.status(201).json({
             user:{
                id: newUser.id,
                name: newUser.name,
                email: newUser.email
            },
        });
     }catch(err){
        res.status(500).json({message: err.message});

     }
};

exports.loginUser = async (req, res)=>{
    const {email, password} = req.body;
    console.log(email,password)
    try{
        const user = await User.findOne({email});
        if(!user || !(await  user.matchPassword(password))){
            return res.status(401).json({message:'Invalid email or password'});
        }

        if(user.disable){
            return res.status(403).json({ message: 'User not authorized' });
        }

        const token = jwt.sign({id:user.id,role:user.role},process.env.JWT_SECRET, {
            expiresIn: '2h',
        });

        res.json({
            token,
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                permissions: user.userPermission
            },
        });

    }catch(err){
        res.status(500).json({message:err.message});
    }
}

