const express = require("express");
const app = express();
const jsonParser = require('body-parser').json();
const path = require("path");

app.use(jsonParser);
app.use(express.static(path.join(__dirname, "/public/dist")));

require("./server/config/mongoose_config.js");

require("./server/config/routes.js")(app);

app.listen(8000, () => {
    console.log("server started on 8000");
});
