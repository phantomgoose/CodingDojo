const express = require("express");
const app = express();
const path = require("path");

app.use(express.static(path.join(__dirname, '/public/dist')))

require('./server/config/routes.js')(app);

app.listen(8000);
