var socket = io();

socket.on('connect', function () {
   console.log('Connected to server');
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
    console.log('newMessage', message);
    var li = jQuery('<li></li>');//creating the element using jquery
    li.text(`${message.from}: ${message.text}`);//modifying the element from the list
 
    jQuery('#messages').append(li);

});



jQuery('#message-form').on('submit', function (e){
    e.preventDefault();

    socket.emit('createMessage',{
        from: 'User',
        text: jQuery('[name=message]').val()
    }, function(){
        
    });
});