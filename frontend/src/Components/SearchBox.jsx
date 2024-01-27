import { useState } from 'react'
// import { Button, Form } from 'react-bootstrap'
import { useNavigate, useLocation, useParams } from 'react-router-dom'
import { useDispatch } from 'react-redux'
// import { listProducts } from '../actions/productActions'

const SearchBox = () => {
	const [keyword, setKeyword] = useState("")
	const navigate = useNavigate()
	// const query = useQuery();
	// // const dispatch = useDispatch();
	// const qty = Number(query.get('qty'))
	// // const qty = Number(new URLSearchParams(window.location.search).get('qty'));
	// console.log(history.location.pathname)
	// function useQuery() {
	// 	return new URLSearchParams(useLocation().search);
	// }
	const submitHandler = (e) => {
		e.preventDefault()
		if (keyword) {
        //   console.log('Searching..', keyword)
          navigate(`/products/?keyword=${keyword}&page=1`)
		} else {
			navigate('/products')
		}
	}
  return (
	<>
      <form onSubmit={submitHandler}>
        <div className="form-control">
          <input 
          type="text" 
          placeholder="Search" 
          className="input input-bordered w-24 md:w-auto" 
          onChange={(e) => setKeyword(e.target.value)}
          />
        </div>
      </form>
	</>
  )
}

export default SearchBox