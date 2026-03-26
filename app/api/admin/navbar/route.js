import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import Navbar from '../../../../lib/models/Navbar';
import Page from '../../../../lib/models/Page';

export async function POST(request) {
    try {
        await connectDB();

        const data = await request.json();
        const { _id, __v, ...updateData } = data;

        // If homepageId is provided, sync with Page model for existing logic compatibility
        if (updateData.homepageId) {
            await Page.updateMany({}, { $set: { isHomepage: false } });
            await Page.findByIdAndUpdate(updateData.homepageId, { $set: { isHomepage: true, status: 'published' } });
        }

        updateData.lastUpdated = new Date();
        
        // Find existing or create new to avoid duplicates
        const savedData = await Navbar.findOneAndUpdate(
            {},
            { $set: updateData },
            { upsert: true, new: true, runValidators: true }
        );

        return NextResponse.json({
            success: true,
            data: savedData
        });

    } catch (error) {
        console.error('Error saving navbar:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}