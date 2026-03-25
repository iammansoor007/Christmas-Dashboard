import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';

export async function proxy(request) {
    const { pathname } = request.nextUrl;

    // Skip API routes, admin, and static files
    if (pathname.startsWith('/api') ||
        pathname.startsWith('/admin') ||
        pathname.includes('.') ||
        pathname === '/_next' ||
        pathname === '/favicon.ico') {
        return NextResponse.next();
    }

    try {
        const uri = process.env.MONGODB_URI;
        if (uri) {
            const client = new MongoClient(uri);
            await client.connect();
            const db = client.db();
            const redirect = await db.collection('redirects').findOne({ from: pathname });
            await client.close();

            if (redirect) {
                return NextResponse.redirect(new URL(redirect.to, request.url), redirect.type || 301);
            }
        }
    } catch (error) {
        console.error('Redirect check error:', error);
    }

    return NextResponse.next();
}

export const config = {
    matcher: '/((?!_next/static|_next/image|favicon.ico).*)',
};