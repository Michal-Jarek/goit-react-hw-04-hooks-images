import PropTypes from 'prop-types';

const Modal = ({ object, handleClose }) => {
  return (
    <div className="Overlay" onClick={handleClose}>
      <div className="Modal">
        <img src={object.largeImageURL} alt={object.tags} />
      </div>
    </div>
  );
};

export { Modal };

Modal.propTypes = {
    object: PropTypes.object.isRequired,
    handleClose: PropTypes.func,
};
