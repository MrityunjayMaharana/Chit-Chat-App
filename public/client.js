const socket = io();

let name;
let chatBox = document.querySelector(".chat-container");
let inputMsg = document.getElementById("inputMessage");
let sendMsg = document.getElementById("sendBtn");

// Prompt for name when the page loads
window.onload = function() {
    do {
        name = prompt("Enter your name here : ");
    } while(!name);
}

// Function to send message
sendMsg.addEventListener("click", e => {
    sendMessage(inputMsg.value);
});

function sendMessage(message) {
    let msg = {
        user: name,
        message: message.trim()
    };

    appendMessage(msg, 'outgoing');
    inputMsg.value = "";

    scrollToBottom();

    socket.emit('message', msg);
}

function appendMessage(msg, type) {
    let msgDiv = document.createElement('div');
    let className = type;
    msgDiv.classList.add(className, 'msg');

    let markup = `
        <h4>${msg.user}</h4>
        <p>${msg.message}</p>
    `;
    msgDiv.innerHTML = markup;
    chatBox.appendChild(msgDiv);
}

socket.on('message', (msg) => {
    appendMessage(msg, 'incoming');
    scrollToBottom();
});

function scrollToBottom() {
    chatBox.scrollTop = chatBox.scrollHeight;
}
