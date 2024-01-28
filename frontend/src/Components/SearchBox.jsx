import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/products/?keyword=${keyword}&page=1`);
    } else {
      navigate('/products');
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (keyword) {
        navigate(`/products/?keyword=${keyword}&page=1`);
      }
    }, 200);

    return () => clearTimeout(timeoutId);
  }, [keyword, navigate]);

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
