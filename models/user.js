bcrypt = require('bcryptjs'),
SALT_WORK_FACTOR = 10;
module.exports = function(mongoose){
        var Schema = mongoose.Schema;
        var userSchema = new Schema({
            username: {type:String,required:true,unique: true},
            email : {type:String,required:true,unique: true},
            password:{type:String,required:true},
            fine:{type:Number,default:0},
            role:{type:String,default:"user",enum : ['user','admin']}
        });
        userSchema.pre('save', function (next) {
            var user = this;
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
                    next();
                });
            });
        });
        userSchema.methods.comparePassword = function (candidatePassword, cb) {
            bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
                if (err) return cb(err);
                cb(null, isMatch);
            });
        };
        return mongoose.model('user',userSchema);
    }
    