var Sequelize = require('sequelize');
var config = require("../config/main");

// create a sequelize instance with the database information the config file.
var sequelize = new Sequelize(process.env.DATABASE_URL);

// setup User model and its fields.
var Text = sequelize.define('dictionary_engine', {
  converted_text: {
    type: Sequelize.TEXT('long'),
    unique: false,
    allowNull: false 
  },
  user_id: {
    type: Sequelize.INTEGER,
    unique: false,
    allowNull: false,
  }
});

// create all the defined tables in the specified database.
sequelize.sync()
  .then(() => console.log('Created dictionary_engine table if none existed'))
  .catch(error => console.log('This error occured', error));

// export User model for use in other files.
module.exports = Text;