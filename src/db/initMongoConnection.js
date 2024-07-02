import mongoose from 'mongoose';
import { env } from '../utils/env.js';

let isConnected = false;

const initMongoDb = async () => {
    if (isConnected) {
        console.log('MongoDB is already connected.');
        return;
    }
    try {
        const mongodbUrl = env('MONGODB_URL');
        const mongodbUser = env('MONGODB_USER');
        const mongodbPassword = env('MONGODB_PASSWORD');
        const mongodbDatabase = env('MONGODB_DB');

        const connectionString = `mongodb+srv://${mongodbUser}:${mongodbPassword}@${mongodbUrl}/${mongodbDatabase}?retryWrites=true&w=majority`;

        await mongoose.connect(connectionString);
        isConnected = true;
        console.log('MongoDb connection successfully established!');
    } catch (error) {
        console.error('Error while setting up mongo connection:', error.message);
        throw error; 
    }
};

export default initMongoDb;