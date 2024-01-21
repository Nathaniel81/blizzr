import PropTypes from 'prop-types';
import Ratings  from './Ratings';
import { Link } from 'react-router-dom';

const Products = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className='cursor-pointer'>
      <div className="card bg-base-100 shadow-lg">
        <figure>
          <img
            src={product.main_image}
            alt="Shoes"
            className="w-full h-56 object-cover"
          />
        </figure>
        <div className="card-body p-4">
          <h2 className="card-title text-lg font-bold mb-2">{product.name}</h2>
          <Ratings product={product}/>
          <div className="card-actions flex items-center justify-between">
            <p className='font-semibold text-lg'>${product.price}</p>
            <button className="btn btn-sm btn-outline">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add To Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}

Products.propTypes = {
	product: PropTypes.shape({
     id: PropTypes.number.isRequired,
     name: PropTypes.string.isRequired,
     main_image: PropTypes.string.isRequired,
     price: PropTypes.string.isRequired,
     rating: PropTypes.string,
     numReviews: PropTypes.number.isRequired,
	}).isRequired,
  };
  

export default Products;
