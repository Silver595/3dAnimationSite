
import { Resend } from 'resend';

export default async function handler(req, res) {
    // CORS handling for local dev if needed, though usually same-origin
    if (req.method === 'OPTIONS') {
        return res.status(200).json({});
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { name, email, message } = req.body;
    const resend = new Resend(process.env.RESEND_API_KEY);

    try {
        const data = await resend.emails.send({
            from: 'Portfolio Contact <onboarding@resend.dev>', // Default testing domain
            to: 'akashpurjalkar66@gmail.com', // Updated to user's verified email
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

        return res.status(200).json(data);
    } catch (error) {
        console.error('Request error', error);
        return res.status(500).json({ error: 'Error sending email', details: error.message });
    }
}
