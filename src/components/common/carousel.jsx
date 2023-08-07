import React, { useState, useEffect } from 'react';

const Carousel = ({ images, interval = 5000 }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let timer;
    if (!isHovered) {
      timer = setInterval(() => {
        setActiveIndex((activeIndex + 1) % images.length);
      }, interval);
    }

    return () => clearInterval(timer); // This will clear the interval while unmounting the component
  }, [activeIndex, images.length, interval, isHovered]);

  const handleSlide = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="carousel">
      <div className="carousel-indicators">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            className={`indicator ${index === activeIndex ? 'active' : ''}`}
            aria-label={`Slide ${index + 1}`}
            onClick={() => handleSlide(index)}
          />
        ))}
      </div>
      <div className="carousel-inner">
        {images.map((image, index) => (
          <div
            key={index}
            className={`carousel-item${index === activeIndex ? ' active' : ''}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img src={image} className="d-block w-100" alt={`Slide ${index + 1}`}/>
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

export default Carousel;
