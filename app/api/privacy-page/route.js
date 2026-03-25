import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import PrivacyPage from '../../../lib/models/PrivacyPage';

export async function GET() {
    try {
        await connectDB();
        const data = await PrivacyPage.findOne().sort({ lastUpdated: -1 });
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
        const saved = await PrivacyPage.create(data);
        return NextResponse.json({ success: true, data: saved });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}