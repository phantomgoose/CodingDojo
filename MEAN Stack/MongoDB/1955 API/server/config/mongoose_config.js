const mongoose = require("mongoose");
const path = require("path");
const models_path = path.join(__dirname, "../models");
const fs = require("fs");

fs.readdirSync(models_path).forEach(file => {
    if (file.indexOf(".js") >= 0) {
        require(models_path + "/" + file);
    }
});

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/1955_db");
