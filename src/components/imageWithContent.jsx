import React from 'react';

const ImageWithContent = ({ imageSrc, altText, content, imagePosition }) => {
  return (
    <div className="row mt-5">
      {imagePosition === 'left' && (
        <div className="col-lg-5 image-container-left">
          <img src={imageSrc} alt={altText} />
        </div>
      )}
      <div className="col-lg-6">
        {content}
      </div>
      {imagePosition === 'right' && (
        <div className="col-lg-5 m-3 image-container-right">
          <img src={imageSrc} alt={altText} />
        </div>
      )}
    </div>
  );
};

export default ImageWithContent;
