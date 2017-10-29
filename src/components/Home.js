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
      newUrls: Object.assign([], this.props.newUrls)
    };
  }
  renderUrls() {
    const {newUrls} = this.props;
    return newUrls.map(url => (
      <Panel
        url={url}
        key={url._id}
        useNew
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
  newUrls: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    newUrls: state.newUrls
  };
}

export default connect(mapStateToProps)(Home);
