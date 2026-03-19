const express = require("express");
const movieController = require("../controllers/movieController");
const router = express.Router();

router.get("/", movieController.index);
router.get("/:id", movieController.show);
// router.post("/", movieController.store);
router.post("/:id/review", movieController.storeReview);
// router.put("/:id", movieController.update);
// router.patch("/:id", movieController.modify);
// router.delete("/:id", movieController.destroy);

module.exports = router;
