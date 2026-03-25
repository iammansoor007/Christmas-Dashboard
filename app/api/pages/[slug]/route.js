import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import Page from '../../../../lib/models/Page';

export async function GET(request, { params }) {
    try {
        await connectDB();
        const { slug } = await params;

        let page = await Page.findOne({ slug, status: 'published' });

        if (!page) {
            const url = new URL(request.url);
            const preview = url.searchParams.get('preview');
            if (preview === 'true') {
                page = await Page.findOne({ slug });
            }
        }

        if (!page) {
            return NextResponse.json({ error: 'Page not found' }, { status: 404 });
        }

        return NextResponse.json(page);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}