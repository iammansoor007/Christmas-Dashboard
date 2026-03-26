const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

const MONGODB_URI = 'mongodb://localhost:27017/christmas-lighting';

const PageSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    template: { type: String, required: true },
    status: { type: String, default: 'published' },
    isHomepage: { type: Boolean, default: false },
    showInNav: { type: Boolean, default: true },
    content: { type: mongoose.Schema.Types.Mixed, default: {} }
}, { timestamps: true });

async function seedPages() {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log('Connected to MongoDB');

        const Page = mongoose.models.Page || mongoose.model('Page', PageSchema);

        const dataPath = path.join(__dirname, '../public/data.json');
        const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

        const builtInPages = [
            { title: 'Home', slug: 'home', template: 'home', isHomepage: true, content: data.hero },
            { title: 'About Us', slug: 'about', template: 'about', content: data.about },
            { title: 'Our Services', slug: 'services', template: 'services', content: data.services },
            { title: 'Contact', slug: 'contact', template: 'contact', content: data.contact },
            { title: 'Gallery', slug: 'gallery', template: 'gallery', content: data.workShowcase },
            { title: 'Service Area', slug: 'service-area', template: 'service-area', content: data.vanMapSection }
        ];

        for (const pageData of builtInPages) {
            const existing = await Page.findOne({ slug: pageData.slug });
            if (existing) {
                console.log(`Updating existing page: ${pageData.title}`);
                await Page.updateOne({ slug: pageData.slug }, pageData);
            } else {
                console.log(`Creating new page: ${pageData.title}`);
                await Page.create(pageData);
            }
        }

        console.log('Successfully seeded built-in pages!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding pages:', error);
        process.exit(1);
    }
}

seedPages();
