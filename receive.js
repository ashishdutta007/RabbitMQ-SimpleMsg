//Import amqp callback API
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
            //Declare the queue here, might start the consumer before the publisher
            var simplemsg = 'Tasks-Queue';
            if (error) {
                console.log("Error occured", error);
                process.exit(1);
            } else {
                //assertQueue([queue, [options, [function(err, ok) {...}]]])
                //Assert/Declare a queue into existence
                channel.assertQueue(simplemsg, { durable: false });
                console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", simplemsg);


                //Tell the server to deliver us the messages from the queue. 
                //Since it will push messages asynchronously,provide a callback that will be executed when RabbitMQ pushes messages to consumer.
                //{noAck: true} will dequeue msg from the MQ without ack from the consumer
                channel.consume(simplemsg, function(msg) {
                    console.log(" [x] Received %s", msg.content.toString());
                }, { noAck: true });
            }
        });
    }
});
