var mongoose = require('mongoose');
var User = mongoose.model('user');
var jwt = require('jsonwebtoken');
module.exports = {
        createUser:function (req,res) {
            console.log("Inside the create member");
            var userObject = new User(req.body);
            userObject.save(function (err,result) {
                if(err){
                    return res.status(500).send(err);
                }
                else{
                    console.log(result);
                    return res.status(200).send(result);
                }
            });
        },
        loginUser: function (req, res) {
            User.find({username:req.body.username},function (err,result) {
                if(err){
                    return res.status(500).send(err);
                }
                else{
                    console.log(result);
                    var token = jwt.sign({ id: result._id }, "Sample", {
                        expiresIn: 86400 // expires in 24 hours
                      });
                    return res.status(200).send({token:token});
                }
            });
        }
    };