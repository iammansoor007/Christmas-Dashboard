import mongoose from 'mongoose';

const CitySchema = new mongoose.Schema({
    id: Number,
    city: String,
    icon: String
}, { _id: false });

const ServiceAreaSchema = new mongoose.Schema({
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

    // Section Header
    sectionHeader: {
        title: String,
        subtitle: String
    },

    // Service Areas Cities
    cities: [CitySchema],

    // Bottom Notice
    bottomNotice: {
        text: String,
        buttonText: String,
        icon: String
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

const ServiceArea = mongoose.models.ServiceArea || mongoose.model('ServiceArea', ServiceAreaSchema);

export default ServiceArea;