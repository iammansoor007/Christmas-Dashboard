import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import ServiceDetail from '../../../../lib/models/ServiceDetail';

export async function GET(request, { params }) {
    try {
        await connectDB();
        const { slug } = params;

        const data = await ServiceDetail.findOne({ slug });

        if (!data) {
            return NextResponse.json({ error: 'Service not found' }, { status: 404 });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}