import PropTypes from 'prop-types';
import Ratings  from './Ratings';
import { Link } from 'react-router-dom';
import { addToCart } from '../redux/actions/cartActions';
import { useDispatch } from 'react-redux'
import { toast } from "react-toastify";


const Products = ({ product }) => {
  const dispatch = useDispatch();

  const addToCartHandler = (e) => {
    e.stopPropagation();
    e.preventDefault();
    dispatch(addToCart(product.id, 1));
    toast.success("Item added to cart!");
  }

  return (
    <Link to={`/product/${product.id}`} className='cursor-pointer'>
      <div className="card bg-base-100 shadow-lg">
        <figure>
          <img
            src={product.images[0]}
            alt="Shoes"
            className="w-full h-56 object-contain"
          />
        </figure>
        <div className="card-body p-4">
          <h2 className="card-title text-lg font-bold mb-2">{product.name}</h2>
          <Ratings
          value={parseInt(product.rating, 10)}
          edit={false}
          text={`${product.numReviews} reviews`}
          />
          <div className="card-actions flex items-center justify-between">
            <p className='font-semibold text-lg'>${product.price}</p>
            <button className="btn btn-sm btn-outline"onClick={addToCartHandler}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
              Add to Cart
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
     images: PropTypes.string.isRequired,
     price: PropTypes.string.isRequired,
     rating: PropTypes.string,
     numReviews: PropTypes.number.isRequired,
  }).isRequired,
};

export default Products;
