import Question from "../models/Question.js";
import Exam from "../models/Exam.js";
import mongoose from "mongoose";

const addQuestion =async(req,res,next)=>{
    const { title, options, correctAnswer, exam_id, subject } = req.body;
    try {
      const newQuestion = new Question({
        title,
        options,
        correctAnswer,
        exam_id,
        subject,
      });
      await newQuestion.save();

      const exam = await Exam.findById(exam_id); // Assuming exam_id is the 

  
      exam.questions.push(newQuestion._id);
      
      // Save the updated exam document
      await exam.save();
      res.status(201).json(newQuestion);
    } catch (error) {
      console.error('Error saving question:', error);
      res.status(500).json({ message: 'Failed to save question' });
    }
   
}

const getQuestions =async(req,res,next)=>{
      
  const {id} = req.params ;  
  //console.log(id)
    try{
        const questions = await Question.find({exam_id:id})
       // console.log(questions);
        return res.status(200).json({
            success:true,
            questions
        })
       
    }catch(error){
       alert(error) 
       return res.status(500).json({success:false,error:"get questions sever error"})
    }
   
}

const getQuestionsDependOnSubject = async(req,res,next)=>{

  const subject = req.query ; 

  try{
    const questions = await Question.find(subject) ; 
   // console.log(questions);
    return res.status(200).json({
        success:true,
        questions
    })
   
}catch(error){
   alert(error) 
   return res.status(500).json({success:false,error:"get questions sever error"})
}
}


const getQuestionsSubject =async(req,res,next)=>{
      
 /// const {subject} = req.params ;  
  const { subject } = req.query;
  console.log(subject) ;
    try{
        const questions = await Question.find({subject:subject})
       // console.log(questions);
        return res.status(200).json({
            success:true,
            questions
        })
       
    }catch(error){
       alert(error) 
       return res.status(500).json({success:false,error:"get questions sever error"})
    }
   
}



const RandomlySetQuestions =async(req,res,next)=>{

  const { subject, quantity, examId } = req.query;

  // Validation
  if (!subject || !quantity || !examId) {
    return res.status(400).json({ message: 'Subject, quantity, and examId are required' });
  }

  try {
    // Fetch random questions based on subject and quantity
    const questions = await Question.aggregate([
      { $match: { subject: subject } },  // Match questions with the subject
      { $sample: { size: Number(quantity) } }  // Get random questions
    ]);

    if (questions.length === 0) {
      return res.status(404).json({ message: `No questions found for subject: ${subject}` });
    }

    // Update the exam with the fetched questions by examId
    const updatedExam = await Exam.findByIdAndUpdate(
      examId,
      { $push: { questions: { $each: questions } } },  // Add fetched questions to the exam document
      { new: true }  // Return updated exam
    );
    //console.log(updatedExam) ;
    res.json(updatedExam) ; 
    // res.json({success:true,message:'questions generated autometically'}); 
     // Send the updated exam with questions
  } catch (error) {
    console.error('Error fetching random questions and updating exam:', error);
    res.status(500).json({ message: 'Error fetching random questions and updating exam' });
  }
};


export {addQuestion,getQuestions,RandomlySetQuestions , getQuestionsSubject , getQuestionsDependOnSubject }