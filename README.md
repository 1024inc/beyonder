
```bash
$ git clone git@github.com:1024inc/beyonder.git

# Server is will be running on port 4998
# Start dev express server with socket.io 
$ npm run dev
# Start dev next server without socket.io
$ npm run next-dev
# Build for production
$ npm run build
# Start production express server with sockets.io
$ npm run start
# Start dev next server without socket.io
$ npm run next-start
# Check for linking errors
$ npm run lint

# To run docker locally build docker image locally first or it will be pulled from gcp 
$ cd docker
$ make build
$ cd ..
$ docker-compose up

# To push freshly build image to gcp
$ cd docker
$ make push


```

Open [http://localhost:4998](http://localhost:4998) with your browser to see the result.
