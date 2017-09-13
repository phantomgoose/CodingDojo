const express = require("express");
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const app = express();

app.use(jsonParser);

require('./server/config/mongoose_config.js');
require('./server/config/routes.js')(app);

app.listen(8000, () => {
    console.log("server started");
});
