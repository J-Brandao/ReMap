const express = require("express");
const { get, getForPerfil } = require("../Models/Edificios");
//const checkJwt = require("../Utils/checkJwt");

const router = express.Router();

router.route("/building/:id?")
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
router.route("/perfil/:userId?")
.get(async (req, res) => {

  if (!req.params.userId) {
    res.status(404);
    res.json(false);
    res.end();
    return
  }

  const edificio = await getForPerfil(req.params.userId);
  
  res.status(200);
  res.json(edificio);
  res.end();
})

module.exports = router;