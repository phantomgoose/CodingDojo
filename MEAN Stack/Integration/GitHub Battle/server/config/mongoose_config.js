const mongoose = require("mongoose");
const path = require("path");
const fs = require("fs");
const model_path = path.join(__dirname, "../models");

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/github_battle");

fs.readdirSync(model_path).forEach(file => {
    if (file.indexOf(".js") >= 0) {
        require(model_path + "/" + file);
    }
});
