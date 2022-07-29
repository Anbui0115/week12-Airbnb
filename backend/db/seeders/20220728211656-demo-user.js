'use strict';
const bcrypt = require('bcryptjs')

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:*/
     await queryInterface.bulkInsert('Users', [
      {
        email: 'demo@user.io',
       username: 'Demo-lition',
       hashedPassword:bcrypt.hashSync('password')
       //$2a$10$yA9M9XpA5tZnYomOFyeu7uQttaIh3vkUe5JbYh.18bODtDUWkGWQq
     },
     {
        email: 'user1@user.io',
        username: 'FakeUser1',
        hashedPassword: bcrypt.hashSync('password2')
      },
      {
        email: 'user2@user.io',
        username: 'FakeUser2',
        hashedPassword: bcrypt.hashSync('password3')
      }

    ], {});

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:  */
      await queryInterface.bulkDelete('Users', {
        username:{[Op.in]:['Demo-lition','FakeUser1','FakeUser2']}
      });

  }
};
