module.exports = function(mongoose){
        var Schema = mongoose.Schema;
        var bookLogSchema = new Schema({
            bookLogId: {
                type:String,
                unique: true,
                required:true
            },
            bookId:{type:String,required:true},
            memberId:{type:String,required:true},
            issuedDate:{type:Date,required:true},
            returnDate : {type:Date,required:true},
            actualReturnDate : {type:Date,default:Date.now},
            issuedBy: {type:String,required:true},
            collectedBy : {type:String,required:true},
            fine: {type:Number,default:0}
        });
    
        return mongoose.model('bookLog',bookLogSchema);
    }
    