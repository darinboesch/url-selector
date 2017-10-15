import React from "react";
import PropTypes from 'prop-types';
import Navbar from "./common/Navbar";
import Footer from "./common/Footer";

const Main = props => (
  <div>
    <Navbar />
    {props.children}
    <Footer />
  </div>
);

Main.propTypes = {
  children: PropTypes.object.isRequired
};

export default Main;
