const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const formParser = bodyParser.urlencoded({ extended: true });
const jsonParser = bodyParser.json();
const session = require("express-session");

app.use(session({ secret: "a large number of cats" }));
app.use(express.static(path.join(__dirname, "./public/dist")));
app.use(jsonParser);
app.use(formParser);

require("./server/config/mongoose.js");
require("./server/config/routes.js")(app);

app.listen(8000);
