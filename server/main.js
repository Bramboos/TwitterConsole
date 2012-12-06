var      twit = require('twit'),
           io = require('socket.io').listen(8081),
  credentials = require('./credentials.js')

//Set socket log level to 1 (no debug messages)
io.set('log level', 1)

// New Twit object, insert tokens
var twitter = new twit(credentials.Twitter)

var stream = twitter.stream('statuses/filter', { track: '.' })
 
io.sockets.on('connection', function (socket) {

  stream.on('tweet', function (tweet) {
    socket.emit('tweet', tweet)
  })
  
  socket.on('disconnect', function () {
    console.log('bye');
  });
})


// Clean shutdown
process.on( 'exit', function(){
        //End socket connection
})
process.on( 'SIGINT', function(){
        process.exit(0);
})
process.on( 'SIGHUP', function(){
        process.exit(0);
})

// Do not let it crash
process.on( 'uncaughtException', function( err ){
        console.log( 'Caught exception: ' + err );
        console.log( err.stack )
})
