import mongoose from 'mongoose';

const TermsPageSchema = new mongoose.Schema({
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

    // Terms Sections (Dynamic sections - can add unlimited)
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

const TermsPage = mongoose.models.TermsPage || mongoose.model('TermsPage', TermsPageSchema);

export default TermsPage;