var mongoose = require('mongoose');
var BookIssue = mongoose.model('bookIssue');
var Member = mongoose.model('member');
var Book = mongoose.model('book');
var BookLog = mongoose.model('bookLog');

module.exports = {
    issueBook: function(req, res) {
        var bookIssueObject = new BookIssue(req.body);
        Member.findOne({memberId: bookIssueObject.memberId}, function(memberErr, memberResult) {
            if (memberErr) {
                return res.status(500).send(memberErr);
            } else {
                if (!memberResult) {
                    return res.status(404).send({message: "Member not found with given Id"});
                }
                if (memberResult.bookLimit === 0) {
                    return res.status(400).send({message: "Member already reached Maximum Book limit"});
                }
                if (memberResult.fine >= 100) {
                    return res.status(400).send({message: "Member already reached Maximum Fine limit"});
                }
                Book.findOne({bookId: bookIssueObject.bookId}, function(bookErr, bookResult) {
                    if (bookErr) {
                        return res.status(500).send(bookErr);
                    } else {
                        if (!bookResult) {
                            return res.status(404).send({message: "Book not found with given Id"});
                        }
                        if (bookResult.isAvailable === false) {
                            return res.status(400).send({message: "Book is already issued"});
                        }
                        bookResult.isAvailable = false;
                        bookResult.save(function(bookResultErr, bookResultRes) {
                            if (bookResultErr) {
                                return res.status(500).send(bookResultErr);
                            } else {
                                console.log(bookResultRes);
                                memberResult.bookLimit = memberResult[0].bookLimit - 1;
                                memberResult.save(function(memberResultErr, memberResultRes) {
                                    if (memberResultErr) {
                                        return res.status(500).send(memberResultErr);
                                    } else {
                                        //BookIssue.find({}, function(bookIssueErr, bookIssueResults) {
                                        BookIssue.find().sort({issuedDate: -1}).limit(1).exec(function(bookIssueErr, bookIssueResults) {    
                                            var newBookIssueId = parseInt(bookIssueResults[0].bookIssueId.replace(/^\D+/g, ''))+1;
                                            bookIssueObject.bookIssueId = "BI" + newBookIssueId;
                                            bookIssueObject.save(function(bookIssueCreateErr, bookIssueCreateResp) {
                                                if (bookIssueCreateErr) {
                                                    return res.status(500).send(bookIssueCreateErr);
                                                } else {
                                                    return res.status(200).send({msg: "Book Issued Successfully",bookIssueId: bookIssueCreateResp});
                                                }
                                            })
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            }
        });
    },
    fetchBookIssueDetials: function (req, res) {
        BookIssue.findOne({bookIssueId:req.body.bookIssueId}).exec(function (err, result) {
            if(err){
                return res.status(500).send(err);
            }
            else{
                return res.status(200).send(result);
            }
        });
    },
    fetchBookIssuesMemeberId: function (req, res) {
        BookIssue.find().populate('member','memberId').exec(function (err, bookIssues) {
            if(err){
                return res.status(500).send(err);
            }
            else{
                bookIssues = bookIssues.filter(function(bookIssue) {
                    if(bookIssue.member!=null){
                        return bookIssue.member.memberId === req.params.memberId;
                    }
                });
                return res.status(200).send(bookIssues);
            }
        });
    },
    collectBook: function(req, res) {
        var bookLogObject = new BookLog(req.body);
        BookIssue.findOne({bookIssueId: req.body.bookIssueId}, function(bookIssueErr, bookIssueResult) {
            if (bookIssueErr) {
                return res.status(500).send(bookIssueErr);
            } else {
                if(!bookIssueResult){
                    return res.status(404).send({message:"Record not found with given bookIssueId"});
                }
                Member.findOne({memberId: bookIssueResult.member.memberId}, function(memberErr, memberResult) {
                    if (memberErr) {
                        return res.status(500).send(memberErr);
                    } else {
                        if(!memberResult){
                            return res.status(404).send({message:"Member Not found with given member Id"});
                        }
                        memberResult.bookLimit++;
                        var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
                        var returnDate = new Date(bookIssueResult.returnDate);
                        var toDayDate = new Date();
                        if(toDayDate>returnDate){
                            var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
                            memberResult.fine = memberResult.fine + diffDays;
                        }
                        Book.findOne({bookId: req.body.bookId}, function(bookErr, bookResult) {
                            if(bookResult===null){
                                return res.status(404).send({message:"Book Not found with given bookId"})
                            }
                            bookResult.isAvailable = true;
                            bookResult.save(function(bookUpdateErr, bookUpdateResult) {
                                if (bookUpdateErr) {
                                    return res.status(500).send(bookUpdateErr);
                                } else {
                                    memberResult.save(function(memberUpdateErr, memberUpdateResult) {
                                        if (memberUpdateErr) {
                                            return res.status(500).send(memberUpdateErr);
                                        } else {
                                            //BookLog.find({}, function(bookLogErr, bookLogResult) {
                                            BookLog.find().sort({joinDate: -1}).limit(1).exec(function(bookLogErr, bookLogResult) { 
                                                if (bookLogErr) {
                                                    return res.status(500).send(bookLogErr);
                                                } else {
                                                    if(bookLogResult.length>0){
                                                        var newBookLogId=parseInt(bookLogResult[0].bookLogId.replace(/^\D+/g, ''))+1;
                                                        bookLogObject.bookLogId = "BL" + newBookLogId;
                                                    }
                                                    bookLogObject.bookLogId = "BL" + 10000;
                                                    bookLogObject.save(function(bookLogErr, bookLogResult) {
                                                        if (bookLogErr) {
                                                            return res.status(500).send(bookLogErr);
                                                        } else {
                                                            BookIssue.remove({bookIssueId: req.body.bookIssueId}, function(bookIssueUpdateErr, bookIssueUpdateResult) {
                                                                if (bookIssueUpdateErr) {
                                                                    return res.status(500).send(bookIssueUpdateErr);
                                                                } else {
                                                                    return res.status(200).send({msg: "successfully Collected Book",bookLogId: bookLogResult.bookLogId
                                                                    });
                                                                }
                                                            });
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }) 
                    }
                })
            }
        })
    }
};