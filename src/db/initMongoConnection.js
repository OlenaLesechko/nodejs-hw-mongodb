import mongoose from 'mongoose';
import { env } from '../utils/env.js';
export const initMongoDb = async () => {
    try{
        const user = env('MONGODB_USER');
        const password = env('MONGODB_PASSWORD');
        const url = env('MONGODB_URL');
        const dbName = env('MONGODB_DB');

        if (!user || !password || !url || !dbName) {
            throw new Error('Missing required MongoDB environment variables');
        }

        const connectionString = `mongodb+srv://${user}:${password}@${url}/${dbName}?retryWrites=true&w=majority`;

        await mongoose.connect(connectionString, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('MongoDb connection successfully established!');
    } catch (error) {
        console.error('Error while setting up mongo connection:', error);
        throw error;
    }
};

    