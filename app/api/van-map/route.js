import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import VanMap from '../../../lib/models/VanMap';

export async function GET() {
    try {
        await connectDB();
        const data = await VanMap.findOne().sort({ lastUpdated: -1 });

        if (!data) {
            return NextResponse.json({ error: 'No data found' }, { status: 404 });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}