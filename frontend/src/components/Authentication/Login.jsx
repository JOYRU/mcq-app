/* eslint-disable no-undef */
// // src/components/Login.js
// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link, useNavigate } from 'react-router-dom';
// import { useAuth } from '../../context/AuthContext';


// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const [success, setSuccess] = useState('');
//     const navigate =useNavigate() ; 
//     const {login} = useAuth() ; 

//     const baseUrl = process.env.REACT_APP_API_URL ; 

//     const handleLogin = async (e) => {
      
//         e.preventDefault();
//         setError('');
//         setSuccess('');
          
//         try {
//             //const response = await axios.post('http://localhost:5000/auth/login', { email, password });
//             const response = await axios.post(`${baseUrl}/auth/login`, { email, password });
//             console.log(response) ;

//             localStorage.setItem('token', response.data.token);
//             login(response.data.token) ; 
//             setSuccess('Login successful!');
//             navigate('/dashboard') ; 
        
//         } catch (err) {
//             setError(err.response.data.message);
//         }
//     };

//     return (
//         <div className="flex items-center justify-center h-screen bg-gray-100">
//             <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-96">
//                 <h2 className="text-lg font-bold mb-4">Login</h2>
//                 {error && <p className="text-red-500">{error}</p>}
//                 {success && <p className="text-green-500">{success}</p>}
//                 <input
//                     type="text"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                     placeholder="Mail Address"
//                     className="border border-gray-300 p-2 mb-4 w-full rounded"
//                     required
//                 />
//                 <input
//                     type="password"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                     placeholder="Password"
//                     className="border border-gray-300 p-2 mb-4 w-full rounded"
//                     required
//                 />
//                 <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Login</button>
//                 {/* <p>If Your are not Register.Register First </p> */}
//                 <p className="mt-4 text-center text-sm text-gray-600">
//                     If You are not registered, 
//                     <Link to="/register" className="text-blue-500 hover:text-blue-700 font-medium"> register here</Link>.
//                 </p>
//             </form>
         
//         </div>
//     );
// };

// export default Login;

// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate(); 
    const { login } = useAuth(); 

    // Use REACT_APP_API_URL from the environment variables
    //const baseUrl = process.env.REACT_APP_API_URL; 

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
          
        try {
            // Make the request to the backend API
            const response = await axios.post(`auth/login`, { email, password });
            console.log(response);

            localStorage.setItem('token', response.data.token);
            login(response.data.token); 
            setSuccess('Login successful!');
            navigate('/dashboard');
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form onSubmit={handleLogin} className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-lg font-bold mb-4">Login</h2>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Mail Address"
                    className="border border-gray-300 p-2 mb-4 w-full rounded"
                    required
                />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="border border-gray-300 p-2 mb-4 w-full rounded"
                    required
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Login</button>
                <p className="mt-4 text-center text-sm text-gray-600">
                    If You are not registered, 
                    <Link to="/register" className="text-blue-500 hover:text-blue-700 font-medium"> register here</Link>.
                </p>
            </form>
        </div>
    );
};

export default Login;
