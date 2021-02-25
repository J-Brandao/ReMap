const express = require("express");
const { create, getAll } = require("../Models/Utilizadores");
const checkJwt = require("../Utils/checkJwt");

const router = express.Router();
console.log(checkJwt);

router.route("/")
    .get(async (req, res) => {
    const utilizadores = await getAll();

    res.status(200);
    res.json(utilizadores);
    res.end();
    })
    .post(checkJwt, async (req, res) => {
    const edificio = await create(req.body);
    
    res.json(edificio);
    res.status(201);
    res.end();

    });

module.exports = router;