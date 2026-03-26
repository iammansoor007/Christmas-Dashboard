import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import Footer from '../../../lib/models/Footer';
import Navbar from '../../../lib/models/Navbar';

export async function GET() {
  try {
    await connectDB();
    const data = await Footer.findOne().sort({ lastUpdated: -1 });
    
    if (!data) {
      return NextResponse.json({ error: 'No data found' }, { status: 404 });
    }

    const responseData = data.toObject();

    // Also include navbar navigation items for footer link consistency
    const navbar = await Navbar.findOne().sort({ lastUpdated: -1 });
    if (navbar && navbar.navItems && navbar.navItems.length > 0) {
      responseData.navItems = navbar.navItems;
    }

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}