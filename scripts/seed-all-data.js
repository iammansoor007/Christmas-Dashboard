const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

async function seedAllData() {
  const uri = 'mongodb://localhost:27017';
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('✅ Connected to MongoDB');

    const db = client.db('christmas-lighting');
    
    // Read your data.json file
    const dataPath = path.join(__dirname, '../public/data.json');
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    console.log('📄 Data file loaded successfully');

    // 1. Seed Hero data
    console.log('\n📦 Seeding Hero data...');
    const heroCollection = db.collection('heros');
    await heroCollection.deleteMany({});
    const heroResult = await heroCollection.insertOne({
      ...data.hero,
      lastUpdated: new Date()
    });
    console.log(`   ✅ Hero seeded with ID: ${heroResult.insertedId}`);

    // 2. Seed About data
    console.log('\n📦 Seeding About data...');
    const aboutCollection = db.collection('abouts');
    await aboutCollection.deleteMany({});
    const aboutResult = await aboutCollection.insertOne({
      ...data.about,
      lastUpdated: new Date()
    });
    console.log(`   ✅ About seeded with ID: ${aboutResult.insertedId}`);

    // 3. Seed Services data
    console.log('\n📦 Seeding Services data...');
    const servicesCollection = db.collection('services');
    await servicesCollection.deleteMany({});
    const servicesResult = await servicesCollection.insertOne({
      ...data.services,
      lastUpdated: new Date()
    });
    console.log(`   ✅ Services seeded with ID: ${servicesResult.insertedId}`);

    // 4. Seed Testimonials data
    console.log('\n📦 Seeding Testimonials data...');
    const testimonialsCollection = db.collection('testimonials');
    await testimonialsCollection.deleteMany({});
    const testimonialsResult = await testimonialsCollection.insertOne({
      ...data.testimonials,
      lastUpdated: new Date()
    });
    console.log(`   ✅ Testimonials seeded with ID: ${testimonialsResult.insertedId}`);

    // 5. Seed FAQ data
    console.log('\n📦 Seeding FAQ data...');
    const faqCollection = db.collection('faqs');
    await faqCollection.deleteMany({});
    const faqResult = await faqCollection.insertOne({
      ...data.faq,
      lastUpdated: new Date()
    });
    console.log(`   ✅ FAQ seeded with ID: ${faqResult.insertedId}`);

    // 6. Seed Quote Form data
    console.log('\n📦 Seeding Quote Form data...');
    const quoteFormCollection = db.collection('quoteforms');
    await quoteFormCollection.deleteMany({});
    const quoteFormResult = await quoteFormCollection.insertOne({
      ...data.quoteForm,
      lastUpdated: new Date()
    });
    console.log(`   ✅ Quote Form seeded with ID: ${quoteFormResult.insertedId}`);

    // 7. Seed Footer data
    console.log('\n📦 Seeding Footer data...');
    const footerCollection = db.collection('footers');
    await footerCollection.deleteMany({});
    const footerResult = await footerCollection.insertOne({
      ...data.footer,
      lastUpdated: new Date()
    });
    console.log(`   ✅ Footer seeded with ID: ${footerResult.insertedId}`);

    // 8. Seed Modern Services data
    console.log('\n📦 Seeding Modern Services data...');
    const modernServicesCollection = db.collection('modernservices');
    await modernServicesCollection.deleteMany({});
    const modernServicesResult = await modernServicesCollection.insertOne({
      ...data.modernServices,
      lastUpdated: new Date()
    });
    console.log(`   ✅ Modern Services seeded with ID: ${modernServicesResult.insertedId}`);

    // 9. Seed Van Map Section data
    console.log('\n📦 Seeding Van Map Section data...');
    const vanMapCollection = db.collection('vanmaps');
    await vanMapCollection.deleteMany({});
    const vanMapResult = await vanMapCollection.insertOne({
      ...data.vanMapSection,
      lastUpdated: new Date()
    });
    console.log(`   ✅ Van Map Section seeded with ID: ${vanMapResult.insertedId}`);

    // 10. Seed Work Showcase data
    console.log('\n📦 Seeding Work Showcase data...');
    const workShowcaseCollection = db.collection('workshowcases');
    await workShowcaseCollection.deleteMany({});
    const workShowcaseResult = await workShowcaseCollection.insertOne({
      ...data.workShowcase,
      lastUpdated: new Date()
    });
    console.log(`   ✅ Work Showcase seeded with ID: ${workShowcaseResult.insertedId}`);

    // 11. Seed How We Work data
    console.log('\n📦 Seeding How We Work data...');
    const howWeWorkCollection = db.collection('howweworks');
    await howWeWorkCollection.deleteMany({});
    const howWeWorkResult = await howWeWorkCollection.insertOne({
      ...data.howWeWork,
      lastUpdated: new Date()
    });
    console.log(`   ✅ How We Work seeded with ID: ${howWeWorkResult.insertedId}`);

    // 12. Seed CTA data
    console.log('\n📦 Seeding CTA data...');
    const ctaCollection = db.collection('ctas');
    await ctaCollection.deleteMany({});
    const ctaResult = await ctaCollection.insertOne({
      ...data.cta,
      lastUpdated: new Date()
    });
    console.log(`   ✅ CTA seeded with ID: ${ctaResult.insertedId}`);

    // 13. Seed Contact data
    console.log('\n📦 Seeding Contact data...');
    const contactCollection = db.collection('contacts');
    await contactCollection.deleteMany({});
    const contactResult = await contactCollection.insertOne({
      ...data.contact,
      lastUpdated: new Date()
    });
    console.log(`   ✅ Contact seeded with ID: ${contactResult.insertedId}`);

    console.log('\n🎉 All data seeded successfully!');

  } catch (error) {
    console.error('❌ Error seeding data:', error);
  } finally {
    await client.close();
    console.log('🔌 Disconnected from MongoDB');
  }
}

seedAllData();