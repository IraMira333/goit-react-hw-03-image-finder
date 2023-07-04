import React, { Component } from 'react';
import Searchbar from './Searchbar/Searchbar';
import { searchImages, imagesPerPage } from './API/Api';
import { Vortex } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImageGallery from './ImageGallery/ImageGallery';

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

  async componentDidMount() {
    try {
      this.setState({ isLoading: true });
      const respImgs = await searchImages();
      const images = respImgs.hits;

      this.setState({ images });
      toast.success(`We found ${respImgs.total} images`, toastConfig);
    } catch (error) {
      this.setState({ error: error.message });
      toast.error(error.message, toastConfig);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  searchImagesInput = query => {
    if (this.state.query === query) {
      return;
    }
    this.setState({ query, page: 1, images: [] });
  };

  // loadMor = () => {
  //   this.setState(prevState => {
  //     return {
  //       page: prevState.page + 1,
  //     };
  //   });
  // };
  // };

  render() {
    return (
      <div>
        <Searchbar searchImagesInput={this.searchImagesInput} />
        <h2>I'm here</h2>
        {this.state.error !== null && <p>{this.state.error}</p>}
        {this.state.isLoading && (
          <Vortex
            visible={true}
            height="80"
            width="80"
            ariaLabel="vortex-loading"
            wrapperStyle={{}}
            wrapperClass="vortex-wrapper"
            colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
          />
        )}
        {this.state.images.length > 0 &&
          this.state.images.map(({ id, tags, webformatURL, largeImageURL }) => {
            return <div key={id}>{tags}</div>;
          })}
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
