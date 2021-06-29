const socket = io.connect("http://localhost:5000");

//Queries
var start = document.getElementById('start');
    stop = document.getElementById('stop'),
    logconsole = document.getElementById('console');

// Auto Scroll

//Event emitters
start.addEventListener('click', () => {
    socket.emit('start')
})

stop.addEventListener('click', ()=> {
    socket.emit('stop')
})

//Socket Event Listeners
socket.on('consoleMessage',data=>{
    logconsole.innerHTML += "<p>" + data + "</p>";
    logconsole.scrollTop = logconsole.scrollHeight;
})
