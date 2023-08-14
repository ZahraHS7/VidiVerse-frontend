import React, { Component } from 'react';

class Like extends Component {
  render() {
    const { onLikeToggle, isFavorite } = this.props;

    return (
      <i
        onClick={onLikeToggle}
        className={`Like ${isFavorite ? 'red' : ''} fa fa-heart${isFavorite ? '' : '-o'}`}
        aria-hidden="true"
      />
    );
  }
}

export default Like;
