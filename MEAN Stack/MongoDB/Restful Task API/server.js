const app = require("express")();
const jsonParser = require("body-parser").json();
const urlParser = require("body-parser").urlencoded({ extended: true });

app.use([jsonParser, urlParser]);

//set up db
require("./server/config/mongoose_config.js");

// set up routing
require("./server/config/routes.js")(app);

app.listen(8000, () => {
    console.log("server started");
});
