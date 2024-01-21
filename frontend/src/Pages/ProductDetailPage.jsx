/*eslint-disable*/
// import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProductDetail } from "../redux/actions/productActions"
// import Loader from '../components/Loader';
// import Message from '../components/Message';
// import Rating from '../components/Rating';
import Ratings from '../Components/Ratings';

const ProductDetailPage = () => {
  const { id } = useParams()
	const dispatch = useDispatch()
	const productDetail = useSelector((state) => state.productDetail);
  const { error, loading, product, smallImages } = productDetail;
	const [selectedImage, setSelectedImage] = useState(product.main_image);

  useEffect(() => {
    // Fetch product details only if the product ID has changed
    if (product.id !== id) {
      dispatch(fetchProductDetail(id));
    }
  }, [dispatch, id, product.id]);

  useEffect(() => {
    // Update selectedImage when product.main_image changes
    setSelectedImage(product.main_image);
  }, [product.main_image]);

  const handleSmallImageClick = (smallImage) => {
		setSelectedImage(smallImage);
	  };

  return (
	<div className='mt-32 mx-auto px-16'>
		<div className="flex flex-col md:flex-row justify-between gap-10">
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
                  <h3 className="text-xl font-bold">{product.name}</h3>
                </li>
                <li>
                  <Ratings product={product} text={`${product.numReviews} reviews`} color={'#f8e825'} />
                </li>
                <li>Price: ${product.price}</li>
                <li>Description: {product.description}</li>
              </ul>
            </div>
            <div className="md:w-1/4 mx-0">
              <ul className="list-none p-0">
                <li className="flex justify-between">
                  <span>Price:</span>
                  <strong>${product.price}</strong>
                </li>
                <li className="flex justify-between">
                  <span>Status:</span>
                  {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                </li>
                {product.countInStock > 0 && (
                  <li className="flex justify-between">
                    <span>Qty</span>
                    <select
                      // value={qty}
                      // onChange={(e) => setQty(e.target.value)}
                      className="block appearance-none w-1/2 bg-white border border-gray-300 rounded py-1 px-2 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
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
                  <button
                    className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    disabled={product.countInStock === 0}
                    type="button"
                  //   onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </li>
              </ul>
            </div>
		</div>
	</div>
  )
}

export default ProductDetailPage