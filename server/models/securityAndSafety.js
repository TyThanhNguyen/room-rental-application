const mongoose = require('mongoose');

let SecurityAndSafetySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    }
});

// model methods
SecurityAndSafetySchema.statics.existVerify = function(name) {
    let securityAndSafety = this;
    return SecurityAndSafety.findOne({name}).then((doc) => {
        if (!doc) {
            return Promise.resolve();
        }
        return Promise.reject('Exist');
    });
};

let SecurityAndSafety = mongoose.model('SecurityAndSafety', SecurityAndSafetySchema);
module.exports = { SecurityAndSafety };