// frontend/src/components/QuestionForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

const QuestionForm = () => {
  const[exams,setExams] = useState('') ; 
  const[exam,setExam] = useState('') ; 
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState({
    option1: '',
    option2: '',
    option3: '',
    option4: '',
  });
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [examId, setExamId] = useState('');
  const [subject, setSubject] = useState('');

  useEffect(()=>{
    const fetchExams = async()=>{
      try{
      
          const response = await axios.get('exams')
          
          if(response.data.success){
           // console.log(response.data.departments)
            setExams(response.data.exams)      
           }                       
      }
        catch(error){
       alert(error)
       }

      }
fetchExams() ;
},[])

  const handleOptionChange = (e) => {
    const { name, value } = e.target;
    setOptions((prevOptions) => ({
      ...prevOptions,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const questionData = {
      title,
      options: [options], // Wrap options in an array
      correctAnswer,
      exam_id: examId,
      subject,
    };

    try {
      //const response = await axios.post('/api/questions', questionData);
       const response =  await axios.post('questions/add',questionData );
      console.log('Question submitted:', response.data);
      // Reset form fields after successful submission
      setTitle('');
      setOptions({ option1: '', option2: '', option3: '', option4: '' });
      setCorrectAnswer('');
      setExamId('');
      setSubject('');
    } catch (error) {
      console.error('Error submitting question:', error);
    }
  };

  return (
    <form className="max-w-md mx-auto p-4 bg-white rounded shadow-md" onSubmit={handleSubmit}>
      <h2 className="text-lg font-semibold mb-4">Create a Question</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block w-full border border-gray-300 rounded p-2"
          required
        />
      </div>

      {Object.keys(options).map((key) => (
          <div className="mb-4" key={key}>
            <label className="block mb-2">{key}:</label>
            <input
              type="text"
              name={key}
              value={options[key]}
              onChange={handleOptionChange}
              className="border rounded p-2 w-full"
              required
            />
          </div>
        ))}     
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Correct Answer:</label>
        <input
          type="text"
          value={correctAnswer}
          onChange={(e) => setCorrectAnswer(e.target.value)}
          className="block w-full border border-gray-300 rounded p-2"
          required
        />
      </div>
      <div>
            <label htmlFor="exam_id" className="block text-sm font-medium text-gray-700">Exam title</label>
            <select name="exam_id" 
             onChange={(e) => setExamId(e.target.value)}
            
             className='mt-1 p-2 block w-full border border-gray-300 rounded-md'
            >
              <option value="">Select Exam</option>

               {
               exams &&  exams.map((exm)=>(                   
               <option key={exm._id} value={exm._id} >{exm.title}</option>
                  
                ))
               }          
            </select>
        </div>
        <div className="mb-4">
  <label className="block text-sm font-medium mb-1">Subject:</label>
  <select
    value={subject}
    onChange={(e) => setSubject(e.target.value)}
    className="block w-full border border-gray-300 rounded p-2"
  >
    <option value="">-- Select Subject --</option>  
    <option value="bangla1st">Bangla 1st Paper</option>
    <option value="bangla2nd">Bangla 2nd Paper</option>
    <option value="physics">Physics</option>
    <option value="math">Math</option>
    <option value="chemistry">Chemistry</option>
    <option value="biology">Biology</option>
  </select>
</div>
      <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600">
        Submit Question
      </button>
    </form>
  );
};

export default QuestionForm;
