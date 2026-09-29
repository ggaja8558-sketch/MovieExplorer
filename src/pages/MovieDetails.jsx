import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Loader from "../components/Loader";

function MovieDetails() {
  const { id } = useParams();

  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const apiKey = import.meta.env.VITE_OMDB_API_KEY;

        if (!apiKey) {
          setError("API key is missing. Please check your .env file.");
          setLoading(false);
          return;
        }

        const url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${id}&plot=full`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.Response === "True") {
          setMovie(data);
        } else {
          setError(data.Error || "Movie not found.");
        }
      } catch (err) {
        setError("Something went wrong while loading movie details.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <main className="details-page">
        <Link to="/" className="back-button">
          ← Back to Home
        </Link>

        <div className="error">
          ❌ {error}
        </div>
      </main>
    );
  }

  if (!movie) {
    return (
      <main className="details-page">
        <div className="error">
          ❌ Movie details are not available.
        </div>
      </main>
    );
  }

  return (
    <main className="details-page">

      <Link to="/" className="back-button">
        ← Back to Search
      </Link>

      <section className="movie-details">

        <div className="poster-section">
          <img
            src={
              movie.Poster && movie.Poster !== "N/A"
                ? movie.Poster
                : "https://via.placeholder.com/400x600?text=No+Poster"
            }
            alt={movie.Title}
          />
        </div>

        <div className="details-content">

          <p className="details-type">
            {movie.Type}
          </p>

          <h1>{movie.Title}</h1>

          <p className="subtitle">
            {movie.Year} • {movie.Runtime} • {movie.Rated}
          </p>

          <div className="rating-box">
            ⭐ IMDb Rating:
            <strong> {movie.imdbRating || "N/A"}</strong>
            /10
          </div>

          <p className="plot">
            {movie.Plot || "Plot information is not available."}
          </p>

          <div className="info-grid">

            <div>
              <strong>Genre</strong>
              <p>{movie.Genre || "N/A"}</p>
            </div>

            <div>
              <strong>Director</strong>
              <p>{movie.Director || "N/A"}</p>
            </div>

            <div>
              <strong>Actors</strong>
              <p>{movie.Actors || "N/A"}</p>
            </div>

            <div>
              <strong>Language</strong>
              <p>{movie.Language || "N/A"}</p>
            </div>

            <div>
              <strong>Country</strong>
              <p>{movie.Country || "N/A"}</p>
            </div>

            <div>
              <strong>Awards</strong>
              <p>{movie.Awards || "N/A"}</p>
            </div>

          </div>

        </div>

      </section>

    </main>
  );
}

export default MovieDetails;