// const dbSingleton = require("../dbSingleton");

// const express = require("express");
// const router = express.Router();

// // Execute a query to the database
// const db = dbSingleton.getConnection();

// router.get("/", (req, res) => {
//   const query = "SELECT * FROM users";
//   db.query(query, (err, results) => {
//     if (err) {
//       res.status(500).send(err);
//       return;
//     }
//     res.json(results);
//   });
// });

// router.get("/name", (req, res) => {
//   const query = "SELECT id, name FROM users";
//   db.query(query, (err, results) => {
//     if (err) {
//       res.status(500).send(err);
//       return;
//     }
//     res.json(results);
//   });
// });

// router.get("/login", (req, res) => {
//   const query = "SELECT email,password,role,name FROM users";
//   db.query(query, (err, results) => {
//     if (err) {
//       res.status(500).send(err);
//       return;
//     }
//     res.json(results);
//   });
// });

// router.post("/", (req, res) => {
//   const { email, password, role, name } = req.body;
//   const query =
//     "INSERT INTO users ( email, password,role,name) VALUES (?, ?, ?,?)";
//   db.query(query, [email, password, role, name], (err, results) => {
//     if (err) {
//       res.status(500).send(err);
//       return;
//     }
//     res.json({ message: "User added!", id: results.insertId });
//   });
// });

// router.delete("/:id", (req, res) => {
//   const { id } = req.params;
//   const query = "DELETE FROM users WHERE id = ?";
//   db.query(query, [id], (err, results) => {
//     if (err) {
//       res.status(500).send(err);
//       return;
//     }
//     res.json({ message: "User deleted! " });
//   });
// });

// module.exports = router;

const dbSingleton = require("../dbSingleton");
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();

// Execute a query to the database
const db = dbSingleton.getConnection();

router.get("/", (req, res) => {
  const query = "SELECT * FROM users";
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

router.get("/name", (req, res) => {
  const query = "SELECT User_ID, Full_name FROM users";
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json(results);
  });
});

// POST register - add new user with encrypted password
router.post("/", async (req, res) => {
  const { role, full_name, email, phone, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const query = `
      INSERT INTO users (Role, Full_name, Email, Phone, password)
      VALUES (?, ?, ?, ?, ?)
    `;

    db.query(
      query,
      [role, full_name, email, phone, hashedPassword],
      (err, results) => {
        if (err) {
          res.status(500).send(err);
          return;
        }
        res.json({ message: "User added!", id: results.insertId });
      }
    );
  } catch (err) {
    res.status(500).send("Error encrypting password");
  }
});

// POST login - check credentials
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const query = "SELECT * FROM users WHERE email = ?";
  db.query(query, [email], async (err, results) => {
    if (err) {
      // Database error occurred
      res.status(500).send(err);
      return;
    }

    if (results.length === 0) {
      // No user found with this email
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const user = results[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match) {
      // Password does not match
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Successful login - return user details
    res.json({
      message: "Login successful!",
      user: {
        id: user.User_ID,
        email: user.email,
        role: user.role,
        name: user.Full_name,
      },
    });
  });
});

// POST register - add new user with encrypted password
router.post("/register", (req, res) => {
  const { full_name, email, phone, password } = req.body;
  const role = "Customer"; // by default, set role to Viewer

  // Basic validation
  if (!full_name || !email || !phone || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // need to understand 'emailRegex' function
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  if (password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }

  // Check if the email already exists
  db.query(
    "SELECT * FROM users WHERE Email = ?",
    [email],
    async (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Database error" });
      }

      if (results.length > 0) {
        return res.status(400).json({ message: "Email already registered" });
      }

      // Encrypt the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Add the new user to the database
      const insertQuery = `
      INSERT INTO users (Role, Full_name, Email, Phone, password)
      VALUES (?, ?, ?, ?, ?)
    `;

      db.query(
        insertQuery,
        [role, full_name, email, phone, hashedPassword],
        (err, insertResults) => {
          if (err) {
            console.error("Database insert error:", err);
            return res.status(500).json({ message: "Error saving user" });
          }

          res.json({
            message: "User registered successfully",
            id: insertResults.insertId,
          });
        }
      );
    }
  );
});


// DELETE user by ID , might be deleted
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM users WHERE User_ID = ?";
  db.query(query, [id], (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.json({ message: "User deleted!" });
  });
});

module.exports = router;
