import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/actions/auth'; // Import the login action
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    

   

    useEffect(()=>{
        try{
          const id = localStorage.getItem('rid')
          if(id!=null){
            
            setTimeout(() => {
                navigate('/courses')
            }, 2000);
            
          }
        }
        catch{}
      })
    const handleSubmit = async (e) => {
        e.preventDefault();
       

        try {
            // Make fetch call to login endpoint
            const response = await fetch('https://react-assign.onrender.com/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            });
            const data = await response.json();
            if (!data.status) {
                // Handle non-successful response
                toast.error(data.message)
                return
            }


           
            console.log(data)
            localStorage.setItem("rid",data.success._id)
            toast.success('Login Successful')
            setTimeout(() => {
                navigate('/courses');
            }, 2000);
             // Redirect to dashboard or any other page upon successful login
        } catch (error) {
            toast.error(error)
            console.error('Login failed:', error); // Log the error
        }
    };

    return (
        <>
        <ToastContainer/>
        <div className="container mt-5 w-[400px] bg-gray-100 p-12 rounded-md">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="email">Email address:</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="pwd">Password:</label>
                    <input type="password" className="form-control" id="pwd" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
                <div>Don't have an account? Register <a href="#" onClick={() => { navigate('/signup') }}>Here</a></div>
            </form>
        </div>
        </>
    );
}

export default LoginPage;
