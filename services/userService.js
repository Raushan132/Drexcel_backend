const User = require('../models/userModel');
const Batch = require('../models/batchModel');
const StudentModule = require('../models/studentModel');

const countStudentByBatch = async(batchName,userId)=>{
    let noOfStudent =0;
    try{
        noOfStudent = (await StudentModule.find({batchName:batchName,userId:userId})).length;
        

    }catch(err){
        console.log(err);
    }

    return noOfStudent;

}

const totalBatchesAndStudents = async (userId)=>{
    let noOfBatches =0;
    let noOfStudents = 0;
    try{
         noOfBatches = (await Batch.find({userId})).length;
         noOfStudents = (await StudentModule.find({userId})).length;
        

    }catch(err){
        console.log(err);
    }

    return {noOfBatches,noOfStudents}
}

const totalBatchesAndStudentsByAdmin = async ()=>{
    let noOfBatches =0;
    let noOfStudents = 0;
    try{
         noOfBatches = (await Batch.find()).length;
         noOfStudents = (await StudentModule.find()).length;
        

    }catch(err){
        console.log(err);
    }

    return {noOfBatches,noOfStudents}
}

const getUser = async(userId)=>{
    let user =null;
      try{
          user = await User.findById(userId);
      }catch(err){
        console.log(err)
      }

      return user;
}

const getUserByEmail = async(email)=>{
    let user =null;
      try{
          user = await User.findOne({email});
      }catch(err){
        console.log(err)
      }

      return user;
}



module.exports = {
    countStudentByBatch,
    totalBatchesAndStudents,
    totalBatchesAndStudentsByAdmin,
    getUser,
    getUserByEmail
};