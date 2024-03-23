import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiSearch } from "react-icons/fi";


const SearchBox = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  let path = location.pathname;

  // const submitHandler = (e) => {
  //   e.preventDefault();
  //   if (keyword && (path === '/products' || path === '/products/')) {
  //     navigate(`/products/?keyword=${keyword}&page=1`);
  //   } else if (keyword && path === '/admin/productlist'){ 
  //     navigate(`/admin/productlist/?keyword=${keyword}&page=1`);
  //   } else {
  //   navigate('/products');
  // }
  // };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (keyword && (path === '/products' || path === '/products/')) {
        navigate(`/products/?keyword=${keyword}&page=1`);
      } 
      if (keyword && (path === '/admin/productlist' || path === '/admin/productlist/')){
        navigate(`/admin/productlist/?keyword=${keyword}&page=1`);
      }
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [keyword, navigate, path]);

  const changeHandler = (e) => {
    // let keyword = e.target.value;
    setKeyword(e.target.value)
  };

  return (
    <div className="w-full bg-white hidden md:flex items-center gap-x-1 border-[1px] border-lightText/50 rounded-full px-4 py-1.5 focus-within:border-orange-600 group">
      <FiSearch className="text-gray-500 group-focus-within:text-darkText duration-200" />
      <input
        type="text"
        placeholder="Search for products"
        className="placeholder:text-sm flex-1 outline-none"
        onChange={changeHandler}
      />
    </div>
  );
};

export default SearchBox;
