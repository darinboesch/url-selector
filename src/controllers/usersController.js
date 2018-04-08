const mongoose = require("mongoose");
const Url = mongoose.model("Url");
import passport from "passport";

module.exports = {
  login: function(req, res, next) {
    // Do email and password validation for the server
    passport.authenticate("local", function(err, user, info) {		
      if (err) {
        return next(err);
      }

      if (!user) {
        return res.json({ success: false, message: info.message });
      }

      req.logIn(user, loginErr => {
        if(loginErr) {
          return res.json({ success: false, message: loginErr });
        }
        return res.json({ success: true, message: "authentication succeeded" });
      });

    })(req, res, next);
  }
};
