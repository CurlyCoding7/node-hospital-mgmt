const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const psychiatristSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital'
    }
});

const Psychiatrist = mongoose.model('Psychiatrist', psychiatristSchema);

module.exports = Psychiatrist;

