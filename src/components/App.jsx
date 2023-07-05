import React, { Component } from 'react';
import { searchImages } from '../API/Api';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from './ImageGallery/ImageGallery';
import Searchbar from './Searchbar/Searchbar';
import LoadMoreBtn from './Button/LoadMoreBtn';
import Loader from './Loader/Loader';

const toastConfig = {
  position: 'top-center',
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'colored',
};

export class App extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    totalImages: 0,
    isLoading: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.getRequest();
    }
  }

  searchImagesInput = query => {
    if (this.state.query === query) {
      return;
    }
    this.setState({ query, page: 1, images: [], totalImages: 0 });
  };

  handleBtnClick = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  async getRequest() {
    try {
      this.setState({ isLoading: true });

      const {
        hits: images,
        total,
        totalHits: totalImages,
      } = await searchImages(this.state.query, this.state.page);

      if (!totalImages) {
        toast.warning(`No images found`, toastConfig);
        return;
      }

      if (totalImages > 0 && this.state.page === 1) {
        toast.success(`We found ${total} images`, toastConfig);
      }
      const shortimages = images.map(
        ({ id, tags, largeImageURL, webformatURL }) => {
          return { id, tags, largeImageURL, webformatURL };
        }
      );
      console.log(shortimages);
      this.setState(prevState => ({
        images: [...prevState.images, ...shortimages],
        totalImages,
      }));
    } catch (error) {
      this.setState({ error: error.message });
      toast.error(error.message, toastConfig);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  loadMore = () => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  render() {
    const { images, totalImages, isLoading } = this.state;
    return (
      <div>
        <Searchbar onSubmit={this.searchImagesInput} />

        {isLoading && <Loader />}
        {images.length > 0 && <ImageGallery images={images} />}
        {!isLoading && images.length !== totalImages && (
          <LoadMoreBtn loadMore={this.loadMore} />
        )}
        {/* {images.length > 0 &&
          totalImages / imagesPerPage > 1 &&
          Math.ceil(totalImages / imagesPerPage) !== page && (
            <LoadMoreBtn loadMore={this.loadMore} />
          )} */}
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </div>
    );
  }
}
