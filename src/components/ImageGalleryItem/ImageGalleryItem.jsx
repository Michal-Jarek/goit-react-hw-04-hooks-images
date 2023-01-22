import PropTypes from 'prop-types';

const ImageGalleryItem = ({ imageId, src, alt, handleClick }) => (
  <li className="ImageGalleryItem">
    <img
      onClick={() => handleClick(imageId)}
      id={imageId}
      className="ImageGalleryItem-image"
      src={src}
      alt={alt}
    />
  </li>
);

export { ImageGalleryItem };

ImageGalleryItem.propTypes = {
  imageId: PropTypes.number,
  src: PropTypes.string,
  alt: PropTypes.string,
  handleClick: PropTypes.func,
};