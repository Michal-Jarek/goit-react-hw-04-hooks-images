import PropTypes from 'prop-types';

const Button = ({ title, onClick }) => (
  <button className="Button" onClick={onClick}>
    {title}
  </button>
);

export { Button };

Button.propTypes = {
  title: PropTypes.string,
  onClick: PropTypes.func,
};
