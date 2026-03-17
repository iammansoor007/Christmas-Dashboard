import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create transporter outside the handler to reuse connection
let transporter = null;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
      // Add connection pool for faster sending
      pool: true,
      maxConnections: 5,
      maxMessages: 100,
    });
  }
  return transporter;
}

// Service type mapping (moved outside for performance)
const serviceTypeMap = {
  seasonal: 'Seasonal Christmas Lighting',
  permanent: 'Permanent Lighting Installation',
  commercial: 'Commercial Property',
  consultation: 'General Consultation'
};

export async function POST(request) {
  // Start timing
  const startTime = Date.now();

  try {
    const body = await request.json();
    const {
      name,
      email,
      phone,
      address,
      serviceType,
      preferredDate,
      preferredTime,
      message,
      hearAbout
    } = body;

    // Quick validation
    if (!name || !email || !phone || !address || !serviceType || !preferredDate || !preferredTime) {
      return NextResponse.json(
        { message: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Format date quickly
    const formattedDate = new Date(preferredDate).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    // IMMEDIATE RESPONSE - Don't wait for emails
    const response = NextResponse.json(
      {
        message: 'Consultation scheduled successfully! Check your email for confirmation.',
        timing: `${Date.now() - startTime}ms`
      },
      { status: 200 }
    );

    // SEND EMAILS IN BACKGROUND (don't await)
    if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
      // Fire and forget - user doesn't need to wait
      sendEmailsInBackground({
        name, email, phone, address, serviceType,
        formattedDate, preferredTime, message, hearAbout
      }).catch(error => {
        console.error('Background email error:', error);
      });
    } else {
      console.log('Email credentials missing, logging only:', { name, email });
    }

    console.log(`✅ Response sent in ${Date.now() - startTime}ms - emails processing in background`);
    return response;

  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { message: 'Failed to schedule consultation. Please try again.' },
      { status: 500 }
    );
  }
}

// Background email function - runs after response is sent
async function sendEmailsInBackground(data) {
  const {
    name, email, phone, address, serviceType,
    formattedDate, preferredTime, message, hearAbout
  } = data;

  const businessEmail = process.env.GMAIL_USER;
  const transporter = getTransporter();

  // Prepare email content
  const serviceDisplay = serviceTypeMap[serviceType] || serviceType;

  // EMAIL 1: To Business
  const businessMailOptions = {
    from: `"Christmas Lights" <${businessEmail}>`,
    to: businessEmail,
    subject: `🎄 New: ${name} - ${formattedDate}`,
    html: `
      <div style="font-family: Arial; max-width: 600px;">
        <h2 style="color: #059669;">New Consultation: ${name}</h2>
        <p><strong>📧</strong> ${email}</p>
        <p><strong>📞</strong> ${phone}</p>
        <p><strong>🏠</strong> ${address}</p>
        <p><strong>🎄</strong> ${serviceDisplay}</p>
        <p><strong>📅</strong> ${formattedDate} at ${preferredTime}</p>
        ${hearAbout ? `<p><strong>🔍</strong> ${hearAbout}</p>` : ''}
        ${message ? `<p><strong>💬</strong> ${message}</p>` : ''}
        <hr>
        <a href="mailto:${email}" style="background:#059669; color:white; padding:10px 20px; text-decoration:none; border-radius:5px;">Reply</a>
        <a href="tel:${phone}" style="background:#4b5563; color:white; padding:10px 20px; text-decoration:none; border-radius:5px; margin-left:10px;">Call</a>
      </div>
    `,
  };

  // EMAIL 2: To Customer
  const customerMailOptions = {
    from: `"Christmas Lights" <${businessEmail}>`,
    to: email,
    subject: '🎄 Your Consultation is Confirmed!',
    html: `
      <div style="font-family: Arial; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #10b981, #047857); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
          <h1 style="margin:0;">Thank You, ${name}!</h1>
        </div>
        
        <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
          <p>We've received your consultation request for:</p>
          
          <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Service:</strong> ${serviceDisplay}</p>
            <p><strong>Date:</strong> ${formattedDate} at ${preferredTime}</p>
            <p><strong>Address:</strong> ${address}</p>
          </div>
          
          <div style="background: #e6f7f0; padding: 20px; border-radius: 8px;">
            <h3 style="color:#047857; margin-top:0;">Next Steps:</h3>
            <ol>
              <li>We'll review your request within 24 hours</li>
              <li>We'll call you at ${phone} to confirm</li>
              <li>We'll provide your free quote</li>
            </ol>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <p>Questions? Call us:</p>
            <a href="tel:+16143017100" style="background:#10b981; color:white; padding:12px 30px; text-decoration:none; border-radius:50px; font-weight:bold;">📞 (614) 301-7100</a>
          </div>
          
          <hr style="border:1px solid #e5e7eb;">
          <p style="text-align: center; color: #6b7280;">🎄 Christmas Lights Over Columbus</p>
        </div>
      </div>
    `,
  };

  // Send both emails (now in background)
  await Promise.all([
    transporter.sendMail(businessMailOptions),
    transporter.sendMail(customerMailOptions)
  ]);

  console.log(`✅ Background emails sent to ${email}`);
}