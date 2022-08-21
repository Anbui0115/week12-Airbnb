'use strict';
const bcrypt = require('bcryptjs')

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.*/
  
     await queryInterface.bulkInsert(
       "Users",
       [
         {
           firstName: "firstName1",
           lastName: "lastName1",
           email: "user1@user.io",
           username: "user1",
           hashedPassword: bcrypt.hashSync("password1"),
           //$2a$10$yA9M9XpA5tZnYomOFyeu7uQttaIh3vkUe5JbYh.18bODtDUWkGWQq
         },
         {
           firstName: "firstName2",
           lastName: "lastName2",
           email: "user2@user.io",
           username: "user2",
           hashedPassword: bcrypt.hashSync("password2"),
         },
         {
           firstName: "firstName3",
           lastName: "lastName3",
           email: "user3@user.io",
           username: "user3",
           hashedPassword: bcrypt.hashSync("password3"),
         },
         {
           firstName: "firstName4",
           lastName: "lastName4",
           email: "user4@user.io",
           username: "user4",
           hashedPassword: bcrypt.hashSync("password4"),
         },
         {
           firstName: "firstName5",
           lastName: "lastName5",
           email: "user5@user.io",
           username: "user5",
           hashedPassword: bcrypt.hashSync("password5"),
         },
       ],
       {}
     );

  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:  */
      await queryInterface.bulkDelete('Users');

  }
};
