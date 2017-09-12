const express = require('express');
const bodyParser = require('body-parser');
const querystring = require('querystring');

const app = express();

app.use(express.static(__dirname + '/static'));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index');
})

const server = app.listen(8000, () => {
    console.log('server started');
});

const s_sock = require('socket.io').listen(server);
s_sock.on('connection', (c_sock) => {
    c_sock.on('posting_form', (data) => {
        data = querystring.parse(data.form);
        
        s_sock.emit('updated_message', {
            response: 'You emitted the following information to the server: ' + JSON.stringify(data)
        });
        s_sock.emit('random_number', {
            response: 'Your lucky number emitted by the server is ' + Math.floor(Math.random() * 1000 + 1)
        });
    });
})