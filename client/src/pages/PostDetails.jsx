import React from 'react'
import { CgDetailsLess } from 'react-icons/cg'
import PostAuthor from '../components/PostAuthor'
import { Link } from 'react-router-dom'
import Thumbnail from "../image/blog1.jpg";
import { LoremIpsum } from 'lorem-ipsum';
function PostDetails() {
  return (
    <section className='post-details'>
      <div className='container post-detail_container'>
        <div className='post-detail_header'>
          <PostAuthor/>
          <div className='post-details_buttons'>
            <Link to={'/posts/wereer/edit'} className='btn sm primary'>Edit</Link>
             <Link to={'/posts/wereer/delete'} className='btn sm danger'>delete</Link>
          </div>
        </div>
        <h1>This is the post title!</h1>
        <div className='post-detail_thumbnail'>
          <img src={Thumbnail} alt=''/>
        </div>
        <div className='para'>
          <p>Floriography is a coded communication where each flower and color holds symbolic meaning. Stemming back 
        thousands of years, the language of flowers reached a pinnacle of popularity in the Victorian era. 
        Intentional flower combinations allow the giver to communicate without uttering a word.</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.Quisque vitae risus euismod, pellentesque magna vel, viverra odio.Sed id ante non orci tincidunt tincidunt.Vivamus vel neque arcu.Aliquam erat volutpat.
          Etiam ac nulla ut justo interdum ultricies.Nulla facilisi.
          Duis fermentum lectus a odio dapibus facilisis.
        </p>
         <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.Quisque vitae risus euismod, pellentesque magna vel, viverra odio.Sed id ante non orci tincidunt tincidunt.Vivamus vel neque arcu.Aliquam erat volutpat.Etiam ac nulla ut justo interdum ultricies.Nulla facilisi.
           Duis fermentum lectus a odio dapibus facilisis. </p>
         <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit.Quisque vitae risus euismod, pellentesque magna vel, viverra odio.Sed id ante non orci tincidunt tincidunt.Vivamus vel neque arcu.Aliquam erat volutpat.Etiam ac nulla ut justo interdum ultricies.Nulla facilisi.
         Duis fermentum lectus a odio dapibus facilisis </p>
         <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.Quisque vitae risus euismod, pellentesque magna vel, viverra odio.
          Sed id ante non orci tincidunt tincidunt.Vivamus vel neque arcu.Aliquam erat volutpat.Etiam ac nulla ut justo interdum ultricies.
          Nulla facilisi.Duis fermentum lectus a odio dapibus facilisis
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.Quisque vitae risus euismod, pellentesque magna vel, viverra odio.Sed id ante non orci tincidunt tincidunt.Vivamus vel neque arcu.
          Aliquam erat volutpat.Etiam ac nulla ut justo interdum ultricies.Nulla facilisi.
          Duis fermentum lectus a odio dapibus facilisis
         </p>
        </div>
        

         
      </div>
    </section>
  )
}

export default PostDetails