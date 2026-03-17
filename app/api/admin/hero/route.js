import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import Hero from '../../../../lib/models/Hero';

export async function POST(request) {
    try {
        await connectDB();

        const heroData = await request.json();

        heroData.lastUpdated = new Date();
        delete heroData._id;
        delete heroData.__v;

        const hero = await Hero.create(heroData);

        return NextResponse.json({
            success: true,
            data: hero
        });

    } catch (error) {
        console.error('Error saving hero:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}