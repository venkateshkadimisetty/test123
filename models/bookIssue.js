module.exports = function(mongoose){
        var Schema = mongoose.Schema;
        var bookIssueSchema = new Schema({
            bookIssueId: {
                type:String,
                unique: true,
                required:true
            },
            bookId: {type:String,required:true},
            memberId: {type:String,required:true},
            issuedDate:{type:Date,default:Date.now},            
            returnDate : {type:Date,default:Date.now},
            issuedBy: String
        });
        return mongoose.model('bookIssue',bookIssueSchema);
    }
    