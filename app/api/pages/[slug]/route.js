import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import Page from '../../../../lib/models/Page';

export async function GET(request, { params }) {
    try {
        await connectDB();
        const { slug } = await params;
        const url = new URL(request.url);
        const preview = url.searchParams.get('preview') === 'true';

        let page = null;

        // Check if slug is actually an ID
        const mongoose = require('mongoose');
        const isId = mongoose.Types.ObjectId.isValid(slug);

        if (isId) {
            page = await Page.findById(slug);
        } else {
            page = await Page.findOne({ slug });
        }

        // If not found or not published (and not previewing)
        if (!page || (page.status !== 'published' && !preview)) {
            return NextResponse.json({ error: 'Page not found' }, { status: 404 });
        }

        return NextResponse.json(page);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}