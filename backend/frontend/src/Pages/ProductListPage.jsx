import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Products from "../Components/Products";
import Loader from '../Components/Loader';
import Message from '../Components/Message';
import Paginate from '../Components/Paginate';
import TopProductsCarousel from '../Components/TopProductsCarousel';
import { fetchProducts } from '../redux/actions/productActions';
// import { fetchCategories } from '../redux/actions/productActions'


const ProductListPage = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.products);
  const { error, loading, products, page, pages } = productList

  // const productCategories = useSelector((state) => state.categories);
  // const { error:errorCategories, loading:loadingCategories, categories} = productCategories

  // const [searchParams] = useSearchParams();
  // const keyword = searchParams.get('keyword');
  // let queryString = searchParams.toString();
  const location = useLocation();
  let queryString = location.search;
  const noItemsFound = products && !loading && !error && products.length === 0;

  useEffect(() => {
      dispatch(fetchProducts(queryString));
      // dispatch(fetchCategories())
  }, [dispatch, queryString]);

  return (
    <div className='min-h-screen'>
      {!queryString && <TopProductsCarousel />}
      <h1 className="text-2xl font-extrabold px-4 md:px-8 lg:px-16 my-5">LATEST PRODUCTS</h1>
      {loading ? (<Loader />)
        : error ? (
          <div className='mt-32 px-16 mx-auto'>
            <Message color={'bg-red-100'}>{error}</Message>
          </div>
        )
        : (
          noItemsFound ? (
            <div className='mt-32 py-10 px-16 mx-auto'>
              <Message color={'bg-blue-100'}>No Items Found</Message>
            </div>
          )
          : (
            <div>
              {/* <h1 className='mt-16 px-16 mx-auto'>LATEST PRODUCTS</h1> */}
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

export default ProductListPage
