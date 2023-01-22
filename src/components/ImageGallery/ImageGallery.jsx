import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';

import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';

const ImageGallery = ({ imageArray, handleClick }) => {
  return (
    <ul className="ImageGallery">
      {imageArray.map(({ id, webformatURL, tags }) => (
        <ImageGalleryItem
          handleClick= {handleClick}
          key={nanoid()}
          imageId={id}
          src={webformatURL}
          alt={tags}
        />
      ))}
    </ul>
  );
};
export { ImageGallery };

ImageGallery.propTypes = {
  imageArray: PropTypes.array,
  handleClick: PropTypes.func,
};
