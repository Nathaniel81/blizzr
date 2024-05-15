import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useSearchParams } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import Products from '../components/Products';
import TopProductsCarousel from '../components/TopProductsCarousel';
import { fetchProducts } from '../redux/actions/productActions';


const Home = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.products);
  const { error, loading, products, page, pages } = productList;

  const [searchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');
  const location = useLocation();
  let queryString = location.search;
  const noItemsFound = products && !loading && !error && products.length === 0;

  useEffect(() => {
      dispatch(fetchProducts(queryString));
  }, [dispatch, queryString]);

  return (
    <div className=''>
      {!keyword && <TopProductsCarousel />}
      <h1 className="text-2xl font-extrabold px-4 md:px-8 lg:px-16 my-4">LATEST PRODUCTS</h1>
      {loading ? (<Loader />)
        : error ? (
          <div className='px-16 mx-auto'>
            <Message color={'bg-red-100'}>{error}</Message>
          </div>
        )
        : (
          noItemsFound ? (
            <div className='mt-0 py-32 px-16 mx-auto'>
              <Message color={'bg-blue-100'}>No Items Found</Message>
            </div>
          )
          : (
            <div className='mt-5'>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 md:px-8 lg:px-16 mx-auto">
                {products && products.map((product) => (
                  <div key={product.id} className="mb-8">
                    <Products product={product} />
                  </div>
                ))}
              </div>
              <div className='px-16 mx-auto'>
                <Paginate 
                  page={page} 
                  pages={pages} 
                  keyword={queryString}
                  selectedCategory={queryString}
                />
              </div>
            </div>
          )
        )
      }
    </div>
  )
};

export default Home
