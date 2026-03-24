import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import ServiceDetail from '../../../../lib/models/ServiceDetail';

export async function POST(request) {
    try {
        await connectDB();

        const data = await request.json();

        data.lastUpdated = new Date();
        delete data._id;
        delete data.__v;

        // Update if exists, otherwise create
        const savedData = await ServiceDetail.findOneAndUpdate(
            { slug: data.slug },
            data,
            { upsert: true, new: true }
        );

        return NextResponse.json({
            success: true,
            data: savedData
        });

    } catch (error) {
        console.error('Error saving:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function GET() {
    try {
        await connectDB();
        const data = await ServiceDetail.find().sort({ lastUpdated: -1 });

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}