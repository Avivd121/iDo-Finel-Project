const express = require("express");
const app = express();
const userRoutes = require("./routes/user");



const cors = require("cors");
const port = 8802;

app.use(express.json());

app.use(cors());
app.use("/user", userRoutes);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
