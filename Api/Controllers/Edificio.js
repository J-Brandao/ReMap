const express = require("express");
const { create } = require("../Models/Edificios");
//const checkJwt = require("../Utils/checkJwt");

const router = express.Router();

router.route("/")
    /*.get(async (req, res) => {
    const pokemon = await getAll();

    res.status(200);
    res.json(pokemon);
    res.end();
    })*/
    .post(/*checkJwt,*/ async (req, res) => {

    const edificio = await create(req.body);
    
    res.json(edificio);
    res.status(201);
    res.end();

    });

module.exports = router;