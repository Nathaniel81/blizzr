import { useEffect, useState } from 'react';
import { listTopProducts } from '../redux/actions/productActions';
import { useSelector, useDispatch } from 'react-redux';
import Loader from './Loader';
import Message from './Message';

const TopProductsCarousel = () => {
  const dispatch = useDispatch();
  const topProducts = useSelector((state) => state.topProducts);
  const { products, loading, error } = topProducts;

  useEffect(() => {
    dispatch(listTopProducts());
  }, [dispatch]);
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : products.length - 1));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % products.length);
  }

  return (
    <>
    <div className="carousel w-full h-[550px] mt-20 mx-auto px-16">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        <div className="carousel carousel-center rounded-sm">
          {products.map((product, index) => (
              <div
                id={index}
                className={`carousel-item relative w-full flex flex-row items-center justify-center bg-slate-600 ${index === activeIndex ? 'active' : ''}`}
                key={index}
              >
              <div className="flex flex-col h-full items-center justify-center gap-3">
                <div className="text-3xl font-bold text-slate-50">{product.name + " $" + (product.price)}</div>
                <img src={product.main_image} className="w-[400px] h-[400px] border rounded-full" />
              </div>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <button onClick={handlePrev} className="btn btn-circle">❮</button> 
                  <button onClick={handleNext} className="btn btn-circle">❯</button>
               </div>
           </div> 
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default TopProductsCarousel;
