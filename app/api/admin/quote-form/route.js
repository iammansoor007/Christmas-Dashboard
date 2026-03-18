import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import QuoteForm from '../../../../lib/models/QuoteForm';

export async function POST(request) {
    try {
        await connectDB();

        const data = await request.json();

        // Add timestamp
        data.lastUpdated = new Date();

        // Remove _id if it exists to create new document
        delete data._id;
        delete data.__v;

        // Create new document
        const savedData = await QuoteForm.create(data);

        return NextResponse.json({
            success: true,
            data: savedData
        });

    } catch (error) {
        console.error('Error saving:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}