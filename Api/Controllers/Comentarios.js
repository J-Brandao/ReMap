const express = require("express");
const { create, getAll } = require("../Models/Comentarios");
const checkJwt = require("../Utils/checkJwt");

const router = express.Router();

router.route("/")
    .get(async (req, res) => {
    const comentarios = await getAll();

    res.status(200);
    res.json(comentarios);
    res.end();
    })
    .post(checkJwt, async (req, res) => {

    const comentario = await create(req.body);
    
    res.json(comentario);
    res.status(201);
    res.end();

    });

module.exports = router;