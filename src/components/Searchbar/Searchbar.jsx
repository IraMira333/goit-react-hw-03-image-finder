import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './Searchbar.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class Searchbar extends Component {
  state = {
    searching: '',
  };

  handleChangeInput = e => {
    this.setState({ searching: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();
    if (this.state.searching.trim() === '') {
      toast.warn('Please enter a request!', {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
      return;
    }
    this.props.onSubmit(this.state.searching.trim());
  };

  render() {
    return (
      <header className={css.searchbar}>
        <form className={css.searchForm} onSubmit={this.onSubmit}>
          <button type="submit" className={css.searchFormBtn}>
            <span className={css.searchFormBtnLabel}>Search</span>
          </button>

          <input
            className={css.searchFormBtnInput}
            type="text"
            value={this.state.searching}
            onChange={this.handleChangeInput}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
