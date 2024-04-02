const express = require('express');
const router = express.Router();

const DataModal = require('../modals/dataModal');
let data2 = "Please Add Your Data here!";

let addCount = 0;
let updateCount = 0;

// Route to get the current data2
router.get('/data2', (req, res) => {

    res.json({ data2 });
});

// Route to update data2
router.put('/data2', (req, res) => {
    const newData = req.body.data2;
    updateCount++; // Increment update count
    data2 = newData;
    res.status(200).send('Data2 updated successfully');
});

router.post('/data', async (req, res) => {
    try {
        const data = await DataModal.create(req.body);
        addCount++; // Increment add count
        res.status(200).json(data);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message })
    }
});

router.get('/data', async (req, res) => {
    try {
        const data = await DataModal.find({})//for all data
        res.status(200).json(data)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

router.get('/data/:id', async (req, res) => {
    try {
        const { id } = req.params
        const data = await DataModal.findById(id)
        res.status(200).json(data)
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ message: error.message });
    }
});

//Update Data
router.put("/data/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const data = await DataModal.findByIdAndUpdate(id, req.body);
        updateCount++; // Increment update count
        if (!data) {
            return res.status(404).json({ message: `we canot find you data : ${id}` });
        }
        const updatedData = await DataModal.findById(id);
        res.status(200).json(updatedData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

//Delete Data
router.delete("/data/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const data = await DataModal.findByIdAndDelete(id, req.body);
        if (!data) {
            return res.status(404).json({ message: `we canot find you data : ${id}` });
        }
        const updatedData = await DataModal.findById(id);
        res.status(200).json(updatedData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
// Route to get counts
router.get('/counts', (req, res) => {
    res.status(200).json({ addCount, updateCount });
});

module.exports = router;


