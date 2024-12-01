// routes/auth.js
import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // Adjust the path as needed
import dotenv from 'dotenv';
dotenv.config(); 
// import nodemailer from 'nodemailer';
// import dotenv from 'dotenv';
// import helmet from 'helmet';
// import cors from 'cors';
// import rateLimit from 'express-rate-limit';

const Register =async(req,res,next)=>{

    const { name, email, password,role } = req.body;
    console.log(name) ; 
  
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' });
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword,role});
        await user.save();
       // alert('User registered Successfully');
       console.log(user)
       
        res.status(201).json({ message: 'User registered Successfully' ,success:'true'

        });
   

};
const Login =async(req,res,next)=>{

    //const  JWT_SECRET_KEY= 'secretKeyMustHave Value' ; 
   // const [user, setUser] = useState(null);

        const { email, password } = req.body;
        const user = await User.findOne({ email });
        
       
    
        if (!user) return res.status(400).json({ message: 'User not found' });
    
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    
        const token = jwt.sign({ id: user._id,role:user.role}, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });
         
         return res.json({ token,message:'User lonin Successfully' });
       //   setUser({ token }); 

};
const forgetPassword =async(req,res,next)=>{

   

};

export {Register, Login , forgetPassword}
// dotenv.config();
// const router = express.Router();

// // Middleware
// router.use(helmet());
// router.use(cors());
// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000,
//     max: 100
// });
// router.use(limiter);

// // Register
// router.post('/register', async (req, res) => {
//     const { name, mobile_number, password } = req.body;

//     if (!name || !mobile_number || !password) {
//         return res.status(400).json({ message: 'All fields are required' });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ name, mobile_number, password: hashedPassword });
//     await user.save();
//     res.status(201).json({ message: 'User registered' });
// });

// // Login
// router.post('/login', async (req, res) => {
//     const { mobile_number, password } = req.body;
//     const user = await User.findOne({ mobile_number });

//     if (!user) return res.status(400).json({ message: 'User not found' });

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.json({ token });
// });

// // Forgot Password
// router.post('/forgot-password', async (req, res) => {
//     const { mobile_number } = req.body;
//     const user = await User.findOne({ mobile_number });

//     if (!user) return res.status(400).json({ message: 'User not found' });

//     const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '15m' });
//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//             user: process.env.EMAIL_USER,
//             pass: process.env.EMAIL_PASS
//         }
//     });

//     await transporter.sendMail({
//         to: mobile_number,
//         subject: 'Password Reset',
//         text: `Reset your password by clicking this link: ${process.env.BASE_URL}/reset-password/${resetToken}`
//     });

//     res.json({ message: 'Password reset link sent' });
// });

// // Reset Password
// router.post('/reset-password/:token', async (req, res) => {
//     const { password } = req.body;
//     const { token } = req.params;

//     try {
//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await User.findById(decoded.id);
//         const hashedPassword = await bcrypt.hash(password, 10);
//         user.password = hashedPassword;
//         await user.save();
//         res.json({ message: 'Password updated' });
//     } catch (error) {
//         res.status(400).json({ message: 'Invalid token' });
//     }
// });

// // Logout (client-side handles this by removing the token)
// router.post('/logout', (req, res) => {
//     res.json({ message: 'Logged out' });
// });

// export default router;

/*

// server.js
import express from 'express';
import mongoose from 'mongoose';
import https from 'https';
import fs from 'fs';
import authRoutes from './routes/auth'; // Adjust the path as needed
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

app.use('/api', authRoutes);

const PORT = process.env.PORT || 5000;

const options = {
    key: fs.readFileSync(process.env.SSL_KEY_PATH),
    cert: fs.readFileSync(process.env.SSL_CERT_PATH)
};

https.createServer(options, app).listen(PORT, () => {
    console.log(`HTTPS Server is running on port ${PORT}`);
});

*/