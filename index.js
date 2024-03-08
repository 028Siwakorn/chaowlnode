require("dotenv").config();

const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(express.json());

app.use(cors());

const connection = mysql.createConnection(process.env.DATABASE_URL);

app.get("/", (req, res) => {
  console.log("Hello express");
  res.send("Hello My FR1END");
});

app.get("/drinkmenu", (req, res) => {
  connection.query(
    "SELECT DrinkID, tbl_drink.TypeID, DrinkName, Price, TypeName FROM tbl_drink, tbl_type WHERE tbl_drink.TypeID = tbl_type.TypeID",
    function (err, results, fields) {
      res.send(results);
    }
  );
});

app.get("/menu", (req, res) => {
  connection.query(
    "SELECT * FROM tbl_type",
    function (err, results, fields) {
      res.send(results);
    }
  );
});

app.post("/addnewmenu", (req, res) => {
  connection.query("INSERT INTO tbl_type  VALUES (?, ?);",
    [req.body.TypeID, req.body.TypeName], 
    function (err, results, fields) {
    res.send(results);
  });
});

app.post("/addnewdrink", function (req, res) {
  connection.query(
    "INSERT INTO tbl_drink  VALUES (?, ?, ?, ?, ?);",
    [
      req.body.DrinkID,
      req.body.TypeID,
      req.body.DrinkName,
      req.body.Picture,
      req.body.Price,
    ],

    function (err, results) {
      if (err) throw err;
      return res.send({
        err: false,
        data: results,
        message: "New menu has been created successfully.",
      });
    }
  );
});

app.listen(process.env.PORT || 6500);


