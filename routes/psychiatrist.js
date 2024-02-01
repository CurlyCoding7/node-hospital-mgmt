const express = require('express');
const router = express.Router();
const Psychiatrist = require('../models/Psychiatrist');
const Hospital = require('../models/Hospital');

// POST /api/psychiatrist/register
router.post('/register', async (req, res) => {
    try {
        const { name, hospital } = req.body;

        const hospitalId = hospital;


        // Check if the hospital exists
        const hospitalData = await Hospital.findById(hospitalId);
        if (!hospitalData) {
            return res.status(400).json({ message: 'Hospital not found' });
        }

        // Create a new psychiatrist
        const psychiatrist = new Psychiatrist({
            name,
            hospital: hospitalId
        });

        // Save the psychiatrist to the database
        await psychiatrist.save();

        res.status(201).json({ message: 'Psychiatrist registered successfully' });
    } catch (err) {
        console.error('Error registering psychiatrist:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET /api/psychiatrist
router.get('/', async (req, res) => {
    try {
        // Find all psychiatrists
        const psychiatrists = await Psychiatrist.find();
        res.status(200).json(psychiatrists);
    } catch (err) {
        console.error('Error getting psychiatrists:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
