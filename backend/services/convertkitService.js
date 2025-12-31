// ConvertKit API service
// Handles subscriber management and email marketing automation

const axios = require('axios');

class ConvertKitService {
    constructor() {
        this.apiKey = process.env.CONVERTKIT_API_KEY;
        this.apiSecret = process.env.CONVERTKIT_API_SECRET;
        this.formId = process.env.CONVERTKIT_FORM_ID;
        this.baseUrl = 'https://api.convertkit.com/v3';

        if (!this.apiKey) {
            console.warn('⚠️  ConvertKit not configured');
        }
    }

    // Subscribe user to ConvertKit form
    async subscribe(email, options = {}) {
        if (!this.apiKey || !this.formId) {
            throw new Error('ConvertKit not configured');
        }

        const { firstName, lastName, tags = [], customFields = {} } = options;

        try {
            const response = await axios.post(
                `${this.baseUrl}/forms/${this.formId}/subscribe`,
                {
                    api_key: this.apiKey,
                    email,
                    first_name: firstName,
                    fields: {
                        last_name: lastName,
                        ...customFields
                    },
                    tags: tags
                }
            );

            // Add tags if specified
            if (tags.length > 0 && response.data.subscription) {
                await this.addTags(response.data.subscription.subscriber.id, tags);
            }

            console.log(`✅ ConvertKit: Subscribed ${email}`);
            return response.data;

        } catch (error) {
            if (error.response?.status === 409) {
                // Subscriber already exists
                throw new Error('Email already subscribed');
            }

            console.error('ConvertKit subscribe error:', error.response?.data || error.message);
            throw error;
        }
    }

    // Add tags to subscriber
    async addTags(subscriberId, tags) {
        if (!this.apiKey) {
            throw new Error('ConvertKit not configured');
        }

        try {
            // First, get or create tag IDs
            const tagIds = await Promise.all(
                tags.map(tagName => this.getOrCreateTag(tagName))
            );

            // Then tag the subscriber
            await Promise.all(
                tagIds.map(tagId =>
                    axios.post(
                        `${this.baseUrl}/tags/${tagId}/subscribe`,
                        {
                            api_key: this.apiKey,
                            email: subscriberId // Can use email or subscriber ID
                        }
                    )
                )
            );

            console.log(`✅ ConvertKit: Tagged subscriber with ${tags.join(', ')}`);

        } catch (error) {
            console.error('ConvertKit tag error:', error.response?.data || error.message);
            // Don't throw - tagging failure shouldn't break subscription
        }
    }

    // Get or create a tag
    async getOrCreateTag(tagName) {
        if (!this.apiSecret) {
            throw new Error('ConvertKit API secret required for tag management');
        }

        try {
            // Get all tags
            const response = await axios.get(
                `${this.baseUrl}/tags`,
                {
                    params: { api_secret: this.apiSecret }
                }
            );

            // Find existing tag
            const existingTag = response.data.tags.find(
                tag => tag.name.toLowerCase() === tagName.toLowerCase()
            );

            if (existingTag) {
                return existingTag.id;
            }

            // Create new tag
            const createResponse = await axios.post(
                `${this.baseUrl}/tags`,
                {
                    api_secret: this.apiSecret,
                    tag: { name: tagName }
                }
            );

            return createResponse.data.id;

        } catch (error) {
            console.error('ConvertKit get/create tag error:', error.response?.data || error.message);
            throw error;
        }
    }

    // Unsubscribe user
    async unsubscribe(email) {
        if (!this.apiSecret) {
            throw new Error('ConvertKit API secret required for unsubscribe');
        }

        try {
            await axios.put(
                `${this.baseUrl}/unsubscribe`,
                {
                    api_secret: this.apiSecret,
                    email
                }
            );

            console.log(`✅ ConvertKit: Unsubscribed ${email}`);

        } catch (error) {
            console.error('ConvertKit unsubscribe error:', error.response?.data || error.message);
            throw error;
        }
    }

    // Get subscriber by email
    async getSubscriber(email) {
        if (!this.apiSecret) {
            throw new Error('ConvertKit API secret required');
        }

        try {
            const response = await axios.get(
                `${this.baseUrl}/subscribers`,
                {
                    params: {
                        api_secret: this.apiSecret,
                        email_address: email
                    }
                }
            );

            return response.data.subscribers[0] || null;

        } catch (error) {
            console.error('ConvertKit get subscriber error:', error.response?.data || error.message);
            return null;
        }
    }

    // Add custom field to subscriber
    async updateCustomFields(email, fields) {
        if (!this.apiKey) {
            throw new Error('ConvertKit not configured');
        }

        try {
            await axios.put(
                `${this.baseUrl}/subscribers`,
                {
                    api_key: this.apiKey,
                    email,
                    fields
                }
            );

            console.log(`✅ ConvertKit: Updated fields for ${email}`);

        } catch (error) {
            console.error('ConvertKit update fields error:', error.response?.data || error.message);
            throw error;
        }
    }
}

// Export singleton instance
module.exports = new ConvertKitService();
