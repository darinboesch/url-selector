var express = require("express");

var urlsController = require("../controllers/urlsController");

var router = new express.Router();

router.get("/url", urlsController.fetch);         // hits gcs
router.get("/urls/:id?", urlsController.index);
router.post("/urls", urlsController.create);
router.patch("/urls/:id", urlsController.update);
router.delete("/urls/:id", urlsController.destroy);

module.exports = router;
