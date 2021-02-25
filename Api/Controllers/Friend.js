const express = require("express");
const { get, remove } = require("../models/Friends");
//const checkJwt = require("../utils/checkJwt");


const router = express.Router();

router.route("/:userId?/:friendId?")
  .get(async (req, res) => {
    const friend = await get(req.params.userId, req.params.friendId);
    if (!friend) {
      res.status(404);
      res.json(false);
      res.end();
      return;
    }
    res.status(200);
    res.json(friend);
    res.end();
  })
  .delete(async (req, res) => {
    if (!req.params.userId) {
      res.status(400);
      res.json(false);
      res.end();
      return
    }
    await remove(req.params.userId);

    res.status(200);
    res.end()
  })

module.exports = router;