const app = require('express')()
const server = require('http').Server(app)
const next = require('next')
const dev = process.env.NODE_ENV != 'production'
const nextApp = next({ dev })
const allowed_origins = [`10.128.0.17:4998`, `http://narwhal.stg:4998`];
const uri = process.env.NODE_ENV != 'production' ? 'localhost:4998' : allowed_origins

const io = require('socket.io')(server, { cors: {
    origin: uri,
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
