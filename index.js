const express = require('express')
const cp = require('child_process')
const EventEmitter = require('events');
const socket = require('socket.io');

//App setup
const app = express();
const emitter = new EventEmitter();
const PORT = process.env.PORT || 5000;
const backend = app.listen(PORT,'0.0.0.0', () => console.log(`Server running on ${PORT}.`))
let server = undefined;

//Static files
app.use(express.static('public'))

//Socket setup
const io = socket(backend);

io.on('connection', socket=> {
	console.log(`Socket connection established. ID: ${socket.id}`);

	socket.on('start', ()=> {
	//Spawn server child process
		if(!server) {
			console.log("Startin the servah");
			io.sockets.emit("consoleMessage","Starting the Minecraft server...");
			server = cp.spawn('java', ['-Xmx1024M', '-Xms1024M', '-jar', 'server.jar', 'nogui'], {
				cwd: "server"
			});

			//Server child process stream listners
			server.stdout.on('data', stdout=> {
				console.log(stdout.toString());
				io.sockets.emit("consoleMessage",stdout.toString());
			})
			server.stderr.on('data', stderr=> {
				console.log(stderr.toString());
			});
		
			server.on('close', code=> {
				console.log("lol, we've stopped :)")
			})
		}
		else{
			console.log("Server already running!");
		}
	});

	socket.on('stop',()=> {
		if(!server) {
			console.log("Please start zi server first.")
		} else {
			server.stdin.write("stop");
			server.stdin.end();
			server = undefined;
		}
	});
})
