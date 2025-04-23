const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const boardsRoutes = require('./routes/boards');
const submitRoutes = require('./routes/submit');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// Database pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'cocky_kooks',
    password: 'admin',
    port: 5432,
});

app.use((req, res, next) => {
    req.db = pool;
    next();
});

// Routes
app.use('/api/boards', boardsRoutes);
app.use('/api/submit', submitRoutes);

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
