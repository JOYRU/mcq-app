// import { useEffect , useState,react } from 'react';
// import axios from 'axios';
// import moment from 'moment'
// import { Link } from 'react-router-dom';

// const ExamCard = () => {

//   const currentTime = moment();

//   const[exams,setExams] = useState('') ; 

//   useEffect(()=>{
//     const fetchExams = async()=>{
//       try{
//         // const response = await axios.get('http://localhost:5000/api/departments',{
//         //   headers: {
//         //     "Authorization" : 'Bearer '+localStorage.getItem('token')
//         //   }
//         // })
//           const response = await axios.get('http://localhost:5000/exams')
          
   
//           if(response.data.success){
//            // console.log(response.data.departments)
//             setExams(response.data.exams) 
         
//            }        
                 
//       }
//         catch(error){
//        alert(error)
//        }

//       }
// fetchExams() ;
// },[])

// return (
    
//   <div className="flex flex-wrap gap-4">
//       {exams && exams.map((exm) => {
//         const examTime = moment(exm.start_time);
//         const endTime = examTime.clone().add(exm.time_duration, 'minutes'); // Calculate end time

//         // Determine if the exam is upcoming or running

//         const isUpcoming = examTime.isAfter(currentTime);
//         const isRunning = examTime.isBefore(currentTime) && endTime.isAfter(currentTime);

//         const formattedDate = examTime.format('MMMM D, YYYY h:mm A');

//         if (isUpcoming || isRunning) {
//           return (
//             <div key={exm._id} className="bg-white border border-gray-300 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200">
//               <Link to={`/dashboard/exam/${exm._id}`}>
//                 <h3 className="text-lg font-semibold text-blue-600">{exm.title}</h3>
//               </Link>
//               <p className="text-gray-500">Start Time: {formattedDate}</p>
//               <p className="text-gray-500">Time Duration: {exm.time_duration} Minutes</p>
//               <Link to={`/dashboard/exam/${exm._id}`}>
//                 <h3 className="text-lg font-semibold text-blue-600">Exam Link Here</h3>
//               </Link>
//               {isUpcoming && <span className="text-green-600">Upcoming</span>}
//               {isUpcoming && 
              
//               <div>
//                 <Link to={`/dashboard/exam/update/${exm._id}`}> 
//                 <h3 className="text-lg font-semibold text-blue-600">Exam Info Edit</h3>
//                </Link>
//               </div>
//               }
//             </div>
//           );
//         }

//         return null; // Exclude past exams
//       })}
//     </div>
//   ) ; 
// }

// export default  ExamCard

import { useEffect, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';

const ExamCard = () => {
  const currentTime = moment();
  const [exams, setExams] = useState([]);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        // const response = await axios.get('http://localhost:5000/api/departments', {
        //   headers: {
        //     "Authorization": 'Bearer ' + localStorage.getItem('token'),
        //   }
        // })
        const response = await axios.get('exams');

        if (response.data.success) {
          setExams(response.data.exams);
        }
      } catch (error) {
        alert(error);
      }
    };
    fetchExams();
  }, []);

  // Filter exams to get only upcoming or running ones
  const upcomingOrRunningExams = exams.filter((exm) => {
    const examTime = moment(exm.start_time);
    const endTime = examTime.clone().add(exm.time_duration, 'minutes');
    const isUpcoming = examTime.isAfter(currentTime);
    const isRunning = examTime.isBefore(currentTime) && endTime.isAfter(currentTime);
    return isUpcoming || isRunning;
  });

  return (
    <div className="flex flex-wrap gap-4">
      {/* If no upcoming or running exams, display a message */}
      {upcomingOrRunningExams.length === 0 ? (
        <div className="w-full text-center p-4 bg-gray-100 rounded-lg">
          <p className="text-gray-600">No available upcoming or running exams</p>
        </div>
      ) : (
        // Map through the filtered exams and display them
        upcomingOrRunningExams.map((exm) => {
          const examTime = moment(exm.start_time);
          const endTime = examTime.clone().add(exm.time_duration, 'minutes'); // Calculate end time

          const isUpcoming = examTime.isAfter(currentTime);
          const isRunning = examTime.isBefore(currentTime) && endTime.isAfter(currentTime);
          const formattedDate = examTime.format('MMMM D, YYYY h:mm A');

          return (
            <div
              key={exm._id}
              className="bg-white border border-gray-300 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow duration-200"
            >
              <Link to={`/dashboard/exam/${exm._id}`}>
                <h3 className="text-lg font-semibold text-blue-600">{exm.title}</h3>
              </Link>
              <p className="text-gray-500">Start Time: {formattedDate}</p>
              <p className="text-gray-500">Time Duration: {exm.time_duration} Minutes</p>
              <Link to={`/dashboard/exam/${exm._id}`}>
                <h3 className="text-lg font-semibold text-blue-600">Exam Link Here</h3>
              </Link>
              {isUpcoming && <span className="text-green-600">Upcoming</span>}
              {isUpcoming && (
                <div>
                  <Link to={`/dashboard/exam/update/${exm._id}`}>
                    <h3 className="text-lg font-semibold text-blue-600">Exam Info Edit</h3>
                  </Link>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
};

export default ExamCard;
