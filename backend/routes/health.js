// Health check endpoint for monitoring

const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
        services: {
            email: !!process.env.SMTP_HOST,
            stripe: !!process.env.STRIPE_SECRET_KEY,
            convertkit: !!process.env.CONVERTKIT_API_KEY,
            mailchimp: !!process.env.MAILCHIMP_API_KEY
        }
    });
});

module.exports = router;
