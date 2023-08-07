import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMovies } from '../services/movieService';
import { toast } from 'react-toastify';

const MovieFlexBox = ({ type, data }) => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchItems();
  }, [type, data]);

  const fetchItems = async () => {
    try {
      if (type === 'genre') {
        const { data: movieByGenre } = await getMovies();
        const itemsFilteredByType = movieByGenre.filter((item) => item.genre.type === data);
        setItems(itemsFilteredByType.slice(0, 5));
      } else if (type === 'movie') {
        const { data: movies } = await getMovies();
        movies.sort((a, b) => new Date(b.releaseDate) - new Date(a.releaseDate));
        setItems(movies.slice(0, 5));
      }
    } catch (error) {
      toast.error(`Error fetching ${type}s:`, error);
    }
  };

  const handlePosterClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <div className="movie-flexbox">
      {items.map((item) => (
        <div key={item._id} className="movie-item">
          <Link to={`/moviePage/${item._id}`} onClick={handlePosterClick}>
            <img
              src={item.posterURL}
              alt={item.title}
              className="movie-poster"
            />
          </Link>
          <div className="overlay">
            <Link
              to={`/rentals?movieId=${item._id}`}
              className="btn btn-success rent-link"
            >
              Rent
            </Link>
          </div>
          <p className="movie-title">{item.title}</p>
        </div>
      ))}
    </div>
  );
};

export default MovieFlexBox;
