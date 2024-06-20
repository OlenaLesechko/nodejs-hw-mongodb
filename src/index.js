const { setupServer } = require('./server');

setupServer();

require('dotenv').config(); 
const { initMongoConnection } = require('./db/initMongoConnection');
initMongoConnection()
    .then(() => {
        require('./server').setupServer();
    })
    .catch((error) => {
        console.error('Error initializing MongoDB connection:', error);
    });
