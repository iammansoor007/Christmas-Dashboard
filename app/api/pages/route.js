import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import Page from '../../../lib/models/Page';

function generateSlug(title) {
    return title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-|-$/g, '');
}

export async function GET() {
    try {
        await connectDB();
        const pages = await Page.find().sort({ createdAt: -1 });
        return NextResponse.json(pages);
    } catch (error) {
        console.error('GET pages error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        await connectDB();
        const data = await request.json();

        // Generate slug from title
        let slug = generateSlug(data.title);
        let counter = 1;
        let originalSlug = slug;

        while (await Page.findOne({ slug })) {
            slug = `${originalSlug}-${counter}`;
            counter++;
        }

        data.slug = slug;

        // If this is homepage, unset other homepages
        if (data.isHomepage) {
            await Page.updateMany({ isHomepage: true }, { $set: { isHomepage: false } });
        }

        const page = await Page.create(data);
        return NextResponse.json(page, { status: 201 });
    } catch (error) {
        console.error('POST page error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request) {
    try {
        await connectDB();
        const data = await request.json();
        const { _id, ...updateData } = data;

        const page = await Page.findByIdAndUpdate(_id, updateData, { new: true });
        return NextResponse.json(page);
    } catch (error) {
        console.error('PUT page error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        const page = await Page.findById(id);
        if (page?.isHomepage) {
            return NextResponse.json({ error: 'Cannot delete homepage' }, { status: 400 });
        }

        await Page.findByIdAndDelete(id);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('DELETE page error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}