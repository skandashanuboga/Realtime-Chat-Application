const socket = io('http://localhost:8000');

//Get DOM elements in a respective js variables
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageinp');
const messageContainer = document.querySelector(".container");

//audio that will play on recieviing messages
var audio = new Audio('anxious.mp3');

//Append function which will append info to the container
const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
    if (position == 'left') {
        audio.play();
    }
}


//Ask new user for their name and let the server know
 const name = prompt("Enter your name");
socket.emit('new-user-joined', name);

//If new user joined recieve the event from the server
socket.on('user-joined', name => {
    append(name + ' joined the chat', 'left');
});

//If server sends the message recieve it
socket.on('recieve', data => {
    append(data.name + ':' + data.message, 'left');
});

//If user leaft the chat append in contaner
socket.on('left', name => {
    append(name + ' left the chat', 'left');
});

//If form gets submitted send sever a message
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = messageInput.value;
    append('You: ' + message, 'right');
    socket.emit('send', message);
    messageInput.value = ' ';
})