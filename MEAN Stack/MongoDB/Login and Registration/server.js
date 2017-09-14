const app = require("express")();
const path = require("path");
const session = require("express-session");

app.use(session({ secret: "tons and tons of cats" }));
app.set("views", path.join(__dirname, "./client/views"));
app.set("view engine", "ejs");

// init models
require("./server/config/mongoose_config.js");

// init routes
require("./server/config/routes.js")(app);

app.listen(8000, () => {
    console.log("server started");
});
