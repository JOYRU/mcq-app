import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditExam = () => {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [timeDuration, setTimeDuration] = useState('');
  const [subject, setSubject] = useState('');
  const [examId, setExamId] = useState('');
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();  // Get the exam ID from the URL params
  const navigate = useNavigate();

  // Fetch the exam details from the backend using the exam ID
  useEffect(() => {
    const fetchExamData = async () => {
      try {
        const response = await axios.get(`exams/${id}`);
        const examData = response.data;
        setTitle(examData.exam[0].title);
        setStartTime(examData.exam[0].start_time);
        setTimeDuration(examData.exam[0].time_duration);
        setSubject(examData.exam[0].subject);
        setExamId(examData.exam[0]._id);
        setQuestions(examData.exam[0].questions); // Set questions
        // console.log(examData.exam[0].questions)
        setLoading(false);
      } catch (error) {
        console.error('Error fetching exam data:', error);
        setLoading(false);
      }
    };

    fetchExamData();
  }, [id]);

  // Handle form submission to update the exam data
  const handleSubmit = async (e) => {
    e.preventDefault();

 
    const updatedExamData = {
      title,
      start_time: startTime,
      time_duration: timeDuration,
      subject,
      questions: questions.map(q => ({
        ...q,
        options: [
          {
            option1: q.options[0]?.option1 || "",  // Ensure option1 exists
            option2: q.options[0]?.option2 || "",  // Ensure option2 exists
            option3: q.options[0]?.option3 || "",  // Ensure option3 exists
            option4: q.options[0]?.option4 || "",  // Ensure option4 exists
          }
        ],
      }))
    };
    
    // Ensure the structure of updatedExamData is correct
    // console.log(updatedExamData);
    

    // Send this updatedExamData to the backend
    const response = await axios.put(`exams/update/${examId}`, updatedExamData);
    

    try {
      const response = await axios.put(`exams/update/${examId}`, updatedExamData);
      if (response.status === 200) {
        alert('Exam updated successfully!');
        navigate('/dashboard'); // Navigate to the dashboard after successful update
      }
    } catch (error) {
      console.error('Error updating exam:', error);
    }
  };

  // Handle removing a question
  const handleRemoveQuestion = async (questionId) => {
    try {
      const updatedQuestions = questions.filter(q => q._id !== questionId);
      setQuestions(updatedQuestions);

      // Optionally: make a request to update the exam's questions in the database after removal
      await axios.put(`exams/update/${examId}`, { questions: updatedQuestions });
    } catch (error) {
      console.error('Error removing question:', error);
    }
  };



const handleEditQuestion = (questionId, field, value, optionIndex = null) => {
  const updatedQuestions = questions.map(q => {
    if (q._id === questionId) {
      if (optionIndex !== null) {
        const updatedOptions = [...q.options];

        // Ensure that options are being structured properly
        const updatedOption = updatedOptions[0] || {};  // If options array is empty, initialize an empty object

        // Update the specific option field (e.g., option1, option2, etc.)
        updatedOption[field] = value;

        // Update the options array with the modified option
        updatedOptions[0] = updatedOption;

        // Return the updated question with the new options array
        return { ...q, options: updatedOptions };
      } else {
        return { ...q, [field]: value };  // Update fields like title, correctAnswer, etc.
      }
    }
    return q;  // Return unchanged questions
  });

  setQuestions(updatedQuestions);  // Set the updated questions in the state
};





  // If the exam data is still loading, show a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
      <h2 className="text-lg font-semibold mb-4">Edit Exam</h2>
      <form onSubmit={handleSubmit}>
        {/* Exam title, start time, and duration input fields */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Exam Name:</label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full border border-gray-300 rounded p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Start Time:</label>
          <input
            type="datetime-local"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            className="block w-full border border-gray-300 rounded p-2"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Time Duration (minutes):</label>
          <input
            type="number"
            value={timeDuration}
            onChange={(e) => setTimeDuration(e.target.value)}
            className="block w-full border border-gray-300 rounded p-2"
            required
          />
        </div>

        {/* Subject dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Select Subject:</label>
          <select
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="block w-full border border-gray-300 rounded p-2"
            required
          >
            <option value="">-- Select Subject --</option>
            <option value="math">Math</option>
            <option value="science">Science</option>
            <option value="history">History</option>
            {/* Add more subjects as needed */}
          </select>
        </div>

        {/* Display Questions */}
        <div className="mb-4">
          <h3 className="text-sm font-medium mb-2">Questions:</h3>
          {questions && questions.map((question) => (
            <div key={question._id} className="mb-4">
              <div className="mb-2">
                <label className="block text-sm font-medium mb-1">Question Title:</label>
                <input
                  type="text"
                  value={question.title}
                  onChange={(e) => handleEditQuestion(question._id, 'title', e.target.value)}
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>

           
            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Option 1:</label>
              <input
                type="text"
                value={question.options[0]?.option1 || ''}  // For option1
                onChange={(e) => handleEditQuestion(question._id,  'option1', e.target.value, 0)}  // Pass index 0
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>

            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Option 2:</label>
              <input
                type="text"
                value={question.options[0]?.option2 || ''}  // For option2
                onChange={(e) => handleEditQuestion(question._id, 'option2', e.target.value, 0)}  // Pass index 1
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>

            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Option 3:</label>
              <input
                type="text"
                value={question.options[0]?.option3 || ''}  // For option3
                onChange={(e) => handleEditQuestion(question._id, 'option3', e.target.value, 0)}  // Pass index 2
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>

            <div className="mb-2">
              <label className="block text-sm font-medium mb-1">Option 4:</label>
              <input
                type="text"
                value={question.options[0]?.option4 || ''}  // For option4
                onChange={(e) => handleEditQuestion(question._id,  'option4', e.target.value, 0)}  // Pass index 3
                className="w-full border border-gray-300 rounded p-2"
              />
            </div>
             <div className="mb-2">
                <label className="block text-sm font-medium mb-1">Correct Answer:</label>
                <input
                  type="text"
                  value={question.correctAnswer}
                  onChange={(e) => handleEditQuestion(question._id, 'correctAnswer', e.target.value)}
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>

              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={() => handleRemoveQuestion(question._id)}
                  className="ml-2 bg-red-500 text-white py-1 px-3 rounded hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-800">
          Update Exam
        </button>
      </form>
    </div>
  );

};
export default EditExam;

