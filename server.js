const express = require('express'); // Include ExpressJS
var jwt = require('jsonwebtoken');
const app = express(); // Create an ExpressJS app
const bodyParser = require('body-parser'); // Middleware
const secretKey  =  'structo';

var token;

app.use(bodyParser.urlencoded({ extended: false }));

// Route to Login Page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/static/index.html');
});

//Route to Login and send token.
app.post('/login', (req, res) => {
  // Insert Login Code Here
  let username = 'test';//req.body.username;
  let password = 'test'; //req.body.password;
  //check username and password and then send the token
  let token = jwt.sign({ id:username }, secretKey, {
    //expiresIn: 86400 // expires in 24 hours
    expiresIn: 2000 
  });
  res.status(200).send({ auth: true, token: token });
});

//Route to verify token and send status message
app.post('/verifytoken', async function(req, res, next) {
  let token = req.headers.authorization;
  jwt.verify(token, secretKey, (err, token) => {
    if(err){
      res.status(401).send('Invalid token');
    }else{
       res.status(200).send('Hello World');
    }
  });  
});

//Route to check the expiration of the token and get new token
app.get('/refreshtoken', async function(req, res, next) {
  let payload  = req.headers.authorization;
  const username = payload.username;
  jwt.verify(token,secretKey, function(err, decoded) {
    if (err.name === 'TokenExpiredError') {
      const payload = jwt.verify(token, secretKey, {ignoreExpiration: true} );
      const refreshToken  = jwt.sign({ id:username }, secretKey, {
        //expiresIn: 86400 // expires in 24 hours
        expiresIn: 2000 
      });
      res.status(200).send({ auth: true, token: refreshToken });
    }
    else if(err) {
      res.status(401).json({status: false, result: "Invalid token"});
    }
  });  
});

const port = 3000; // Port we will listen on

// Function to listen on the port
app.listen(port, () => console.log(`This app is listening on port ${port}`));