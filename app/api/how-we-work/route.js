import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import HowWeWork from '../../../lib/models/HowWeWork';

export async function GET() {
    try {
        await connectDB();
        const data = await HowWeWork.findOne().sort({ lastUpdated: -1 });

        if (!data) {
            return NextResponse.json({ error: 'No data found' }, { status: 404 });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
    }
}