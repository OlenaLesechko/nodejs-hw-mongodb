import { Contact } from '../db/models/Contacts.js'; // Ensure this matches the exact case

export const getAllContacts = async () => {
    try {
        const contacts = await Contact.find();
        return contacts;
    } catch (error) {
        throw new Error(`Unable to retrieve contacts: ${error.message}`);
    }
    };

    export const getContactById = async (contactId) => {
    try {
        const contact = await Contact.findById(contactId);
        if (!contact) {
        throw new Error('Contact not found');
        }
        return contact;
    } catch (error) {
        throw new Error(`Unable to retrieve contact by ID: ${error.message}`);
    }
};
