import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Registr = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Change handler for input fields
  const changeInputHandler = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  // Register user function
  const registerUser = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message initially
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/register`, userData);
      const newUser = response.data;
  
      if (!newUser) {
        setError("Couldn't register user. Please try again.");
        return;
      }
  
      console.log(newUser);
      navigate('/'); // Navigate if registration is successful
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'An error occurred during registration.';
      setError('');  // Temporary clear to force state update
      setError(errorMessage);
    }
  };
  

  return (
    <section className='register'>
      <div className='container'>
        <h2>Sign Up</h2>
      </div>

      <form className='form register_form' onSubmit={registerUser}>
        {/* Error message */}
        {error && <p className='form_error-message'>{error}</p>}

        {/* Input for full name */}
        <input 
          type='text' 
          placeholder='Full Name' 
          name='name' 
          value={userData.name} 
          onChange={changeInputHandler} 
        />

        {/* Input for email */}
        <input 
          type='email' 
          placeholder='Email Address' 
          name='email' 
          value={userData.email} 
          onChange={changeInputHandler} 
        />

        {/* Input for password */}
        <input 
          type='password' 
          placeholder='Password' 
          name='password' 
          value={userData.password} 
          onChange={changeInputHandler} 
        />

        {/* Input to confirm password */}
        <input 
          type='password' 
          placeholder='Confirm Password' 
          name='password2' 
          value={userData.password2} 
          onChange={changeInputHandler} 
        />

        {/* Submit button */}
        <button type='submit' className='btn primary'>
          Register
        </button>
      </form>
      <small className='sign_in'>Already have an account? <Link to='/login'>sign in</Link></small>
    </section>
  );
};

export default Registr;
