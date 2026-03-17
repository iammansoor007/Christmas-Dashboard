import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import Service from '../../../lib/models/Service';

export async function GET() {
    try {
        await connectDB();
        const services = await Service.findOne().sort({ lastUpdated: -1 });

        if (!services) {
            return NextResponse.json({ error: 'No service data found' }, { status: 404 });
        }

        return NextResponse.json(services);
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
    }
}