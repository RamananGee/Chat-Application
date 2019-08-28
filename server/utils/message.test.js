var expect = require('expect');

var {generateMessage} = require('./message');

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