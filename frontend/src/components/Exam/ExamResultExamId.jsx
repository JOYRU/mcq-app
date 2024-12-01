import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ExamResultExamId = () => {
  const { id } = useParams(); // Get exam ID from URL
  const [result, setResult] = useState([]); // Assuming result is an array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExamDetails = async () => {
      try {
        const response = await axios.get(`exams/exam-result-teacher/${id}`);
        console.log(response.data.examResult)
        setResult(response.data.examResult); // Update state with fetched data
      } catch (error) {
        console.error('Error fetching exam details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExamDetails();
  }, [id]);

  if (loading) {
    return <p>Loading exam details...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2>Exam Results</h2>
      {result.length === 0 ? (
        <p>No results found for this exam.</p>
      ) : (
        <table className="table-auto w-full border-collapse">
          <thead>
            <tr>
              <th className="px-4 py-2 border">User ID</th>
              <th className="px-4 py-2 border">Score</th>
            </tr>
          </thead>
          <tbody>
            {result && result.map((item, index) => (
              <tr key={index}>
                <td className="px-4 py-2 border">{item.examId}</td>
                <td className="px-4 py-2 border">{item.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ExamResultExamId;
