import { useState } from 'react';
import PropTypes from 'prop-types';
import Rating from 'react-rating-stars-component';

const Ratings = ({ product }) => {
  const [rating, setRating] = useState(product.rating || 0);

  const handleRatingChange = (newRating) => {
    setRating(newRating);
  };
  return (
    <div className='flex items-center justify-between'>
    <Rating
      count={5}
      value={rating}
      size={24}
      activeColor="#ffd700"
      edit={true}  
      isHalf={true}
      onChange={handleRatingChange}
    />
    <span><p>{`${product.numReviews} reviews`}</p></span>
  </div>
  )
}

Ratings.propTypes = {
  product: PropTypes.shape({
    rating: PropTypes.number,
    numReviews: PropTypes.number.isRequired,
  }).isRequired,
};


export default Ratings