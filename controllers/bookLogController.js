var mongoose = require('mongoose');
var BookLog = mongoose.model('bookLog');
module.exports = {
    fetchBookLog: function (req, res) {
        BookLog.findOne({bookLogId:req.body.bookLogId},function (err,result) {
            if(err){
                return res.status(500).send(err);
            }
            else{
                return res.status(200).send(result);
            }
        });
    },
    listAllBookLogs: function (req, res) {
        BookLog.find({},function (err,result) {
            if(err){
                return res.status(500).send(err);
            }
            else{
                return res.status(200).send(result);
            }
        });
    },
    deleteMember: function (req, res) {
        BookLog.remove({bookLogId:req.body.bookLogId}, function (err, result) {
            if(err){
                return res.status(500).send(err);
            }
            return res.status(200).send({msg:"successfully deleted Member"});
        });
    }
};