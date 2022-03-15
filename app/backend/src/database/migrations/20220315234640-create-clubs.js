'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Clubs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      club_name: {
        allowNull: false,
        type: Sequelize.STRING
      },
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Clubs');
  }
};
