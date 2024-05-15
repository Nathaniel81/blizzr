import PropTypes from 'prop-types';


const Message = ({ children, color }) => {
  return (
    <div role="alert" className={`alert ${color} my-1`}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
      <div className="p-2">{children}</div>
    </div>
  )
}

Message.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
  color: PropTypes.string,
};

export default Message;
