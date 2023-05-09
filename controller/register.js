const bcrypt = require("bcrypt");

const client = require("../configs/database");

const jwt = require("jsonwebtoken");

//Funcao de registro

exports.register = async (req, res) => {
  const { name, email, phonenumber, password } = req.body;
  try {
    const data = await client.query(`SELECT * FROM users WHERE email= $1;`, [
      email,
    ]); //checando se o usuario ja esta registrado
    const arr = data.rows;
    if (arr.length != 0) {
      return res.status(400).json({
        error: "Email ja registrado, Nao precisa se registrar de novo mestre",
      });
    } else {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err)
          res.status(err).json({
            error: "erro de servidor",
          });
        const user = {
          name,
          email,
          phonenumber,
          password: hash,
        };
        var flag = 1; // Declarando uma flag

        //Inserindo dados no banco

        client.query(
          `INSERT INTO users (name, email, phonenumber, password) VALUES ($1,$2,$3,$4);`,
          [user.name, user.email, user.phonenumber, user.password],
          (err) => {
            if (err) {
              flag = 0; //Se o usuario nao esta no banco flag=0
              console.error(err);
              return res.status(500).json({
                error: "Erro no banco de dados",
              });
            } else {
              flag = 1;
              res
                .status(200)
                .send({ message: "Usuario adicionado ao banco" });
            }
          }
        );
        if (flag) {
          const token = jwt.sign(
            //registrando jwt
            {
              email: user.email,
            },
            process.env.SECRET_KEY
          );
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Erro no banco ao registrar o usuario", //Erro de conexao com o bd
    });
  }
};
