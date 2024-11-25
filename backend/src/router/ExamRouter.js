import express from 'express'
import { addExam , getExams , getExam, generateQuestion, examResult, updatedExamData, examResultTeacher} from '../controller/ExamController.js';

const examRouter = express.Router() ;
examRouter.post('/add',addExam)
examRouter.get('/',getExams)
examRouter.get('/:id',getExam)
examRouter.put('/update/:id',updatedExamData)
examRouter.post('/exam-result',examResult)
examRouter.get('/exam-result-teacher/:id',examResultTeacher)
// examRouter.get('/result',studentExamResult)
// examRouter.get('/faltu',faltu)


//const response = await axios.put(`http://localhost:5000/exams/update/${examId}`, updatedExamData);
examRouter.get('/generate-questions',generateQuestion)

export default examRouter