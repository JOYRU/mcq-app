import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
     name:{type:String,required:true},
     //mobile_number:{type:String, required:true},
     email: { type: String, required: true, unique: true },
     role: { type: String, enum: ['teacher', 'student','admin'], required: true },
     password:{type:String,required:true}
})

const User = mongoose.model('User', userSchema);
export default User