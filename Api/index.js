const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();

app.use(cors({ origin: 'http://localhost:3000', optionsSuccessStatus: 200 }));
app.use(bodyParser.json());
app.use("/edificios",
  require("./Controllers/Edificios")
);
app.use("/edificio",
  require("./Controllers/Edificio")
);
app.use("/utilizadores",
  require("./Controllers/Utilizadores")
);
app.use("/utilizador",
  require("./Controllers/Utilizador")
);
app.use("/friend",
  require("./Controllers/Friend")
);
app.use("/friends",
  require("./Controllers/Friends")
)
app.use("/comentarios",
  require("./Controllers/Comentarios")
);
app.use("/sugestoes",
  require("./Controllers/Sugestoes")
);
app.use("/equipas",
  require("./Controllers/Equipas")
);

app.listen(3001, () => console.log("Servidor a funcionar!"));