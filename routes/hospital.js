const express = require('express');
const router = express.Router();
const Hospital = require('../models/Hospital');
const Psychiatrist = require('../models/Psychiatrist');
const Patient = require('../models/Patient');

// POST /api/hospital/register
router.post('/register', async (req, res) => {
    try {
        console.log(req.body)
        const { name } = req.body;

        // Create a new hospital
        const hospital = new Hospital({
            name
        });

        // Save the hospital to the database
        await hospital.save();

        res.status(201).json({ message: 'Hospital registered successfully' });
    } catch (err) {
        console.error('Error registering hospital:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET /api/hospital
router.get('/', async (req, res) => {
    try {
        // Find all hospitals
        const hospitals = await Hospital.find();
        res.status(200).json(hospitals);
    } catch (err) {
        console.error('Error getting hospitals:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST /api/hospital/psychiatrists
router.post('/psychiatrists', async (req, res) => {
    try {
        const { hospitalId } = req.body;

        // Find the hospital by ID
        const hospital = await Hospital.findById(hospitalId);
        if (!hospital) {
            return res.status(404).json({ message: 'Hospital not found' });
        }

        // Find all psychiatrists for the hospital
        const psychiatrists = await Psychiatrist.find({ hospital: hospitalId });

        let totalPsychiatristCount = psychiatrists.length;
        let totalPatientsCount = 0;
        const psychiatristDetails = [];

        for (const psychiatrist of psychiatrists) {
            // Find patients for each psychiatrist
            const patients = await Patient.find({ psychiatrist: psychiatrist._id });
            const patientsCount = patients.length;
            totalPatientsCount += patientsCount;

            psychiatristDetails.push({
                id: psychiatrist._id,
                name: psychiatrist.name,
                patientsCount: patientsCount
            });
        }

        // Prepare API response
        const response = {
            hospitalName: hospital.name,
            totalPsychiatristCount: totalPsychiatristCount,
            totalPatientsCount: totalPatientsCount,
            psychiatristDetails: psychiatristDetails
        };

        res.status(200).json(response);
    } catch (err) {
        console.error('Error fetching data:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
