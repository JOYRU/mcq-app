// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ExamForm = () => {
// const [title, setTitle] = useState('');
//   const [startTime, setStartTime] = useState('');
//   const [timeDuration, setTimeDuration] = useState('');
//   const [examId, setExamId] = useState('');
//   const [timer, setTimer] = useState(null);
//   const [timeLeft, setTimeLeft] = useState(0);

  
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const examData = {
//         title:title,
//       start_time: startTime,
//       time_duration: timeDuration,
//     };

//     try {
//       const response = await axios.post('http://localhost:5000/exams/add', examData);
//       setExamId(response.data._id); // Assuming the API returns the created exam with an ID
//       startCountdown(timeDuration);
//     } catch (error) {
//       console.error('Error creating exam:', error);
//     }
//   };

//   const startCountdown = (duration) => {
//     setTimeLeft(duration * 60); // Convert minutes to seconds

//     if (timer) clearInterval(timer); // Clear existing timer

//     const newTimer = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(newTimer);
//           return 0; // Stop the timer
//         }
//         return prev - 1;
//       });
//     }, 1000);
    
//     setTimer(newTimer);
//   };

//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
//   };

//   return (
//     <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
//       <h2 className="text-lg font-semibold mb-4">Create an Exam</h2>
//       <form onSubmit={handleSubmit}>
//       <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Exam Name:</label>
//           <input
//             type="text"
//             name="title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="block w-full border border-gray-300 rounded p-2"
//             required
//           />
//         </div>


//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Start Time:</label>
//           <input
//             type="datetime-local"
//             value={startTime}
//             onChange={(e) => setStartTime(e.target.value)}
//             className="block w-full border border-gray-300 rounded p-2"
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Time Duration (minutes):</label>
//           <input
//             type="number"
//             value={timeDuration}
//             onChange={(e) => setTimeDuration(e.target.value)}
//             className="block w-full border border-gray-300 rounded p-2"
//             required
//           />
//         </div>
//         <button type="submit" className="w-full bg-blue-500 text-black font-bold py-2 rounded hover:bg-blue-800">
//           Create Exam
//         </button>
//       </form>
//       {examId && (
//         <div className="mt-4">
//           <h3 className="font-medium">Exam ID: {examId}</h3>
//           <h4 className="mt-2">Time Remaining: {formatTime(timeLeft)}</h4>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ExamForm;
// // create a project forntend react vite and backend node and database mongodb

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ExamForm = () => {
//   const [title, setTitle] = useState('');
//   const [startTime, setStartTime] = useState('');
//   const [timeDuration, setTimeDuration] = useState('');
//   const [examId, setExamId] = useState('');
//   const [timer, setTimer] = useState(null);
//   const [timeLeft, setTimeLeft] = useState(0);
//   const [questions, setQuestions] = useState([]);
//   const [questionText, setQuestionText] = useState('');
//   const [randomQuestionsCount, setRandomQuestionsCount] = useState(30);  // Default to 30 questions

//   // Handle form submission to create an exam
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const examData = {
//       title: title,
//       start_time: startTime,
//       time_duration: timeDuration,
//     };

//     try {
//       const response = await axios.post('http://localhost:5000/exams/add', examData);
//       setExamId(response.data._id);
//       startCountdown(timeDuration);
//     } catch (error) {
//       console.error('Error creating exam:', error);
//     }
//   };

//   // Handle random questions selection (fetch random questions)
//   const fetchRandomQuestions = async () => {
//     console.log("hello")
//     try {
//      // const response = await axios.get('http://localhost:5000/questions/random?quantity=${randomQuestionsCount}');
//       const response = await axios.get('http://localhost:5000/questions/rcz');
//       console.log(response) ;
//       setQuestions(response.data);
//     } catch (error) {
//       console.error('Error fetching random questions:', error);
//     }
//   };
//   //console.log("afterBackendhello")

//   // Handle adding a manual question
//   const handleAddManualQuestion = async () => {
//     if (!questionText) {
//       return alert('Please enter a question');
//     }

//     try {
//       const newQuestion = { text: questionText };
//       setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);

//       // You may also want to store this question in the backend directly
//       // await axios.post(`http://localhost:5000/exams/${examId}/questions`, { questions: [newQuestion] });

//       setQuestionText(''); // Clear input
//     } catch (error) {
//       console.error('Error adding question:', error);
//     }
//   };

//   // Start the countdown timer
//   const startCountdown = (duration) => {
//     setTimeLeft(duration * 60); // Convert minutes to seconds

//     if (timer) clearInterval(timer); // Clear existing timer

//     const newTimer = setInterval(() => {
//       setTimeLeft((prev) => {
//         if (prev <= 1) {
//           clearInterval(newTimer);
//           return 0; // Stop the timer
//         }
//         return prev - 1;
//       });
//     }, 1000);
    
//     setTimer(newTimer);
//   };

//   // Format the time left in MM:SS format
//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
//   };

//   return (
//     <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
//       <h2 className="text-lg font-semibold mb-4">Create an Exa</h2>
//       <form onSubmit={handleSubmit}>
//         {/* Exam title, start time, and duration input fields */}
//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Exam Name:</label>
//           <input
//             type="text"
//             name="title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="block w-full border border-gray-300 rounded p-2"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Start Time:</label>
//           <input
//             type="datetime-local"
//             value={startTime}
//             onChange={(e) => setStartTime(e.target.value)}
//             className="block w-full border border-gray-300 rounded p-2"
//             required
//           />
//         </div>

//         <div className="mb-4">
//           <label className="block text-sm font-medium mb-1">Time Duration (minutes):</label>
//           <input
//             type="number"
//             value={timeDuration}
//             onChange={(e) => setTimeDuration(e.target.value)}
//             className="block w-full border border-gray-300 rounded p-2"
//             required
//           />
//         </div>

//         <button type="submit" className="w-full bg-blue-500 text-black font-bold py-2 rounded hover:bg-blue-800">
//           Create Exam
//         </button>
//       </form>

//       {examId && (
//         <div className="mt-4">
//           <h3 className="font-medium">Exam ID: {examId}</h3>
//           <h4 className="mt-2">Time Remaining: {formatTime(timeLeft)}</h4>

//           {/* Section to choose between random questions and manual input */}
//           <div className="mt-4">
//             <button onClick={fetchRandomQuestions} className="w-full bg-green-500 text-white py-2 rounded mb-4 hover:bg-green-700">
//               Fetch {randomQuestionsCount} Random Questions
//             </button>

//             <div className="mb-4">
//               <label className="block text-sm font-medium mb-1">Or add a question manually:</label>
//               <input
//                 type="text"
//                 value={questionText}
//                 onChange={(e) => setQuestionText(e.target.value)}
//                 className="block w-full border border-gray-300 rounded p-2 mb-2"
//                 placeholder="Enter your question"
//               />
//               <button onClick={handleAddManualQuestion} className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-700">
//                 Add Question Manually
//               </button>
//             </div>
//           </div>

//           {/* Display added questions */}
//           <div className="mt-4">
//             <h3 className="font-medium">Questions Added:</h3>
//             {/* <ul>
//               {questions && questions.map((question, index) => (
//                 <li key={index} className="mt-2">{question.text}</li>
//               ))}
//             </ul> */}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ExamForm;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const ExamForm = () => {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [timeDuration, setTimeDuration] = useState('');
  const [examId, setExamId] = useState('');
  const [timer, setTimer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState('');
  const [randomQuestionsCount, setRandomQuestionsCount] = useState(30);  // Default to 30 questions
  const [subject, setSubject] = useState('');  // New state for subject

  // Handle form submission to create an exam
  const handleSubmit = async (e) => {
    e.preventDefault();
    const examData = {
      title: title,
      start_time: startTime,
      time_duration: timeDuration,
    };

    try {
      const response = await axios.post('http://localhost:5000/exams/add', examData);
      setExamId(response.data._id);
      startCountdown(timeDuration);
    } catch (error) {
      console.error('Error creating exam:', error);
    }
  };

  // Handle random questions selection (fetch random questions based on subject and quantity)
  const fetchRandomQuestions = async () => {
    if (!subject) {
      return alert('Please select a subject');
    }
    //console.log(examId) ; 

    try {
      const response = await axios.get('http://localhost:5000/questions/random/questions', {
        params: {
          subject: subject,
          quantity: randomQuestionsCount,
          examId: examId,
        }
      });
      console.log(response.data);

      //console.log(response.data[0].options[0]._id);

      setQuestions(response.data.exam_id);
    } catch (error) {
      console.error('Error fetching random questions:', error);
    }
  };

  // Handle adding a manual question
  const handleAddManualQuestion = async () => {
    if (!questionText) {
      return alert('Please enter a question');
    }

    try {
      const newQuestion = { text: questionText };
      setQuestions((prevQuestions) => [...prevQuestions, newQuestion]);

      setQuestionText(''); // Clear input
    } catch (error) {
      console.error('Error adding question:', error);
    }
  };

  // Start the countdown timer
  const startCountdown = (duration) => {
    setTimeLeft(duration * 60); // Convert minutes to seconds

    if (timer) clearInterval(timer); // Clear existing timer

    const newTimer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(newTimer);
          return 0; // Stop the timer
        }
        return prev - 1;
      });
    }, 1000);
    
    setTimer(newTimer);
  };

  // Format the time left in MM:SS format
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  return (
    <div className="max-w-md mx-auto p-4 bg-white rounded shadow-md">
      <h2 className="text-lg font-semibold mb-4">Create an Exam</h2>
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

        <button type="submit" className="w-full bg-blue-500 text-black font-bold py-2 rounded hover:bg-blue-800">
          Create Exam
        </button>
      </form>

      {examId && (
        <div className="mt-4">
          <h3 className="font-medium">Exam ID: {examId}</h3>
          <h4 className="mt-2">Time Remaining: {formatTime(timeLeft)}</h4>

          {/* Section to choose between random questions and manual input */}
          <div className="mt-4">
            <button onClick={fetchRandomQuestions} className="w-full bg-green-500 text-white py-2 rounded mb-4 hover:bg-green-700">
              Fetch {randomQuestionsCount} Random Questions
            </button>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Or add a question manually:</label>
              {/* <input
                type="text"
                value={questionText}
                onChange={(e) => setQuestionText(e.target.value)}
                className="block w-full border border-gray-300 rounded p-2 mb-2"
                placeholder="Enter your question"
              /> */}
               <Link to="/dashboard/questions/add">
        <button className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-700">
          Add Question Manually
        </button>
      </Link>
            </div>
          </div>

          {/* Display added questions */}
          <div className="mt-4">
            <h3 className="font-medium">Questions Added:</h3>
            <ul>
              {questions && questions.map((question, index) => (
                <li key={index} className="mt-2">{question.text}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExamForm;
