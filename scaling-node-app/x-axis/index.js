const cluster = require('cluster');
const http = require('http');

const numCpus = require('os').cpus().length;

if (cluster.isMaster) {
    console.log('This is a master process', process.pid);

    for (i = 0; i < numCpus; i++) {
        cluster.fork();
    }

    cluster.on('exit', worker => {
        console.log(`Worker process ${worker.process.pid} had died.`);
        console.log('Restarting process...');
        cluster.fork();
        console.log(`Remain ${Object.keys(cluster.workers).length} workers.`);
    });
} else {
    console.log(`Started worker at ${process.pid} pid.`);
    http.createServer((req, res) => {
        res.end(`Process pid is ${process.pid}`);
        if (req.url === '/kill') {
            process.exit();
        } else if (req.url === '/') {
            console.log(`Serving from ${process.pid}...`);
        }
    }).listen(3000);

}