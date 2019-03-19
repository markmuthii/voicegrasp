var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');
var config = require("../config/main");

// create a sequelize instance with the database information the config file.
var sequelize = new Sequelize(process.env.DATABASE_URL);

// setup User model and its fields.
var User = sequelize.define('users', {
  firstname: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false 
  },
  lastname: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false 
  },
  phonenumber: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false 
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, 
{
  hooks: {
    beforeCreate: (user) => {
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(user.password, salt);
    }
  }    
});


// check whether the user password is valid
User.prototype.validPassword = function(password){
  return bcrypt.compareSync(password, this.password);
};

// create all the defined tables in the specified database.
sequelize.sync()
  .then(() => console.log('Users table has been created, if none existed.'))
  .catch(error => console.log('This error occured', error));

// export User model for use in other files.
module.exports = User;