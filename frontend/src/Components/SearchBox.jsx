import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const SearchBox = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  let path = location.pathname;
  console.log(path)

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword && (path === '/products' || path === '/products/')) {
      navigate(`/products/?keyword=${keyword}&page=1`);
    } else if (keyword && path === '/admin/productlist'){ 
      navigate(`/admin/productlist/?keyword=${keyword}&page=1`);
    } else {
    navigate('/products');
  }
  };

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
    setKeyword(e.target.value);
  };

  return (
    <>
      <form onSubmit={submitHandler}>
        <div className="form-control">
          <input
            type="text"
            placeholder="Search"
            className="input input-bordered w-24 md:w-auto"
            onChange={changeHandler}
          />
        </div>
      </form>
    </>
  );
};

export default SearchBox;
