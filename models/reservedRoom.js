const { Model } = require('sequelize');

class ReservedRoom extends Model {

}

module.exports = (sequelize, DataTypes) => {
  ReservedRoom.init({
    roomId: DataTypes.BIGINT,
    reservedDate: DataTypes.DATE,
  }, {
    timestamps: true,
    sequelize,
  });

  ReservedRoom.associate = function(models) {
    ReservedRoom.belongsTo(models.Room, {
      foreignKey: 'roomId',
      as: 'room',
    });
  };

  return ReservedRoom;
};
