import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGallery.module.css';
import ImageGalleryItem from 'components/ImageGallery/ImageGalleryItem';

const ImageGallery = ({ images }) => {
  return (
    <ul className={css.imageGallery}>
      {images.map(({ id, tags, webformatURL, largeImageURL }) => {
        return (
          <li className={css.imageGalleryItem} key={id}>
            <ImageGalleryItem
              tags={tags}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
            />
          </li>
        );
      })}
    </ul>
  );
};
ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      tags: PropTypes.string.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};

export default ImageGallery;
