const socket = io.connect("http://localhost:5000");

//Queries
var start = document.getElementById('start');
    stop = document.getElementById('stop'),
    console = document.getElementById('console');


//Event emitters
start.addEventListener('click', () => {
    socket.emit('start')
})

stop.addEventListener('click', ()=> {
    socket.emit('stop')
})

//Socket Event Listeners
socket.on('consoleMessage',data=>{
    console.innerHTML += "<p>" + data + "</p>";
})