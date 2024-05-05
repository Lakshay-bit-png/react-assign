import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

const SignupPage = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
      e.preventDefault();
     

      try {
          // Make fetch call to login endpoint
          const response = await fetch('https://react-assign.onrender.com/api/users/signup', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({name, email, password })
          });
          const data = await response.json();
          if (!data.status) {
              // Handle non-successful response
              toast.error(data.message)
              return
          }


         
          console.log(data)
         toast.success('Account Created Successfuly, Now you can Login')
          setTimeout(() => {
            navigate('/');
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
            <h2>Signup</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name:</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter your name" value={name} onChange={(e) => setName(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address:</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="pwd">Password:</label>
                    <input type="password" className="form-control" id="pwd" placeholder="Enter password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
                <div>Already have an account? Login <a href="#" onClick={() => { navigate('/') }}>Here</a></div>
            </form>
        </div>
        </>
    );
}

export default SignupPage;
