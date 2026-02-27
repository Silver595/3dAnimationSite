import express from 'express';
import { Resend } from 'resend';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// ESM __dirname fix
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Resend
const resend = new Resend(process.env.RESEND_API_KEY);

// API Routes
app.post('/api/email', async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
        const data = await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>',
            to: 'akashpurjalkar66@gmail.com',
            subject: `New Message from ${name}`,
            reply_to: email,
            html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `
        });

        res.status(200).json(data);
    } catch (error) {
        console.error('Email Error:', error);
        res.status(500).json({ error: 'Failed to send email', details: error.message });
    }
});
// all done
// Serve Static Assets in Production
if (process.env.NODE_ENV === 'production' || process.env.npm_lifecycle_event === 'start') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'dist')));

    // Handle React routing, return all requests to React app
    app.get(/.*/, (req, res) => {
        res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
