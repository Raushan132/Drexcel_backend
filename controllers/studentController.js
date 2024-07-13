const { default: mongoose, Mongoose } = require('mongoose');
const StudentModule = require('../models/studentModel');
const userService = require('../services/userService')

exports.createStudent = async (req, res) => {
    
    const {studentData, fingerprintData } = req.body;
    const { studentName, batchName, address, mobile} = studentData
    console.log(studentName,' ',batchName,' ',address,' ',mobile);

    const userId = req.id;
    
    try{
            const count = (await StudentModule.find({batchName: batchName,userId})).length;
            const user = await userService.getUser(userId);
            if(count>=user.userPermission.noOfStudents) {
                res.status(429).json({message:'Batch is Full, Try another batch'});
                return;
            }
           
    }catch(err){
            res.status(500).json({ message: err.message });
            return;
    }
   
    const fingerprints =fingerprintData.map(fingerprints=>fingerprints.data);
    
    try {
        const newStudent = new StudentModule({
            studentName,
            batchName,
            address,
            mobile,
            userId,
            fingerprints,
        });

        const savedStudent = await newStudent.save();
        res.status(201).json(savedStudent);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

    
};

exports.getStudents = async (req,res)=>{
    
   try{
    const userId = req.id;
     const students= await StudentModule.find({userId:userId});
     res.status(200).json(students);

   }catch(err){
    res.status(500).json({ message: err.message });
   }
}
exports.getStudentsByQuery = async (req, res) => {
    try {
      const userId = req.id;
      const q = req.query.q; // Assuming the query parameter is 'q' for the student name
      
      const students = await StudentModule.find({
        userId: userId,
        studentName: { $regex: '.*' + q + '.*', $options: 'i' } // Case-insensitive regex search for 'q'
      });
  
      res.status(200).json(students);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

exports.getStudentById = async(req,res)=>{
    try{
        const userId = req.id;
        const id =req.params;
        const studentId = new mongoose.Types.ObjectId(id);
         const students= await StudentModule.findOne({_id:studentId,userId:userId});
         const data ={
            studentName: students.studentName,
            mobile:students.mobile,
            address: students.address,
            batchName: students.batchName,
            id: students._id
         }
         res.status(200).json(data);
    
       }catch(err){
        res.status(500).json({ message: err.message });
       }
}

exports.getStudentsByBatchName = async (req, res) => {
    const { batchName } = req.params;
    const userId = req.id;
    console.log('here',userId,batchName)
    try {
        const students = await StudentModule.find({ batchName: batchName,userId });
        
        res.json(students);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.deleteStudents = async (req, res)=>{
     const id = new mongoose.Types.ObjectId(req.params.id);
     const userId = req.id
     try{

        const user = await userService.getUser(userId);
        if(!user.userPermission.canDelete && user.role!=='admin' ){
           return res.status(401).json({message:'Unauthorized access'})
        }

        const student= await StudentModule.deleteOne({_id:id});

        res.status(204).json({message: 'student deleted'})
     }catch(err){
        console.log(err)
     }
}

exports.editStudent = async (req, res)=>{
    const id = new mongoose.Types.ObjectId(req.params.id);
    const userId=  req.id;
    const {studentData } = req.body;
    const { studentName, batchName, address, mobile} = studentData
    try{

       const student = await StudentModule.findById(id);
       if(student.batchName!==batchName){
        const count = (await StudentModule.find({batchName: batchName,userId})).length;
        console.log(count)
        if(count>=30) {            
           return res.status(429).json({message:'Batch is Full, Try another batch'});
            
        }
       }
       const updated= await StudentModule.updateOne({_id:student._id,userId},{studentName,batchName,address,mobile})
       res.status(204).json({massage:`${student.studentName} is ${student.disable?'Disable':'enable'}`})
    }catch(err){
        console.log('student disable error:',err);
    }
}