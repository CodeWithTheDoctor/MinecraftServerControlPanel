const express = require('express')
const spawn = require('child_process').spawn

const app = express()

app.post('/start', (req,res) => {
	console.log("Startin the servah")

	//Spawn server child process
	const server = spawn('C:/Program Files/Java/jdk-16.0.1/bin/java.exe', ['-Xmx1024M', '-Xms1024M', '-jar', 'server.jar', 'nogui'], {
		cwd: "server",
		stdio: 'inherit'
	})
	server.stdout.on('datwa', stdout=> {
		console.log(stdout.toString());
	})
	server.stderr.on('data', stderr=> {
		console.log(stderr.toString());
	});

	server.on('close', code=> {
		console.log("lol, we've stopped :)")
	})
	res.redirect("/")
});

module.exports = app