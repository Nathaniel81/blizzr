// import React from 'react'
/*eslint-disable*/
import products from "../products"


const ProductListPage = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 md:px-8 lg:px-16 mx-auto mt-32">
      {products.map((product) => (
        <div key={product._id} className="mb-8">
          <div className="card bg-base-100 shadow-xl">
            <figure>
              <img
                src={product.image}
                // src={require(product.image)}
                alt="Shoes"
                className="w-full h-56 object-cover"
              />
            </figure>
            <div className="card-body p-4">
              {/* <h2 className="card-title text-lg font-bold mb-2">Shoes!</h2>
              <p className="text-base text-gray-600 mb-4">
                If a dog chews shoes whose shoes does he choose?
              </p> */}
              <div className="card-actions flex justify-end">
                <button className="btn btn-primary">Buy Now</button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductListPage