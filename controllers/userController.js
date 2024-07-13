const User = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.getUsers = async (req, res) => {
    try {
        let users = await User.find();
        users = users.filter(user => user.role !== 'admin').map((user, index) => {
            return {
                sino: index + 1,
                id: user._id,
                name: user.name,
                role: user.role,
                email: user.email,
                disable: user.disable,
                userPermissions: user.userPermission
            }
        })
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.createUser = async (req, res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
    });

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


exports.changePassword = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email, password);

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const result = await User.findOneAndUpdate({ email }, { password: hashedPassword });
        console.log(result);

        if (result.modifiedCount === 0) {
            return res.status(400).json({ message: 'Password update failed' });
        }

        res.status(201).json({ message: 'Password updated successfully' });
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: err.message });
    }
};

exports.disableUser = async (req, res) => {
    const { email } = req.body
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }
        const result = await User.findOneAndUpdate({ email }, { disable:!user.disable });
        console.log(result);
        res.status(201).json({message:`User ${user.disable?'inactive':'active'}`})

    } catch (err) {
        res.status(400).json({ message: err.message });
    }
}

exports.changePermessions = async (req,res)=>{
     const {noOfStudents,noOfBatches,canDelete,email} = req.body;
     const userPermission ={noOfStudents,noOfBatches,canDelete};
     console.log(userPermission)
     try{

         const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'User not found' });
        }

        const result = await User.findOneAndUpdate({ email }, { userPermission });
        console.log(result);
        res.status(201).json({message:`User permession updated`})


     }catch(err){
        console.log(err);
        res.status(400).json({ message: err.message });
     }
}