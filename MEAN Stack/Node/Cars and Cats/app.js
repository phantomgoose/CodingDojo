let http = require("http");
let fs = require("fs");

let server = http.createServer(function(req, res) {
    console.log("inc connection", req.url);
    switch (req.url) {
        case "/cars":
            displayContent("cars.html", "html", req, res);
            break;
        case "/images/car1.jpg":
            displayContent("car1.jpg", "image", req, res);
            break;
        case "/images/car2.jpg":
            displayContent("car2.jpg", "image", req, res);
            break;
        case "/images/car3.jpg":
            displayContent("car3.jpg", "image", req, res);
            break;
        case "/cats":
            displayContent("cats.html", "html", req, res);
            break;
        case "/images/cat1.jpg":
            displayContent("cat1.jpg", "image", req, res);
            break;
        case "/images/cat2.jpg":
            displayContent("cat2.jpg", "image", req, res);
            break;
        case "/images/cat3.jpg":
            displayContent("cat3.jpg", "image", req, res);
            break;
        case "/cars/new":
            displayContent("cars-new.html", "html", req, res);
            break;
        case "/stylesheets/master.css":
            displayContent("master.css", "css", req, res);
            break;
        default:
            displayContent("404.html", "html", req, res);
    }
});

function displayContent(filename, type, req, res) {
    let path;
    let content_type;
    switch (type) {
        case "html":
            path = "./views/";
            content_type = "text/html";
            break;
        case "image":
            path = "./images/";
            content_type = "image/jpeg";
            break;
        case "css":
            path = "./stylesheets/";
            content_type = "text/css";
            break;
        default:
            path = "./views/";
            content_type = "text/html";
    }
    path += filename;
    content_type = { "Content-Type": content_type };
    let encoding = type === "image" ? undefined : "utf8";
    fs.readFile(path, encoding, function(err, contents) {
        res.writeHead(200, content_type);
        res.write(contents);
        res.end();
    });
}

server.listen(8000);
