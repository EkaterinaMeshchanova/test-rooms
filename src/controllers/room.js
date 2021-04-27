const HttpStatus = require('http-status-codes');
const { wrapController } = require('../helpers/catchError');
const makeError = require('./http-error');
const { badRequest } = makeError;

function makeRoomController({ roomService }) {
  const controller = {
    async getRooms(req, res) {
      const { query: { fromDate, toDate } } = req;

      if (!fromDate || !toDate) {
        throw badRequest ({date: 'Date is not correct'})
      }

      const rooms = await roomService.getRooms(new Date(fromDate), new Date(toDate) );
      res.status(HttpStatus.OK).json(rooms);
    },
    async reserveRoom(req, res) {
      const { body: { fromDate, toDate, roomId } } = req;
      
      if (!roomId) {
        throw badRequest ({roomId: 'RoomId is not correct'})
      }
      
      if (!fromDate || !toDate) {
        throw badRequest ({date: 'Date is not correct'})
      }
      
      await roomService.reserveRoom(roomId, new Date(fromDate), new Date(toDate));
      res.sendStatus(HttpStatus.OK);
    }
  };

  wrapController(controller);

  return controller;
}

module.exports = makeRoomController;
