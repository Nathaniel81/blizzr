import React, { useEffect } from 'react';
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

  return (
    <>
    {/* <h1 className='text-3xl mt-20'>PRODUCTS</h1> */}
    <div className="carousel w-full h-[550px] mt-20 mx-auto px-16">
      {loading ? (
        <Loader />
      ) : error ? (
        <Message>{error}</Message>
      ) : (
        
          <div className="carousel carousel-center rounded-sm">
          {products.map((product, index) => (
            <div id={index} className="carousel-item relative w-full flex flex-row items-center justify-center bg-slate-600" key={index}>
              <div className="flex flex-col h-full items-center justify-center gap-3">
                <div className="text-3xl font-bold text-slate-50">{product.name + " $" + (product.price)}</div>
                <img src={product.main_image} className="w-[400px] h-[400px] border rounded-full" />
              </div>
                <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
                  <a href={""} className="btn btn-circle">❮</a> 
                  <a href={`#${index+1}`} className="btn btn-circle">❯</a>
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
