import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';

import { Component } from 'react';
import { inquiry } from 'utils/Api/Api';
import { Modal } from './Modal/Modal';

export class App extends Component {
  state = {
    photosArray: [],
    wanted: '',
    page: 1,
    totalPage: 0,
    isLoad: false,
    modalVisible: false,
    modalPictureId: '',
  };

  // ******************* Additional METHODS **********************************

  handleSubmit = async e => {
    e.preventDefault();
    let totalPage = 0;
    let picturePerPage = 12;

    this.setState(prevState => ({ page: 1, isLoad: !prevState.isLoad }));
    let form = e.currentTarget.elements.search.value;

    try {
      const response = await inquiry(form, this.state.page);
      totalPage = Math.ceil(response.totalHits / picturePerPage);

      this.setState(() => ({
        wanted: form,
        photosArray: [...response.hits],
        totalPage: totalPage,
      }));
    } catch (e) {
      console.log(e);
    } finally {
      this.setState(prevState => ({
        isLoad: !prevState.isLoad,
      }));
      e.target.reset();
    }
  };

  handleLoadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };
  handleModalClick = id => {
    this.setState(prevState => ({
      modalVisible: !prevState.modalVisible,
      modalPictureId: id,
    }));
  };
  handleKeyCloseModal = e => {
    if (e.code === 'Escape' && this.state.modalVisible)
      this.setState(prevState => ({
        modalVisible: !prevState.modalVisible,
      }));
  };
  handleCloseModal = e => {
    e.stopPropagation();
    if (this.state.modalVisible && e.target.className === 'Overlay')
      this.setState(prevState => ({
        modalVisible: !prevState.modalVisible,
      }));
  };

  findObjectOfId = id => this.state.photosArray.find(photo => photo.id === id);

  // **************** END Additional METHODS *******************************

  // ******************* COMPONENT METHODS *********************************
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyCloseModal);
  }

  async componentDidUpdate(prevProps, prevState) {
    if (prevState.page !== this.state.page) {
      this.setState(prevState => ({ isLoad: !prevState.isLoad }));
      try {
        const response = await inquiry(this.state.wanted, this.state.page);
        const newPhotosArray = [...this.state.photosArray];
        newPhotosArray.push(...response.hits);

        this.setState(prevState => ({
          photosArray: [...newPhotosArray],
        }));
      } catch (e) {
        console.log(e);
      } finally {
        this.setState(prevState => ({
          isLoad: !prevState.isLoad,
        }));
      }
    }
  }

  // ******************* END COMPONENT METHODS ***********************************

  render() {
    return (
      <div className="App">
        <Searchbar onSubmit={this.handleSubmit} />
        <ImageGallery
          imageArray={this.state.photosArray}
          handleClick={this.handleModalClick}
          KeyDown={this.handleKeyCloseModal}
        />
        <Loader isLoad={this.state.isLoad} />
        {this.state.totalPage > this.state.page &&
          this.state.isLoad === false && (
            <Button title="Load more" onClick={this.handleLoadMore} />
          )}
        {this.state.modalVisible && (
          <Modal
            object={this.findObjectOfId(this.state.modalPictureId)}
            handleClose={this.handleCloseModal}
          />
        )}
      </div>
    );
  }
}
