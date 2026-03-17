import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import Hero from '../../../lib/models/Hero';

export async function GET() {
    try {
        await connectDB();
        const hero = await Hero.findOne().sort({ lastUpdated: -1 });

        if (!hero) {
            return NextResponse.json({ error: 'No hero data found' }, { status: 404 });
        }

        return NextResponse.json(hero);
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ error: 'Failed to fetch hero' }, { status: 500 });
    }
}