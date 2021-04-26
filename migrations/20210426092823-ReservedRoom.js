'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ReservedRooms', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.BIGINT,
    },
    roomId: {
      allowNull: false,
      type: Sequelize.BIGINT,
      references: {
        model: 'Rooms',
        key: 'id',
      },
    },
    reservedDate: {
      type: Sequelize.DATE,
    },

    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
    },
    deletedAt: {
      type: Sequelize.DATE,
      defaultValue: null,
    },
  }),
  // eslint-disable-next-line no-unused-vars
  down: (queryInterface, Sequelize) => queryInterface.dropTable('ReservedRooms'),
};