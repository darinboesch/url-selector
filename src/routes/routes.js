const express = require("express");
const path = require("path");

const apiRoutes = require("./apiRoutes");

const router = new express.Router();

router.use("/api", apiRoutes);

// router.get("*", function(req, res) {
//   res.sendFile(path.join(__dirname, "../../dist/index.html"));
// });

module.exports = router;
