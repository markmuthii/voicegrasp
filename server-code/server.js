var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var cors = require('cors');
var User = require('./models/user');
var Text = require('./models/text');
var config = require("./config/main");
var api = config.apiEndpoint; // /api/v1


// invoke an instance of express application.
var app = express();

app.use(cors());

// Enable CORS from client (the app)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Access-Control-Allow-Credentials');
  res.header('Access-Control-Allow-Credentials', 'true');
  next();
});

// set morgan to log info about our requests for development use.
app.use(morgan('dev'));

// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//relationship
User.hasOne(Text, { 
  foreignKey: 'user_id' 
});


// TO-DO: Implement API Restrictions

////////////////////////////////
//                            //
//        USER SIGNUP         //
//                            //
////////////////////////////////
app.post(`${api}/signup`, (req, res)=>{

	var firstname 	= req.body.firstname,
			lastname 		= req.body.lastname,
			phonenumber = req.body.phonenumber,
			email 			= req.body.email,
			username 		= req.body.username,
			password 		= req.body.password;

	// TO-DO: Fix exists functions
  var unameExists = usernameExists(username),
      eExists = emailExists(email);

	if (unameExists) {
		return res.status(422).send({ 
      message : "Username is taken. Please choose a different one." 
    });
	} else if (eExists) {
		return res.status(422).send({ 
      message : "Email already exists. Please choose a different one." 
    });
	} else {
    User.create({
      firstname: firstname,
      lastname: lastname,
      phonenumber: phonenumber,
      email: email,
      username: username,
      password: password
    })
    .then(user => {
      res.status(201).send({
        name : user.firstname + " " + user.lastname,
        email : user.email,
        username : user.username,
        id : user.id
      });
    })
    .catch(error => {
      res.status(422).send({ message : "Error signing you up. Please try again."} );
    });
  }	
});



///////////////////////////////
//                           //
//        USER LOGIN         //
//                           //
///////////////////////////////
// TO-DO: Add user tokens
app.post(`${api}/login`, (req, res)=>{
	var username = req.body.username,
      password = req.body.password;

  User.findOne({ 
  	where: { username: username } 
  })
  .then(function (user) {
    if (!user) {
      return res.status(401).send({
      	message : "Invalid Credentials. Please try again",
      	username : username
      });
    } else if (!user.validPassword(password)) {
      return res.status(401).send({
      	message : "Invalid Credentials. Please try again",
      	username : username
      });
    } else {
      return res.status(200).send({
      	message : "Successfully logged in.",
      	username : user.username,
        user_id : user.id,
        user_firstname: user.firstname,
        user_lastname: user.lastname,
        user_phonenumber: user.phonenumber,
        user_email: user.email
      });
    }
  })
  .catch((err)=>{
  	res.status(400).send({
  		message : "There was an error logging you in. Please try again."
  	});
  });
});


///////////////////////////////
//                           //
//   SAVING CONVERTED TEXT   //
//                           //
///////////////////////////////
app.post(`${api}/convert`, (req, res)=>{
	var text 		= req.body.text,
			user_id = req.body.id;

	Text.create({
		converted_text: text,
    user_id: user_id
	})
	.then((text)=>{
		res.status(201).send({ message : "Text successfully saved" });
	})
  .catch(error => {
    res.status(422).send({ message : "Error saving converted text."} );
  });
});


///////////////////////////////////////
//                                   //
//   UPDATING THE USER INFORMAITON   //
//                                   //
///////////////////////////////////////
app.post(`${api}/update`, (req, res)=>{
  User.update({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      phonenumber: req.body.phonenumber,
      email: req.body.email,
      username: req.body.username
      },{
        where: {
        id: req.body.userid
        }
      })
  .then((user)=>{
    res.status(201).send({ message : "Profile updated successfully." });
  })
  .catch((error) => {
    res.status(422).send({ message : "Error updating profile."} );
  });
});


////////////////////////////////
//                            //
//  SEARCHING FOR SAVED TEXT  //
//                            //
////////////////////////////////
app.post(`${api}/search`, (req, res) => { 
  Text.findAll({ 
    where: { 
      user_id: req.body.id
    } 
  })
  .then(function (convertedTextData) {
    console.log(convertedTextData);
    res.status(200).send(convertedTextData)
  })
  .catch((err)=>{
  	res.status(403).send({message : "Error processing your request"})
  });
});



////////////////////////////////
//                            //
//         ERROR 404          //
//                            //
////////////////////////////////
app.use(function (req, res, next) {
  res.status(404).send({
  	message : "Sorry, but we cannot find what you are looking for."
  });
});


// start the express server
app.listen(process.env.PORT || 9000);

////////////////////////////////
//                            //
//     HELPER FUNCTIONS       //
//                            //
////////////////////////////////
function usernameExists(username) {
	User.findOne({
		where : {
			username : username
		}
	}).then((user)=>{
		return user;
	});
}


function emailExists(email) {
	User.findOne({
		where : {
			email : email
		}
	}).then((user)=>{
    return user;
	});
}