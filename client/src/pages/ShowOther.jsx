import React from 'react';
import './ShowOther.css';
import Thumbnail1 from '../image/blog1.jpg';
import Thumbnail2 from '../image/blog2.jpg';
import Thumbnail3 from '../image/blog3.jpg';
import AuthorImage from '../image/author1.jpg'; 

const cardData = [
  {
    title: "Card 1",
    text: "Some quick example text for the first card.",
    imgSrc: Thumbnail1,
  },
  {
    title: "Card 2",
    text: "Some quick example text for the second card.",
    imgSrc: Thumbnail2,
  },
  {
    title: "Card 3",
    text: "Some quick example text for the third card.",
    imgSrc: Thumbnail3,
  }
];

const ShowOther = () => {
  return (
    <div className="container">
      {cardData.map((card, index) => (
        <div className="card" key={index}>
          <img
            className="card-img-top"
            src={card.imgSrc}
            alt={`Card image cap ${index}`}
          />
          <div className="card-body">
            <h5 className="card-title">{card.title}</h5>
            <p className="card-text">{card.text}</p>
          </div>
          <ul className="list-group list-group-flush">
            <img className='author-profile-img' src={AuthorImage} alt={`Author image ${index}`}/>
            <small className="author-text">by Ernest Achiver</small>  
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ShowOther;
