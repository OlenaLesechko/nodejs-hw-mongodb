const express = require('express');
const cors = require('cors');
const pino = require('pino')();

const setupServer = () => {
    const app = express();

    app.use(cors());

    app.use(pino);

    app.use((req, res) => {
        res.status(404).json({ message: 'Not found' });
    });

    const port = process.env.PORT || 3000;

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
};

module.exports = { setupServer };
