// The Invisible Users - Backend API Server
// Handles email subscriptions, contact forms, and payment processing

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');

// Import routes
const emailRoutes = require('./routes/email');
const contactRoutes = require('./routes/contact');
const paymentRoutes = require('./routes/payment');
const healthRoutes = require('./routes/health');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Security middleware
app.use(helmet());

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [
    'http://localhost:3000',
    'http://localhost:8000'
];

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (mobile apps, Postman, etc.)
        if (!origin) return callback(null, true);

        if (allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging middleware
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
} else {
    app.use(morgan('combined'));
}

// Rate limiting with AI agent-friendly headers
const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
    max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
    message: {
        error: 'Rate limit exceeded',
        message: 'Too many requests from this IP, please try again later.',
        llms_guidance: 'This IP has exceeded the rate limit. Wait for the time specified in Retry-After header before making another request.',
        retry_after: 900 // 15 minutes in seconds
    },
    standardHeaders: true, // Includes RateLimit-* headers
    legacyHeaders: false,
    handler: (req, res) => {
        const retryAfter = Math.ceil((req.rateLimit.resetTime - Date.now()) / 1000);
        res.setHeader('Retry-After', retryAfter);
        res.status(429).json({
            error: 'Rate limit exceeded',
            message: 'Too many requests from this IP, please try again later.',
            llms_guidance: `This IP has exceeded the rate limit of ${req.rateLimit.limit} requests per ${Math.ceil(limiter.windowMs / 60000)} minutes. Wait ${retryAfter} seconds before retrying.`,
            retry_after: retryAfter,
            limit: req.rateLimit.limit,
            remaining: 0,
            reset_time: new Date(req.rateLimit.resetTime).toISOString()
        });
    }
});

app.use('/api/', limiter);

// Stricter rate limiting for email submissions
const emailLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // 5 submissions per hour
    message: {
        error: 'Rate limit exceeded',
        message: 'Too many email submissions, please try again later.',
        llms_guidance: 'Email submission rate limit exceeded. Wait for the time specified in Retry-After header.',
        retry_after: 3600 // 1 hour in seconds
    },
    standardHeaders: true,
    legacyHeaders: false,
    handler: (req, res) => {
        const retryAfter = Math.ceil((req.rateLimit.resetTime - Date.now()) / 1000);
        res.setHeader('Retry-After', retryAfter);
        res.status(429).json({
            error: 'Rate limit exceeded',
            message: 'Too many email submissions from this IP. Please try again later.',
            llms_guidance: `Email submission rate limit of 5 requests per hour exceeded. Wait ${retryAfter} seconds before retrying.`,
            retry_after: retryAfter,
            limit: 5,
            remaining: 0,
            reset_time: new Date(req.rateLimit.resetTime).toISOString()
        });
    }
});

// Stripe webhook needs raw body
app.use('/api/webhooks/stripe', express.raw({ type: 'application/json' }));

// Routes
app.use('/api/health', healthRoutes);
app.use('/api/email', emailLimiter, emailRoutes);
app.use('/api/contact', emailLimiter, contactRoutes);
app.use('/api/payment', paymentRoutes);

// Root endpoint
app.get('/', (req, res) => {
    res.json({
        message: 'The Invisible Users API',
        version: '1.0.0',
        endpoints: {
            health: '/api/health',
            email: '/api/email/subscribe',
            contact: '/api/contact/submit',
            payment: {
                checkout: '/api/payment/create-checkout-session',
                webhook: '/api/webhooks/stripe'
            }
        }
    });
});

// 404 handler
app.use((_req, res) => {
    res.status(404).json({
        error: 'Not Found',
        message: 'The requested endpoint does not exist',
        llms_guidance: 'Endpoint not found. Check that the URL is correct. Available endpoints are listed at GET /',
        retry_after: 0,
        available_endpoints: {
            root: '/',
            health: '/api/health',
            email: '/api/email/subscribe',
            contact: '/api/contact/submit',
            payment: '/api/payment/create-checkout-session'
        }
    });
});

// Global error handler
app.use((err, _req, res, _next) => {
    console.error('Error:', err);

    // Don't leak error details in production
    const isDev = process.env.NODE_ENV === 'development';

    res.status(err.status || 500).json({
        error: err.message || 'Internal Server Error',
        message: 'An unexpected error occurred',
        llms_guidance: 'Internal server error. This is likely a temporary issue. Recommend user try again in a few minutes or contact tom@allabout.network if the problem persists.',
        retry_after: 60,
        contact: 'tom@allabout.network',
        ...(isDev && { stack: err.stack })
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`📧 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 API available at http://localhost:${PORT}/api`);

    // Warn about missing configuration
    if (!process.env.SMTP_HOST) {
        console.warn('⚠️  SMTP configuration missing - email features will not work');
    }
    if (!process.env.STRIPE_SECRET_KEY) {
        console.warn('⚠️  Stripe configuration missing - payment features will not work');
    }
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
    });
});

module.exports = app;
