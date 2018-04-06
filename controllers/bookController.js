var mongoose = require('mongoose');
var Book = mongoose.model('book');
module.exports = {
        createBook:function (req,res) {
            console.log("Inside the create member");
            var bookObject = new Book(req.body);
            Book.find().sort({availableDate: -1}).limit(1).exec(function(err, result) { 
            //Book.find({},function (err,result) {
                if(err){
                    return res.status(500).send(err);
                }
                else{
                    console.log("avvvvv:",result);
                    //var totalLength=5001+result.length;
                    var newBookId=parseInt(result[0].bookId.replace(/^\D+/g, ''))+1;
                    console.log('newBookId',newBookId);
                    bookObject.bookId="B"+newBookId;
                    bookObject.save(function (err,result) {
                        if(err){
                            return res.status(500).send(err);
                        }
                        else{
                            console.log(result);
                            return res.status(200).send({msg: "successfully created Book",bookId:result.bookId});
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

        updateBook: function (req, res) {
            Book.update({_id:req.body._id}, req.body, function (err,result) {
                if(err){
                   return res.status(500).send(err);
                }else{
                   return res.status(200).send({msg:"updated book successfully"});
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