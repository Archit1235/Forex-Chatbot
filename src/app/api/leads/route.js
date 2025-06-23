import { NextResponse } from 'next/server';

// Simple lead capture endpoint
// This can be extended to integrate with CRM systems like HubSpot, Salesforce, etc.

export async function POST(request) {
  try {
    const {
      name,
      email,
      phone,
      message,
      language = 'english',
    } = await request.json();

    // Validate required fields
    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Prepare lead data
    const leadData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || null,
      message: message?.trim() || null,
      language,
      source: 'forex-chatbot',
      timestamp: new Date().toISOString(),
      ip:
        request.headers.get('x-forwarded-for') ||
        request.headers.get('x-real-ip') ||
        'unknown',
      userAgent: request.headers.get('user-agent') || 'unknown',
    };

    // Here you would typically:
    // 1. Save to database
    // 2. Send to CRM (HubSpot, Salesforce, etc.)
    // 3. Send notification email
    // 4. Trigger marketing automation

    // For demo purposes, just log the lead
    console.log('New lead captured:', leadData);

    // Example CRM integration (uncomment and modify as needed):
    /*
    // HubSpot example
    await fetch('https://api.hubapi.com/contacts/v1/contact/', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        properties: [
          { property: 'email', value: leadData.email },
          { property: 'firstname', value: leadData.name.split(' ')[0] },
          { property: 'lastname', value: leadData.name.split(' ').slice(1).join(' ') },
          { property: 'phone', value: leadData.phone },
          { property: 'message', value: leadData.message },
          { property: 'lead_source', value: leadData.source },
          { property: 'preferred_language', value: leadData.language },
        ]
      })
    });
    */

    // Simulate processing delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    return NextResponse.json({
      success: true,
      message: 'Thank you for your interest! We will contact you soon.',
      leadId: `lead_${Date.now()}`,
    });
  } catch (error) {
    console.error('Lead capture error:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
