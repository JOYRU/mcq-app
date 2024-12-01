

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from "moment"; // You can use moment.js for date comparison

const ExamResultTeacher = () => {
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const [examsPerPage] = useState(6); // Set the number of exams per page

  useEffect(() => {
    // Fetch exams
    const fetchExams = async () => {
      try {
        const response = await axios.get("exams");
        
        if (response.data.success) {
          const examsData = response.data.exams;  // assuming your backend sends an array of exams
          const currentTime = moment();

          // Check if exams are finished or not
          const examsWithStatus = examsData.map((exam) => {
            //const examEndTime = moment(exam.start_time+exam.time_duration);
            const examEndTime = moment(exam.start_time).add(exam.time_duration, 'minutes');
            const isFinished = currentTime.isAfter(examEndTime);
            return { ...exam, isFinished };  // Add `isFinished` field to each exam
          });

          setExams(examsWithStatus); // Store exams with the finished status
        }
      } catch (error) {
        console.error("Error fetching exams", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExams();
  }, []);
  const indexOfLastExam = currentPage * examsPerPage;
  const indexOfFirstExam = indexOfLastExam - examsPerPage;
  const currentExams = exams.slice(indexOfFirstExam, indexOfLastExam);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) return <p>Loading exams...</p>;

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Exams Archive</h1>
      {exams.length === 0 ? (
        <p>No exams available.</p>
      ) : (
        // <ul>
        //   {exams.map((exam) => (
        //     <li key={exam._id} className="mb-4">
        //       <Link
        //         to={`/dashboard/archive-exam-list/${exam._id}`}
        //         className={`text-lg font-semibold ${
        //           exam.isFinished ? "text-green-600" : "text-red-600"
        //         } hover:underline`}
        //       >
        //         {exam.title}
        //       </Link>
        //       <p className="text-sm text-gray-500">
        //         {exam.isFinished ? "This exam is finished" : "This exam is still ongoing"}
        //       </p>
        //     </li>
        //   ))}
        // </ul>
        <>
        {/* Cards to display exams */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {currentExams.map((exam) => (
            <div
              key={exam._id}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
            >
              <Link
                to={`/dashboard/exam/result/${exam._id}`}  
                className={`block text-lg font-semibold mb-2 ${
                  exam.isFinished ? "text-green-600" : "text-red-600"
                } hover:underline`}
              >
                {exam.title}
              </Link>
              <p className="text-sm text-gray-500">
                {exam.isFinished
                  ? "This exam is finished"
                  : "This exam is still ongoing"}
              </p>
            </div>
          ))}
        </div>

        {/* Pagination controls */}
        <div className="flex justify-center mt-4">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 mx-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Previous
          </button>
          {/* Dynamic page numbers */}
          {[...Array(Math.ceil(exams.length / examsPerPage))].map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 mx-1 ${
                currentPage === index + 1
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700"
              } rounded`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === Math.ceil(exams.length / examsPerPage)}
            className="px-4 py-2 mx-1 bg-blue-500 text-white rounded disabled:bg-gray-300"
          >
            Next
          </button>
        </div>
      </>




      )}
    </div>
  );
};

export default ExamResultTeacher;
