const express = require("express");
const { create, getAllByBuilding, getAllByUser } = require("../Models/Sugestoes");
const checkJwt = require("../Utils/checkJwt");

const router = express.Router();

router.route("/")
    .post(checkJwt, async (req, res) => {

    const sugestao = await create(req.body);
    
    res.json(sugestao);
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
        

    const sugestoes = await getAllByBuilding(req.params.buildingId);
        
    res.status(200);
    res.json(sugestoes);
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

    const sugestoes = await getAllByUser(req.params.userId);

    res.status(200);
    res.json(sugestoes);
    res.end();
    })

module.exports = router;