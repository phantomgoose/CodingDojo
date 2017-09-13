const express = require("express");

const app = express();
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

// init db
require('./server/config/mongoose_config.js');

// init routes
require('./server/config/routes.js')(app);

app.listen(8000, () => {
    console.log("server started");
});
