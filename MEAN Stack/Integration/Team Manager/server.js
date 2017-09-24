const express = require("express");
const app = express();
const path = require("path");
const jsonParser = require("body-parser").json();
const bodyParser = require("body-parser").urlencoded({ extended: true });

app.use(express.static(path.join(__dirname, "/public/dist")));
app.use(jsonParser);
app.use(bodyParser);

require("./server/config/mongoose_config.js");

require("./server/config/routes.js")(app);

app.listen(8000);
