const Sequelize = require('sequelize');
const { Op } = Sequelize;
const makeError = require('../controllers/http-error');
const { badRequest } = makeError;

module.exports = function makeRoomService({ models }) {
  const { Room, ReservedRoom } = models;

  return {
   async getRooms(fromDate, toDate) {
     const reservedRooms = await ReservedRoom.findAll({ where: {
      reservedDate: {
        [Op.notBetween]: [fromDate, toDate]
      }
     }});
     const ids = reservedRooms.map(item => item.roomId);
      const rooms = await Room.findAll({where: {
        id: { [Op.notIn]: ids}
      }})
      return rooms;
   },
   async reserveRoom(roomId, fromDate, toDate) {
    const reservedRooms = await ReservedRoom.findAll({ where: {
      roomId,
      reservedDate: {
        [Op.notBetween]: [fromDate, toDate]
      }
     }});
     if (reservedRooms.length) {
      throw badRequest({room: 'Room reserved'})
     }    

     for (let i = fromDate; i <= toDate; new Date(i.setDate(i.getDate() + 1))) {
      await ReservedRoom.create({roomId, reservedDate: i});
     };
  },
 
  };
};

