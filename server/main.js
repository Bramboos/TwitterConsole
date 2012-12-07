/*
    Creator: @BramBoos, @DevNerd
    Version: 2.0
*/

var      twit = require('twit'),
           io = require('socket.io').listen(8081),
  credentials = require('./credentials.js'),
      twitter = new twit(credentials.Twitter),
      clients = 0

//Set socket log level to 1 (no debug messages)
io.set('log level', 1)

//Set maxListeners to unlimited
process.setMaxListeners(0)

twitter.stream('statuses/filter', { track: 'sneeuw' }).on('tweet', function (tweet) {
    io.sockets.emit('tweet', tweet)
})

 
io.sockets.on('connection', function (socket) {
    clients++
    io.sockets.emit('count clients', clients)
    
    socket.on('disconnect', function() {
        clients--
        io.sockets.emit('count clients', clients)
    })
})


// Clean shutdown
process.on( 'exit', function(){
        //End socket connection
})
process.on( 'SIGINT', function(){
        process.exit(0)
})
process.on( 'SIGHUP', function(){
        process.exit(0)
})

// Do not let it crash
process.on( 'uncaughtException', function( err ){
        console.log( 'Caught exception: ' + err )
        console.log( err.stack )
})
