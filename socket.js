let interval;

module.exports = io => {
    console.log('*****sockets are imported');
    io.on('connect', (socket) => {
        console.log('User connected')

        // onEmitWithInterval(socket, 'stats', '', 10000)
        // onBroadcastWithInterval(socket, 'ranking', '', 50000)
        onEmit(socket, 'news', 'hello')

        onReceive(socket)
        onDisconnect(socket)
    })
}

const getApiAndEmit = ( socket, topic) => {
    const response = new Date();
    socket.emit(topic, response);
    console.log(`Emitting on ${topic} topic: ${response}`)
};

const getApiAndBroadcast = ( socket, topic) => {
    const response = new Date();
    socket.emit(topic, response);
    console.log(`Emitting on ${topic} topic: ${response}`)
};

function onReceive(socket){
    socket.on('mes', (msg) => {
        console.log('message from client: ' + msg);
    })
}

function onEmitWithInterval(socket, topic, message, interval) {
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => getApiAndEmit(socket, topic), interval);
}

function onEmit(socket, topic, message) {
    console.log(`emitting on ${topic} topic with message ${message}`)
    socket.emit(topic, {
        message: message
    })
}

function onBroadcastWithInterval(socket, topic, message, interval) {
    if (interval) {
        clearInterval(interval);
    }
    interval = setInterval(() => getApiAndBroadcast(socket, topic), interval);
}

function onDisconnect(socket) {
    socket.on('disconnect', () => {
        console.log('user disconnected');
        clearInterval(interval);
    })
}
