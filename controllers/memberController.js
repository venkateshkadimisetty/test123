var mongoose = require('mongoose');
var Member = mongoose.model('member');
var User = mongoose.model('user');
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
                    console.log("result",result);
                    if(result.length==0){
                        memberObject.memberId="M"+1000;
                    }else{
                        var newMemberId=parseInt(result[0].memberId.replace(/^\D+/g, ''))+1;
                        memberObject.memberId="M"+newMemberId;
                    }
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
            Member.findOne({memberId:req.body.memberId},function (err,result) {
                if(err){
                    return res.status(500).send(err);
                }
                else{
                    if(!!result){
                        return res.status(200).send(result);
                    }else{
                        return res.status(400).send({msg:"Member not exists!"});
                    }
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
            Member.findOne({memberId:req.body.memberId},function (err,findResult) {
                if(err){
                    return res.status(500).send(err);
                }
                else{
                    if(!findResult){
                        return res.status(400).send({msg:"Member not exists!"});
                    }
                    if(findResult.fine>0){
                        return res.status(400).send({msg:"Please Collect Fine before deleting."});
                    }else if((findResult.membertype==='Student' && findResult.bookLimit<3)|| (findResult.membertype==='Faculty' && findResult.bookLimit<6)){
                        return res.status(400).send({msg:"Please Collect all books before deleting."});
                    }else{
                        Member.remove({memberId:req.body.memberId}, function (err, result) {
                            if(err){
                                return res.status(500).send(err);
                            }
                            return res.status(200).send({msg:"successfully deleted Member"});
                        });
                    }
                }
            });
        },
        collectFine: function (req, res) {
            Member.findOne({memberId:req.body.memberId},function (err,result) {
                if(err){
                    return res.status(500).send(err);
                }
                else{
                    User.findOne({_id:req.decoded._id},function(userErr,userResult){
                        if(userErr){
                            return res.status(500).send(userErr);
                        }else{
                            if(!userResult){
                                return res.status(400).send({msg:"Member not exists!"});
                            }
                            result.fine=result.fine-req.body.fine;
                            Member.update({_id:result._id},result,function(fineErr,fineResult){
                                //result[0].save(function(fineErr,fineResult){
                                if(fineErr){
                                    return res.status(500).send(fineErr);
                                }else{
                                    userResult.fine=userResult.fine+req.body.fine;
                                    User.update({_id:userResult._id},userResult,function(userUpdateErr,userUpdateRes){
                                        if(userUpdateErr){
                                            return res.status(500).send(userUpdateErr);
                                        }else{
                                            return res.status(200).send({message:"Collected fine from the member",remainingFine:fineResult.fine});
                                        }
                                    });
                                }
                            })
                        }
                    });
                }
            });
        },
    };