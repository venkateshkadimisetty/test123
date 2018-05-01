var mongoose = require('mongoose');
var Member = mongoose.model('member');
var Book = mongoose.model('book');
module.exports = function(mongoose){
        var Schema = mongoose.Schema;
        var todayDate = new Date();
        var retDate=new Date();
        retDate.setDate(todayDate.getDate() + 14);

        var bookIssueSchema = new Schema({
            bookIssueId: {
                type:String,
                unique: true,
                required:true
            },
            bookId: {type:String,required:true},
            book:{ type: Schema.Types.ObjectId, ref: 'book' },
            memberId: {type:String,required:true},
            member:{ type: Schema.Types.ObjectId, ref: 'member' },
            issuedDate:{type:Date,default:Date.now},            
            returnDate : {type:Date,default:retDate},
            issuedBy: { type: String,required:true }
        });
        bookIssueSchema.pre('save', function (next) {
            var bookIssue = this;
            Member.findOne({memberId:bookIssue.memberId},function (err,memResult) {
                if(err){
                    return res.status(500).send(err);
                }
                else{
                    Book.findOne({bookId:bookIssue.bookId},function (err,bookResult) {
                        if(err){
                            return res.status(500).send(err);
                        }
                        else{
                            bookIssue.member=memResult._id;
                            bookIssue.book=bookResult._id;
                            next();
                        }
                    });
                }
            });
        });
        bookIssueSchema.pre('findOne', function(next) {
            this.populate('book').populate('member');
            next();
        });
        return mongoose.model('bookIssue',bookIssueSchema);
    }