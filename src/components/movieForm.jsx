import React from 'react';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';
import Form from './common/form';
import { getMovie, saveMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';

class MovieForm extends Form {
  state = {
    data: {
      title: "",
      genreId: "",
      ageRating: "",
      duration: "",
      releaseDate: "",
      director: "",
      summary: "",
      cast: "",
      numberInStock: "",
      dailyRentalRate: "",
      publishDate: "",
      moviePics: [], // Initialize moviePics as an empty array
      posterURL: "",
      liked: false
    },
    genres: [],
    errors: {}
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    ageRating: Joi.string().min(1).max(6).required().label("Age Rating"),
    duration: Joi.string().min(0).required().label("Duration"),
    releaseDate: Joi.number().min(1800).required().label("Release Date"),
    director: Joi.string().min(3).max(255).required().label("Director"),
    summary: Joi.string().min(7).max(255).required().label("Summary"),
    cast: Joi.string().min(5).max(255).required().label("Cast"),
    numberInStock: Joi.number().required().min(0).max(100).label("Number in Stock"),
    dailyRentalRate: Joi.number().required().min(0).max(10).label("Daily Rental Rate"),
    publishDate: Joi.date().iso().required().label("Publish Date"),
    posterURL: Joi.string().required().label("Poster URL"),
    moviePics: Joi.array().items(Joi.string()).min(1).required().label("Movie Pictures"), // Array of strings (picture URLs)
    liked: Joi.boolean()
  };


  async populateGenres() {
    const { data: genres } = await getGenres();
    this.setState({ genres });
  }

  async populateMovie() {
    try {
      const movieId = this.props.match.params.id;
      if (movieId === "new") return;

      const { data: movie } = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (ex) {
      if (ex.response && ex.response.status === 404) {
        this.props.history.replace("/not-found");
      }
    }
  }

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  mapToViewModel(movie) {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      ageRating: movie.ageRating,
      duration: movie.duration,
      releaseDate: movie.releaseDate,
      director: movie.director,
      summary: movie.summary,
      cast: movie.cast,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
      publishDate: new Date(movie.publishDate).toISOString().substr(0, 10), // Format the date as "yyyy-MM-dd"
      posterURL: movie.posterURL,
      moviePics: movie.moviePics, // Add moviePics field
      liked: movie.liked
    };
  }


  doSubmit = async () => {
    await saveMovie(this.state.data);
    toast.success('Movie added successfully.');

    this.props.history.goBack();
  };

  render() {
    return (
      <div className="movieForm-container">
        <div className='movieForm'>
          <form onSubmit={this.handleSubmit}>
            {this.renderInput("title", "Title")}
            {this.renderSelect("genreId", "Genre", this.state.genres)}
            {this.renderInput("ageRating", "Age Rating")}
            {this.renderInput("duration", "Duration")}
            {this.renderInput("releaseDate", "Release Date", "number")}
            {this.renderInput("director", "Director")}
            {this.renderInput("summary", "Summary")}
            {this.renderInput("cast", "Cast")}
            {this.renderInput("numberInStock", "Number in Stock", "number")}
            {this.renderInput("dailyRentalRate", "Rate")}
            {this.renderInput("publishDate", "Publish Date", "date")}
            {this.renderInput("posterURL", "Poster URL")}
            {this.renderFileInput("moviePics", "Movie Pictures")}
            {this.renderButton("Save")}
          </form>
        </div>
      </div>
    );
  }
}

export default MovieForm;