import {BiSearch} from "react-icons/bi"
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useDebounce from "../hooks/useDebounce";

const SearchBar = () => {
  const [keyword, setKeyword] = useState('');
  const [hasInteracted, setHasInteracted] = useState(false);
  const debouncedKeyword = useDebounce(keyword, 500);
  const navigate = useNavigate();
  const location = useLocation();
  let path = location.pathname;

  useEffect(() => {
    if (hasInteracted) {
      if (path === '/' || path === '') {
        navigate(`?keyword=${debouncedKeyword}&page=1`);
        if (keyword === '' && hasInteracted) setHasInteracted(false);
      } 
      if (path === '/admin/productlist' || path === '/admin/productlist/'){
        navigate(`/admin/productlist/?keyword=${debouncedKeyword}&page=1`);
      }
    }
    //eslint-disable-next-line
  }, [debouncedKeyword, navigate, path]);

  return (
    <div className="ml-4 flex-grow">
        <div className='flex items-center bg-gray-100 p-0 md:p-2 rounded-full'>
            <button><BiSearch size={20} className = 'opacity-50' /></button>
            <input 
              type="text"
              className='outline-none w-full bg-transparent ml-2 caret-blue-500 placeholder:font-light placeholder:text-gray-600 text-[15px]'
              placeholder='Search'
              autoComplete='off'
              value={keyword}
              onChange={(e) => {
                const { value } = e.target;
                setKeyword(value);
                setHasInteracted(true);
              }}
            />
        </div>
    </div>
  )
}
export default SearchBar
