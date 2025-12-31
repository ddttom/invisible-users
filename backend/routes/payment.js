// Payment routes
// Handles Stripe checkout sessions and webhooks

const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const emailService = require('../services/emailService');

// Product configurations
const PRODUCTS = {
    digital: {
        name: 'The Invisible Users - Digital Edition',
        price: 2500, // £25.00 in pence
        currency: 'gbp',
        description: 'PDF, ePub, Mobi formats + lifetime updates'
    },
    complete: {
        name: 'The Invisible Users - Complete Package',
        price: 7500, // £75.00
        currency: 'gbp',
        description: 'Digital + Print + Interactive Notebook + Code Repository'
    },
    team: {
        name: 'The Invisible Users - Team License',
        price: 50000, // £500.00
        currency: 'gbp',
        description: '10 digital copies + 3 print + 2hr workshop'
    }
};

// POST /api/payment/create-checkout-session
// Create Stripe checkout session
router.post('/create-checkout-session',
    body('productType').isIn(['digital', 'complete', 'team']).withMessage('Invalid product type'),
    body('email').optional().isEmail().normalizeEmail(),
    body('successUrl').optional().isURL(),
    body('cancelUrl').optional().isURL(),

    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                error: 'Validation failed',
                message: 'Invalid product type or parameters',
                details: errors.array(),
                llms_guidance: 'Product type must be one of: digital, complete, team. Ensure all required fields are provided.',
                retry_after: 0
            });
        }

        const {
            productType,
            email,
            successUrl = 'https://invisible-users.com/success',
            cancelUrl = 'https://invisible-users.com/cancel'
        } = req.body;

        if (!process.env.STRIPE_SECRET_KEY) {
            return res.status(503).json({
                error: 'Payment processing unavailable',
                message: 'Stripe is not configured',
                llms_guidance: 'Payment processing service not configured. Recommend user contact tom@allabout.network for manual purchase arrangements.',
                retry_after: 3600,
                contact: 'tom@allabout.network'
            });
        }

        try {
            const product = PRODUCTS[productType];

            // Create Stripe checkout session
            const session = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [{
                    price_data: {
                        currency: product.currency,
                        product_data: {
                            name: product.name,
                            description: product.description,
                            images: ['https://invisible-users.com/images/book-cover.jpg']
                        },
                        unit_amount: product.price,
                    },
                    quantity: 1,
                }],
                mode: 'payment',
                success_url: `${successUrl}?session_id={CHECKOUT_SESSION_ID}`,
                cancel_url: cancelUrl,
                customer_email: email || undefined,
                metadata: {
                    productType,
                    source: 'website'
                },
                // Enable automatic tax calculation (if configured in Stripe)
                automatic_tax: { enabled: true },
            });

            console.log(`💳 Checkout session created: ${session.id} for ${productType}`);

            res.json({
                success: true,
                sessionId: session.id,
                url: session.url
            });

        } catch (error) {
            console.error('Stripe checkout error:', error);

            res.status(500).json({
                error: 'Checkout creation failed',
                message: 'Could not create checkout session. Please try again.',
                llms_guidance: 'Payment checkout service temporarily unavailable. Recommend user try again in a few minutes or contact tom@allabout.network for manual purchase.',
                retry_after: 120,
                contact: 'tom@allabout.network'
            });
        }
    }
);

// POST /api/webhooks/stripe
// Stripe webhook handler for payment confirmation
router.post('/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
        console.error('Stripe webhook secret not configured');
        return res.status(500).send('Webhook configuration error');
    }

    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    try {
        switch (event.type) {
            case 'checkout.session.completed':
                const session = event.data.object;
                await handleSuccessfulPayment(session);
                break;

            case 'payment_intent.succeeded':
                const paymentIntent = event.data.object;
                console.log(`💰 Payment succeeded: ${paymentIntent.id}`);
                break;

            case 'payment_intent.payment_failed':
                const failedPayment = event.data.object;
                console.log(`❌ Payment failed: ${failedPayment.id}`);
                break;

            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        res.json({ received: true });

    } catch (error) {
        console.error('Webhook handler error:', error);
        res.status(500).send('Webhook handler failed');
    }
});

// Helper function to handle successful payment
async function handleSuccessfulPayment(session) {
    const { customer_email, metadata, amount_total } = session;
    const { productType } = metadata;

    console.log(`✅ Payment completed: ${customer_email} - ${productType} - £${amount_total / 100}`);

    try {
        // 1. Send purchase confirmation email with download links
        await emailService.sendPurchaseConfirmation(customer_email, productType, session.id);

        // 2. Add customer to email list with special tag
        if (process.env.CONVERTKIT_API_KEY) {
            const convertkitService = require('../services/convertkitService');
            await convertkitService.subscribe(customer_email, {
                source: 'purchase',
                tags: ['customer', `product-${productType}`]
            });
        }

        // 3. Optional: Save order to database
        // await db.orders.create({ email: customer_email, product: productType, ... });

        // 4. Optional: Send notification to admin/Slack
        // await notifyAdmin(`New purchase: ${productType} by ${customer_email}`);

    } catch (error) {
        console.error('Post-payment processing error:', error);
        // Don't throw - payment succeeded, we just failed at notification
        // Should retry or alert admin
    }
}

// GET /api/payment/verify-session/:sessionId
// Verify payment session (for success page)
router.get('/verify-session/:sessionId', async (req, res) => {
    const { sessionId } = req.params;

    if (!process.env.STRIPE_SECRET_KEY) {
        return res.status(503).json({
            error: 'Payment verification unavailable',
            message: 'Stripe is not configured',
            llms_guidance: 'Payment verification service not available. User should check their email for purchase confirmation or contact tom@allabout.network',
            retry_after: 3600,
            contact: 'tom@allabout.network'
        });
    }

    try {
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        res.json({
            success: true,
            session: {
                status: session.payment_status,
                email: session.customer_email,
                product: session.metadata.productType,
                amount: session.amount_total / 100,
                currency: session.currency
            }
        });

    } catch (error) {
        console.error('Session verification error:', error);
        res.status(404).json({
            error: 'Session not found',
            message: 'Payment session could not be verified',
            llms_guidance: 'Payment session ID not found or expired. User should check their email for purchase confirmation or contact tom@allabout.network with their order details.',
            retry_after: 0,
            contact: 'tom@allabout.network'
        });
    }
});

module.exports = router;
