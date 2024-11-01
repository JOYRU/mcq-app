// frontend/src/components/QuestionForm.js
import React, { useState } from 'react';
import axios from 'axios';

const QuestionForm = () => {

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
       const response =  await axios.post('http://localhost:5000/questions/add',questionData );
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
      {['option1', 'option2', 'option3', 'option4'].map((option, index) => (
        <div className="mb-4" key={index}>
          <label className="block text-sm font-medium mb-1">Option {index + 1}:</label>
          <input
            type="text"
            name={option}
            value={options[option]}
            onChange={handleOptionChange}
            className="block w-full border border-gray-300 rounded p-2"
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
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Exam ID:</label>
        <input
          type="text"
          value={examId}
          onChange={(e) => setExamId(e.target.value)}
          className="block w-full border border-gray-300 rounded p-2"
        />
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Subject:</label>
        <input
          type="text"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="block w-full border border-gray-300 rounded p-2"
        />
      </div>
      <button type="submit" className="w-full bg-blue-500 text-white font-bold py-2 rounded hover:bg-blue-600">
        Submit Question
      </button>
    </form>
  );
};

export default QuestionForm;
