// import React from 'react'
/*eslint-disable*/
import products from "../products"
import Products from "../Components/Products";

const ProductListPage = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 md:px-8 lg:px-16 mx-auto mt-32">
      {products.map((product) => (
        <div key={product._id} className="mb-8">
          <Products product={product} />
        </div>
      ))}
    </div>
  );
};

export default ProductListPage