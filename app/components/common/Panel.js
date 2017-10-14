import React, { Component } from "react";
import API from "../../utils/API";
import styles from './Panel.css';

class Panel extends Component {
  favoriteUrl(url) {
    API.favoriteUrl(url).then(this.props.getUrls);
  }
  deleteUrl(id) {
    API.deleteUrl(id).then(this.props.getUrls);
  }
  render() {
    return (
      <div className="col-md-3 col-sm-6">
        <div className="panel panel-default">
          <div className={"panel-heading " + styles.heading}>
            <i
              onClick={() => this.favoriteUrl(this.props.url)}
              style={{ display: this.props.showFavorite ? "block" : "none" }}
              className={styles.favorite + " " + (this.props.url.favorited ? "fa fa-star " + styles.gold : "fa fa-star-o")}
              aria-hidden="true"
            />
            <i
              onClick={() => this.deleteUrl(this.props.url._id)}
              style={{ display: this.props.showDelete ? "block" : "none" }}
              className={styles.delete + " " + "fa fa-trash-o"}
              aria-hidden="true"
            />
            <span className={styles.urlName}>{this.props.url.name}</span>
          </div>
          <div className="panel-body">
            <div>
              <span>{this.props.url.domain}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Panel.defaultProps = { showFavorite: false, showDelete: false };

export default Panel;
