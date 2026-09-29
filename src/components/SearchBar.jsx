function SearchBar({ search, setSearch, onSearch }) {
  return (
    <form className="search-form" onSubmit={onSearch}>
      <input
        type="text"
        placeholder="Search for a movie..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <button type="submit">
        🔍 Search
      </button>
    </form>
  );
}

export default SearchBar;