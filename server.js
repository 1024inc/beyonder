const app = require('express')()
const server = require('http').Server(app)
const io = require('socket.io')(server, { cors: {
    origin: "http://loclahost:4998",
    methods: ["GET", "POST"]
  }})
const next = require('next')
const socketHandler = require('./socket');

const dev = process.env.NODE_ENV != 'production'
const nextApp = next({ dev })
const nextHandler = nextApp.getRequestHandler()
const port  = 4998

socketHandler(io)

nextApp.prepare().then(() => {
    app.get('*', (req, res) => {
        return nextHandler(req, res)
    })

    server.listen(port, (err) => {
        if (err) throw err
        console.log(`Listening on port: ${port}`)
    })
})
