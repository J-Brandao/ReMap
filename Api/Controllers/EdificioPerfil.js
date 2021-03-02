const express = require("express");
const { getForPerfil } = require("../Models/Edificios");
//const checkJwt = require("../Utils/checkJwt");

const router = express.Router();

router.route("/:userId?")
.get(async (req, res) => {

  const edificio = await getForPerfil(req.params.userId);
  
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