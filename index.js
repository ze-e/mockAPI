const loanRoutes = require('./routes/loan.routes');
const express = require('express');
const mongoose = require("mongoose");
var bodyParser = require("body-parser");

//configure mongoose
mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost/CRUD",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const app = express();
const port = 3000;
const isLocal = true;

// create application/json parser
var jsonParser = bodyParser.json()

app.use(jsonParser);

app.use("/", loanRoutes);

if (isLocal) {
	//local host
	module.exports = app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
} else {
	//for lambda export
	module.exports = app;
}
