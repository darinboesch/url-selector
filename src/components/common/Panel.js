import React, { Component } from "react";
import PropTypes from "prop-types";
import API from "../../utils/API";
import styles from './Panel.css';

class Panel extends Component {
  constructor(props) {
    super(props);

    this.handleDeleteClick = this.handleDeleteClick.bind(this);
    this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
  }
  handleFavoriteClick() {
    API.favoriteUrl(this.props.url).then(this.props.getUrls);
  }
  handleDeleteClick() {
    API.favoriteUrl(this.props.url._id).then(this.props.getUrls);
  }
  render() {
    return (
      <div className="col-md-3 col-sm-6">
        <div className="panel panel-default">
          <div className={"panel-heading " + styles.heading}>
            <i
              onClick={this.handleFavoriteClick}
              style={{ display: this.props.showFavorite ? "block" : "none" }}
              className={styles.favorite + " " + (this.props.url.favorited ? "fa fa-star " + styles.gold : "fa fa-star-o")}
              aria-hidden="true"
            />
            <i
              onClick={this.handleDeleteClick}
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

Panel.propTypes = {
  getUrls: PropTypes.func.isRequired,
  url: PropTypes.object.isRequired,
  showFavorite: PropTypes.bool,
  showDelete: PropTypes.bool
};

export default Panel;
