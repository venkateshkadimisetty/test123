var mongoose = require('mongoose');
var User = mongoose.model('user');
var jwt = require('jsonwebtoken');
var config = require('./../config/config.js');
module.exports = {
        createUser:function (req,res) {
            var userObject = new User(req.body);
            userObject.save(function (err,result) {
                if(err){
                    return res.status(500).send(err);
                }
                else{
                    return res.status(200).send(result);
                }
            });
        },
        loginUser: function (req, res) {
            console.log("req obj:",req.session);
            User.findOne({username:req.body.username},function (err,result) {
                if(err){
                    return res.status(500).send(err);
                }
                else{
                    if(result){
                         result.comparePassword(req.body.password, function(err, isMatch){
                             if(isMatch){
                                 result.password = undefined;
                                 var token = jwt.sign({ id: result._id }, config.TOKEN_SECRET, {
                                    expiresIn: 86400 // expires in 24 hours
                                  });
                                 res.cookie('token',token, { maxAge: 86400, httpOnly: true });
                                return res.status(200).send({token:token,user:result});
                             } else{
                                 return res.status(401).send({type: false, data: "Incorrect email/password"});
                             }
                         });
         
                     }else {
                         res.status(500).send({type: false, data: "Error occured: " + err,data:"user not registered"});
                     }
                }
            });
        }
    };