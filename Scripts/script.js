const socket = io('http://localhost:800');
const form = document.getElementById('input');
const sentMessage = document.getElementById('msg');
const postMessage = document.querySelector('#chat');
var audio = document.getElementById('audio');

const append = (message, messageType) => {
    const messageInput = document.createElement('div');
    messageInput.innerText = message;
    messageInput.classList.add('message');
    messageInput.classList.add(messageType);
    postMessage.append(messageInput);
}

const username = prompt("What is your Name");
while (username == null || username == ' ' || username == '') {
    username = prompt("What is your Name");
}

socket.emit('someone_joined', username);

socket.on('joined', name => {
    append(name + ' joined the chat', "recieved");
    audio.play();
});

socket.on('recieved', data => {
    append(data.name + " : " + data.message, "recieved");
    audio.play();
});

socket.on('left', name => {
    append(`${name} left`, "recieved");
});

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = sentMessage.value;
    append('You: ' + message, "sent")
    socket.emit('sent', message);
    sentMessage.value = '';
    audio.play();
});