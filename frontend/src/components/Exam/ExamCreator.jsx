import React, { useState } from 'react';
import axios from 'axios';

const ExamCreator = () => {
  const [subjects, setSubjects] = useState([
    { name: 'Math', questions: 0 },
    { name: 'Science', questions: 0 },
    { name: 'History', questions: 0 },
  ]);

  const [examQuestions, setExamQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  // Handle input change for subject question count
  const handleSubjectChange = (index, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index].questions = value;
    setSubjects(updatedSubjects);
  };

  // Function to generate exam based on subject and quantity
  const handleGenerateExam = async () => {
    setLoading(true);
    try {
       const questions = [];
      for (const subject of subjects) {
        if (subject.questions > 0) {
          //Fetch random questions from the backend API
          console.log(subjects)
          const response = await axios.get('exams/generate-questions', {
            params: { subject: subject.name, quantity: subject.questions },
          });
          console.log(response) ;
          // questions.push({ subject: subject.name, questions: response.data });
        }
      }
      setExamQuestions(questions);
    }
     catch (error) {
      console.error('Error generating exam:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-semibold mb-4">Create an Exam</h1>

      <div className="space-y-4">
        {subjects.map((subject, index) => (
          <div key={index} className="flex items-center space-x-2">
            <label htmlFor={`subject-${index}`} className="w-24 font-medium">{subject.name}</label>
            <input
              id={`subject-${index}`}
              type="number"
              min="0"
              value={subject.questions}
              onChange={(e) => handleSubjectChange(index, e.target.value)}
              className="w-20 p-2 border rounded-md"
            />
            <span className="text-sm text-gray-500">questions</span>
          </div>
        ))}

        <button
          onClick={handleGenerateExam}
          className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600"
        >
          Generate Exam
        </button>
      </div>

      {loading && <div className="mt-4 text-center text-blue-500">Generating Exam...</div>}

      {examQuestions.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-4">Exam Questions</h2>
          {examQuestions.map((subjectData, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-lg font-medium">{subjectData.subject}</h3>
              <ul className="list-disc pl-6 space-y-2">
                {subjectData.questions.map((question) => (
                  <li key={question._id} className="p-4 border rounded-md">
                    <p>{question.title}</p>
                    <div className="mt-2 space-x-4">
                      {question.options.map((option, i) => (
                        <div key={i} className="flex items-center">
                          <input type="radio" name={`question-${question._id}`} id={`option-${i}`} />
                          <label htmlFor={`option-${i}`} className="ml-2">{option}</label>
                        </div>
                      ))}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ExamCreator;
