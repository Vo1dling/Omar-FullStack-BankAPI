require("dotenv").config();
const express = require("express");
require("./db/mongoose");
const cors = require("cors");
const port = process.env.PORT || 5555;
const router = require("./api/routes/user.routes");
const server = express();
server.use(cors());
server.use(express.json());
server.use("/api", router);
server.listen(port, () => {
  console.log(`Server is up and listening on port ${port}`);
});
