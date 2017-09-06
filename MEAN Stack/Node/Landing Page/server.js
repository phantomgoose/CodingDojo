let http = require("http");
let fs = require("fs");

let server = http.createServer(function(req, res) {
    console.log("request url", req.url);
    switch (req.url) {
        case "/":
            displayPage("index.html", res, req);
            break;
        case "/dojo.html":
            displayPage("dojo.html", res, req);
            break;
        case '/ninjas':
            displayPage('ninjas.html', res, req);
            break;
        case '/dojos/new':
            displayPage('dojos.html', res, req);
            break;
        default:
            displayPage('error.html', res, req);
    }
});

function displayPage(filename, res, req) {
    fs.readFile(filename, "utf8", function(err, contents) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.write(contents);
        res.end();
    });
}

server.listen(8000);
console.log("running on localhost:8000");
