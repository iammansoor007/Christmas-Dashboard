import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import ResidentialPage from '../../../lib/models/ResidentialPage';

export async function GET() {
    try {
        await connectDB();
        const data = await ResidentialPage.findOne().sort({ lastUpdated: -1 });
        return NextResponse.json(data || {});
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await connectDB();
        const data = await request.json();
        data.lastUpdated = new Date();
        delete data._id;
        const saved = await ResidentialPage.create(data);
        return NextResponse.json({ success: true, data: saved });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}