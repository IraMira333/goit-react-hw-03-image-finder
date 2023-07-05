import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

export default class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.closeEscape);
    document.body.classList.toggle('overflow');
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.closeEscape);
    document.body.classList.toggle('overflow');
  }

  closeEscape = evt => {
    if (evt.code === 'Escape') {
      this.props.closeModalWindow();
    }
  };

  closeOverlay = evt => {
    if (evt.target === evt.currentTarget) {
      this.props.closeModalWindow();
    }
  };

  render() {
    const { largeImageURL, tags } = this.props.dataImage;
    return (
      <div className={css.overlay} onClick={this.closeOverlay}>
        <div className={css.modal}>
          <img src={largeImageURL} alt={tags} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  dataImage: PropTypes.shape({
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }),

  closeModalWindow: PropTypes.func.isRequired,
};
