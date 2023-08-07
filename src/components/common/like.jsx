import React, { Component } from 'react';

class Like extends Component {
  render() {
    const { liked } = this.props;
    return (
      <i
      onClick={this.props.onClick}
      className={`Like ${liked ? 'red' : ''} fa fa-heart${liked ? '' : '-o'}`}
      aria-hidden="true"
      />
    );
  }
}

export default Like;