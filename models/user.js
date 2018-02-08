bcrypt = require('bcryptjs'),
SALT_WORK_FACTOR = 10;
module.exports = function(mongoose){
        var Schema = mongoose.Schema;
        var userSchema = new Schema({
            username: String,
            email : String,
            password:String
        });
        userSchema.pre('save', function (next) {
            var user = this;
            console.log('pre save');
            console.log(user.password);
    
            // only hash the password if it has been modified (or is new)
            if (!user.isModified('password')) return next();
    
            // generate a salt
            bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
                if (err) return next(err);
    
                // hash the password using our new salt
                bcrypt.hash(user.password, salt, function (err, hash) {
                    if (err) return next(err);
    
                    // override the cleartext password with the hashed one
                    user.password = hash;
                    console.log('hash');
                    console.log(user.password);
                    next();
                });
            });
        });
        return mongoose.model('user',userSchema);
    }
    