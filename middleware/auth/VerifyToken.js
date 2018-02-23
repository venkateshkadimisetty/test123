var mongoose = require('mongoose');
var User = mongoose.model('user');
var jwt = require('jsonwebtoken');
var config = require('./../../config/config.js');
function verifyToken(req, res, next) {
  var token = req.headers['x-access-token'];
  if (!token)
    return res.status(403).send({ auth: false, message: 'No token provided.' });
  jwt.verify(token, config.TOKEN_SECRET, function(err, decoded) {
    if (err)
    return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    // if everything good, save to request for use in other routes
    req.userId = decoded.id;
    req.decoded=decoded;
    User.findOne({_id: decoded.id}).then(function(user){
      // Do something with the user
      req.decoded=user;
      next();
    });
  });
}
module.exports = verifyToken;