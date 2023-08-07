import React from 'react';

const Container = ({ children, style, className, ...restProps }) => {
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    ...style,
  };

  const containerClassName = `container ${className || ''}`;

  return (
    <div className={containerClassName} style={containerStyle} {...restProps}>
      {children}
    </div>
  );
};

export default Container;
