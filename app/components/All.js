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
      this.setState({ urls: res.data });
    });
  }
  renderUrls() {
    return this.state.urls.map(url => (
      <Panel
        url={url}
        key={url._id}
        showFavorite={true}
        showDelete={true}
        getUrls={this.getUrls}
      />
    ));
  }
  render() {
    return (
      <div>
        <div className="container">
          <hr />
          <div className="row">
            {this.renderUrls()}
          </div>
        </div>
      </div>
    );
  }
}

export default Favorites;
