import React, { useEffect, useRef } from 'react';
import './TitleCards.css';
import cards_data from '../../assets/cards/Cards_data'

const TitleCards = ({ title, category }) => {
  const cardsRef = useRef();
  const handleWheel = (evt) => {
    evt.preventDefault();
    cardsRef.current.scrollLeft += evt.deltaY;
  }
  useEffect(() => {
    cardsRef.current.addEventListener('wheel', handleWheel)
  }, [])
  return (
    <div className='title-cards'>
      <h2>{title ? title : 'Popular on Netflix'}</h2>
      <div className="card-list" ref={cardsRef}>
        {cards_data.map((card, index) => {
          return <div className="card" key={index}>
            <img src={card.image} alt="" />
          </div>
        })}
      </div>
    </div>
  )
}

export default TitleCards
