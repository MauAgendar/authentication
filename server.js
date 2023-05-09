const express = require("express");
const cors = require("cors");
const app = express(); //Inicializando express

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.status(200).send("funfoso");
});

app.listen(port, () => {
  console.log(`Servidor na porta ${port}.`);
});

require("./configs/dotenv");
const client = require("./configs/database");

client.connect((err) => {
  //Conectado ao banco

  if (err) {
    console.log(err);
  } else {
    console.log("Registrando dodos...");
  }
});

const user = require("./routes/user");

app.use("/user", user);