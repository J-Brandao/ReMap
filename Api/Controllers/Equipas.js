const express = require("express");
const { getAll } = require("../Models/Equipas");

const router = express.Router();

router.route("/")
    .get(async (req, res) => {
    const equipas = await getAll();

    res.status(200);
    res.json(equipas);
    res.end();
    })

module.exports = router;