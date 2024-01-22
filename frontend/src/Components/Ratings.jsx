// import { useState, useEffect } from 'react';
/*eslint-disable*/
import PropTypes from 'prop-types';
import Rating from 'react-rating-stars-component';

const Ratings = ({ value, text, edit, setRating }) => {
  const handleRatingChange = (newRating) => {
    setRating(newRating)
  };

  return (
    <div className='flex items-center justify-between'>
      <Rating
        key={value}
        count={5}
        value={value || 0}
        size={24}
        activeColor="#ffd700"
        edit={edit}  
        isHalf={true}
        onChange={handleRatingChange}
      />
      <span><p>{text && text}</p></span>
    </div>
  )
}

Ratings.propTypes = {
	value: PropTypes.string,
  text: PropTypes.string,
  edit: PropTypes.string
  };

export default Ratings
