const wsUrl = 'wss://echo-ws-service.herokuapp.com';

const sendBtn = document.querySelector('.send-btn');
const btnSendLocation = document.querySelector('.send-geolocation');
const messageText = document.querySelector('.message_text');
const output = document.querySelector('.chat_wrap');
const mapLink = document.querySelector('#map-link');

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


//для отправки локации
function sendLocation(location) {
    let locationElement = document.createElement('div');
    locationElement.classList.add('client_message');
    locationElement.innerHTML = location;
    output.appendChild(locationElement);
    websocket.close();
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


btnSendLocation.addEventListener('click', () => {
    mapLink.href = '';
    mapLink.textContent = '';
    if (!navigator.geolocation) {
        alert('Geolocation не поддерживается вашим браузером');
    } else {
        navigator.geolocation.getCurrentPosition(success, error);
    }
})

//Функция, выводящая тест об ошибке
const error = () => {
    alert('Невозможно получить ваше местоположение');
}

//Функция, срабатывающая при успешном получении геолокации
const success = (position) => {

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const mapLink = document.createElement('a');
    mapLink.href = `https://www.openstreetmap.org/#map=18/${latitude}/${longitude}`;
    mapLink.textContent = 'Гео-локация';
    mapLink.target = '_blank'
    sendLocation(mapLink.outerHTML);
   
}

