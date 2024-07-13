const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


const PermissionsSchema = new mongoose.Schema({
    noOfStudents:{
        type: Number,
        default: 30
    },
    noOfBatches:{
        type: Number,
        default: 10,
    },
    canDelete:{
        type: Boolean,
        default: true,
    }
});
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    role:{
        type:String,
        default:'user'
    },
    userPermission: {
        type:PermissionsSchema,
        default:{}
    },
    
    disable:{
        type: Boolean,
        default:false
    }

});

UserSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        return next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
};



// Middleware to set default permissions if not provided
UserSchema.pre('save', function (next) {
    if (!this.userPermission) {
        this.userPermission = {
            noOfStudents: 30,
            noOfBatches: 10,
            canDelete: true
        };
    }
    next();
});


module.exports = mongoose.model('User', UserSchema);