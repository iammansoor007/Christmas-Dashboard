import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import Service from '../../../../lib/models/Service';

export async function GET(request, { params }) {
    try {
        await connectDB();
        const { slug } = await params;
        const url = new URL(request.url);
        const preview = url.searchParams.get('preview') === 'true';

        let service = null;

        // Check if slug is actually an ID
        const mongoose = require('mongoose');
        const isId = mongoose.Types.ObjectId.isValid(slug);

        if (isId) {
            service = await Service.findById(slug);
        } else {
            service = await Service.findOne({ slug });
        }

        // If not found or not published (and not previewing)
        if (!service || (service.status !== 'published' && !preview)) {
            return NextResponse.json({ error: 'Service not found' }, { status: 404 });
        }

        return NextResponse.json(service);
    } catch (error) {
        console.error('Error fetching service:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}