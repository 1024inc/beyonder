const app = require('express')()
const server = require('http').Server(app)
const next = require('next')
const dev = process.env.NODE_ENV != 'production'
const nextApp = next({ dev })
const host = process.env.NODE_ENV != 'production' ? 'localhost' : `10.128.0.17`

const io = require('socket.io')(server, { cors: {
    origin: `http://${host}:4998`,
    methods: ["GET", "POST"]
  }})

const socketHandler = require('./socket');


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
