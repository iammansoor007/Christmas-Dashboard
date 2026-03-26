import { NextResponse } from 'next/server';
import connectDB from '../../../lib/mongodb';
import Navbar from '../../../lib/models/Navbar';
import Navigation from '../../../lib/models/Navigation';

export async function GET() {
  try {
    await connectDB();
    
    // Get static navbar settings (logo, colors, cta)
    const navbarSettings = await Navbar.findOne().sort({ lastUpdated: -1 });
    
    if (!navbarSettings) {
      return NextResponse.json({ error: 'No navbar settings found' }, { status: 404 });
    }

    // Prepare the response
    const responseData = {
      ...navbarSettings.toObject(),
    };

    // If the editor has saved items, use them as the primary source
    if (navbarSettings.navItems && navbarSettings.navItems.length > 0) {
        return NextResponse.json(responseData);
    }

    // FALLBACK: If no navItems saved in Navbar document, reconstruct from Navigation and Page
    // This allows the system to still function for newly created pages with "showInNav"
    const navigation = await Navigation.findOne({ location: 'header' });
    const navItems = [];
    
    if (navigation && navigation.items && navigation.items.length > 0) {
      navItems.push(...navigation.items.map(item => ({
        label: item.label,
        path: item.href,
        dropdown: item.children ? item.children.map(child => ({
            label: child.label,
            path: child.href,
            description: child.description || '',
            icon: child.icon || ''
        })) : []
      })));
    }

    // Add pages marked as showInNav
    const Page = require('../../../lib/models/Page').default;
    const navPages = await Page.find({ showInNav: true, status: 'published' }).sort({ navOrder: 1 });
    
    navPages.forEach(page => {
        const path = `/${page.slug === 'home' ? '' : page.slug}`;
        // Avoid duplicates if already in manual navigation
        const exists = navItems.find(item => item.path === path);
        if (!exists) {
            navItems.push({
                label: page.navLabel || page.title,
                path: path,
                dropdown: []
            });
        }
    });

    responseData.navItems = navItems;

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error fetching navbar data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}