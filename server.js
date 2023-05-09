const  express  =  require("express");

const app = express(); //Initialized express

app.use(express.json());
app.use(cors());

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {

res.status(200).send("Engine Started, Ready to take off!");

})

app.listen(port, () => {

console.log(`Here we go, Engines started at ${port}.`);

})

require("./configs/dotenv");
const  client  =  require("./configs/database");

client.connect((err) => { //Connected Database

if (err) {

console.log(err);

}

else {

console.log("Data logging initiated!");}

});

const  user  =  require("./routes/user");

app.use("/user",  user);  //Route for /user endpoint of API