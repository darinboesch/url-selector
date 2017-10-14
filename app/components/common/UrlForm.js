import React, { Component } from "react";
import API from "../../utils/API";
import styles from "./UrlForm.css";

class UrlForm extends Component {
  constructor() {
    super();
    this.state = {
      inputValue: ""
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }
  handleInputChange(event) {
    this.setState({ inputValue: event.target.value });
  }
  handleButtonClick() {
    const companyNames = this.state.inputValue;
    this.props.getUrls(companyNames);
    //this.setState({ inputValue: "" });
  }
  render() {
    return (
      <div className="col-md-6 col-md-offset-3">
        <div className={"form-group " + styles.form}>
          <label htmlFor="input-box">
            Company Names
          </label>
          <textarea
            style={{
              resize: "none"
            }}
            onChange={this.handleInputChange}
            value={this.state.inputValue}
            placeholder="Add Company Names here!"
            className="form-control"
            id="input-box"
            rows="3"
          />
          <button
            onClick={this.handleButtonClick}
            className={"btn btn-default " + styles.button}
          >
            Submit
          </button>
        </div>
      </div>
    );
  }
}

export default UrlForm;
