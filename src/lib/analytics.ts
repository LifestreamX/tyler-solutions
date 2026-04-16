/**
 * Google Analytics 4 advanced event tracking.
 * Falls back to the live property ID if an env var is not present.
 */

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? 'G-P4JC6F6YXE';

declare global {
  interface Window {
    dataLayer?: unknown[][];
    gtag?: (...args: unknown[]) => void;
  }
}

/** Safe gtag caller. No-ops if GA has not loaded yet. */
function gtagCall(command: string, ...args: unknown[]) {
  if (typeof window === 'undefined') {
    return;
  }

  if (typeof window.gtag === 'function') {
    window.gtag(command, ...args);
    return;
  }

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push([command, ...args]);
  }
}

/** Manual page_view for SPA navigation if needed. */
export function trackPageView(url: string, title?: string) {
  gtagCall('event', 'page_view', {
    page_location: url,
    page_title: title,
    send_to: GA_MEASUREMENT_ID,
  });
}

/** Primary conversion: call CTA click. */
export function trackBookCallClick(location: string) {
  gtagCall('event', 'book_call_click', {
    event_category: 'CTA',
    event_label: `book_call_from_${location}`,
    section: location,
    value: 1,
  });
}

/** Secondary CTA: case study click. */
export function trackSeeWorkClick(location: string) {
  gtagCall('event', 'see_work_click', {
    event_category: 'CTA',
    event_label: `see_work_from_${location}`,
    section: location,
  });
}

/** Any named CTA click. */
export function trackCtaClick(label: string, location: string) {
  gtagCall('event', 'cta_click', {
    event_category: 'CTA',
    event_label: label,
    section: location,
  });
}

/** Navbar link click. */
export function trackNavClick(destination: string, isMobile: boolean) {
  gtagCall('event', 'nav_click', {
    event_category: 'Navigation',
    event_label: destination,
    device_type: isMobile ? 'mobile' : 'desktop',
  });
}

/** Mobile menu open or close. */
export function trackMobileMenuToggle(action: 'open' | 'close') {
  gtagCall('event', 'mobile_menu_toggle', {
    event_category: 'Navigation',
    event_label: action,
  });
}

/** User interacts with the contact form for the first time. */
export function trackFormStart() {
  gtagCall('event', 'form_start', {
    event_category: 'Contact Form',
    event_label: 'contact_form',
    form_id: 'contact',
    form_name: 'Discovery Call Request',
  });
}

/** User selects a budget range. */
export function trackBudgetSelected(budget: string) {
  gtagCall('event', 'budget_selected', {
    event_category: 'Contact Form',
    event_label: budget,
    budget_range: budget,
  });
}

/** Form successfully submitted. */
export function trackFormSubmit(
  hasCompany: boolean,
  budget: string,
  completionSeconds?: number,
  messageLength?: number,
) {
  const eventData: Record<string, string | number | boolean> = {
    event_category: 'Contact Form',
    event_label: 'contact_form_submitted',
    form_id: 'contact',
    form_name: 'Discovery Call Request',
    has_company: hasCompany,
    budget_selected: budget || 'not_specified',
  };

  if (completionSeconds !== undefined) {
    eventData.form_completion_seconds = completionSeconds;
  }

  if (messageLength !== undefined) {
    eventData.message_length = messageLength;
    eventData.message_length_bucket =
      messageLength < 80
        ? 'short'
        : messageLength < 220
          ? 'medium'
          : 'detailed';
  }

  gtagCall('event', 'form_submit', {
    ...eventData,
  });

  gtagCall('event', 'generate_lead', {
    currency: 'USD',
    value: 0,
    method: 'contact_form',
    ...(completionSeconds !== undefined
      ? { form_completion_seconds: completionSeconds }
      : {}),
  });
}

/** Form submission failed after the user attempted to send it. */
export function trackFormSubmitFailure(
  reason: 'network' | 'server' | 'unknown',
) {
  gtagCall('event', 'form_submit_failure', {
    event_category: 'Contact Form',
    event_label: reason,
    form_id: 'contact',
    failure_reason: reason,
  });
}

/** Validation errors on submit attempt. */
export function trackFormError(fields: string[]) {
  gtagCall('event', 'form_error', {
    event_category: 'Contact Form',
    event_label: fields.join(','),
    error_fields: fields.join(','),
    field_count: fields.length,
  });
}

/** Any outbound link click. */
export function trackOutboundClick(destination: string, label: string) {
  let linkDomain = destination;

  try {
    linkDomain = new URL(destination).hostname;
  } catch {
    // Keep the raw destination if parsing fails.
  }

  gtagCall('event', 'outbound_click', {
    event_category: 'Outbound',
    event_label: label,
    link_url: destination,
    link_domain: linkDomain,
  });
}

/** Email link click. */
export function trackEmailClick(source: string) {
  gtagCall('event', 'contact_email_click', {
    event_category: 'Contact',
    event_label: `email_from_${source}`,
  });
}

/** Phone link click. */
export function trackPhoneClick(source: string) {
  gtagCall('event', 'contact_phone_click', {
    event_category: 'Contact',
    event_label: `phone_from_${source}`,
  });
}

function readNestedString(
  value: unknown,
  ...keys: string[]
): string | undefined {
  let current = value;

  for (const key of keys) {
    if (typeof current !== 'object' || current === null || !(key in current)) {
      return undefined;
    }

    current = (current as Record<string, unknown>)[key];
  }

  return typeof current === 'string' && current.length > 0
    ? current
    : undefined;
}

/** Calendly widget becomes visible to the user. */
export function trackScheduleWidgetView() {
  gtagCall('event', 'schedule_widget_view', {
    event_category: 'Scheduling',
    event_label: 'calendly_profile_page_viewed',
    provider: 'calendly',
    source: 'schedule_section',
  });
}

/** Calendly event type is opened inside the embed. */
export function trackScheduleEventTypeView() {
  gtagCall('event', 'schedule_event_type_view', {
    event_category: 'Scheduling',
    event_label: 'calendly_event_type_viewed',
    provider: 'calendly',
    source: 'schedule_section',
  });
}

/** User picks a date/time inside the Calendly embed. */
export function trackScheduleDateTimeSelected() {
  gtagCall('event', 'schedule_date_time_selected', {
    event_category: 'Scheduling',
    event_label: 'calendly_date_and_time_selected',
    provider: 'calendly',
    source: 'schedule_section',
  });
}

/** Confirmed scheduling conversion from Calendly. */
export function trackScheduleBooked(payload?: unknown) {
  const scheduledEventName =
    readNestedString(payload, 'event', 'name') ??
    readNestedString(payload, 'event_type', 'name');
  const scheduledEventUri =
    readNestedString(payload, 'event', 'uri') ??
    readNestedString(payload, 'event_type', 'uri');
  const inviteeUri = readNestedString(payload, 'invitee', 'uri');

  gtagCall('event', 'schedule_meeting_booked', {
    event_category: 'Scheduling',
    event_label: scheduledEventName ?? 'calendly_event_scheduled',
    provider: 'calendly',
    source: 'schedule_section',
    ...(scheduledEventName ? { scheduled_event_name: scheduledEventName } : {}),
    ...(scheduledEventUri ? { scheduled_event_uri: scheduledEventUri } : {}),
    ...(inviteeUri ? { invitee_uri: inviteeUri } : {}),
  });

  gtagCall('event', 'generate_lead', {
    currency: 'USD',
    value: 0,
    method: 'calendly',
    source: 'schedule_section',
    ...(scheduledEventName ? { scheduled_event_name: scheduledEventName } : {}),
  });
}

/** A page section enters the viewport. */
export function trackSectionView(sectionId: string, sectionTitle: string) {
  gtagCall('event', 'section_view', {
    event_category: 'Content Engagement',
    event_label: sectionTitle,
    section_id: sectionId,
    section_name: sectionTitle,
  });
}

/** User lingers on a case study long enough to count as a read. */
export function trackCaseStudyRead(title: string) {
  gtagCall('event', 'case_study_read', {
    event_category: 'Content Engagement',
    event_label: title,
    content_type: 'case_study',
    content_id: title,
  });
}

/** Scroll milestone reached. */
export function trackScrollDepth(percent: number) {
  gtagCall('event', 'scroll_depth', {
    event_category: 'Engagement',
    event_label: `${percent}%`,
    scroll_depth_threshold: percent,
    non_interaction: true,
  });
}

/** Time-on-page milestone reached. */
export function trackTimeOnPage(seconds: number) {
  gtagCall('event', 'time_on_page', {
    event_category: 'Engagement',
    event_label: `${seconds}s`,
    seconds_on_page: seconds,
    non_interaction: true,
  });
}

type WebVitalMetric = {
  name: string;
  id: string;
  value: number;
  rating?: 'good' | 'needs-improvement' | 'poor';
  delta?: number;
  navigationType?: string;
};

/** Core Web Vitals and page performance telemetry for GA4. */
export function trackWebVital(metric: WebVitalMetric) {
  const normalizeValue = (value: number) =>
    Math.round(metric.name === 'CLS' ? value * 1000 : value);

  gtagCall('event', 'web_vital', {
    event_category: 'Web Vitals',
    event_label: metric.id,
    metric_name: metric.name,
    metric_id: metric.id,
    metric_rating: metric.rating ?? 'unknown',
    metric_navigation_type: metric.navigationType ?? 'unknown',
    metric_value: normalizeValue(metric.value),
    ...(metric.delta !== undefined
      ? { metric_delta: normalizeValue(metric.delta) }
      : {}),
    value: normalizeValue(metric.value),
    non_interaction: true,
  });
}

/** User switches theme. */
export function trackThemeToggle(newTheme: string) {
  gtagCall('event', 'theme_toggle', {
    event_category: 'UI Preference',
    event_label: newTheme,
    theme: newTheme,
  });
}
