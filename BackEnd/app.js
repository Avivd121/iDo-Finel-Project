const express = require("express");
const app = express();

const userRoutes = require("./routes/user");
const port = 8801;

app.use(express.json());

// handle images for upload and download
const imagesHandler = require("./routes/imagesHandler");
app.use("/images", imagesHandler);



app.use("/user", userRoutes);
app.use((err, req, res, next) => {
  console.error(err); // Log error
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
  });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
