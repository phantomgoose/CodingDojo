const url_regex = {
    img: new RegExp("^\/img\/([a-zA-Z0-9]+).([a-z]+)$"),
    css: new RegExp("^\/css\/([a-zA-Z0-9]+).css$"),
    js: new RegExp("^\/js\/([a-zA-Z0-9]+).js$"),
    view: new RegExp("([a-zA-Z0-9]+)", "g"),
    root: new RegExp("^\/$")
}

const fs = require("fs");

module.exports = function(req, res) {
    displayContent(routeRequest(req.url), res);
};

function routeRequest(url, go_to_root=false) {
    let route = {
        filename: "index.html",
        type: "html"
    };
    if (go_to_root){
        return route;
    }
    re_match = reMatch(url_regex, url);
    // this should probably check whether the server is allowed to serve those files, but w/e
    switch (re_match.matched_name){
        case 'img':
            // check for allowed file extensions
            if (['jpg', 'jpeg', 'gif', 'png'].includes(re_match.content[2])){
                route.filename = re_match.content[1] + '.' + re_match.content[2];
                route.type = "image";
            }
            break;
        case 'css':
            route.filename = re_match.content[1] + '.css';
            route.type ='css';
            break;
        case 'js':
            route.filename = re_match.content[1] + '.js';
            route.type = 'js';
            break;
        case 'view':
            route.filename = re_match.content.join('_') + '.html';
            route.type = 'html'
            break;
        default:
            break;
    }
    return route;
}

function reMatch(reDict, string){
    let res = {};
    let match;
    for (let re in reDict){
        match = string.match(reDict[re]);
        if (match){
            res.matched_name = re;
            res.content = match;
            break;
        }
    }
    return res;
}

function displayContent(route, res) {
    let filename = route.filename, type = route.type, path, content_type;
    switch (type) {
        case "image":
            path = "./img/";
            content_type = "image/jpeg";
            break;
        case "css":
            path = "./css/";
            content_type = "text/css";
            break;
        case "js":
            path = "./js/";
            content_type = "text/javascript";
        default:
            path = "./views/";
            content_type = "text/html";
    }
    fs.readFile(path += filename, type === 'image' ? undefined : 'utf8', function(err, contents) {
        if (!err){
            res.writeHead(200, { "Content-Type": content_type });
            res.write(contents);
            res.end();
        }
        else {
            console.log('path not found', path);
            displayContent(routeRequest(undefined, true), res);
        }
    });
}