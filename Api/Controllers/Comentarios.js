const express = require("express");
const { create, getAllByUser, getAllByBuilding } = require("../Models/Comentarios");
const checkJwt = require("../Utils/checkJwt");

const router = express.Router();

router.route("/")
    
    .post(checkJwt, async (req, res) => {

    const comentario = await create(req.body);
    
    res.json(comentario);
    res.status(201);
    res.end();

    });

router.route("/building/:buildingId?")
    .get(async (req, res) => {
    
        if (!req.params.buildingId) {
            res.status(400)
            res.json(false)
            res.end();
            return;
        }    
        

    const comentarios = await getAllByBuilding(req.params.buildingId);
        
    res.status(200);
    res.json(comentarios);
    res.end();
    })
router.route("/user/:userId?")
    .get(async (req, res) => {
    
        if (!req.params.userId) {
            res.status(400)
            res.json(false)
            res.end();
            return;
    }    

    const comentarios = await getAllByUser(req.params.userId);

    res.status(200);
    res.json(comentarios);
    res.end();
    })

module.exports = router;