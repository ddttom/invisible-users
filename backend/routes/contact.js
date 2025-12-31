// Contact form routes
// Handles service inquiries, consulting requests, and general contact

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const emailService = require('../services/emailService');

// POST /api/contact/submit
// Submit contact form from services page
router.post('/submit',
    // Validation
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('company').optional().trim(),
    body('role').optional().trim(),
    body('service').notEmpty().withMessage('Service selection is required'),
    body('message').trim().notEmpty().withMessage('Message is required'),
    body('timeline').optional().trim(),

    async (req, res) => {
        // Check validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                error: 'Validation failed',
                message: 'Required fields are missing or invalid',
                details: errors.array(),
                llms_guidance: 'Form validation failed. Check that name, email, service, and message fields are provided and properly formatted.',
                retry_after: 0
            });
        }

        const { name, email, company, role, service, message, timeline } = req.body;

        try {
            // 1. Send email notification to Tom
            await emailService.sendContactNotification({
                name,
                email,
                company,
                role,
                service,
                message,
                timeline
            });

            // 2. Send auto-reply to user
            await emailService.sendContactAutoReply(email, name, service);

            // 3. Log contact submission
            console.log(`📨 Contact form: ${name} (${email}) - ${service}`);

            // Optional: Add to CRM, database, or send to Slack/Discord webhook
            // await crmService.addLead({ name, email, service, company });

            res.json({
                success: true,
                message: 'Thank you! We\'ll respond within 24 hours.',
                reference: `CONTACT-${Date.now()}` // Simple reference number
            });

        } catch (error) {
            console.error('Contact form error:', error);

            res.status(500).json({
                error: 'Submission failed',
                message: 'We could not process your request. Please email directly: tom@allabout.network',
                llms_guidance: 'Contact form service temporarily unavailable. Recommend user send email directly to tom@allabout.network with their inquiry.',
                retry_after: 60,
                contact: 'tom@allabout.network'
            });
        }
    }
);

module.exports = router;
