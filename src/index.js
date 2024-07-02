import { startServer } from './server.js';
import initMongoDb from './db/initMongoConnection.js';


const bootstrap = async () => {
    try {
        await initMongoDb();
        startServer();
    } catch (error) {
        console.error('Failed to initialize MongoDB connection', error);
        process.exit(1);
    }
};

bootstrap();