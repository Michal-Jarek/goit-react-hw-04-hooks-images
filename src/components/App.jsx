import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

import { useState, useEffect } from 'react';
import { inquiry } from 'utils/Api/Api';
import { Modal } from './Modal/Modal';

export const App = () => {
  const [photosArray, setPhotosArray] = useState([]);
  const [wanted, setWanted] = useState('');
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [isLoad, setIsLoad] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalPictureId, setModalPictureId] = useState(false);

  let picturePerPage = 12;

  // ******************* useEffects  *********************************
  useEffect(() => {
    window.addEventListener('keydown', handleKeyCloseModal);
    return () => window.removeEventListener('keydown', handleKeyCloseModal);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoad(() => true);
      try {
        const response = await inquiry(wanted, page + 1);
        const newPhotosArray = [...photosArray];
        setTotalPage(Math.ceil(response.totalHits / picturePerPage));
        newPhotosArray.push(...response.hits);
        setPhotosArray([...newPhotosArray]);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoad(() => false);
      }
    };
    if (wanted.length !== 0) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, wanted]);

  // ******************* END useEffects ***********************************

  // ******************* Additional METHODS **********************************

  const handleSubmit = async e => {
    e.preventDefault();
    setPhotosArray([]);
    setPage(1);
    setWanted(e.currentTarget.elements.search.value);
    e.target.reset();
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  const handleModalClick = id => {
    setModalVisible(!modalVisible);
    setModalPictureId(id);
  };

  const handleKeyCloseModal = e => {
    console.log(e.code);
    if (e.code === 'Escape') setModalVisible(false);
  };

  const handleCloseModal = e => {
    e.stopPropagation();
    if (modalVisible && e.target.className === 'Overlay')
      setModalVisible(!modalVisible);
  };

  const findObjectOfId = id => photosArray.find(photo => photo.id === id);

  // **************** END Additional METHODS *******************************

  return (
    <div className="App">
      <Searchbar onSubmit={handleSubmit} />
      <ImageGallery
        imageArray={photosArray}
        handleClick={handleModalClick}
        KeyDown={handleKeyCloseModal}
      />
      <Loader isLoad={isLoad} />
      {totalPage > page && isLoad === false && (
        <Button title="Load more" onClick={handleLoadMore} />
      )}
      {modalVisible && (
        <Modal
          object={findObjectOfId(modalPictureId)}
          handleClose={handleCloseModal}
        />
      )}
    </div>
  );
};
