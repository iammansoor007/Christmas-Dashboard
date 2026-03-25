import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import Navigation from '../../../lib/models/Navigation';
import Page from '../../../lib/models/Page';
import Service from '../../../lib/models/Service';

export async function GET(request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const location = searchParams.get('location') || 'header';

        let nav = await Navigation.findOne({ location });

        if (!nav) {
            const pages = await Page.find({ showInNav: true, status: 'published' }).sort({ navOrder: 1 });
            const services = await Service.find({ status: 'published' }).sort({ order: 1 });
            const homepage = await Page.findOne({ isHomepage: true });

            const items = [
                {
                    type: 'page',
                    label: 'Home',
                    pageId: homepage?._id,
                    href: '/',
                    order: 1
                },
                ...pages.filter(p => p.slug !== 'home').map(page => ({
                    type: 'page',
                    label: page.navLabel || page.title,
                    pageId: page._id,
                    href: `/${page.slug}`,
                    order: page.navOrder
                })),
                {
                    type: 'services',
                    label: 'Services',
                    order: 999,
                    children: services.map(service => ({
                        label: service.title,
                        href: `/services/${service.slug}`
                    }))
                }
            ];

            nav = await Navigation.create({
                location,
                items: items.filter(i => i.href !== '/' || i.label === 'Home')
            });
        }

        return NextResponse.json(nav);
    } catch (error) {
        console.error('GET navigation error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await connectDB();
        const data = await request.json();

        if (!data.location) {
            return NextResponse.json({ error: 'Location is required' }, { status: 400 });
        }

        let nav = await Navigation.findOne({ location: data.location });

        if (nav) {
            nav.items = data.items;
            nav.lastUpdated = new Date();
            await nav.save();
        } else {
            nav = await Navigation.create(data);
        }

        return NextResponse.json(nav);
    } catch (error) {
        console.error('POST navigation error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}