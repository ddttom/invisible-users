// Email service using Nodemailer
// Handles transactional emails (welcome, purchase confirmation, contact notifications)

const nodemailer = require('nodemailer');
const fs = require('fs').promises;
const path = require('path');

class EmailService {
    constructor() {
        this.transporter = null;
        this.initialize();
    }

    initialize() {
        if (!process.env.SMTP_HOST) {
            console.warn('⚠️  Email service not configured - emails will not be sent');
            return;
        }

        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT) || 587,
            secure: process.env.SMTP_SECURE === 'true',
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        // Verify connection
        this.transporter.verify((error, success) => {
            if (error) {
                console.error('❌ Email service connection failed:', error);
            } else {
                console.log('✅ Email service ready');
            }
        });
    }

    // Send welcome email with Chapter 1 + checklist
    async sendChapterEmail(to) {
        if (!this.transporter) {
            throw new Error('Email service not configured');
        }

        const mailOptions = {
            from: `Tom Cranstoun <${process.env.EMAIL_FROM}>`,
            to,
            subject: 'Your free chapter + implementation checklist',
            html: this.getChapterEmailTemplate(),
            attachments: [
                // Attach Chapter 1 PDF (if available)
                // {
                //     filename: 'invisible-users-chapter-1.pdf',
                //     path: process.env.CHAPTER_PDF_PATH
                // },
                // {
                //     filename: 'implementation-checklist.pdf',
                //     path: process.env.CHECKLIST_PDF_PATH
                // }
            ]
        };

        const info = await this.transporter.sendMail(mailOptions);
        console.log(`📧 Chapter email sent: ${info.messageId}`);
        return info;
    }

    // Send contact form notification to admin
    async sendContactNotification(data) {
        if (!this.transporter) {
            throw new Error('Email service not configured');
        }

        const { name, email, company, role, service, message, timeline } = data;

        const mailOptions = {
            from: `Website Contact Form <${process.env.EMAIL_FROM}>`,
            to: process.env.EMAIL_TO,
            replyTo: email,
            subject: `New ${service} inquiry from ${name}`,
            html: `
                <h2>New Contact Form Submission</h2>
                <p><strong>Service:</strong> ${service}</p>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                ${company ? `<p><strong>Company:</strong> ${company}</p>` : ''}
                ${role ? `<p><strong>Role:</strong> ${role}</p>` : ''}
                ${timeline ? `<p><strong>Timeline:</strong> ${timeline}</p>` : ''}

                <h3>Message:</h3>
                <p>${message.replace(/\n/g, '<br>')}</p>

                <hr>
                <p><small>Submitted: ${new Date().toISOString()}</small></p>
                <p><a href="mailto:${email}?subject=Re: ${service}">Reply to ${name}</a></p>
            `,
            text: `
Service: ${service}
Name: ${name}
Email: ${email}
${company ? `Company: ${company}` : ''}
${role ? `Role: ${role}` : ''}
${timeline ? `Timeline: ${timeline}` : ''}

Message:
${message}

Submitted: ${new Date().toISOString()}
            `.trim()
        };

        const info = await this.transporter.sendMail(mailOptions);
        console.log(`📧 Contact notification sent: ${info.messageId}`);
        return info;
    }

    // Send auto-reply to contact form submitter
    async sendContactAutoReply(to, name, service) {
        if (!this.transporter) {
            throw new Error('Email service not configured');
        }

        const mailOptions = {
            from: `Tom Cranstoun <${process.env.EMAIL_FROM}>`,
            to,
            subject: 'Thank you for your inquiry',
            html: `
                <p>Hi ${name},</p>

                <p>Thank you for your interest in <strong>${service}</strong>.</p>

                <p>I've received your message and will respond within 24 hours (typically much sooner).</p>

                <p>In the meantime, you might find these resources helpful:</p>
                <ul>
                    <li><a href="https://invisible-users.com/preview.html">Read Chapter 1 free</a></li>
                    <li><a href="https://invisible-users.com/#contents">See full book contents</a></li>
                    <li><a href="https://invisible-users.com/services.html">Learn more about our services</a></li>
                </ul>

                <p>Best regards,<br>
                Tom Cranstoun<br>
                <a href="https://allabout.network">allabout.network</a></p>

                <hr>
                <p><small>If you didn't submit this form, please ignore this email.</small></p>
            `
        };

        const info = await this.transporter.sendMail(mailOptions);
        console.log(`📧 Auto-reply sent: ${info.messageId}`);
        return info;
    }

    // Send purchase confirmation with download links
    async sendPurchaseConfirmation(to, productType, sessionId) {
        if (!this.transporter) {
            throw new Error('Email service not configured');
        }

        const productNames = {
            digital: 'Digital Edition',
            complete: 'Complete Package',
            team: 'Team License'
        };

        const downloadLinks = {
            digital: 'https://invisible-users.com/downloads/digital',
            complete: 'https://invisible-users.com/downloads/complete',
            team: 'https://invisible-users.com/downloads/team'
        };

        const mailOptions = {
            from: `Tom Cranstoun <${process.env.EMAIL_FROM}>`,
            to,
            subject: `Your purchase: The Invisible Users - ${productNames[productType]}`,
            html: `
                <h2>Thank You for Your Purchase!</h2>

                <p>Your payment has been confirmed and your ${productNames[productType]} is ready to download.</p>

                <h3>Download Your Book</h3>
                <p><a href="${downloadLinks[productType]}" style="display: inline-block; padding: 12px 24px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 6px;">Access Your Download</a></p>

                <h3>What's Included</h3>
                ${this.getProductIncludes(productType)}

                <h3>Getting Started</h3>
                <ol>
                    <li>Click the download link above to access your files</li>
                    <li>Save the downloads to your preferred location</li>
                    <li>Start with the Preface and Chapter 1</li>
                    <li>Use the implementation checklist to track progress</li>
                </ol>

                <h3>Need Help?</h3>
                <p>If you have any questions or issues accessing your download, reply to this email or contact <a href="mailto:tom@allabout.network">tom@allabout.network</a>.</p>

                <p>Thank you for supporting this work!</p>

                <p>Best regards,<br>
                Tom Cranstoun</p>

                <hr>
                <p><small>Order reference: ${sessionId}<br>
                This purchase is for your personal/team use only. Please do not redistribute.</small></p>
            `
        };

        const info = await this.transporter.sendMail(mailOptions);
        console.log(`📧 Purchase confirmation sent: ${info.messageId}`);
        return info;
    }

    // Get product includes HTML
    getProductIncludes(productType) {
        const includes = {
            digital: `
                <ul>
                    <li>Complete book in PDF, ePub, and Mobi formats</li>
                    <li>All 10 chapters (~50,000 words)</li>
                    <li>Production-ready code examples</li>
                    <li>Implementation checklist</li>
                    <li>60+ term glossary</li>
                    <li>150+ curated resource links</li>
                    <li>Lifetime updates</li>
                </ul>
            `,
            complete: `
                <ul>
                    <li>Everything in Digital Edition</li>
                    <li>Print edition (shipping details to follow)</li>
                    <li>Interactive companion notebook access</li>
                    <li>Complete code repository</li>
                    <li>Playwright test suite</li>
                    <li>Email support</li>
                </ul>
            `,
            team: `
                <ul>
                    <li>Everything in Complete Package</li>
                    <li>10 digital copies for your team</li>
                    <li>3 print copies</li>
                    <li>2-hour team workshop (to be scheduled)</li>
                    <li>Implementation consultation</li>
                    <li>Priority email support</li>
                </ul>
            `
        };

        return includes[productType] || '';
    }

    // Chapter email template
    getChapterEmailTemplate() {
        return `
            <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #111827;">Welcome! Here's Your Free Chapter</h2>

                <p>Thank you for requesting Chapter 1 of <strong>The Invisible Users: Designing the Web for AI Agents and Everyone Else</strong>.</p>

                <h3 style="color: #2563eb;">📖 Chapter 1: What You Will Learn</h3>
                <p>This chapter introduces the core problem: modern web design patterns that work beautifully for human visual browsing but fail completely for AI agents - and many human users too.</p>

                <p style="background-color: #f3f4f6; padding: 16px; border-radius: 8px;">
                    <strong>Note:</strong> Chapter 1 PDF and implementation checklist will be attached to this email.<br>
                    <small>(Currently in development - links will be sent shortly)</small>
                </p>

                <h3 style="color: #2563eb;">✅ What's in the Checklist</h3>
                <p>The implementation checklist provides a priority-based roadmap:</p>
                <ul>
                    <li><strong>Priority 1:</strong> Critical quick wins (highest impact, minimal effort)</li>
                    <li><strong>Priority 2:</strong> Essential improvements</li>
                    <li><strong>Priority 3:</strong> Core infrastructure changes</li>
                    <li><strong>Priority 4:</strong> Advanced features</li>
                </ul>

                <h3 style="color: #2563eb;">📚 Ready for the Full Book?</h3>
                <p>The complete book includes:</p>
                <ul>
                    <li>10 chapters (~50,000 words)</li>
                    <li>Production-ready code examples</li>
                    <li>Interactive companion notebook</li>
                    <li>60+ term glossary</li>
                    <li>150+ curated resources</li>
                </ul>

                <p style="text-align: center; margin: 32px 0;">
                    <a href="https://invisible-users.com/#buy" style="display: inline-block; padding: 12px 32px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 6px; font-weight: 600;">Get the Full Book - £25</a>
                </p>

                <h3 style="color: #2563eb;">💡 Weekly Insights</h3>
                <p>You're now subscribed to receive weekly agent compatibility tips. Each week I'll share:</p>
                <ul>
                    <li>Practical implementation patterns</li>
                    <li>Real-world case studies</li>
                    <li>Industry developments</li>
                    <li>Q&A from readers</li>
                </ul>

                <p><small>Don't want emails? <a href="https://invisible-users.com/unsubscribe">Unsubscribe anytime</a></small></p>

                <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;">

                <p>Best regards,<br>
                Tom Cranstoun<br>
                <a href="https://allabout.network">allabout.network</a></p>
            </div>
        `;
    }
}

// Export singleton instance
module.exports = new EmailService();
