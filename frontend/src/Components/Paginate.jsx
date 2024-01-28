import { Link, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

function Paginate({ pages, page, keyword = '', isAdmin = false }) {
  const location = useLocation();

  if (keyword) {
    keyword = keyword.split('?keyword=')[1].split('&')[0];
  }

  return (
    pages > 1 && (
      <nav className="flex justify-start my-4">
        <div className="join">
          {[...Array(pages).keys()].map((x) => (
            <div key={x + 1} className="page-item">
              <Link
                to={{
                  pathname: location.pathname,
                  search: !isAdmin
                    ? `?keyword=${keyword}&page=${x + 1}`
                    : `/admin/productlist/?keyword=${keyword}&page=${x + 1}`,
                }}
                className={`${
                  x + 1 === page
                    && 'btn-active'
                } px-4 py-2 checked join-item btn btn-square`}
              >
                {x + 1}
              </Link>
            </div>
          ))}
        </div>
      </nav>
    )
  );
}

Paginate.propTypes = {
	page: PropTypes.string,
  pages: PropTypes.string,
  keyword: PropTypes.string,
  isAdmin: PropTypes.string

};

export default Paginate;
