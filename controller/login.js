const bcrypt = require("bcrypt");

const client = require("../configs/database");

const jwt = require("jsonwebtoken");

//Funcao de login
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const data = await client.query(`SELECT * FROM users WHERE email= $1;`, [
      email,
    ]); //Verificando se o usuario existe no banco
    const user = data.rows;
    if (user.length === 0) {
      res.status(400).json({
        error: "User nao registrado, cadastre-se primeiro",
      });
    } else {
      bcrypt.compare(password, user[0].password, (err, result) => {
        //comparando hash de senha
        if (err) {
          res.status(500).json({
            error: "Erro de servidor",
          });
        } else if (result === true) {
          // conferindo se os resultados conferem
          const token = jwt.sign(
            {
              email: email,
            },
            process.env.SECRET_KEY
          );
          res.status(200).json({
            message: "Usuario logado!",
            token: token,
          });
        } else {
          //Declarando erros
          if (result != true)
            res.status(400).json({
              error: "Senha incorreta!",
            });
        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Erro no banco de dados ao logar!", //Erro de conexão com o banco
    });
  }
};
