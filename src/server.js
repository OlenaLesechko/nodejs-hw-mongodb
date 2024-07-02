import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import mongoose from 'mongoose';
/* import { env } from './utils/env.js'; */
import { getAllContacts, getContactById } from './services/contacts.js';
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware.js';
import notFoundMiddleware from './middlewares/notFoundMiddleware.js';
import dotenv from 'dotenv';

dotenv.config();

export const startServer = async () => {
    const app = express();
    const PORT = process.env.PORT || 3001;


    app.use(express.json());
    app.use(cors());
    app.use(pino({
        transport: {
            target: 'pino-pretty',
        },
    }));


    app.get('/contacts', async (req, res, next) => {
        try {
            const contacts = await getAllContacts();
            res.status(200).json({
                status: 200,
                message: 'Successfully found contacts!',
                data: contacts,
            });
        } catch (error) {
            next(error);
        }
    });

    app.get('/contacts/:id', async (req, res, next) => {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid contact ID format' });
        }

        try {
            const contact = await getContactById(id);
            if (!contact) {
                return res.status(404).json({ message: 'Contact not found' });
            }
            res.status(200).json({
                status: 200,
                message: `Successfully found contact with id ${id}!`,
                data: contact,
            });
        } catch (error) {
            next(error);
        }
    });


    app.use(notFoundMiddleware);


    app.use(errorHandlerMiddleware);


    try {
        await mongoose.connect(
            `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URL}/${process.env.MONGODB_DB}`
        );
        console.log('MongoDB connection successfully established!');
    } catch (error) {
        console.error('Error while setting up mongo connection:', error.message);
        process.exit(1);
    }


    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
    });
};

startServer();
