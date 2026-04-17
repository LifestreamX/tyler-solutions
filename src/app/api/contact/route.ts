import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const DEFAULT_RESEND_FROM = 'Tyler Allen <contact@tyler-allen.com>';
const VERIFIED_SENDER_DOMAIN = 'tyler-allen.com';

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

function extractEmailAddress(value: string) {
  const matchedAddress = value.match(/<([^>]+)>/);
  return (matchedAddress?.[1] ?? value).trim().toLowerCase();
}

function isVerifiedSenderAddress(value: string) {
  const emailAddress = extractEmailAddress(value);
  return emailAddress.endsWith(`@${VERIFIED_SENDER_DOMAIN}`);
}

function getResendFromAddress() {
  const configuredFrom = process.env.RESEND_FROM?.trim();

  if (configuredFrom && isVerifiedSenderAddress(configuredFrom)) {
    return configuredFrom;
  }

  if (configuredFrom) {
    console.warn(
      'Ignoring RESEND_FROM because it is not on the verified sender domain',
      {
        resendFrom: configuredFrom,
        verifiedDomain: VERIFIED_SENDER_DOMAIN,
      },
    );
  }

  return DEFAULT_RESEND_FROM;
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

    const trimmedName = name?.trim();
    const trimmedEmail = email?.trim();
    const trimmedCompany = company?.trim();
    const trimmedMessage = message?.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
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

    const resendFrom = getResendFromAddress();

    const contactEmail = process.env.CONTACT_EMAIL?.trim();
    if (!contactEmail) {
      console.error('CONTACT_EMAIL env var not set');
      return NextResponse.json(
        { error: 'Inbox email is not configured on the server yet.' },
        { status: 500 },
      );
    }

    const destinationEmail = contactEmail;

    const resend = new Resend(resendApiKey);

    const safeName = escapeHtml(trimmedName);
    const replyTo = trimmedEmail;
    const safeEmail = escapeHtml(replyTo);
    const safeCompany = trimmedCompany ? escapeHtml(trimmedCompany) : '';
    const safeMessage = escapeHtml(trimmedMessage);

    const { error } = await resend.emails.send({
      from: resendFrom,
      to: destinationEmail,
      replyTo,
      subject: `New enquiry from ${trimmedName}${trimmedCompany ? ` - ${trimmedCompany}` : ''}`,
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
      const isSenderDomainError =
        error.statusCode === 403 &&
        resendMessage.toLowerCase().includes('domain is not verified');

      console.error('Resend error:', {
        statusCode: error.statusCode,
        name: error.name,
        message: resendMessage,
      });

      return NextResponse.json(
        {
          error: isSenderDomainError
            ? 'Email sender is not verified. Set RESEND_FROM to an address on a verified Resend domain.'
            : 'Failed to send email',
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
