const express = require('express');

function makeRoomRouter({ roomController }) {
  const router = new express.Router();

  router.get('/', roomController.getRooms);
  router.post('/', roomController.reserveRoom);


  return router;
}

module.exports = makeRoomRouter;
