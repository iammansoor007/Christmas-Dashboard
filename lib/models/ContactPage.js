import mongoose from 'mongoose';

const ContactPageSchema = new mongoose.Schema({
    // Hero Section
    hero: {
        badge: String,
        title: {
            line1: String,
            line2: String
        },
        subtitle: String,
        backgroundImage: String,
        overlay: {
            from: String,
            to: String
        }
    },

    // Form Section
    form: {
        badge: String,
        title: String,
        subtitle: String,
        submitButtonText: String,
        successMessage: String,
        budgetOptions: [String],
        lightingAreas: [{
            id: String,
            label: String,
            emoji: String
        }]
    },

    // Benefits Section
    benefits: [{
        text: String,
        icon: String
    }],

    // Contact Info Section
    contactInfo: {
        phone: String,
        email: String,
        hours: String,
        support: String,
        address: String
    },


    // SEO
    seo: {
        metaTitle: String,
        metaDescription: String,
        ogImage: String
    },

    lastUpdated: {
        type: Date,
        default: Date.now
    }
});

const ContactPage = mongoose.models.ContactPage || mongoose.model('ContactPage', ContactPageSchema);

export default ContactPage;