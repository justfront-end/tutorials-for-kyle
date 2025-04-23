const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const result = await req.db.query('SELECT * FROM surfboards');
        res.json(result.rows);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
