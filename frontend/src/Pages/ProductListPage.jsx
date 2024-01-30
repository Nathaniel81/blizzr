/*eslint-disable*/
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
// import products from "../products"
import Products from "../Components/Products";
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import { fetchProducts } from '../redux/actions/productActions';
import Paginate from '../Components/Paginate';

const ProductListPage = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.products);
  const { error, loading, products, page, pages } = productList

  // const [searchParams] = useSearchParams();
  // const keyword = searchParams.get('keyword');
  // let queryString = searchParams.toString();
  const location = useLocation();
  let queryString = location.search;
  const noItemsFound = products && !loading && !error && products.length === 0;

  useEffect(() => {
      dispatch(fetchProducts(queryString));
  }, [dispatch, queryString]);
  return (
    loading ? (<Loader />) : (
      error ? (
        <div className='mt-32 py-10 px-16 mx-auto'>
          <Message color={'alert-error'}>{error}</Message>
        </div>
      ): (
        noItemsFound ? (
          <div className='mt-32 py-10 px-16 mx-auto'>
            <Message color={'alert-error'}>No Items Found</Message>
          </div>
        ):(
          <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 md:px-8 lg:px-16 mx-auto mt-32">
            {products && products.map((product) => (
              <div key={product.id} className="mb-8">
                <Products product={product} />
              </div>
            ))}
          </div>
          <div className='px-16 mx-auto'><Paginate page={page} pages={pages} keyword={queryString} /></div>
      </>
        )
      )
    )
  );
};

export default ProductListPage