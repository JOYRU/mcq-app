// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Register = () => {
    const [name, setName] = useState('');
    // const [mobile_number, setMobileNumber] = useState('');
    const [email,setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [role, setRole] = useState("student");
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');


    const formData = {
        name,
        email,
        password,
        role,
      };

        try {
            const response = await axios.post('auth/register',formData);
           if(response.data.success){
            navigate('/login')
           }

            setSuccess('Registration successful! You can now log in.');


        } catch (err) {
            setError(err);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <form onSubmit={handleRegister} className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-lg font-bold mb-4">Register</h2>
                {error && <p className="text-red-500">{error}</p>}
                {success && <p className="text-green-500">{success}</p>}
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Name"
                    className="border border-gray-300 p-2 mb-4 w-full rounded"
                    required
                />
                <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Provide Valid Email"
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
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="border border-gray-300 p-2 mb-4 w-full rounded"
                    required
                    >
                    <option value="student">Student</option>
                    <option value="teacher">Teacher</option>
                    <option value="admin">Admin</option>
                  </select>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Register</button>
            </form>
        </div>
    );
};

export default Register;
