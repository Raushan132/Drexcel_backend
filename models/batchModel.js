const mongoose = require('mongoose');

const BatchSchema = new mongoose.Schema({
    batchName:{
        type: String,
        required: true,
    },
    admin:{
        type:String
        
    },
    userName:{
        type:String,
        default:'auckland922'
       
    },
    userId:{
        type:String
    }
});

module.exports = mongoose.model('Batchs',BatchSchema);