import mongoose from 'mongoose';

const DetailFeatureSchema = new mongoose.Schema({
    icon: String,
    title: String,
    description: String
}, { _id: false });

const WhyChooseSchema = new mongoose.Schema({
    title: String,
    description: String,
    items: [String]
}, { _id: false });

const SeoSchema = new mongoose.Schema({
    metaTitle: String,
    metaDescription: String,
    ogImage: String
}, { _id: false });

const ServiceSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, sparse: true },
    number: { type: String, default: '' },
    icon: { type: String, default: 'FaStar' },
    color: { type: String, default: '#10B981' },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    showOnHomepage: { type: Boolean, default: true },
    order: { type: Number, default: 0 },
    shortDescription: { type: String, required: true },
    longDescription: String,
    features: [String],
    detailFeatures: [DetailFeatureSchema],
    whyChoose: WhyChooseSchema,
    galleryImages: [String],
    mainImage: String,
    ctaText: { type: String, default: 'View Details' },
    ctaLink: String,
    seo: SeoSchema,
    stat: String
}, { timestamps: true });

ServiceSchema.index({ slug: 1, status: 1 });
ServiceSchema.index({ showOnHomepage: 1, order: 1 });

const Service = mongoose.models.Service || mongoose.model('Service', ServiceSchema);
export default Service;