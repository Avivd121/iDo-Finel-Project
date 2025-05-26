const dbSingleton = require("../dbSingleton");

const express = require("express");
const router = express.Router();

// Execute a query to the database
const db = dbSingleton.getConnection();

router.get("/", (req, res) => {
  const query = "SELECT * FROM user";
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

router.post("/", (req, res) => {
  const { role, name, email, phone } = req.body;
  const query =
    "INSERT INTO user (Role, Name, Email, Phone) VALUES (?, ?, ?, ?)";
  db.query(query, [role, name, email, phone], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({ message: "User added!", id: results.insertId });
  });
});

module.exports = router;
