const express = require("express");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");
const path = require("path");
const Handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");

const app = express();

// Load Routes
const api = require('./routes/api')

// Connecting to MongoDB...
const mongoose = require("mongoose");
mongoose
  .connect(
    "mongodb://localhost:27017/SpaceX",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to MongoDB Server..."))
  .catch((err) => console.error("Error occured connecting to MongoDB...", err));
  mongoose.set('useFindAndModify', false);

// Express Handlebars Middleware.
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main",
    handlebars: allowInsecurePrototypeAccess(Handlebars),
  })
);

app.set("view engine", "handlebars");

// Body Parser Middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(bodyParser.json());



// Method Override
app.use(methodOverride("_method"));

// Home Route
// app.get("/", (req, res) => {
//   res.render("home", {
//     title: "Welcome",
//     layout: "home"
//   });
// });

// Use Routes
// app.use("/customers", customers);
app.use('/api', api)

// Listening on Port:5000
const port = process.env.NODE_ENV || 5000;
app.set("port", port);
app.listen(port, () => console.log(`Server started on port : ${port}`));
