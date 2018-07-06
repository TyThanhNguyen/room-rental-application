const mongoose = require('mongoose');

let RoomDetailSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    }
});

// model methods
RoomDetailSchema.statics.existVerify = function(name) {
    let roomDetail = this;
    return RoomDetail.findOne({name}).then((roomDetail) => {
        if (roomDetail === null) {
            return Promise.resolve();
        }
        return Promise.reject('Exist')
    });
}

let RoomDetail = mongoose.model('RoomDetail', RoomDetailSchema);
module.exports = { RoomDetail };