import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const HomeCarousel = ({ images, interval = 5000, movies }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let timer;
    if (!isHovered) {
      timer = setInterval(() => {
        setActiveIndex((activeIndex + 1) % images.length);
      }, interval);
    }

    return () => clearInterval(timer);
  }, [activeIndex, images.length, interval, isHovered]);

  const handleSlide = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="home-carousel">
      <div className="carousel-inner">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-item${index === activeIndex ? ' active' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="home-carousel-content">
              <img src={image} alt={`Slide ${index + 1}`} />
              <div className="home-carousel-details">
                <h2 className="home-carousel-title">{movies[index]?.title}</h2>
                <p className="home-carousel-summary">{movies[index]?.summary}</p>
                <Link to={`/moviePage/${movies[index]?._id}`} className="btn btn-success">
                  View Movie
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        onClick={() => handleSlide((activeIndex - 1 + images.length) % images.length)}
      >
        <span className="carousel-control-prev-icon" aria-hidden="true" />
      </button>
      <button
        className="carousel-control-next"
        type="button"
        onClick={() => handleSlide((activeIndex + 1) % images.length)}
      >
        <span className="carousel-control-next-icon" aria-hidden="true" />
      </button>
    </div>
  );
};

export default HomeCarousel;
