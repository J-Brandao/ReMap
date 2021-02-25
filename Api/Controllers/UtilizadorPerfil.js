const express = require("express");
const { getPerfil } = require("../Models/Utilizadores");
//const checkJwt = require("../Utils/checkJwt");

const router = express.Router();

router.route("/:userId?")
.get(async (req, res) => {
    
  const user = await getPerfil(req.params.userId);
  if (!user) {
    res.status(404);
    res.json(false);
    res.end();
    return
  }
  res.status(200);
  res.json(user);
  res.end();
})

module.exports = router;