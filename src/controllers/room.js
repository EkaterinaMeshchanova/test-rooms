const HttpStatus = require('http-status-codes');
const makeError = require('./http-error');
const { wrapController } = require('../helpers/catchError');

function makeRoomController({ roomService }) {
  const controller = {
    async getRooms(req, res) {
      const { query: { fromDate, toDate } } = req;
      
      const rooms = await roomService.getRooms(new Date(fromDate), new Date(toDate) );
      res.status(HttpStatus.OK).json(rooms);
    },
    async reserveRoom(req, res) {
      const { body: { fromDate, toDate, roomId } } = req;
      
      await roomService.reserveRoom(roomId, new Date(fromDate), new Date(toDate));
      res.sendStatus(HttpStatus.OK);
    }
  };

  wrapController(controller);

  return controller;
}

module.exports = makeRoomController;
