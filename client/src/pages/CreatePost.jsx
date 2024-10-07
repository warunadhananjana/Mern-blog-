import React, { useState } from 'react';
import { SiReactquery } from 'react-icons/si';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './Createpost.css'
const CreatePost = () => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('uncategorized');
  const [description, setDescription] = useState('');
  const [thumbnail, setThumbnail] = useState('');
   
  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
      ['link', 'image'],
      ['clean']
    ],
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image'
  ];

  const POST_CATEGORIES = ["Agriculture", "Business", "Education", "Entertainment", "Art", "Investment", "Uncategorized", "Weather"];

  return (
    <section className='create-post'>
      <div className='container' style={{flexDirection:"column", width:"80%"}}>
      <div className='text_post'>
          <h2 className='create1_post'>Create post</h2>
        <p className='error-message'>
          This is an error message
        </p>
      </div>
       
        <form className='form create-post__form'>
          <input type='text' placeholder='title' value={title} onChange={e => setTitle(e.target.value)} autoFocus />
          <select name='category' value={category} onChange={e => setCategory(e.target.value)}>
            {POST_CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
          </select>
          <ReactQuill modules={modules} formats={formats} value={description} onChange={setDescription}/>
          <input type='file' onChange={e => setThumbnail(e.target.files[0])} accept='png,jpeg,jpg'/>
          <button type='submit' className='btn primary button_create' style={{width:"37%"}}>Create</button>
        </form>
      </div>
    </section>
  );
};

export default CreatePost;