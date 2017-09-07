const http = require('http');
const static = require('./js/static');
let server = http.createServer(function(req, res){
    static(req, res);
});
server.listen(8000);