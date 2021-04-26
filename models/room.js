const { Model } = require('sequelize');

class Room extends Model {
}

module.exports = (sequelize, DataTypes) => {
  Room.init({
    numberOfResident: DataTypes.INTEGER,
  }, {
    timestamps: true,
    paranoid: true,
    sequelize,
  });
  Room.associate = function(models) {
    Room.hasMany(models.ReservedRoom, {
      foreignKey: 'id',
      as: 'reservedRooms',
    });
  };
  return Room;
};
