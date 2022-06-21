"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnGreeting = void 0;
function returnGreeting(greeting) {
    let greetingLength = getLength(greeting);
    console.log(`The message from GreetingsLength_module is ${greeting}. It is ${greetingLength} characters long.`);
}
exports.returnGreeting = returnGreeting;
function getLength(message) {
    return message.length;
}
