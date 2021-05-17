const express = require("express");
const Games = require("../model/games");
const router = express.Router();
const Users = require("../model/user");
const jwt = require("jsonwebtoken");
const jwtSecret = "dsagao´pidjgoaisdjgoi´padj%T@%!TG@T!T#T!T@Tblaster......";

//Auth jwt
function auth(req, res, next) {
  const authToken = req.headers["authorization"];
  if (authToken != undefined) {
    const bearer = authToken.split(" ");
    var token = bearer[1];
    jwt.verify(token, jwtSecret, (err, data) => {
      if (err) {
        res.status(401);
        res.json({ err: "invalid Token" });
      } else {
        req.token = token;
        req.loggeUser = { id: data.id, email: data.email };
        next();
      }
    });
  } else {
    res.status(401);
    res.json({ err: "invalid Token" });
  }
}

// Game listing
router.get("/", auth, async (req, res) => {
  try {
    var games = await Games.findAll();

    var arr = {
      games,
    };

    res.json(arr.games);
  } catch (err) {
    console.log("error" + err);
    res.sendStatus(400);
  }
});

// Dynamic Game page
router.get("/:id", auth, async (req, res) => {
  let id = req.params.id;
  if (isNaN(id)) {
    res.sendStatus(400);
  } else {
    id = parseInt(id);
    try {
      const game = await Games.findByPk(id);

      res.statusCode = 200;
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  }
});

// Create
router.post("/", async (req, res) => {
  let { name, title, price } = req.body;
  try {
    let game = await Games.create({
      name,
      title,
      price,
    });
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(400);
  }
});

// Edit
router.put("/:id", async (req, res) => {
  let id = req.params.id;
  let { name, title, price } = req.body;
  if (isNaN(id)) {
    res.sendStatus(400);
  } else {
    let id = parseInt(req.params.id);
    try {
      let game = await Games.update(
        {
          name,
          title,
          price,
        },
        { where: { id: id } }
      );
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
      res.sendStatus(400);
    }
  }
});

// Delete
router.delete("/:id", async (req, res) => {
  let id = req.params.id;

  if (isNaN(id)) {
    res.sendStatus(400);
  } else {
    try {
      let id = parseInt(req.params.id);

      let game = await Games.destroy({ where: { id: id } });
      res.sendStatus(200);
    } catch (err) {
      console.log(err);
    }
  }
});

// Authentication
router.post("/auth", async (req, res) => {
  var { email, password } = req.body;

  if (email != undefined) {
    const user = await Users.findOne({ where: { email: email } });

    if (user != undefined) {
      if (user.password == password) {
        jwt.sign(
          { id: user.id, email: user.email },
          jwtSecret,
          { expiresIn: "48h" },
          (err, token) => {
            if (err) {
              res.status(400);
              res.json({ err: "error occurred" });
            } else {
              res.status(200);
              res.json({ token: token });
            }
          }
        );
      } else {
        res.status(401);
        res.json({ err: "invalid credentials" });
      }
    } else {
      res.status(404);
      res.json("E-mail does not exist");
    }
  } else {
    res.status(400);
    res.json({ error: "E-mail is not valid" });
  }
});

module.exports = router;
