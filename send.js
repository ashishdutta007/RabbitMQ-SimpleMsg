//import the amqp callback api or the promise api
var amqp = require('amqplib/callback_api');


//connect (using amqp protocol) RabbitMQ installation with factory settings, on localhost.
amqp.connect('amqp://localhost', function(error, conn) {
    if (error) {
        console.log("Connection error occured", error);
        process.exit(1);
    } else {
        //channel objects in both the API's contain all the methods
        //channels are multiplexed over connections, and represent something like a session
        conn.createChannel(function(error, channel) {
            //Queue name
            var simplemsg = 'Tasks-Queue';
            if (error) {
                console.log("Error occured", error);
                process.exit(1);
            } else {
                //assertQueue([queue, [options, [function(err, ok) {...}]]])
                //Assert/Declare a queue into existence
                channel.assertQueue(simplemsg, { durable: false });
                //Send a single message with the content given as a buffer to the specific queue
                //Publish a message to the queue
                channel.sendToQueue(simplemsg, new Buffer('Hello World'));
                console.log(" [x] Sent 'Hello World!'");
            }
        });
    }
    setTimeout(function() {
        conn.close();
        process.exit(0)
    }, 500);
});
