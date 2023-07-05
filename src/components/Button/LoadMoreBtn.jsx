import React from 'react';
import PropTypes from 'prop-types';
import css from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ loadMore }) => {
  return (
    <button className={css.loadMore} type="button" onClick={loadMore}>
      Load more
    </button>
  );
};

LoadMoreBtn.propTypes = {
  loadMore: PropTypes.func.isRequired,
};

export default LoadMoreBtn;
