import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
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
        <h2>Sign in</h2>
      </div>

      <form className='form login_form'>
        {/* Error message */}
        <p className='form_error-message'>This is an error message</p>

        {/* Input for email */}
        <input 
          type='email' 
          placeholder='Email Address' 
          name='email' 
          value={userData.email} 
          onChange={changeInputHandler} autoFocus 
        />

        {/* Input for password */}
        <input 
          type='password' 
          placeholder='Password' 
          name='password' 
          value={userData.password} 
          onChange={changeInputHandler} 
        />

       

        {/* Submit button */}
        <button type='submit' className='btn primary'>
          Login
        </button>
      </form>
      <small className='sign_in'>Dont't have an account? <Link to='/register'>Register</Link></small>
    </section>
  );
};

export default Login;
