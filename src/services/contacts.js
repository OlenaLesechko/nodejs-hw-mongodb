import express from 'express';
import { getAllContacts, getContactById } from './services/contacts.js';

const app = express();

app.get('/contacts', async (req, res, next) => {
    try {
        const contacts = await getAllContacts();
        res.status(200).json({
            status: 200,
            message: 'Successfully retrieved contacts',
            data: contacts
        });
    } catch (error) {
        next(error);
    }
});


app.get('/contacts/:id', async (req, res, next) => {
    const { id } = req.params;

    try {
        const contact = await getContactById(id);
        res.status(200).json({
            status: 200,
            message: `Successfully retrieved contact with ID ${id}`,
            data: contact
        });
    } catch (error) {
        next(error);
    }
});


app.use((err, req, res, ) => {
    console.error(err);
    res.status(500).json({
        status: 500,
        message: 'Internal server error',
        error: err.message
    });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
