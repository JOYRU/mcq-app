import mongoose from "mongoose";

const examSchema = new mongoose.Schema({
     title:{type:String,required:true},
     start_time:{type:String, required:true},
     time_duration:{type:String,required:true},
     questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
})

const Exam = mongoose.model('Exam', examSchema);
export default Exam
