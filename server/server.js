require("dotenv").config();
const express = require("express");
require("./db/mongoose");
const cors = require("cors");
const port = process.env.PORT || 5555;

const server = express();
server.use(cors());
server.use(express.json());

server.listen(port, () => {
  console.log(`Server is up and listening on port ${port}`);
});
