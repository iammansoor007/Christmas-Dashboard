import { NextResponse } from 'next/server';
import connectDB from '@/lib/mongodb';
import Hero from '@/lib/models/Hero';

export async function POST(request) {
    try {
        // Simple auth check using headers
        const authHeader = request.headers.get('authorization');
        const adminUsername = process.env.ADMIN_USERNAME;
        const adminPassword = process.env.ADMIN_PASSWORD;

        // Create basic auth token
        const validToken = btoa(`${adminUsername}:${adminPassword}`);

        if (!authHeader || authHeader !== `Basic ${validToken}`) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();

        const heroData = await request.json();

        // Add timestamp
        heroData.lastUpdated = new Date();

        // Create new hero document
        const hero = await Hero.create(heroData);

        return NextResponse.json({
            success: true,
            data: hero,
            message: 'Hero section saved successfully'
        });

    } catch (error) {
        console.error('Error saving hero:', error);
        return NextResponse.json({ error: 'Failed to save hero data' }, { status: 500 });
    }
}