import mongoose from 'mongoose';

const GalleryImageSchema = new mongoose.Schema({
    id: Number,
    src: String,
    title: String,
    location: String,
    category: String
}, { _id: false });

const GalleryPageSchema = new mongoose.Schema({
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

    // Gallery Images
    images: [GalleryImageSchema],

    // Bottom CTA
    bottomCta: {
        title: String,
        description: String,
        buttonText: String,
        buttonLink: String
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

const GalleryPage = mongoose.models.GalleryPage || mongoose.model('GalleryPage', GalleryPageSchema);

export default GalleryPage;