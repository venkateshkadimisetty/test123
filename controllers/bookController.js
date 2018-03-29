var mongoose = require('mongoose');
var Book = mongoose.model('book');
module.exports = {
        createBook:function (req,res) {
            console.log("Inside the create member");
            var bookObject = new Book(req.body);
            Book.find({},function (err,result) {
                if(err){
                    return res.status(500).send(err);
                }
                else{
                    var totalLength=5000+result.length;
                    bookObject.bookId="B"+totalLength;
                    bookObject.save(function (err,result) {
                        if(err){
                            return res.status(500).send(err);
                        }
                        else{
                            console.log(result);
                            return res.status(200).send({msg: "successfully created Book",memberId:result.bookId});
                        }
                    });
                }
            });
        },
    
        fetchBook: function (req, res) {
            Book.find({bookId:req.body.bookId},function (err,result) {
                if(err){
                    return res.status(500).send(err);
                }
                else{
                    return res.status(200).send(result);
                }
            });
        },
        listAllBooks: function (req, res) {
            Book.find({},function (err,result) {
                if(err){
                    return res.status(500).send(err);
                }
                else{
                    return res.status(200).send(result);
                }
            });
        },
    
        deleteBook: function (req, res) {
            Book.remove({bookId:req.body.bookId}, function (err, result) {
                if(err){
                    return res.status(500).send(err);
                }
                return res.status(200).send({msg:"successfully deleted Book"});
            });
        }
    };