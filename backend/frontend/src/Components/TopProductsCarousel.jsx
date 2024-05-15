import { useEffect } from 'react';
import { listTopProducts } from '../redux/actions/productActions';
import { useSelector, useDispatch } from 'react-redux';
import Loader from './Loader';
import Message from './Message';
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"
import { Link } from 'react-router-dom';


const TopProductsCarousel = () => {
  const dispatch = useDispatch();
  const topProducts = useSelector((state) => state.topProducts);
  const { 
    products, 
    loading, 
    error 
  } = topProducts;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);

  return (
    <div className="w-full mt-1 mx-auto px-16">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <div className='relative overflow-hidden'>
          <Carousel 
            showArrows={true} 
            autoPlay={true} 
            interval={3000}
            infiniteLoop={true} 
            showThumbs={false}
            showStatus={false}
            showIndicators={false}
          >
            {products.map((product, index) => (
              <div 
                key={index}
                className='relative w-full flex items-center justify-center bg-slate-600 rounded-none'
              >
                <Link to={`/product/${product.id}`} className="flex flex-col h-[400px] items-center justify-center gap-3">
                  <div className="text-3xl font-bold text-slate-50">{product.name} ${product.price}</div>
                  <img src={product.images[0]} className="border rounded-full transition duration-500 ease-in-out transform hover:scale-105" alt={product.name} style={{width: '300px', height: '300px'}} />
                </Link>
              </div>
            ))}
          </Carousel>
        </div> 
      )}
    </div>
  );
};

export default TopProductsCarousel;
