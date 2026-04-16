'use client';

import { FadeUp } from '@/lib/motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Send, CheckCircle, Mail, Phone } from 'lucide-react';
import { useState, useRef } from 'react';
import {
  trackFormStart,
  trackFormSubmit,
  trackFormSubmitFailure,
  trackFormError,
  trackEmailClick,
  trackPhoneClick,
} from '@/lib/analytics';

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  company: z.string().optional(),
  message: z
    .string()
    .min(10, 'Tell me a bit more about your project (10+ characters)'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const inputClass =
  'w-full min-h-11 rounded border border-border bg-background px-4 py-3 text-base text-foreground shadow-sm transition-all placeholder:text-muted-foreground focus:border-accent focus:ring-1 focus:ring-accent outline-none dark:shadow-none sm:text-sm';

const contactInfo = [
  {
    icon: Mail,
    label: 'Email',
    value: 'tylerallen@live.com',
    href: 'mailto:tylerallen@live.com',
    onClick: () => trackEmailClick('contact_section'),
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '(774) 279-1607',
    href: 'tel:+17742791607',
    onClick: () => trackPhoneClick('contact_section'),
  },
];

const nextSteps = [
  'I read every message myself',
  'I reply with what I would recommend next',
  'If it looks like a fit, we can decide together what should happen after that',
];

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const formStarted = useRef(false);
  const formStartedAt = useRef<number | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  function handleFormInteraction() {
    if (!formStarted.current) {
      formStarted.current = true;
      formStartedAt.current = Date.now();
      trackFormStart();
    }
  }

  const [submitError, setSubmitError] = useState<string | null>(null);

  const onSubmit = async (data: ContactFormData) => {
    setSubmitError(null);
    const completionSeconds = formStartedAt.current
      ? Math.max(1, Math.round((Date.now() - formStartedAt.current) / 1000))
      : undefined;

    let failureTracked = false;

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        failureTracked = true;
        trackFormSubmitFailure('server');
        throw new Error((json as { error?: string }).error ?? 'Failed to send');
      }

      trackFormSubmit(
        !!data.company,
        '',
        completionSeconds,
        data.message.trim().length,
      );
      setSubmitted(true);
    } catch (err) {
      if (!failureTracked) {
        trackFormSubmitFailure(
          err instanceof TypeError ? 'network' : 'unknown',
        );
      }

      setSubmitError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again.',
      );
    }
  };

  function onInvalid(fieldErrors: typeof errors) {
    const failedFields = Object.keys(fieldErrors);
    if (failedFields.length > 0) {
      trackFormError(failedFields);
    }
  }

  return (
    <section
      id='contact'
      className='section-shell bg-background'
      aria-labelledby='contact-heading'
    >
      <div className='max-w-7xl mx-auto px-6 lg:px-8'>
        <div className='grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16'>
          {/* Left - Info */}
          <FadeUp>
            <div>
              <p className='label-mono mb-3'>/ contact</p>
              <h2
                id='contact-heading'
                className='text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground mb-6'
              >
                <span className='block'>Tell Me What You Need</span>
                <span className='block text-accent'>I&apos;ll Tell You What Makes Sense.</span>
              </h2>
              <p className='text-muted-foreground leading-relaxed mb-10'>
                If you need a new website, help with the one you already have,
                better online sales, secure customer areas, or a tool for your
                team, send over the details. I&apos;ll review it, tell you what I&apos;d
                recommend, and say so if I don&apos;t think I&apos;m the right fit.
              </p>
              <p className='mb-8 text-sm leading-relaxed text-muted-foreground'>
                Even a short note is enough. You don&apos;t need a full plan, a big
                brief, or a polished project outline before reaching out.
              </p>

              <div className='mb-8 rounded border border-border bg-surface p-5 shadow-sm dark:shadow-none'>
                <p className='mb-3 font-mono text-[10px] uppercase tracking-widest text-muted-foreground'>
                  What Happens Next
                </p>
                <ul className='space-y-2.5' role='list'>
                  {nextSteps.map((step) => (
                    <li
                      key={step}
                      className='flex items-start gap-2.5 text-sm leading-relaxed text-muted-foreground'
                    >
                      <span className='mt-2 h-1 w-3 shrink-0 bg-accent' />
                      {step}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Contact details */}
              <div className='space-y-3'>
                {contactInfo.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={item.onClick}
                    aria-label={`${item.label}: ${item.value}`}
                    className='group flex min-h-11 items-center gap-4 rounded border border-border bg-surface p-4 sm:p-5 shadow-sm transition-all duration-300 hover:-translate-y-px hover:border-accent/30 hover:shadow-md dark:shadow-none dark:hover:shadow-none'
                  >
                    <div className='p-2 bg-card border border-border rounded shrink-0'>
                      <item.icon className='h-4 w-4 text-accent' />
                    </div>
                    <div>
                      <p className='font-mono text-[10px] text-muted-foreground uppercase tracking-widest mb-0.5'>
                        {item.label}
                      </p>
                      <span className='text-sm font-medium text-foreground transition-colors group-hover:text-accent'>
                        {item.value}
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </FadeUp>

          {/* Right - Form */}
          <FadeUp delay={0.2}>
            <div className='card-workstation p-6 sm:p-8'>
              {submitted ? (
                <div
                  className='flex h-full flex-col items-center justify-center py-12 text-center'
                  role='status'
                  aria-live='polite'
                >
                  <CheckCircle className='mb-4 h-12 w-12 text-success' />
                  <h3 className='text-xl font-semibold text-foreground mb-2'>
                    Message Sent!
                  </h3>
                  <p className='text-muted-foreground'>
                    Thanks. I got your note and I&apos;ll reply soon.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit(onSubmit, onInvalid)}
                  className='space-y-5'
                  aria-busy={isSubmitting}
                  aria-describedby='contact-form-help'
                  noValidate
                >
                  <div
                    id='contact-form-help'
                    className='rounded border border-border bg-background px-4 py-3'
                  >
                    <p className='text-sm leading-relaxed text-muted-foreground'>
                      A few sentences is enough. The most useful things to
                      include are what you need, what&apos;s not working, and any
                      timing or links you already have.
                    </p>
                  </div>

                  {/* Name */}
                  <div>
                    <label
                      htmlFor='name'
                      className='block text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2'
                    >
                      Name <span className='text-destructive'>*</span>
                    </label>
                    <input
                      id='name'
                      type='text'
                      required
                      autoComplete='name'
                      autoCapitalize='words'
                      enterKeyHint='next'
                      {...register('name')}
                      onFocus={handleFormInteraction}
                      className={inputClass}
                      placeholder='Your name'
                      aria-describedby={errors.name ? 'name-error' : undefined}
                      aria-invalid={errors.name ? true : undefined}
                    />
                    {errors.name && (
                      <p
                        id='name-error'
                        className='text-destructive text-xs mt-1'
                        role='alert'
                      >
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor='email'
                      className='block text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2'
                    >
                      Email <span className='text-destructive'>*</span>
                    </label>
                    <input
                      id='email'
                      type='email'
                      required
                      autoComplete='email'
                      autoCapitalize='none'
                      autoCorrect='off'
                      enterKeyHint='next'
                      inputMode='email'
                      spellCheck={false}
                      {...register('email')}
                      onFocus={handleFormInteraction}
                      className={inputClass}
                      placeholder='you@company.com'
                      aria-describedby={
                        errors.email ? 'email-error' : undefined
                      }
                      aria-invalid={errors.email ? true : undefined}
                    />
                    {errors.email && (
                      <p
                        id='email-error'
                        className='text-destructive text-xs mt-1'
                        role='alert'
                      >
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Company */}
                  <div>
                    <label
                      htmlFor='company'
                      className='block text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2'
                    >
                      Company
                    </label>
                    <input
                      id='company'
                      type='text'
                      autoComplete='organization'
                      autoCapitalize='words'
                      enterKeyHint='next'
                      {...register('company')}
                      onFocus={handleFormInteraction}
                      className={inputClass}
                      placeholder='Your company (optional)'
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label
                      htmlFor='message'
                      className='block text-xs font-mono text-muted-foreground uppercase tracking-widest mb-2'
                    >
                      What would you like help with?{' '}
                      <span className='text-destructive'>*</span>
                    </label>
                    <textarea
                      id='message'
                      rows={5}
                      required
                      enterKeyHint='send'
                      {...register('message')}
                      onFocus={handleFormInteraction}
                      className={`${inputClass} resize-none`}
                      placeholder='A few sentences is enough. Tell me what you need, what&apos;s not working, and any timing, links, or examples that would help.'
                      aria-describedby={
                        errors.message ? 'message-error' : undefined
                      }
                      aria-invalid={errors.message ? true : undefined}
                    />
                    {errors.message && (
                      <p
                        id='message-error'
                        className='text-destructive text-xs mt-1'
                        role='alert'
                      >
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Submit error */}
                  {submitError && (
                    <p
                      className='text-destructive text-xs text-center'
                      role='alert'
                    >
                      {submitError}
                    </p>
                  )}

                  {/* Submit */}
                  <button
                    type='submit'
                    disabled={isSubmitting}
                    className='btn-accent group inline-flex min-h-11 w-full items-center justify-center gap-2 rounded px-8 py-4 text-sm font-semibold text-accent-foreground disabled:opacity-50 disabled:cursor-not-allowed'
                  >
                    {isSubmitting ? (
                      <>
                        <div className='h-4 w-4 rounded-full border-2 border-accent-foreground/30 border-t-accent-foreground animate-spin' />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className='h-4 w-4 group-hover:translate-x-1 transition-transform' />
                      </>
                    )}
                  </button>

                  <p className='text-center text-xs leading-relaxed text-muted-foreground'>
                    No pressure. If I do not think I am the right fit, I will
                    tell you.
                  </p>
                </form>
              )}
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
