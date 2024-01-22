/*eslint-disable*/
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetail, createProductReview } from "../redux/actions/productActions"
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import Ratings from '../Components/Ratings';
import {resetProductReview} from "../redux/slices/productSlices/productReviewCreateSlice"

const ProductDetailPage = () => {
  const { id } = useParams()
	const dispatch = useDispatch()
  const navigate = useNavigate();

	const productDetail = useSelector((state) => state.productDetail);
  const { error, loading, product, smallImages } = productDetail;

  const productReview = useSelector((state) => state.productReview);
  const { error: reviewError, loading: reviewLoading, reviewSuccess } = productReview;

	const [selectedImage, setSelectedImage] = useState(product.main_image);

  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [qty, setQty] = useState(1)
  const [price, setPrice] = useState(product.price)

  useEffect(() => {
    if (reviewSuccess) {
      dispatch(resetProductReview())
      dispatch(fetchProductDetail(id))
    }
    if (product.id !== id) {
      dispatch(resetProductReview())
      dispatch(fetchProductDetail(id));
    }
  }, [dispatch, product.review, id, product.id, reviewSuccess]);

  useEffect(() => {
    setSelectedImage(product.main_image);
  }, [product.main_image]);

  const handleSmallImageClick = (smallImage) => {
		setSelectedImage(smallImage);
  };
  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createProductReview(
      id, { rating, comment }
    ))
    setComment('')
    // dispatch(fetchProductDetail(id));
  }
  const addToCartHandler = () => {
    navigate(`/cart/${id}?qty=${qty}`);
  }

  return (
    <div className='mt-32 mx-auto px-16'>
        <Link to='/products' className="btn btn-ghost mb-8">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
            Go Back
        </Link>
        {loading ? (
          <Loader />
        ): error ? (
          <Message color={'alert-error'}>{error}</Message>
        ) : (
          
      <div>
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="md:w-2/5">
            <img src={selectedImage} alt={product.name} className="w-full h-auto" />
              <div className="flex mt-2 justify-between max-w-full">
                {smallImages.map((smallImage, index) => (
                  <img
                    key={index}
                    src={smallImage}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-[23%] h-auto cursor-pointer"
                    onClick={() => handleSmallImageClick(smallImage)}
                  />
                ))}
              </div>
          </div>
    
          <div className="md:w-1/4 mx-4">
            <ul className="list-none p-0">
              <li>
                <h2 className="text-2xl font-bold mb-8">{product.name}</h2>
              </li>
              <hr className='pb-1'/>
              <li>
                <Ratings value={product.rating} edit={false} text={`${product.numReviews} reviews`} onChange={(newRating) => setRating(newRating)} color={'#f8e825'} />
              </li>
              <hr className='py-1 mt-1'/>
              <li>Price: ${product.price}</li>
              <hr className='py-1 mt-2'/>
              <li>Description: {product.description}</li>
            </ul>
          </div>
          <div className="md:w-1/4 mx-0">
            <ul className="list-none p-0">
              <li className="flex justify-between">
                <span>Price:</span>

                <strong>${product.price*qty}</strong> 
              </li>
              <hr className='mt-2 pb-2'/>
              <li className="flex justify-between">
                <span>Status:</span>
                {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
              </li>
              <hr className='mt-2 pb-2'/>
              {product.countInStock > 0 && (
                <li className="flex justify-between">
                  <span>Qty</span>
                  <select
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    className="block appearance-none w-2/6 bg-white border border-gray-300 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  >
                    {[...Array(product.countInStock).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </li>
              )}
              <li>
              <hr className='mt-2 pb-2'/>
                <button
                  className="w-full btn"
                  disabled={product.countInStock === 0}
                  type="button"
                  onClick={addToCartHandler}
                >
                  Add to Cart
                </button>
              </li>
            </ul>
          </div>
      </div>
        <div className="flex flex-col md:flex-row justify-between gap-8">
          <div className="md:w-2/5">
            <h3 className='text-xl font-bold py-8'>Reviews</h3>
            {product && product.reviews && product.reviews.length === 0 && <Message color={'alert-info'}>No Reviews</Message>}
            <div className="mx-0 mb-5">
              <ul className="list-none p-0">
              {product && product.reviews && product.reviews.map((review) => (
                <li key={review.id}>
                  <Ratings value={review.rating} edit={false}/>
                  <p>{review.createdAt.substring(0, 10)}</p>
                  <p className='mt-2'>{review.comment}</p>
                  <hr className='my-3'/>
                </li>
              ))}
              </ul>
            </div>
            
            <h3 className='text-xl font-bold py-8'>Write A Review</h3>
            {reviewSuccess && <Message color={'alert-success'}>Review Submitted</Message>}
            {reviewError && <Message color={'alert-error'}>{reviewError}</Message>}
    
            <form onSubmit={submitHandler}>
                <Ratings setRating={setRating} />
                <div className="form-group">
                  <textarea 
                  value={comment}
                  placeholder="Review"
                  className="textarea textarea-bordered textarea-md w-full"
                  onChange={(e) => setComment(e.target.value)}
                  >
                  </textarea>
               </div>
               {reviewLoading ? 
               <button className="btn">
                  <span className="loading loading-spinner"></span>
                    Submitting
                </button> : 
                <button 
               className="btn"
               type="submit"
               >
                Submit
               </button>}
            </form>
          </div>
        </div>
      </div>
      )}
    </div>
    )
  }
    
export default ProductDetailPage
