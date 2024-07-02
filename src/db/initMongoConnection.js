import mongoose from 'mongoose';
import { env } from '../utils/env.js';
import { MONGO_VARS } from '../constans/index.js';

export const initMongoDb = async () => {
    try {
        const user = env(MONGO_VARS.MONGODB_USER);
        const password = env(MONGO_VARS.MONGODB_PASSWORD);
        const url = env(MONGO_VARS.MONGODB_URL);
        const dbName = env(MONGO_VARS.MONGODB_DB);

        console.log({ user, password: '******', url, dbName });

        if (!user || !password || !url || !dbName) {
            throw new Error('Missing required MongoDB environment variables');
        }

        const connectionString = `mongodb+srv://${process.env[MONGO_VARS.MONGODB_USER]}:${process.env[MONGO_VARS.MONGODB_PASSWORD]}@${process.env[MONGO_VARS.MONGODB_URL]}/${process.env[MONGO_VARS.MONGODB_DB]}`;

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
