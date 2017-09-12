const express = require("express");
const bodyParser = require("body-parser");
const formParser = bodyParser.urlencoded({ extended: true });
const session = require("express-session");
const app = express();

class Node {
    constructor(val) {
        this.val = val;
        this.next;
    }
}

class SLL {
    constructor() {
        this.head;
        this.tail;
        this.length;
    }
    add(val) {
        let new_node = new Node(val);
        if (!this.tail) {
            this.head = new_node;
            this.tail = new_node;
            this.length = 1;
            return this;
        }
        this.tail.next = new_node;
        this.tail = new_node;
        this.length++;
        return this;
    }
    pop() {
        if (!this.head) {
            return this;
        }
        this.head = this.head.next;
        this.length--;
        return this;
    }
}

class Messages extends SLL {
    constructor() {
        super();
    }
    trim() {
        while (this.length > 100) {
            this.pop();
        }
        return this;
    }
    new_message(name, message) {
        this.add({ name: name, message: message });
        return this;
    }
    print_all() {
        this.trim();
        let res = [];
        let curr_mess = this.head;
        while (curr_mess) {
            res.push({
                name: curr_mess.val.name,
                message: curr_mess.val.message
            });
            curr_mess = curr_mess.next;
        }
        return res;
    }
    get_last_message() {
        return this.tail.val;
    }
}

let USERS = {};

let MESSAGES = new Messages();

app.use(express.static(__dirname + "/static"));
app.use(session({ secret: "cats" }));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    req.session.logged_in ? res.redirect("/chat") : res.render("index");
});

app.get("/chat", (req, res) => {
    if (req.session.logged_in) {
        res.render("chat", { session_id: req.session.id });
    } else {
        res.redirect("/");
    }
});

app.post("/", formParser, (req, res) => {
    USERS[req.session.id] = {
        name: req.body.name,
        socket_id: undefined,
        connected: false
    };
    req.session.logged_in = true;
    res.redirect("/chat");
});

app.get("/logout", (req, res) => {
    req.session.logged_in = false;
    delete req.session.id;
    res.redirect("/");
});

const server = app.listen(8000, () => {
    console.log("server started");
});

const io = require("socket.io").listen(server);

io.sockets.on("connection", c_sock => {
    console.log("client connected: ", c_sock.id);
    c_sock.on("new_user", res => {
        USERS[res.session_id].socket_id = c_sock.id;
        if (USERS[res.session_id].connected === false) {
            USERS[res.session_id].connected = true;
            c_sock.broadcast.emit("user_joined", {
                user_name: USERS[res.session_id].name
            });
        } else {
            c_sock.broadcast.emit("user_rejoined", {
                user_name: USERS[res.session_id].name
            });
        }
    });
    c_sock.on("request_old_messages", () => {
        c_sock.emit("old_messages", { old_messages: MESSAGES.print_all() });
    });
    c_sock.on("send_message", res => {
        MESSAGES.new_message(USERS[res.session_id].name, res.message);
        let message = MESSAGES.get_last_message();
        io.sockets.emit("message_posted", {
            name: message.name,
            message: message.message
        });
    });
    c_sock.on("user_force_disconnect", res => {
        USERS[res.session_id].connected = false;
        USERS[res.session_id].socket_id = undefined;
        c_sock.broadcast.emit("user_left", {
            user_name: USERS[res.session_id].name
        });
    });
    c_sock.on("disconnect", () => {
        let session_id;
        for (let session in USERS) {
            if (USERS[session].socket_id === c_sock.id) {
                USERS[session].socket_id = undefined;
                session_id = session;
                break;
            }
        }
        setTimeout(() => {
            if (
                USERS[session_id] &&
                USERS[session_id].socket_id === undefined &&
                USERS[session_id].connected === true
            ) {
                USERS[session_id].connected = false;
                c_sock.broadcast.emit("user_left", {
                    user_name: USERS[session_id].name
                });
            }
        }, 10000);
    });
});
