import React from "react";
import styles from "./Footer.css";

const Footer = () => (
  <footer className={styles.footer}>
    <hr />
    <p className="pull-right">
      <i className="fa fa-github" aria-hidden="true" />
        &nbsp;&nbsp; Built by Darin
    </p>
  </footer>
);

export default Footer;
