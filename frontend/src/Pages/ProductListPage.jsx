/*eslint-disable*/
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
// import products from "../products"
import Products from "../Components/Products";
import Loader from '../Components/Loader';
import { fetchProducts } from '../redux/actions/productActions';

const ProductListPage = () => {
  const dispatch = useDispatch();
  const productList = useSelector((state) => state.products);
  const { error, loading, products } = productList

  useEffect(() => {
      dispatch(fetchProducts());
  }, [dispatch]);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 md:px-8 lg:px-16 mx-auto mt-32">
      {products && products.map((product) => (
        <div key={product.id} className="mb-8">
          <Products product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductListPage