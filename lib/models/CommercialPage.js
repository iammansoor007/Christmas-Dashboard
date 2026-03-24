import mongoose from 'mongoose';

const CommercialPageSchema = new mongoose.Schema({
    // Hero Section
    hero: {
        badge: String,
        title: {
            line1: String,
            line2: String
        },
        subtitle: String,
        cta: {
            text: String,
            phone: String,
            link: String
        },
        backgroundImage: String,
        overlay: {
            from: String,
            to: String
        }
    },

    // Overview Section
    overview: {
        badge: String,
        title: String,
        description: String,
        image: String
    },

    // Features Section
    features: {
        badge: String,
        title: String,
        subtitle: String,
        items: [{
            icon: String,
            title: String,
            description: String
        }]
    },

    // Why Choose Us Section
    whyChoose: {
        badge: String,
        title: String,
        description: String,
        benefits: [String],
        image: String,
        galleryImages: [String]
    },

    // Bottom CTA
    bottomCta: {
        title: String,
        description: String,
        buttonText: String,
        buttonLink: String,
        gradient: {
            from: String,
            to: String
        }
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

const CommercialPage = mongoose.models.CommercialPage || mongoose.model('CommercialPage', CommercialPageSchema);

export default CommercialPage;