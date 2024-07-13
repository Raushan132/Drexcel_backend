const { Mongoose, default: mongoose } = require('mongoose');
const Batch = require('../models/batchModel');
const {countStudentByBatch,getUser, getUserByEmail} = require(`../services/userService`);

exports.saveBatch = async (req, res)=>{
    const batchName = req.body?.batchName;
    const userId = req.id;
   
    try{
        const batchExists = await Batch.findOne({batchName,userId});
        if(batchExists) return res.status(409).json({message:'Batch already exists'});
        const user = await getUser(userId);
        const batchList = await Batch.find({userId});
        if(batchList.length>= user.userPermission.noOfBatches){
            return res.status(429).json({message:'Exceed the Limit of Batches'})
        }

        const batch = new Batch({batchName:batchName,admin:'Skill excel.In',userName:user?.name,userId});
        const newBatch = await batch.save();
        res.status(201).json(newBatch);

    }catch(err){
        res.status(400).json({ message: err.message });
    }
}

exports.getBatches = async (req, res)=>{

     try{
        const userId = req.id;
        const batchList = await Batch.find({userId});
        let batches =[];
        for (let i=0;i<batchList.length;i++) {
            let val = await countStudentByBatch(batchList[i].batchName,batchList[i].userId);
             batches.push({
                batchName: batchList[i].batchName,
                admin:batchList[i].admin,
                userName: batchList[i].userName,
                noOfStudent: val,
                sino:i+1
             })
        }
                        
        res.status(200).json(batches);
     }catch(err){
        res.status(500).json({ message: err.message });
     }
}

exports.getBatchById = async(batchName)=>{
    try{
        const batch = await Batch.findOne({batchName});
        res.status(200).json(batch);

    }catch(err){
        res.status(500).json({ message: err.message });
    }

}

exports.getBatchesByAdmin = async(req,res)=>{
    try{
      
        const batchList = await Batch.find();
        let batches =[];
        for (let i=0;i<batchList.length;i++) {
            let val = await countStudentByBatch(batchList[i].batchName,batchList[i].userId);
            const user = await getUser(batchList[i].userId);
             batches.push({
                batchName: batchList[i].batchName,
                admin:batchList[i].admin,
                userName: batchList[i].userName,
                noOfStudent: val,
                sino:i+1,
                email:user.email
             })
        }
                        
        res.status(200).json(batches);
     }catch(err){
        res.status(500).json({ message: err.message });
     }
}
exports.getBatchesEmailByAdmin = async(req,res)=>{
    try{

        const email = req.params.email;
        const user = await getUserByEmail(email);
        
        const batchList = await Batch.find({userId:user._id});
        
        let batches =[];
        for (let i=0;i<batchList.length;i++) {
            let val = await countStudentByBatch(batchList[i].batchName,batchList[i].userId);
            const user = await getUser(batchList[i].userId);
             batches.push({
                batchName: batchList[i].batchName,
                admin:batchList[i].admin,
                userName: batchList[i].userName,
                noOfStudent: val,
                sino:i+1,
                email:user.email
             })
        }
                        
        res.status(200).json(batches);
     }catch(err){
        res.status(500).json({ message: err.message });
     }
}