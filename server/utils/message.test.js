var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', ()=>{
it('Should generate correct message object', ()=>{
var from = 'ramanan';
var text = 'hey! how are you';
var message = generateMessage(from, text);//getting the response from the generateMessage and storing in message
expect(message.createdAt).toBeA('number');
// expect(message.from).toBe(from);
// expect(message.text).toBe(text); or
expect(message).toInclude({from, text});
});
});

describe('generateLocationMessage', ()=>{
    it('should generate correct location object', ()=>{
        var from = 'Deb';
        var latitude = 15;
        var longitude = 19;
        var url = 'https://www.google.com/maps?q=15,19';
        var message = generateLocationMessage(from, latitude, longitude);
        expect(message).toInclude({from, url});
        expect(message.createdAt).toBeA('number');


    });
});