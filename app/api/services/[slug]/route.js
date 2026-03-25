import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import Service from '../../../../lib/models/Service';

export async function GET(request, { params }) {
    try {
        await connectDB();
        const { slug } = await params;

        const service = await Service.findOne({ slug, status: 'published' });

        if (!service) {
            return NextResponse.json({ error: 'Service not found' }, { status: 404 });
        }

        return NextResponse.json(service);
    } catch (error) {
        console.error('Error fetching service:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}