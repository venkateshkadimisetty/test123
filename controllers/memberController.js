var mongoose = require('mongoose');
var Member = mongoose.model('member');
var mailsmtp = require('./../plugins/mailer-plugin.js');
module.exports = {
        createMember:function (req,res) {
            console.log("Inside the create member");
            var memberObject = new Member(req.body);
            Member.find().sort({joinDate: -1}).limit(1).exec(function(err, result) { 
            //Member.find({},function (err,result) {
                if(err){
                    return res.status(500).send(err);
                }
                else{
                    console.log("Member ***********************",result);
                    var newMemberId=parseInt(result[0].memberId.replace(/^\D+/g, ''))+1;
                    memberObject.memberId="M"+newMemberId;
                    memberObject.save(function (err,result) {
                        if(err){
                            return res.status(500).send(err);
                        }
                        else{
                            //mailsmtp.sendmail(result.memberId);
                            return res.status(200).send({msg: "successfully created member",memberId:result.memberId});
                        }
                    });
                }
            });
        },
    
        fetchMember: function (req, res) {
            Member.find({memberId:req.body.memberId},function (err,result) {
                if(err){
                    return res.status(500).send(err);
                }
                else{
                    return res.status(200).send(result);
                }
            });
        },
        listAllMembers: function (req, res) {
            Member.find({},function (err,result) {
                if(err){
                    return res.status(500).send(err);
                }
                else{
                    return res.status(200).send(result);
                }
            });
        },
        updateMember: function (req, res) {
            Member.update({_id:req.body._id}, req.body, function (err,result) {
                if(err){
                   return res.status(500).send(err);
                }else{
                   return res.status(200).send({msg:"updated member successfully"});
                }
            });
        },
        deleteMember: function (req, res) {
            Member.remove({memberId:req.body.memberId}, function (err, result) {
                if(err){
                    return res.status(500).send(err);
                }
                return res.status(200).send({msg:"successfully deleted Member"});
            });
        },
        collectFine: function (req, res) {
            Member.find({memberId:req.body.memberId},function (err,result) {
                if(err){
                    return res.status(500).send(err);
                }
                else{
                    result[0].fine=result[0].fine-req.body.fine;
                    result[0].save(function(fineErr,fineResult){
                        if(fineErr){
                            return res.status(500).send(fineErr);
                        }else{
                            return res.status(200).send({message:"Collected fine from the member",remainingFine:fineResult.fine});
                        }
                    })
                }
            });
        },
    };