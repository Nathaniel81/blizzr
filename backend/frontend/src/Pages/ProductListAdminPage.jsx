import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import { fetchProducts, deleteProduct } from '../redux/actions/productActions';
import { productDeleteReset } from '../redux/slices/productSlices/productDeleteSlice';
import { createProduct } from '../redux/actions/productActions';
import { productCreateReset } from '../redux/slices/productSlices/productCreateSlice';
import { fetchCategories } from '../redux/actions/productActions';


const ProductListAdminPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    let queryString = location.search || "";

    const userLogin = useSelector(state => state.userInfo);
    const { user } = userLogin;

    const productList = useSelector(state => state.products);
    const { 
      loading, 
      error, 
      products, 
      pages, 
      page 
    } = productList;

    const productDelete = useSelector(state => state.productDelete);
    const { 
      loading: loadingDelete, 
      error: errorDelete, 
      success: successDelete 
    } = productDelete;

    const productCreate = useSelector(state => state.productCreate);
    const { 
      loading: loadingCreate, 
      error: errorCreate, 
      success: successCreate, 
      product: createdProduct 
    } = productCreate;


    const createProductHandler = () => {
        dispatch(createProduct());
    }
    const deleteHandler = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            dispatch(deleteProduct(id));
        }
    }

    useEffect(() => {
        dispatch(productCreateReset());
        dispatch(fetchProducts(queryString));
        dispatch(fetchCategories());

        if (user && !user.isAdmin) {
            navigate('/login');
        }

        if (successCreate) {
            navigate(`/admin/product/${createdProduct.id}/edit`);
        } 
        if (successDelete || queryString){
            dispatch(fetchProducts(queryString));
            dispatch(productDeleteReset());
        }

    }, [dispatch, successDelete, navigate, successCreate, createdProduct.id, user, queryString]);

    return (
        <div className="mx-auto px-16 mt-8 overflow-x-auto">
          <div className='flex items-center'>
          <h1 className="text-2xl font-bold mb-4">Products</h1>
    
            <div className='ml-auto'>
              {/* <button
                className='bg-blue-500 text-white px-4 py-2 rounded-md my-3'
                onClick={createProductHandler}
              >
                <i className='fas fa-plus'></i> Create Product
              </button> */}
              <div className="card-actions flex items-center justify-between">
                <button className="btn btn-sm btn-outline"onClick={createProductHandler}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                  </svg>
                  Create Product
                </button>
              </div>
            </div>
          </div>
    
          {loadingDelete && <Loader />}
          {errorDelete && <Message color='{alert-error}'>{errorDelete}</Message>}
    
          {loadingCreate && <Loader />}
          {errorCreate && <Message color='{alert-error}'>{errorCreate}</Message>}
    
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <div>
              <table className='table table-zebra'>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NAME</th>
                    <th>PRICE</th>
                    <th>CATEGORY</th>
                    <th>BRAND</th>
                    <th></th>
                  </tr>
                </thead>
    
                <tbody>
                  {products && products.map(product => (
                    <tr key={product.id}>
                      <td className='px-4 py-2'>{product.id}</td>
                      <td className='px-4 py-2'>{product.name}</td>
                      <td className='px-4 py-2'>${product.price}</td>
                      <td className='px-4 py-2'>{product.category}</td>
                      <td className='px-4 py-2'>{product.brand}</td>
                      <td className='px-4 py-2 flex flex-row justify-center gap-1'>
                        <Link to={`/admin/product/${product.id}/edit`} className='join-item btn btn-square'>
                           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                             <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                           </svg>
                        </Link>
                        <div className='join-item btn btn-square' onClick={() => deleteHandler(product.id)}>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                          </svg>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <Paginate pages={pages} page={page} isAdmin={true} keyword={queryString} />
            </div>
          )}
        {/* <div className='px-16 mx-auto'><Paginate page={page} pages={pages} keyword={queryString} /></div> */}
        </div>
    )
};

export default ProductListAdminPage;
