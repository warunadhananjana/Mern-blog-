import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Registr = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  // Change handler for input fields
  const changeInputHandler = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <section className='register'>
      <div className='container'>
        <h2>Sign Up</h2>
      </div>

      <form className='form register_form'>
        {/* Error message */}
        <p className='form_error-message'>This is an error message</p>

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
