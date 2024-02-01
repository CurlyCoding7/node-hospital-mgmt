const express = require('express');
const router = express.Router();
const Patient = require('../models/Patient');
const Psychiatrist = require('../models/Psychiatrist');
const bcrypt = require('bcrypt');

// POST /api/patient/register
router.post('/register', async (req, res) => {
    try {
        const { name, address, email, phone, password, photo, psychiatrist } = req.body;

        const psychiatristId = psychiatrist;
        // Check if the psychiatrist exists
        const psychiatristData = await Psychiatrist.findById(psychiatristId);
        if (!psychiatristData) {
            return res.status(400).json({ message: 'Psychiatrist not found' });
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        // Create a new patient
        const patient = new Patient({
            name,
            address,
            email,
            phone,
            password: hash,
            photo,
            psychiatrist: psychiatristData._id
        });
        

        // Save the patient to the database
        await patient.save();

        res.status(201).json({ message: 'Patient registered successfully' });
    } catch (err) {
        console.error('Error registering patient:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET /api/patient
router.get('/', async (req, res) => {
    try {
        // Find all patients
        const patients = await Patient.find();
        res.status(200).json(patients);
    } catch (err) {
        console.error('Error getting patients:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});


module.exports = router;
