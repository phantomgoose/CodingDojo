const Player = require("mongoose").model("Player");
const path = require("path");
const ServerResponse = require("../templates/server_response.js");

module.exports = {
    main: (req, res) => {
        res.sendFile("/public/dist/index.html", {
            root: path.join(__dirname, "../../")
        });
    },
    list: (req, res) => {
        Player.find({}, "-_id -createdAt -updatedAt")
            .exec()
            .then(players => {
                sendResponse(res, false, "retrieved player list", players);
            })
            .catch(err => {
                res.json(
                    sendResponse(
                        res,
                        true,
                        "Server controller was unable to find users",
                        err
                    )
                );
            });
    },
    create: (req, res) => {
        let player = new Player(req.body);
        player
            .save()
            .then(player => {
                sendResponse(res, false, "created player", player);
            })
            .catch(err => {
                sendResponse(res, true, "could not create player", err);
            });
    },
    deletePlayer: (req, res) => {
        let player = Player.findOneAndRemove({ short_id: req.params.short_id })
            .exec()
            .then(player => {
                sendResponse(res, false, "deleted player", player);
            })
            .catch(err => {
                sendResponse(
                    res,
                    true,
                    "unable to delete by id " + req.params.short_id,
                    err
                );
            });
    },
    updateGameStatus: (req, res) => {
        let update_obj = {};
        update_obj[req.body.game_identifier] = req.body.new_status;
        let player = Player.findOneAndUpdate(
            { short_id: req.params.short_id },
            { $set: update_obj }
        )
            .exec()
            .then(player => {
                sendResponse(res, false, "updated player", null);
            })
            .catch(err => {
                sendResponse(res, true, "could not update player", err);
            });
    }
};

function sendResponse(res, isError, comment, content) {
    res.json(new ServerResponse(isError, comment, content));
}
