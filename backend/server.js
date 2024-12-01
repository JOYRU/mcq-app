
import express from "express"
import cors from "cors"
import mongoose from "mongoose";
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import questionRouter from "./src/router/QuestionRouter.js";
import examRouter from "./src/router/ExamRouter.js";
import authRouter from "./src/router/AuthRouter.js";
 import dotenv from 'dotenv';
 dotenv.config(); 


const app = express();
// const PORT = process.env.PORT || 5010;
//const PORT = 5000 ;
const PORT = process.env.PORT ;

const corsOptions = {
    origin: '',  // Allow only this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'],     // Allow specific methods
    allowedHeaders: ['Content-Type', 'Authorization'],  // Allow specific headers
  };
  
  // Enable CORS with the specified options
  app.use(cors(corsOptions));
//app.use(cors())
//app.use(cors());
app.use(bodyParser.json());

//  const mongodbURL = process.env.mongodbURL ; 
 //const mongodbURL = "mongodb+srv://joycseru:f01765711177@cluster0.l9t1yml.mongodb.net/mcq-app2"  ; 
 //const mongodbURL = "mongodb+srv://joycseru:f01765711177@cluster0.l9t1yml.mongodb.net/mcq-app2"  ; 

 app.use('/questions',questionRouter)
 app.use('/exams',examRouter)
 app.use('/auth',authRouter)

 
 // connect to db and run server 
 app.listen(PORT,async()=>{   
    // console.log('server is running on port') ; 
     console.log(`Server is running on http://localhost:${PORT}`);   
     await mongoose.connect(process.env.mongodbURL) ; 
    //connectDB() ; 
     console.log('Connection to db Successfully established') ;
 })

// const connectMongoDB = async () => {
//     try {
//       //const mongoURI = process.env.MONGODB_URI; // Get MongoDB URI from environment variable
//       await mongoose.connect(mongodbURL, {
//        // useNewUrlParser: true,
//         //useUnifiedTopology: true,
//       });
//       console.log('MongoDB Connected!');
//     } catch (err) {
//       console.error('Error connecting to MongoDB:', err);
//       process.exit(1); // Exit the process if connection fails
//     }
//   };
  
//   // Connect to MongoDB
//   connectMongoDB();

//  app.get('/', (req, res) => {
//     res.send('Hello, world!');
//   });
  
