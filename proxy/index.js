const http = require('http');
const url = require('url');

// simple proxy http server 
http.createServer((req, res) => {
  console.log('Start request', req.url);
  const options = url.parse(req.url);
  options.headers = url.headers;

  const proxyRequest = http.request(options, (proxyResponse) => {
    proxyResponse.on('data', (chunk) => {
      res.write(chunk, 'binary');
    });

    proxyResponse.on('end', () => {
      console.log('Request successfully proxied!');
      res.end();
    });

    res.writeHead(proxyResponse.statusCode, proxyResponse.headers);
  });

  // proxying data
  req.on('data', (chunk) => {
    proxyRequest.write(chunk, 'binary');
  });
  req.on('end', () => {
    console.log('Data proxied.');
    proxyRequest.end();
  });
}).listen(8080, '0.0.0.0', () => {
  console.log('Start proxy...');
});