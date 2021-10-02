const express = require("express");
const clients = require("./clients.json");
const cors = require("cors");
const port = process.env.PORT || 3001;
const app = express();

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req, res) => {
  res.status(200);
  res.send(clients);
});

app.get("/origin", (req, res) => {
  const originArray = clients.map((origin) => origin.origin);
  const newOrigins = Array.from(new Set(originArray));
  res.status(200);
  res.send(newOrigins);
});

app.get("/clients/:id", (req, res) => {
  const clientToGet = clients.find((client) => {
    return client.id.$oid === req.params.id;
  });
  res.status(200);
  res.send(clientToGet);
});

app.get("/origin/:origin", (req, res) => {
  const clientToGet = clients.filter((client) => {
    return client.origin === req.params.origin;
  });
  res.status(200);
  res.send(clientToGet);
});

app.listen(port, () => console.log(`Server running on port: ${port}`));
