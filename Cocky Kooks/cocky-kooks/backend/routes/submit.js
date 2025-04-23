const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    const { name, email, message, selectedBoards } = req.body;
    try {
        await req.db.query(
            'INSERT INTO cart_submissions (name, email, message, selected_boards) VALUES ($1, $2, $3, $4)',
            [name, email, message, JSON.stringify(selectedBoards)]
        );
        res.json({ message: "Thank you, we've received your request and will be in touch." });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
