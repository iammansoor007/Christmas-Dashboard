import mongoose from 'mongoose';

const TEMPLATES = [
    'home', 'about', 'services', 'service-detail', 'contact',
    'service-area', 'gallery', 'privacy', 'terms'
];

const SeoSchema = new mongoose.Schema({
    metaTitle: String,
    metaDescription: String,
    ogImage: String
}, { _id: false });

const PageSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    slug: { type: String, unique: true, sparse: true },
    template: { type: String, enum: TEMPLATES, required: true },
    status: { type: String, enum: ['draft', 'published'], default: 'draft' },
    seo: SeoSchema,
    isHomepage: { type: Boolean, default: false },
    showInNav: { type: Boolean, default: false },
    navLabel: { type: String, trim: true },
    navOrder: { type: Number, default: 0 },
    content: { type: mongoose.Schema.Types.Mixed, default: {} }
}, { timestamps: true });

PageSchema.index({ slug: 1, status: 1 });
PageSchema.index({ isHomepage: 1, status: 1 });

const Page = mongoose.models.Page || mongoose.model('Page', PageSchema);
export default Page;