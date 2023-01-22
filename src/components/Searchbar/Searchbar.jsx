import PropTypes from 'prop-types';

const Searchbar = ({ onSubmit }) => (
  <header className="Searchbar">
    <form className="SearchForm" onSubmit={onSubmit}>
      <button type="button" className="SearchForm-button">
        <span className="SearchForm-button-label">Search</span>
      </button>

      <input
        name="search"
        className="SearchForm-input"
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search images and photos"
      />
    </form>
  </header>
);

export { Searchbar };

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
}
