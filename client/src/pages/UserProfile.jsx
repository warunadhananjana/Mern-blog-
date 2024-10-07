import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Avatar from '../image/author1.jpg';
import { FaEdit, FaCheck } from "react-icons/fa";

const UserProfile = () => {
  const [avatar, setAvatar] = useState(Avatar);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  return (
    <section className='profile'>
      <div className='container profile_container'>
        <Link to={`/myposts/sdfgrt`} className='btn my_post'>My posts</Link>
        <div className='profile_details'>
          <div className='avatar_wrapper'>
            <div className='profile_avatar'>
              <img src={avatar} alt='User avatar'/>
            </div>
            <form className="avatar_form">
              <input 
                type='file' 
                name='avatar' 
                id='avatar' 
                onChange={e => setAvatar(URL.createObjectURL(e.target.files[0]))} 
                accept='image/png, image/jpg, image/jpeg'
              />
              <label className='edit' htmlFor='avatar'><FaEdit /></label>
            </form>
            <button className='profile__avatar-btn'><FaCheck/></button>
          </div>
          <h1 className='user_text'>Rumesh Sangeewa</h1>
          <form className="form profile_form">
            <p className='form__error-message'>This is an error message</p>
            <input 
              type='text' 
              placeholder='Full Name' 
              value={name} 
              onChange={e => setName(e.target.value)} 
            />
            <input 
              type='email' 
              placeholder='Email' 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
            />
            <input 
              type='password' 
              placeholder='Current password' 
              value={currentPassword} 
              onChange={e => setCurrentPassword(e.target.value)} 
            />
            <input 
              type='password' 
              placeholder='New password' 
              value={newPassword} 
              onChange={e => setNewPassword(e.target.value)} 
            />
            <input 
              type='password' 
              placeholder='Confirm new password' 
              value={confirmNewPassword} 
              onChange={e => setConfirmNewPassword(e.target.value)} 
            />
            <button type='submit' style={{width:'200px'}} className='btn primary'>Update my details</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default UserProfile;
