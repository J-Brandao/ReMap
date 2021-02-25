const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();

app.use(cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200 }));
app.use(bodyParser.json());
app.use("/edificios",
  require("./Controllers/Edificios")
);
app.use("/utilizadores",
  require("./Controllers/Utilizadores")
);
app.use("/utilizador",
  require("./Controllers/Utilizador")
);
app.use("/utilizadorPerfil",
  require("./Controllers/UtilizadorPerfil")
);

app.listen(3001, () => console.log("Servidor a funcionar!"));