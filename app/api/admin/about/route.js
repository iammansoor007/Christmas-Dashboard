import { NextResponse } from 'next/server';
import connectDB from '../../../../lib/mongodb';
import AboutPage from '../../../../lib/models/AboutPage';

export async function POST(request) {
  try {
    await connectDB();
    
    const data = await request.json();
    
    data.lastUpdated = new Date();
    delete data._id;
    delete data.__v;
    
    const savedData = await AboutPage.create(data);

    return NextResponse.json({ 
      success: true, 
      data: savedData 
    });

  } catch (error) {
    console.error('Error saving:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}