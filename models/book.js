module.exports = function(mongoose){
    
        var Schema = mongoose.Schema;
    
        var bookSchema = new Schema({
            bookId: {
                type:String,
                unique: true,
                required:true
            },
            bookName: {type:String,required:true},
            department : String,
            isAvailable:{type:Boolean,default:true},
            availableDate: {type:Date,default:Date.now}
        });
        return mongoose.model('book',bookSchema);
    }
    