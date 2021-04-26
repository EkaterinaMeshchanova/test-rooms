const awilix = require('awilix');
const debug = require('debug')('AppContextRoot');

const models = require('../models');
const { makeRoomService } = require('./services');
const { makeRoomController } = require('./controllers');

const makeRoomRouter = require('./routes/room');
const makeRootRouter = require('./routes/root');


function registerModels(container) {
  container.register({ models: awilix.asValue(models) });
}

async function registerServices(container) {
  container.register({
    roomService: awilix.asFunction(makeRoomService).singleton(),
  });
}

function registerControllers(container) {
  container.register({
    roomController: awilix.asFunction(makeRoomController).singleton(),
  });
}

function registerRouters(container) {
  container.register({
    roomRouter: awilix.asFunction(makeRoomRouter).singleton(),
    rootRouter: awilix.asFunction(makeRootRouter).singleton(),
  });
}

async function initAppContext() {
  debug('Starting dependencies configuration');

  const container = awilix.createContainer({
    injectionMode: awilix.InjectionMode.PROXY,
  });

  registerModels(container);
  await registerServices(container);
  registerControllers(container);
  registerRouters(container);


  debug('All the dependencies are constructed and Injected properly');

  return container;
}

module.exports = initAppContext;
