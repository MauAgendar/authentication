const express = require("express");

const router = express.Router();

const { register } = require("../controller/register");

const { login } = require("../controller/login");

router.post("/register", register); //POST request de cadastro

router.post("/login", login); // POST request de login

module.exports = router;
