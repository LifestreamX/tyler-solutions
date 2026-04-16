'use client';

import { useReportWebVitals } from 'next/web-vitals';
import { trackWebVital } from '@/lib/analytics';

const reportWebVitals = trackWebVital;

export function WebVitals() {
  useReportWebVitals(reportWebVitals);
  return null;
}
