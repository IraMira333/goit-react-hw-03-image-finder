import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'components/Modal/Modal';
import css from './ImageGallery.module.css';

export default class ImageGalleryItem extends Component {
  state = {
    openModalWindow: false,
  };

  showModalWindow = () => {
    this.setState({ openModalWindow: true });
  };

  closeModalWindow = () => {
    this.setState({ openModalWindow: false });
  };

  render() {
    const { tags, webformatURL, largeImageURL } = this.props;
    return (
      <>
        <img
          onClick={this.showModalWindow}
          className={css.galleryItemImage}
          src={webformatURL}
          alt={tags}
        />
        {this.state.openModalWindow === true && (
          <Modal
            dataImage={{ tags, largeImageURL }}
            closeModalWindow={this.closeModalWindow}
          />
        )}
      </>
    );
  }
}

ImageGalleryItem.propTypes = {
  tags: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
