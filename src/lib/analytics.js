// Lightweight analytics dispatcher.
// Forwards every event to GA4 (gtag), Meta Pixel (fbq), LinkedIn Insight (lintrk)
// and Microsoft Clarity (clarity) when those tags are present on the page.
// Each call is a no-op when the corresponding tag is not loaded.

const isClient = () => typeof window !== 'undefined';

export function track(eventName, params = {}) {
  if (!isClient()) return;

  // Google Analytics 4 (gtag)
  if (typeof window.gtag === 'function') {
    try { window.gtag('event', eventName, params); } catch (_) {}
  }

  // Meta Pixel
  if (typeof window.fbq === 'function') {
    try { window.fbq('trackCustom', eventName, params); } catch (_) {}
  }

  // LinkedIn Insight
  if (typeof window.lintrk === 'function') {
    try { window.lintrk('track', { conversion_id: params?.linkedinConversionId }); } catch (_) {}
  }

  // Microsoft Clarity
  if (typeof window.clarity === 'function') {
    try { window.clarity('event', eventName); } catch (_) {}
  }

  // Always push to dataLayer for GTM-based setups
  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: eventName, ...params });
  }
}

export const EVENTS = {
  GENERATE_LEAD: 'generate_lead',
  EBOOK_DOWNLOAD: 'ebook_download',
  CALCULATOR_COMPLETE: 'calculator_complete',
  NEWSLETTER_SIGNUP: 'newsletter_signup',
  BOOKING_CLICK: 'booking_click',
  WHATSAPP_CLICK: 'whatsapp_click',
};
