const express = require('express');
const path = require('path');

const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'public'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use('/graph/:zeta/:threshold', (req , res) => {
    zeta = req.params.zeta;
    threshold = req.params.threshold
    io.emit('message', {
        zeta: zeta,
        threshold: threshold
    });
    res.status(200).send({
        zeta: zeta,
        threshold: threshold
    });
    console.log('received:', {
        zeta: zeta,
        threshold: threshold
    });
})

app.use('/', (req , res) => {
    res.render('index.html');

})


let messages = [1, 2, 3, 4, 5];

io.on('connection', socket => {
    console.log(`socket conectado: ${socket.id}`)

});

server.listen(3000);
