const express = require("express");
const app = express();

let button_press_count = 0;

app.use(express.static(__dirname + "/static"));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("index");
});

const server = app.listen(8000, () => {
    console.log("server started");
});

const io = require("socket.io").listen(server);

io.sockets.on("connection", c_sock => {

    let update = function() {
        io.emit("button_update", {
            press_count: button_press_count
        });
    };

    update();
    c_sock.on("button_press", () => {
        button_press_count++;
        update();
    });
    c_sock.on('button_reset', () => {
       button_press_count = 0;
       update(); 
    });
});
