import { Link } from "react-router-dom";

function MovieCard({ movie }) {
  return (
    <Link to={`/movie/${movie.imdbID}`} className="movie-card">
      <img
        src={
          movie.Poster !== "N/A"
            ? movie.Poster
            : "https://via.placeholder.com/300x450?text=No+Poster"
        }
        alt={movie.Title}
      />

      <div className="movie-info">
        <h3>{movie.Title}</h3>

        <p>{movie.Year}</p>

        <span>⭐ {movie.imdbRating || "N/A"}</span>
      </div>
    </Link>
  );
}

export default MovieCard;