import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
import cards_data from '../../assets/cards/Cards_data'

const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);

  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3ZTdlM2EzOWEzYzM4NjNmMGNkYjkwZGY5NWZkZTk0MSIsIm5iZiI6MTc1Mjc1MzU0Ni4wNzIsInN1YiI6IjY4NzhlNThhMjZkMjZmNWVmNTA0ZWE1YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WkaspwZlLaLstAC10gGdJeXi0J-NyAkBEIsGrYkx2kI'
    }
  };

  const handleWheel = (evt) => {
    evt.preventDefault();
    cardsRef.current.scrollLeft += evt.deltaY;
  }
  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${category ? category : "now_playing"}?language=en-US&page=1`, options)
      .then(res => res.json())
      .then(res => setApiData(res.results))
      .catch(err => console.error(err));

    cardsRef.current.addEventListener('wheel', handleWheel)
  }, [])
  return (
    <div className='title-cards'>
      <h2>{title ? title : 'Popular on Netflix'}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.map((card, index) => {
          return <div className="card" key={index}>
            <img src={`https://image.tmdb.org/t/p/w500` + card.backdrop_path} alt="" />
            <p>{card.original_title}</p>
          </div>
        })}
      </div>
    </div>
  )
}

export default TitleCards
