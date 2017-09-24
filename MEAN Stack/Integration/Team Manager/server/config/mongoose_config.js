const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');

const models_path = path.join(__dirname, '../models')

mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost/team_manager");

fs.readdirSync(models_path).forEach(file => {
    if (file.indexOf(".js") >= 0) {
        require(models_path + "/" + file);
    }
});