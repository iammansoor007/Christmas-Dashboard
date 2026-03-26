import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import Footer from '../../../../lib/models/Footer';

export async function POST(request) {
    try {
        await connectDB();

        const data = await request.json();
        const { _id, __v, navItems, ...updateData } = data;

        updateData.lastUpdated = new Date();

        // Find existing or create new to avoid duplicates
        const savedData = await Footer.findOneAndUpdate(
            {},
            { $set: updateData },
            { upsert: true, new: true, runValidators: true }
        );

        return NextResponse.json({
            success: true,
            data: savedData
        });

    } catch (error) {
        console.error('Error saving footer:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}