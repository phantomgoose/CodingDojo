const path = require("path");
const GitHubKey = require("../secrets/github.token.js").key;
const request = require("request");
const Player = require("mongoose").model("Player");

module.exports = {
    root: (req, res) => {
        res.sendFile("/public/dist/index.html", {
            root: path.join(__dirname, "../../")
        });
    },
    getUser: (req, res) => {
        let username = req.params.username;
        let options = {
            headers: {
                "User-Agent": "GitHub Battle",
                Authorization: `token ${GitHubKey}`
            }
        };
        let url = `https://api.github.com/users/${username}`;
        let user = request.get(url, options, (err, result, body) => {
            res.json(result);
        });
    },
    createPlayer: (req, res) => {
        Player.findOne({ login: req.body.login })
            .exec()
            .then(player => {
                if (player) {
                    player.score = req.body.score;
                    player.avatar_url = req.body.avatar_url;
                } else {
                    player = new Player(req.body);
                }
                return player.save();
            })
            .then(player => {
                res.json(player);
            })
            .catch(err => {
                console.log("could not create player", err);
            });
    },
    getPlayers: (req, res) => {
        Player.find({}, "-_id")
            .sort("-score")
            .exec()
            .then(players => {
                res.json(players);
            })
            .catch(err => {
                console.log("could not get players", err);
            });
    }
};
