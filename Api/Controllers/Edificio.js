const express = require("express");
const { get } = require("../Models/Edificios");
//const checkJwt = require("../Utils/checkJwt");

const router = express.Router();

router.route("/:id?")
.get(async (req, res) => {

  const edificio = await get(req.params.id);
  
  if (!edificio) {
    res.status(404);
    res.json(false);
    res.end();
    return
  }
  res.status(200);
  res.json(edificio);
  res.end();
})

module.exports = router;