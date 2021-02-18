const express = require("express");
//const bodyParser = require("body-parser");
//const cors = require("cors");


const app = express();

//app.use(cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200 }));
//app.use(bodyParser.json());
//app.use("/favoritos",
  //require("./Controllers/Pokemons"),
  //require("./Controllers/Pokemon")
//);

app.listen(3001, () => console.log("Servidor a funcionar!"));