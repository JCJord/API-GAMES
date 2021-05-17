const express = require("express");
const app = express();
const db = require("./model/db");
const routes = require("./routes/routes.js");
const cors = require("cors");

app.use(cors());
async function connect(db) {
  try {
    await db.authenticate();
    console.log("connected to mysql");
  } catch (err) {
    console.log("could not connect to mysql error : " + err);
  }
}
connect(db);

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));
app.use("/", routes);

const PORT = 8082;
app.listen(PORT, () => {
  console.log("connected to port 8082");
});
