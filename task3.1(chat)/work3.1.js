const wsUrl = 'wss://echo-ws-service.herokuapp.com';

const sendBtn = document.querySelector('.message_send-btn');
const messageText = document.querySelector('.message_text');
const output = document.querySelector('.chat_wrap');

let websocket;

// Соединение с веб-сокетом
function connectWebSocket() {
    websocket = new WebSocket(wsUrl);
    websocket.onmessage = function (evt) {
        putToOutputServerMsg(evt.data);
    };
    websocket.onerror = function (e) {
        console.log('Ошибка соединения с сервером');
    }
}

//сообщения клиента
function putToOutputClientMsg(clientMessage) {
    let clientMsg = document.createElement('p');
    clientMsg.classList.add('client_message');
    clientMsg.textContent = clientMessage;
    output.appendChild(clientMsg);
}

//сообщения с сервера
function putToOutputServerMsg(serverMessage) {
    let serverMsg = document.createElement('p');
    serverMsg.classList.add('server_message');
    serverMsg.innerHTML = serverMessage;
    output.appendChild(serverMsg);
}


sendBtn.addEventListener('click', () => {
    if (messageText.value !== '') {
        const message = messageText.value;
        putToOutputClientMsg(message);
        websocket.send(message);
        messageText.value = '';
    } else {
        alert("Вы не ввели сообщение.");
    }
});


connectWebSocket();