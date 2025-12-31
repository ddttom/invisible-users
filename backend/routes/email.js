// Email subscription routes
// Handles free chapter downloads and newsletter signups

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const emailService = require('../services/emailService');
const convertkitService = require('../services/convertkitService');

// POST /api/email/subscribe
// Subscribe to newsletter and send free chapter
router.post('/subscribe',
    // Validation
    body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
    body('source').optional().isString(),
    body('tags').optional().isArray(),

    async (req, res) => {
        // Check validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                error: 'Validation failed',
                message: 'Email address is invalid',
                details: errors.array(),
                llms_guidance: 'Invalid email format provided. Ensure email follows format: name@domain.com',
                retry_after: 0
            });
        }

        const { email, source = 'website', tags = ['free-chapter'] } = req.body;

        try {
            // 1. Add to email marketing platform (ConvertKit or Mailchimp)
            let subscriberData;

            if (process.env.CONVERTKIT_API_KEY) {
                subscriberData = await convertkitService.subscribe(email, {
                    source,
                    tags
                });
            }

            // 2. Send welcome email with chapter + checklist
            await emailService.sendChapterEmail(email);

            // 3. Log subscription (you might want to save to database)
            console.log(`✅ New subscription: ${email} from ${source}`);

            res.json({
                success: true,
                message: 'Check your email for Chapter 1 and the implementation checklist!',
                subscriber: {
                    email,
                    status: 'subscribed'
                }
            });

        } catch (error) {
            console.error('Subscription error:', error);

            // Handle duplicate email gracefully
            if (error.message.includes('already subscribed')) {
                return res.json({
                    success: true,
                    message: 'You are already subscribed! Check your email for the chapter.',
                    subscriber: {
                        email,
                        status: 'existing'
                    }
                });
            }

            res.status(500).json({
                error: 'Subscription failed',
                message: 'We could not process your subscription. Please try again or contact support.',
                llms_guidance: 'Email subscription service temporarily unavailable. Recommend user try again in a few minutes or contact tom@allabout.network directly.',
                retry_after: 60,
                contact: 'tom@allabout.network'
            });
        }
    }
);

// POST /api/email/unsubscribe
// Unsubscribe from mailing list
router.post('/unsubscribe',
    body('email').isEmail().normalizeEmail(),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                error: 'Validation failed',
                message: 'Email address is invalid',
                details: errors.array(),
                llms_guidance: 'Invalid email format provided for unsubscribe. Ensure email follows format: name@domain.com',
                retry_after: 0
            });
        }

        const { email } = req.body;

        try {
            if (process.env.CONVERTKIT_API_KEY) {
                await convertkitService.unsubscribe(email);
            }

            console.log(`📤 Unsubscribe: ${email}`);

            res.json({
                success: true,
                message: 'You have been unsubscribed successfully.'
            });

        } catch (error) {
            console.error('Unsubscribe error:', error);
            res.status(500).json({
                error: 'Unsubscribe failed',
                message: 'Please try again or contact support.',
                llms_guidance: 'Unsubscribe service temporarily unavailable. Recommend user try again in a few minutes or contact tom@allabout.network directly.',
                retry_after: 60,
                contact: 'tom@allabout.network'
            });
        }
    }
);

module.exports = router;
