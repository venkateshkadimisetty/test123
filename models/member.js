module.exports = function(mongoose){
    
        var Schema = mongoose.Schema;
    
        var memberSchema = new Schema({
            memberId: {
                type:String,
                unique: true,
                required: true
            },
            pin: {
                type:String,
                unique: true,
                required: true
            },
            firstName: {type:String,required: true},
            lastName: {type:String,required: true},
            dob : Date,
            email: String,
            gender:{
                type: String,
                enum : ['Male','Female']
            },
            department : String,
            year:String,
            membertype : {
                type: String,
                enum : ['Student','Faculty']
            },
            bookLimit:{type:Number,default:3},
            fine: {type:Number,default:0},
            joinDate: {type:Date,default:Date.now}
        });
    
        return mongoose.model('member',memberSchema);
    }
    