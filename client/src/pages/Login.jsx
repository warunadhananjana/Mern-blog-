import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../context/userContext';

const Login = () => {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const { setCurrentUser } = useContext(UserContext);

  // Change handler for input fields
  const changeInputHandler = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const loginUser = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/login`, userData);
      const user = response.data;
      setCurrentUser(user);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <section className='register'>
      <div className='container'>
        <h2>Sign in</h2>
      </div>

      <form className='form login_form' onSubmit={loginUser}>
        {/* Error message */}
        {error && <p className='form_error-message'>{error}</p>}

        {/* Input for email */}
        <input
          type='email'
          placeholder='Email Address'
          name='email'
          value={userData.email}
          onChange={changeInputHandler}
          autoFocus
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
      <small className='sign_in'>
        Don't have an account? <Link to='/register'>Register</Link>
      </small>
    </section>
  );
};

export default Login;
