import { useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieGrid from "../components/MovieGrid";
import Loader from "../components/Loader";

function Home() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const API_KEY = import.meta.env.VITE_OMDB_API_KEY;

  // Search movies
  const searchMovies = async (e) => {
    e.preventDefault();

    if (!search.trim()) {
      setError("Please enter a movie name.");
      setMovies([]);
      return;
    }

    fetchMovies(search);
  };

  // Fetch movies from OMDb
  const fetchMovies = async (keyword) => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(
        `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(
          keyword
        )}&type=movie`
      );

      const data = await response.json();

      if (data.Response === "True") {
        setMovies(data.Search);
      } else {
        setMovies([]);
        setError(data.Error || "No movies found.");
      }
    } catch (error) {
      setMovies([]);
      setError("Unable to connect to the movie API.");
    } finally {
      setLoading(false);
    }
  };

  // Category button
  const handleCategory = (category) => {
    setActiveCategory(category);

    if (category === "All") {
      if (search.trim()) {
        fetchMovies(search);
      } else {
        setError("Search for a movie first.");
      }
      return;
    }

    // Search category
    setSearch(category);
    fetchMovies(category);
  };

  const categories = [
    "All",
    "Action",
    "Comedy",
    "Drama",
    "Horror",
    "Sci-Fi",
  ];

  return (
    <main className="home">

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">

          <p className="small-title">
            WELCOME TO MOVIE EXPLORER
          </p>

          <h1>
            Discover Your
            <br />
            <span>Next Favorite Movie</span>
          </h1>

          <p className="hero-text">
            Search movies, explore details, check ratings and
            discover something amazing to watch.
          </p>

          <SearchBar
            search={search}
            setSearch={setSearch}
            onSearch={searchMovies}
          />

        </div>
      </section>

      {/* LOADING */}
      {loading && <Loader />}

      {/* ERROR */}
      {error && (
        <div className="error">
          ❌ {error}
        </div>
      )}

      {/* RESULTS */}
      {!loading && movies.length > 0 && (
        <section className="results">

          <h2>🎬 Movie Results</h2>

          {/* CATEGORY */}
          <div className="category-section">

            <h3>🎭 Browse by Category</h3>

            <div className="category-buttons">

              {categories.map((category) => (
                <button
                  key={category}
                  className={`category-button ${
                    activeCategory === category
                      ? "active-category"
                      : ""
                  }`}
                  onClick={() => handleCategory(category)}
                >
                  {category}
                </button>
              ))}

            </div>

          </div>

          {/* MOVIES */}
          <MovieGrid movies={movies} />

        </section>
      )}

    </main>
  );
}

export default Home;