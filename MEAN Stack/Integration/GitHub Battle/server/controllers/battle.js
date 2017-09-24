const path = require("path");
const GitHubKey = require("../secrets/github.token.js").key;
const request = require("request");

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
                "Authorization": `token ${GitHubKey}`
            }
        };
        let url = `https://api.github.com/users/${username}`;
        let user = request.get(url, options, (err, result, body) => {
            console.log(url);
            res.json(result);
        });
    }
};
