import React, { Component } from "react";
import PropTypes from "prop-types";
import Panel from "./common/Panel";
import UrlForm from "./common/UrlForm";
import API from "../utils/API";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

class Home extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      urls: [],
      error: ""
    };

//    this.getUrls = this.getUrls.bind(this);
  }
  // componentDidMount() {
  //   this.getUrls();
  // }
  // getUrls(companyNames) {
  //   API.fetchUrls(companyNames)
  //     .then(res => {
  //       this.setState({ urls: res.data });
  //     }).catch(err => {
  //       this.setState({ error: `Error occurred fetching URLs: ${err}`});
  //     });
  // }
  renderUrls() {
    const {urls} = this.props;

    return urls.map(url => (
      <Panel
        url={url}
        key={url._id}
        getUrls={this.getUrls}
      />
    ));
  }
  renderError() {
    if (this.state.error) {
      return (<div className="row">
               <div className="alert alert-dismissible alert-danger">
                 <button type="button" className="close" data-dismiss="alert">&times;</button>
                 {this.state.error}
               </div>
             </div>);
    }
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <UrlForm
            getUrls={this.getUrls}
          />
        </div>
        <div className="row">
          <hr />
          {this.renderUrls()}
        </div>
        {this.renderError()}
      </div>
    );
  }
}

Home.propTypes = {
  urls: PropTypes.array.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    // urls: state.urls
    urls: []
  };
}

export default connect(mapStateToProps)(Home);
