const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
        minlength: 10
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true,
        minlength: 10
    },
    password: {
        type: String,
        required: true
    },
    photo: {
        type: String, // You may want to store the image URL here
        required: true
    },
    psychiatrist: {
        type: Schema.Types.ObjectId,
        ref: 'Psychiatrist'
    }
});

const Patient = mongoose.model('Patient', patientSchema);

module.exports = Patient;
