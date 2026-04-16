import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const defaultFromAddress = 'Contact Form <onboarding@resend.dev>';

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, message } = body as {
      name?: string;
      email?: string;
      company?: string;
      message?: string;
    };

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 },
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY?.trim();
    if (!resendApiKey) {
      console.error('RESEND_API_KEY env var not set');
      return NextResponse.json(
        { error: 'Email is not configured on the server yet.' },
        { status: 500 },
      );
    }

    const contactEmail = process.env.CONTACT_EMAIL?.trim();
    if (!contactEmail) {
      console.error('CONTACT_EMAIL env var not set');
      return NextResponse.json(
        { error: 'Inbox email is not configured on the server yet.' },
        { status: 500 },
      );
    }

    const resendFrom = process.env.RESEND_FROM?.trim() || defaultFromAddress;
    const resendTestEmail = process.env.RESEND_TEST_EMAIL?.trim();
    const usingTestingSender = resendFrom.includes('onboarding@resend.dev');
    const destinationEmail = usingTestingSender
      ? resendTestEmail || contactEmail
      : contactEmail;

    const resend = new Resend(resendApiKey);

    const safeName = escapeHtml(name.trim());
    const replyTo = email.trim();
    const safeEmail = escapeHtml(replyTo);
    const safeCompany = company ? escapeHtml(company.trim()) : '';
    const safeMessage = escapeHtml(message.trim());

    const { error } = await resend.emails.send({
      from: resendFrom,
      to: destinationEmail,
      replyTo,
      subject: `New enquiry from ${name}${company ? ` - ${company}` : ''}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;">
          <h2 style="color:#1e293b;border-bottom:2px solid #3b82f6;padding-bottom:8px;">
            New Contact Form Submission
          </h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          ${safeCompany ? `<p><strong>Company:</strong> ${safeCompany}</p>` : ''}
          <hr style="border:none;border-top:1px solid #e2e8f0;margin:16px 0;" />
          <p><strong>Message:</strong></p>
          <p style="white-space:pre-wrap;color:#374151;">${safeMessage}</p>
        </div>
      `,
    });

    if (error) {
      const resendMessage =
        typeof error.message === 'string' && error.message.length > 0
          ? error.message
          : 'Failed to send email';

      console.error('Resend error:', {
        statusCode: error.statusCode,
        name: error.name,
        message: resendMessage,
      });

      const configurationHint =
        usingTestingSender && !resendTestEmail
          ? ' Add RESEND_TEST_EMAIL for local testing, or verify a domain in Resend and set RESEND_FROM to that domain.'
          : '';

      return NextResponse.json(
        {
          error:
            process.env.NODE_ENV === 'production'
              ? 'Failed to send email'
              : `${resendMessage}${configurationHint}`,
        },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    );
  }
}
