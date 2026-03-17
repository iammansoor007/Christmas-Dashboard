import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import Service from '../../../../lib/models/Service';

export async function POST(request) {
    try {
        await connectDB();

        const serviceData = await request.json();

        // Add timestamp
        serviceData.lastUpdated = new Date();

        // Remove _id if it exists to create new document
        delete serviceData._id;
        delete serviceData.__v;

        // Create new service document
        const services = await Service.create(serviceData);

        return NextResponse.json({
            success: true,
            data: services,
            message: 'Services section saved successfully!'
        });

    } catch (error) {
        console.error('Error saving services:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

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