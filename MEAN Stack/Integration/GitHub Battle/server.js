const express = require("express");
const app = express();
const jsonParser = require("body-parser").json();
const path = require("path");

app.use(express.static(path.join(__dirname, "/public/dist")));
app.use(jsonParser);

require("./server/config/mongoose_config.js");
require("./server/config/routes.js")(app);

app.listen(8000);
