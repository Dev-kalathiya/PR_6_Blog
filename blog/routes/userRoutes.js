const express = require("express");
const router = express.Router();

router.get("/signup", (req, res) => {
  res.render("signup"); 
});


router.post("/signup", async (req, res) => {
});

module.exports = router;

