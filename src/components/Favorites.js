import React, { Component } from "react";
import Panel from "./common/Panel";
import API from "../utils/API";

class Favorites extends Component {
  constructor() {
    super();
    this.state = {
      urls: []
    };
    this.getUrls = this.getUrls.bind(this);
  }
  componentDidMount() {
    this.getUrls();
  }
  getUrls() {
    API.getUrls().then((res) => {
      const favoriteUrls = res.data.filter(url => url.favorited);
      this.setState({ urls: favoriteUrls });
    });
  }
  renderUrls() {
    return this.state.urls.map(url => (
      <Panel
        url={url}
        key={url._id}
        showFavorite
        showDelete
        getUrls={this.getUrls}
      />
    ));
  }
  render() {
    return (
      <div>
        <div className="jumbotron text-center">
          <h1>Your Favorite URLs</h1>
          <p>Domains you will want to remember...</p>
        </div>
        <div className="container">
          <div className="row">
            {this.renderUrls()}
          </div>
        </div>
      </div>
    );
  }
}

export default Favorites;
