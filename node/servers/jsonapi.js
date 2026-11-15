import http from 'node:http';

const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
];

function sendNotFound(res) {
  res.statusCode = 404;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ error: 'Endpoint not found' }));
}

function sendResponse(res, body) {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

function handleUsers(req, res, url) {
  if (req.method === 'GET' && url.pathname === '/users') {
    sendResponse(res, users);
    return;
  }

  console.log(url.pathname);
  if (req.method === 'GET' && url.pathname.match(/^\/users\/\d*$/)) {
    const id = parseInt(url.pathname.slice(7));
    const user = users.find(u => u.id === id);
    sendResponse(res, user);
    return;
  }

  if (req.method === 'POST') {
  }

  sendNotFound(res, 'invalid user endpoint');
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url, `http://${req.headers.host}`);

  if (url.pathname.startsWith('/users')) {
    handleUsers(req, res, url);
  } else {
    sendNotFound(res);
  }
});

server.listen(3000);
