
import express from 'express';
import { Resend } from 'resend';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 3000;

// Middleware
app.use(cors()); // Allow frontend to talk to backend
app.use(express.json()); // Parse JSON bodies

// Initialize Resend with key from .env
const resend = new Resend(process.env.RESEND_API_KEY);

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

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
