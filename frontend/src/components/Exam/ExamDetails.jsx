import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useParams, useNavigate } from 'react-router-dom';

const ExamDetails = () => {

  const { id } = useParams();
  const [isExamFinished, setIsExamFinished] = useState(false);
  const [isExamStart, setIsExamStart] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [exam, setExam] = useState('');
  const [userAnswers, setUserAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);  // State for pagination
  const questionsPerPage = 10;  // Number of questions per page

  const navigate = useNavigate();

  useEffect(() => {
    const fetchExamData = async () => {
      setLoading(true);

      try {
      ///  const response = await axios.get(`http://localhost:5000/questions/${id}`);
        const response2 = await axios.get(`exams/${id}`);
        //console.log(response)  ; 
       // console.log(response2.data.exam[0].questions)  ; 
        
        if ( response2.data.success) {
          setQuestions(response2.data.exam[0].questions);
          setExam(response2.data.exam);

          const examDuration = response2.data.exam[0].time_duration;
          setTimeLeft(examDuration * 60);  // Convert to seconds

          const startTime = response2.data.exam[0].start_time;
          const examStartTime = moment(startTime);
          const examEndTime = examStartTime.clone().add(examDuration, 'minutes');

          const timer = setInterval(() => {
            const currentTime = moment();
            const remainingTime = examEndTime.diff(currentTime, 'seconds');
            const remainingTimeStart = examStartTime.diff(currentTime, 'seconds');

            if (remainingTimeStart <= 0) {
              setIsExamStart(false);
            }

            if (remainingTime <= 0) {
              clearInterval(timer);
              setIsExamFinished(true);
              setTimeLeft(0);
              handleSubmit();
            } else {
              setTimeLeft(remainingTime);
            }
          }, 1000);  // Update every second

          return () => clearInterval(timer);  // Cleanup on unmount
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchExamData();
  }, [id]);

  const handleAnswerChange = (questionId, value) => {
    setUserAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem('token') ; 
    let totalScore = 0 ; 


    for (const question of questions) {
      if (question.correctAnswer === userAnswers[question._id]) {
        totalScore += 1;
      }
    }
 
    setScore(totalScore);
    
    try{
    
     console.log(totalScore)
     console.log("before exam result call") ; 

      const response =  await axios.post('exams/exam-result',{totalScore,id},
        {
          headers:{
          'Authorization':`Bearer ${token}`,
          'Content-Type':'application/json'
          }
        }
      )
      //console.log(response);
      ///console.log("after exam result call")
      alert(`Your score: ${totalScore}/${questions.length}`);
  
    
  
      navigate('/dashboard')
    }catch(error){
          console.log(error)
    }
   
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? `0${secs}` : secs}`;
  };

  // Handle Pagination: Next and Previous Page
  const handleNextPage = () => {
    if (currentPage < Math.ceil(questions.length / questionsPerPage) - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (isExamStart) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Wait For Start Exam</h1>
        <p className="text-lg">Exam will start soon!</p>
      </div>
    );
  }

  if (isExamFinished) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Exam Time Finished</h1>
        <p className="text-lg">The exam duration has expired. Thank you for participating!</p>
        <p className="mt-4 text-lg">Your score: {score}</p>
      </div>
    );
  }

  // Get the current set of questions to display (pagination)
  const currentQuestions = questions.slice(currentPage * questionsPerPage, (currentPage + 1) * questionsPerPage);

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Questions</h1>
      <p className="mb-4 text-lg">Time Left: {formatTime(timeLeft)}</p>

      {loading && <p>Loading...</p>}

      {/* Display the current set of questions */}
      {currentQuestions.map((question) => (
        <div key={question._id} className="mb-6 p-4 border rounded shadow-md bg-white">
          <h2 className="text-xl font-semibold mb-2">{question.title}</h2>
          <div className="flex flex-col">
            {Object.keys(question.options[0]).map((key, index) => {
              if (key === "_id") return null;
              return (
                <label key={index} className="flex items-center mb-2">
                  <input
                    type="radio"
                    name={question._id}
                    value={key}
                    onChange={() => handleAnswerChange(question._id, question.options[0][key])}
                    className="mr-2"
                  />
                  {question.options[0][key]} {/* Display the options */}
                </label>
              );
            })}
          </div>
        </div>
      ))}

      {/* Pagination buttons */}
      <div className="flex justify-between mt-4">
        <button
          onClick={handlePreviousPage}
          className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          disabled={currentPage === 0}
        >
          Previous
        </button>

        {currentPage < Math.ceil(questions.length / questionsPerPage) - 1 ? (
          <button
            onClick={handleNextPage}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Next
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
              Submit Answers
          </button>
        )}
      </div>
    </div>
  );
};

export default ExamDetails;