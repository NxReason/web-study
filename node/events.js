import EventEmitter from 'node:events';
import { randomUUID } from 'node:crypto';

class DocsEmitter extends EventEmitter {}

class Request {
  constructor(id = 0) {
    this.id = id;
  }

  handle(text) {
    console.log(`Request id: ${this.id}: handling the text - ${text}`);
  }
}

function docs() {
  const emitter = new DocsEmitter();

  emitter.on('docs-event', () => {
    console.log('docs event handled by lambda');
  });
  emitter.emit('docs-event');

  const req = new Request(10);
  emitter.on('new-req', req.handle.bind(req));
  emitter.emit('new-req', 'hello world');

  emitter.on('error', err => console.error(`Caught error: ${err.message}`));
  emitter.emit('error', new Error('something went wrong'));

  const captureEmitter = new DocsEmitter({ captureRejections: true });
  captureEmitter.on('newListener', eventName =>
    console.log(`New Listener of event: ${eventName}`),
  );
  captureEmitter.on('async-rej', async () => {
    throw new Error('async error');
  });
  captureEmitter.emit('async-rej');
  captureEmitter.on('error', err =>
    console.error(`Caught error: ${err.message}`),
  );

  const target = new EventTarget();
  target.addEventListener('targeted', event => {
    console.log(`Targeted: ${event.payload.msg}`);
  });
  class DocsEvent extends Event {
    constructor(name, payload, options) {
      super(name, options);
      this.payload = payload;
    }
  }
  target.dispatchEvent(new DocsEvent('targeted', { msg: 'foo' }));
}

docs();

// problem set
// 1
class AppEvents extends EventEmitter {
  constructor() {
    super();
    this.once('start', () => console.log('App started'));
    this.once('stop', () => console.log('App stopped'));
  }
  start() {
    this.emit('start');
  }
  stop() {
    this.emit('stop');
  }
  message(from, to, content) {
    this.emit('message', { from, to, content });
  }
  onStart(handler) {
    this.addListener('start', handler);
  }
  onMessage(handler) {
    this.addListener('message', handler);
  }
  offMessage(handler) {
    this.removeListener('message', handler);
  }
  onStop(handler) {
    this.addListener('stop', handler);
  }
}

function printChatters({ from, to }) {
  console.log(`Message from [${from}] to [${to}]`);
}
function printContent({ content }) {
  console.log(`Content: ${content}`);
}

function runApp() {
  const app = new AppEvents();
  app.start();
  app.onMessage(printChatters);
  app.onMessage(printContent);
  app.message('nxr', 'foo', 'hi');
  app.offMessage(printChatters);
  app.message('foo', 'nxr', 'hello');
  app.stop();
}

runApp();

// 3
class UserService extends EventEmitter {
  constructor() {
    super();

    this.users = {};
  }

  createUser(user) {
    const id = randomUUID();
    this.users[id] = user;

    this.emit('user-created', { id, ...user });

    return id;
  }

  onCreated(handler) {
    this.on('user-created', handler);
  }

  deleteUser(id) {
    if (this.users[id]) {
      delete this.users[id];
    }
    this.emit('user-deleted', id);
  }

  onDeleted(handler) {
    this.on('user-deleted', handler);
  }
}

function runUserService() {
  const userService = new UserService();

  userService.onCreated(user => {
    console.log(`created user with id: ${user.id}, name ${user.name}`);
  });
  userService.onDeleted(id => {
    console.log(`deleted user with id: ${id}`);
  });

  userService.createUser({ name: 'nxr' });
  const fooId = userService.createUser({ name: 'foo' });
  userService.deleteUser(fooId);
}

runUserService();
