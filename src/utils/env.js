import dotenv from 'dotenv';

dotenv.config();

export const env = (key, defaultValue) => {
    const value = process.env[key];
    if (value !== undefined) {
        return value;
    }
    if (defaultValue !== undefined) {
        return defaultValue;
    }
    throw new Error(`Missing environment variable: ${key}`);
};
