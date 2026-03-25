import mongoose from 'mongoose';

const PrivacyPageSchema = new mongoose.Schema({
    // Hero Section
    hero: {
        badge: String,
        title: String,
        subtitle: String,
        backgroundImage: String,
        lastUpdatedText: String,
        overlay: {
            from: String,
            to: String
        }
    },

    // Introduction Section
    introduction: {
        title: String,
        description: String,
        icon: String
    },

    // Privacy Sections (Dynamic sections - can add unlimited)
    sections: [{
        icon: String,
        title: String,
        content: String,
        subSections: [{
            title: String,
            content: String,
            listItems: [String]
        }],
        note: String
    }],

    // Contact Info
    contactInfo: {
        title: String,
        phone: String,
        email: String,
        address: String,
        responseTime: String,
        icon: String
    },

    // Footer Links
    footerLinks: {
        showLinks: Boolean,
        links: [{
            label: String,
            href: String
        }]
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

const PrivacyPage = mongoose.models.PrivacyPage || mongoose.model('PrivacyPage', PrivacyPageSchema);

export default PrivacyPage;