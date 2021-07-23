let interval;

module.exports = io => {
    console.log('*****sockets are imported');
    io.on('connect', (socket) => {
        console.log('User connected')
        const users = [];
        for (let [id, socket] of io.of("/").sockets) {
            console.log('*****', socket.username)
            users.push({
                userID: id,
                username: socket.username,
            });
        }
        console.log('users server -> client', users);
        // socket.emit("users", users);



        // notify existing users
        socket.broadcast.emit("user connected", {
            userID: socket.id,
            username: socket.username,
        });


        // onEmitWithInterval(socket, 'stats', '', 10000)
        onBroadcastWithInterval(socket, 'ranking', users, 50000)
        // onEmit(socket, 'news', 'hello')

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
    socket.on('score', (msg) => {
        let parsedMsg = JSON.parse(msg)
        console.log('client --> server: ' + parsedMsg + msg);
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
        this.users.forEach((user) => {
            if (user.self) {
                user.connected = false;
            }
        });
    })
}


//
// function onEmitWithInterval(socket, topic, message, interval) {
//     if (interval) {
//         clearInterval(interval);
//     }
//     interval = setInterval(() => getApiAndEmit(socket, topic), interval);
// }

// function onEmit(socket, topic, message) {
//     console.log(`emitting on ${topic} topic with message ${message}`)
//     socket.emit(topic, {
//         message: message
//     })
// }


// const getApiAndEmit = ( socket, topic) => {
//     const response = new Date();
//     socket.emit(topic, response);
//     console.log(`Emitting on ${topic} topic: ${response}`)
// };
//
