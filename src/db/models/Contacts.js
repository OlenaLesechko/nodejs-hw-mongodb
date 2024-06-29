/* import { Schema, model } from "mongoose";

const contactSchema = new Schema({
    name: { type: String, required: true, },
    phoneNumber: { type: String, required: true, },
    email: {type: String, required: false, },
    isFavourite: { type: Boolean, default: false, },
    contactType: {type: String, required: true, default: 'personal', enum: ['work', 'home', 'personal'], }
}, {
    timestamps: true,
    versionKey: false,
});

export const ContactsCollection = model('Contact', contactSchema); */

import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    }
});

export const Contact = mongoose.model('Contact', contactSchema);