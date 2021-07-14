const express = require("express");
const { getAll, create } = require("../Models/Friends");
const checkJwt = require("../utils/checkJwt");

const router = express.Router();

router.route("/:userId?")
  .get(async (req, res) => {
    if (!req.params.userId) {
      res.status(400);
      res.json(false);
      res.end();
      return false
    }
    const friends = await getAll(req.params.userId);
    res.status(200);
    res.json(friends);
    res.end();
  })
  .post(checkJwt, async (req, res) => {
    const friend = await create(req.body);
    if (!req.body) {
      res.status(400);
      res.json(false);
      res.end();
      return false;
    }
    res.json(friend);
    res.status(201);
    res.end();
  })

module.exports = router;