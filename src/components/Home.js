import React, { Component } from "react";
import PropTypes from "prop-types";
import Panel from "./common/Panel";
import UrlForm from "./common/UrlForm";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Home extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      urls: Object.assign([], this.props.urls)
    };
  }
  renderUrls() {
    const {urls} = this.props;
    return urls.map(url => (
      <Panel
        url={url}
        key={url._id}
      />
    ));
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <UrlForm />
        </div>
        <div className="row">
          <hr />
          {this.renderUrls()}
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  urls: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    urls: state.newUrls
  };
}

export default connect(mapStateToProps)(Home);
