const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const model_path = path.join(__dirname, "../models");

fs.readdirSync(model_path).forEach(file => {
    if (file.indexOf(".js") >= 0) {
        require(model_path + "/" + file);
    }
});

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/bicycle_marketplace", {
    useMongoClient: true
});
