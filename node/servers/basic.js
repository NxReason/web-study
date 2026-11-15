import http from 'node:http';

function makeResponse(res, code, type) {
  res.statusCode = code;
  res.setHeader('Content-Type', type);
}

function makeTextResponse(res) {
  makeResponse(res, 200, 'text/plain');
}

function makeJsonResponse(res) {
  makeResponse(res, 200, 'application/json');
}

function makeNotFoundResponse(res) {
  makeResponse(res, 404, 'text/plain');
}

function makeBadRequestResponse(res) {
  makeResponse(res, 400, 'text/plain');
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);
  console.log(url.pathname);
  console.log(url.searchParams);
  let responseBody = '';
  switch (url.pathname) {
    case '/':
      makeTextResponse(res);
      responseBody = 'Hello, World!';
      break;
    case '/about':
      makeTextResponse(res);
      responseBody = 'Aboue page';
      break;
    case '/health':
      makeJsonResponse(res);
      responseBody = JSON.stringify({ status: 'ok' });
      break;
    case '/greet':
      if (!url.searchParams.get('name')) {
        makeBadRequestResponse(res);
        responseBody = 'Provide a name';
        break;
      }
      makeTextResponse(res);
      responseBody = `Hello, ${url.searchParams.get('name')}`;
      break;
    default:
      makeNotFoundResponse(res);
      responseBody = '404 Not Found';
      break;
  }

  res.end(responseBody);
});

server.on('listening', () => {
  console.log('server is listening');
});

server.on('error', err => {
  console.error('Error: ', err.message);
});

server.on('close', () => {
  console.log('server stopped');
});

server.listen(3000);
