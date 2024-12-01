import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const SubjectQuestions = () => {
   const { subject } = useParams();
   const [questions, setQuestions] = useState([]);
   const [loading,setLoading] = useState(false) ; 
   
const [showAnswers, setShowAnswers] = useState({}); // Track which answers are visible
const [showExplanations, setShowExplanations] = useState({});

   useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Fetch exam details and questions from the API
       
        const response = await axios.get('questions/subject/question',{
          params: {
            subject: subject
           
          }

        });
       
      //  console.log(response.data) ; 
        if (response.data.success) {
         
          setQuestions(response.data.questions);
        }
      } catch (error) {
        console.error('Error fetching Question details:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchQuestions();
 
  }, [subject]);

  const handleShowAnswer = (questionId) => {
    setShowAnswers(prevState => ({
      ...prevState,
      [questionId]: !prevState[questionId] // Toggle visibility of the correct answer
    }));
  };
  
  const handleShowExplanation = (questionId) => {
      setShowExplanations((prevState) => ({
        ...prevState,
        [questionId]: !prevState[questionId],
      }));
    };
  
  if (loading) {
    return <p>Loading exam details...</p>;
  }
  
  

   return (
    <div className="max-w-3xl mx-auto p-4">
   
    <h2 className="text-xl font-semibold mb-4">Questions</h2>

    {questions.map((question) => (
      <div key={question._id} className="mb-6 p-4 border rounded shadow-md bg-white">
        <h3 className="text-lg font-semibold mb-2">{question.title}</h3>
        
        <div className="flex flex-col">
          {Object.keys(question.options[0]).map((key) => {
            if (key === "_id") return null; // Skip the "_id" key

            return (
              <label key={key} className="flex items-center mb-2">
                <input
                  type="radio"
                  name={question._id}
                  value={key}
                  disabled
                  className="mr-2"
                />
                {question.options[0][key]}
              </label>
            );
          })}
        </div>

        <button
          onClick={() => handleShowAnswer(question._id)}
          className="mt-2 text-blue-600 hover:underline"
        >
          {showAnswers[question._id] ? 'Hide Correct Answer' : 'Show Correct Answer'}
        </button>

        {showAnswers[question._id] && (
          <p className="mt-2 text-sm text-green-600">
            Correct Answer: {question.correctAnswer}
          </p>
        )}
       {question.explanation && (
                    <>
                      <button
                        onClick={() => handleShowExplanation(question._id)}
                        className="mt-2 text-blue-600 hover:underline"
                      >
                        {showExplanations[question._id]
                          ? 'Hide Explanation'
                          : 'Show Explanation'}
                      </button>
                      {showExplanations[question._id] && (
                        <p className="mt-2 text-sm text-gray-600">
                          Explanation: {question.explanation}
                        </p>
                      )}
                      </>
                  )}
      </div>
    ))}
  </div>
     

  );
};

export default SubjectQuestions;
