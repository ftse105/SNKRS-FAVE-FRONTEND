import React, { Component } from 'react';

class SearchBar extends Component {

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input />
          <input type="submit" value="Search"/>
        </form>
      </div>
    );
  }

}

export default SearchBar;
