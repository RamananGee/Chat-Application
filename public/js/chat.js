

var socket = io();

function scrollToBottom () {
    //Selectors
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');
    //Heights
    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight ){
        messages.scrollTop(scrollHeight);
    }
}

socket.on('connect', function () {
   var params = jQuery.deparam(window.location.search);//this will return an object

   socket.emit('join', params, function(err){//this emit by the client and listen by the server
       if (err) {
            alert(err);
            window.location.href =  '/'; //redirecting to the same page
       } else {
            console.log('No error');
       }
   });
});

socket.on('disconnect', function () {
    console.log('Disconnected from server');
});

socket.on('updateUserList', function(users){
    var ol = jQuery('<ol></ol>');

    users.forEach(function (user){
        ol.append(jQuery('<li></li>').text(user));
    });

    jQuery('#users').html(ol);
});

socket.on('newMessage', function (message) {
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#message-template').html();
    var html = Mustache.render(template,{
       text: message.text,
       from: message.from,
       createdAt: formattedTime
    });

    jQuery('#messages').append(html);
    scrollToBottom();
   
});

socket.on('newLocationMessage', function (message){
    var formattedTime = moment(message.createdAt).format('h:mm a');
    var template = jQuery('#location-message-template').html();
    var html = Mustache.render(template,{
        
        from: message.from,
        createdAt: formattedTime,
        url: message.url
     });
     
     jQuery('#messages').append(html);
    scrollToBottom();
});



jQuery('#message-form').on('submit', function (e){
    e.preventDefault();
var messageTextbox = jQuery('[name=message]');


    socket.emit('createMessage',{
        from: 'User',
        text: messageTextbox.val()
    }, function(){
        messageTextbox.val('')
    });
});

var locationButton = jQuery('#send-location');
locationButton.on('click', function(){
    if(!navigator.geolocation){
        return alert('Geolocation not supported by your browser.');
}
    locationButton.attr('disabled', 'disabled').text('Sending location...');
    navigator.geolocation.getCurrentPosition(function (position){
        locationButton.removeAttr('disabled').text('Send location');
        socket.emit('createLocationMessage', {
            //this part going to emit the current location to the server
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        });
    }, function(){
        locationButton.removeAttr('disabled').text('Send location');
        alert('Unable to fetch location.');
    });
});