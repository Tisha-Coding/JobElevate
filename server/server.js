import './config/instrument.js';
import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import connectDB from './config/db.js';
import * as Sentry from "@sentry/node";
import { clerkWebhooks } from './controllers/webhooks.js';

// Initialize Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to database
const startServer = async () => {
    try {
        await connectDB();
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error);
    }
};
startServer();

// Routes
app.get('/', (req, res) => res.send("API WORKING"));
app.get('/debug-sentry', (req, res) => {
    throw new Error("My first Sentry error!");
});

app.post('/webhooks', clerkWebhooks);

Sentry.setupExpressErrorHandler(app);

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});

// Export app for Vercel
export default app;
