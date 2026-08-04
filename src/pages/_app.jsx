import { useEffect } from "react";
import { useRouter } from "next/router";
import gsap from "gsap";
import "../globals.css";
import "../lib/gsap";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Layout from "../components/Layout";
import Head from "next/head";
import Script from "next/script";
import SocialSlider from "../components/SocialSlider";
import RiskDisclosure from "../components/RiskDisclosure";

function pickRiskVariant(path) {
  if (!path) return null
  if (path.startsWith('/products/mutual-funds')) return 'mutualFund'
  if (path.startsWith('/products/stock-market')) return 'equity'
  if (path.startsWith('/products/health-insurance') || path.startsWith('/products/life-insurance') || path.startsWith('/products/general-insurance') || path.startsWith('/products/travel-insurance')) return 'insurance'
  if (path.startsWith('/products/housing-loan')) return 'loan'
  if (path.startsWith('/products/pms')) return 'pms'
  if (path.startsWith('/products/aif')) return 'aif'
  if (path.startsWith('/products/sifs')) return 'sif'
  if (path.startsWith('/products/unlisted-shares')) return 'unlisted'
  if (path.startsWith('/products/bonds-fds') || path.startsWith('/products/corporate-fd') || path.startsWith('/products/capital-gain-bond') || path.startsWith('/products/nps') || path.startsWith('/products/p2p-lending')) return 'bond'
  if (path.startsWith('/products/')) return 'general'
  if (path.startsWith('/services/')) return 'general'
  return null
}

export default function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const riskVariant = pickRiskVariant(router.pathname)
  const isAdminRoute = router.pathname.startsWith('/admin')

  useEffect(() => {
    // Keep track of which buttons are currently pulled
    const pulledButtons = new Set();

    const handleMouseMove = (e) => {
      const buttons = document.querySelectorAll('button, .cta-button');

      buttons.forEach(btn => {
        const rect = btn.getBoundingClientRect();
        const btnCenter = {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2
        };

        const dx = e.clientX - btnCenter.x;
        const dy = e.clientY - btnCenter.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          pulledButtons.add(btn);
          const pull = (120 - dist) / 120;
          gsap.to(btn, {
            x: dx * pull * 0.4,
            y: dy * pull * 0.4,
            duration: 0.3,
            ease: "power2.out",
            overwrite: "auto"
          });
        } else {
          if (pulledButtons.has(btn)) {
            gsap.to(btn, {
              x: 0,
              y: 0,
              duration: 0.3,
              ease: "power2.out",
              clearProps: "x,y",
              overwrite: "auto"
            });
            pulledButtons.delete(btn);
          }
        }
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <>
      <Head>
        {/* ───── Primary tags ───── */}
        <title>Money Compound — AMFI Registered Mutual Fund Distributor | Noida</title>
        <meta name="description" content="AMFI Registered Mutual Fund Distributor in Noida serving 1000+ families & NRIs across 25+ countries. Need-based mutual fund selection, SIPs, NRI investing, insurance distribution (IRDAI POSP) & retirement planning, led by CA, CS, CFP-qualified professionals. 18+ years of experience, ₹180 Cr+ AUA, zero hidden fees." />
        <meta name="keywords" content="mutual fund distributor Noida, AMFI registered MFD, mutual fund SIP Noida, NRI investment India, need-based mutual fund selection, retirement planning India, financial planner Noida, CFP qualified, ELSS tax saving, NRE NRO FCNR account, DTAA NRI tax, IRDAI POSP insurance distributor, Money Compound" />
        <meta name="author" content="Money Compound" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
        <meta name="googlebot" content="index, follow" />
        <link rel="canonical" href="https://moneycompound.com" />
        <meta name="theme-color" content="#0A1A2F" />

        {/* ───── Geo / Local SEO (Noida One, Sector 62, Noida) ───── */}
        <meta name="geo.region" content="IN-UP" />
        <meta name="geo.placename" content="Noida, Uttar Pradesh" />
        <meta name="geo.position" content="28.6276;77.3719" />
        <meta name="ICBM" content="28.6276, 77.3719" />

        {/* ───── Open Graph (WhatsApp / Facebook / LinkedIn preview) ───── */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Money Compound" />
        <meta property="og:title" content="Money Compound — AMFI Registered Mutual Fund Distributor | Need-Based Selection for Individuals, NRIs & HNIs" />
        <meta property="og:description" content="Noida-based AMFI-registered MFD serving 1000+ families & NRIs across 25+ countries. Mutual funds, SIPs, NRI investing, insurance distribution (IRDAI POSP) & retirement planning. 18+ years experience, ₹180 Cr+ AUA, zero hidden fees." />
        <meta property="og:url" content="https://moneycompound.com" />
        <meta property="og:image" content="https://moneycompound.com/og-card.jpg" key="og:image" />
        <meta property="og:image:secure_url" content="https://moneycompound.com/og-card.jpg" key="og:image:secure_url" />
        <meta property="og:image:type" content="image/jpeg" key="og:image:type" />
        <meta property="og:image:width" content="1200" key="og:image:width" />
        <meta property="og:image:height" content="630" key="og:image:height" />
        <meta property="og:image:alt" content="Money Compound — Grow Financially Strong" key="og:image:alt" />
        <meta property="og:locale" content="en_IN" key="og:locale" />

        {/* ───── Twitter Card ───── */}
        <meta name="twitter:card" content="summary_large_image" key="twitter:card" />
        <meta name="twitter:site" content="@compound_money" key="twitter:site" />
        <meta name="twitter:creator" content="@compound_money" key="twitter:creator" />
        <meta name="twitter:title" content="Money Compound — AMFI Registered Mutual Fund Distributor" key="twitter:title" />
        <meta name="twitter:description" content="Need-based mutual fund selection, NRI investing, insurance distribution (IRDAI POSP) & retirement planning. 1000+ families served, ₹180 Cr+ AUA, 18+ years of experience." key="twitter:description" />
        <meta name="twitter:image" content="https://moneycompound.com/og-card.jpg" key="twitter:image" />
        <meta name="twitter:image:alt" content="Money Compound — Grow Financially Strong" key="twitter:image:alt" />

        {/* ───── Favicon + Apple touch ───── */}
        <link rel="icon" href="/images/logo.png" />
        <link rel="apple-touch-icon" href="/images/logo.png" />

        {/* ───── JSON-LD: FinancialService + Organization for Google rich results ───── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FinancialService',
              '@id': 'https://moneycompound.com/#organization',
              name: 'Money Compound',
              alternateName: 'Money Compound — AMFI Registered MFD',
              description: 'AMFI Registered Mutual Fund Distributor based in Noida, serving 1000+ families and NRIs across 25+ countries with need-based mutual fund selection, SIPs, NRI investing, insurance distribution (IRDAI POSP) and retirement planning.',
              url: 'https://moneycompound.com',
              logo: 'https://moneycompound.com/images/new_logo.png',
              image: 'https://moneycompound.com/og-cover.jpg',
              telephone: '+91-8447496480',
              email: 'support@moneycompound.com',
              priceRange: '₹₹',
              foundingDate: '2018',
              founder: { '@type': 'Person', name: 'Vipul Khandelwal' },
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'C-107, Noida One, Sector 62',
                addressLocality: 'Noida',
                addressRegion: 'Uttar Pradesh',
                postalCode: '201301',
                addressCountry: 'IN'
              },
              geo: {
                '@type': 'GeoCoordinates',
                latitude: 28.6276,
                longitude: 77.3719
              },
              hasMap: 'https://maps.google.com/?q=Noida+One+Sector+62+Noida',
              areaServed: [
                { '@type': 'Country', name: 'India' },
                { '@type': 'Place', name: 'NRI Investors — UAE, Gulf & MEA' }
              ],
              identifier: 'ARN-140318',
              sameAs: [
                'https://www.linkedin.com/company/moneycompound',
                'https://x.com/compound_money',
                'https://www.instagram.com/money_compound/',
                'https://www.youtube.com/@moneycompoundwealth',
                'https://www.facebook.com/moneycompoundwealth'
              ],
              hasOfferCatalog: {
                '@type': 'OfferCatalog',
                name: 'Investment & Financial Services',
                itemListElement: [
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Mutual Fund Distribution & SIP Planning (AMFI ARN-140318)' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'NRI Mutual Fund Onboarding (NRE, NRO, FCNR support)' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Retirement & Need-Based Mutual Fund Selection' } },
                  { '@type': 'Offer', itemOffered: { '@type': 'Service', name: 'Life, Health & General Insurance Distribution (IRDAI POSP 408483)' } }
                ]
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                reviewCount: '1000',
                bestRating: '5'
              }
            })
          }}
        />

        {/* ───── JSON-LD: WebSite (sitelink search-box opportunity) ───── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              '@id': 'https://moneycompound.com/#website',
              url: 'https://moneycompound.com',
              name: 'Money Compound',
              publisher: { '@id': 'https://moneycompound.com/#organization' },
              inLanguage: 'en-IN'
            })
          }}
        />

        {/* ───── JSON-LD: Person (founder — E-E-A-T signal for AI) ───── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              '@id': 'https://moneycompound.com/#vipul-khandelwal',
              name: 'Vipul Khandelwal',
              jobTitle: 'Founder & CEO',
              worksFor: { '@id': 'https://moneycompound.com/#organization' },
              description: 'CA, CS and CFP-qualified financial professional with 18+ years of experience. Founder of Money Compound (Noida). Specialises in need-based mutual fund selection, NRI investing and HNI advisory.',
              hasCredential: [
                { '@type': 'EducationalOccupationalCredential', name: 'Chartered Accountant (CA)' },
                { '@type': 'EducationalOccupationalCredential', name: 'Company Secretary (CS)' },
                { '@type': 'EducationalOccupationalCredential', name: 'Certified Financial Planner (CFP)' },
                { '@type': 'EducationalOccupationalCredential', name: 'AMFI Mutual Fund Distributor — ARN 140318' },
                { '@type': 'EducationalOccupationalCredential', name: 'NISM Series XVII — Retirement Adviser' }
              ],
              knowsAbout: ['Mutual Fund Distribution', 'NRI Investing', 'Need-Based Mutual Fund Selection', 'Retirement Planning', 'Insurance Distribution (IRDAI POSP)'],
              url: 'https://moneycompound.com/about',
              sameAs: [
                'https://www.linkedin.com/company/moneycompound'
              ]
            })
          }}
        />

        {/* ───── JSON-LD: FAQ (powers Google AI Overviews + ChatGPT answers) ───── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'Who is the best AMFI registered mutual fund distributor in Noida?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Money Compound (ARN-140318) is a Noida-based AMFI Registered Mutual Fund Distributor founded in 2018 by Vipul Khandelwal (CA, CS, CFP). The firm has served 1,000+ families and NRIs across 25+ countries, with ₹180 Cr+ in investments facilitated, 18+ years of experience and zero hidden fees. It specialises in need-based mutual fund selection, NRI investing and HNI advisory.'
                  }
                },
                {
                  '@type': 'Question',
                  name: 'Which financial advisor should NRIs in the UAE and Gulf use to invest in India?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Money Compound has a dedicated NRI desk for the UAE, Saudi Arabia, Qatar, Oman, Kuwait and Bahrain. It handles NRE / NRO / FCNR account setup, DTAA tax filing, GIFT City investments, repatriation and need-based mutual fund investing for Gulf and MEA-based NRIs. ARN-140318. Founder Vipul Khandelwal is CA, CS, CFP-qualified.'
                  }
                },
                {
                  '@type': 'Question',
                  name: 'Is Money Compound a SEBI / AMFI registered mutual fund distributor?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes. Money Compound is AMFI-registered as a Mutual Fund Distributor under ARN-140318, and the team has cleared multiple NISM specialisation modules including Series XVII (Retirement Adviser), Series V-C (PMS), Series VIII (Equity Derivatives) and others. Insurance is distributed under IRDAI POSP registration 408483. Money Compound is not a SEBI-registered Investment Adviser, Research Analyst or Portfolio Manager.'
                  }
                },
                {
                  '@type': 'Question',
                  name: 'How much does Money Compound charge for mutual fund distribution?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Money Compound does not charge investors any direct distribution fee. As an AMFI-registered Mutual Fund Distributor, compensation comes from the AMC as trail commission, fully disclosed under SEBI / AMFI norms. There are zero hidden charges and no upfront fees from the investor.'
                  }
                },
                {
                  '@type': 'Question',
                  name: 'What services does Money Compound offer?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Money Compound offers need-based mutual fund distribution & SIPs, NRI investment facilitation (NRE/NRO/FCNR account onboarding support, DTAA guidance, repatriation, GIFT City scheme information), retirement & financial-independence planning through mutual funds, tax-smart investing through ELSS and debt schemes, life/health/general insurance distribution under IRDAI POSP, and estate-planning coordination via partner professionals. For PMS/AIF, interested HNI clients are referred to SEBI-registered Portfolio Managers / AIF managers — Money Compound does not distribute or advise on PMS/AIF.'
                  }
                },
                {
                  '@type': 'Question',
                  name: 'How do I contact Money Compound?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Phone / WhatsApp: +91-8447496480. Email: support@moneycompound.com. Website: https://moneycompound.com. Office: C-107, Noida One, Sector 62, Noida 201309, Uttar Pradesh, India. Free 30-minute goal review available — no fees, no obligation.'
                  }
                }
              ]
            })
          }}
        />

        {/* Floating widgets — both Zoho Desk ASAP (help) and Zoho SalesIQ
            (chat) should be the same compact 56×56 button size, on every
            screen including mobile. Zoho ships them at different default
            sizes; this CSS normalises both. */}
        <style>{`
          /* Zoho Desk ASAP — anchor bottom-right */
          #zohohc-asap-web-launcherbox,
          #zohohc-asap-web-launcher,
          .zohohc-asap-web-launcherbox,
          #zohohc-asap-web-launcherbox iframe {
            bottom: 24px !important;
            right: 24px !important;
            left: auto !important;
            top: auto !important;
            z-index: 99 !important;
            width: 56px !important;
            height: 56px !important;
          }

          /* Zoho SalesIQ floating chat button — shrink to match Desk size.
             Zoho uses different IDs across builds, so we cover all known ones. */
          #zsiq_float,
          #zsiq_byline,
          .zsiq_floatmain,
          .zsiq_flt_rel,
          .siq_bR,
          .siqembed-floating-icon,
          .zsiq-floatmain {
            width: 56px !important;
            height: 56px !important;
            min-width: 56px !important;
            min-height: 56px !important;
            max-width: 56px !important;
            max-height: 56px !important;
            border-radius: 50% !important;
            overflow: hidden !important;
          }
          #zsiq_float img,
          #zsiq_byline img,
          .zsiq_floatmain img,
          .siqembed-floating-icon img {
            width: 56px !important;
            height: 56px !important;
            object-fit: cover !important;
            border-radius: 50% !important;
          }

          /* Mobile — Zoho sometimes upscales on small viewports; lock it. */
          @media (max-width: 768px) {
            #zohohc-asap-web-launcherbox,
            #zohohc-asap-web-launcher,
            .zohohc-asap-web-launcherbox,
            #zohohc-asap-web-launcherbox iframe,
            #zsiq_float,
            .zsiq_floatmain,
            .zsiq_flt_rel,
            .siq_bR,
            .siqembed-floating-icon {
              width: 56px !important;
              height: 56px !important;
            }
          }
        `}</style>
      </Head>

      {/* Zoho Desk ASAP — global help / support launcher on every page,
          stacked above the WhatsApp floating button. Loaded after the
          page is interactive so it never blocks LCP. */}
      <Script
        id="zohodeskasap"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `var d=document;s=d.createElement("script"),s.type="text/javascript",s.id="zohodeskasapscript",s.defer=!0,s.src="https://desk.zoho.in/portal/api/web/asapApp/49147000004318009?orgId=60009997307",t=d.getElementsByTagName("script")[0],t.parentNode.insertBefore(s,t),window.ZohoDeskAsapReady=function(s){var e=window.ZohoDeskAsap__asyncalls=window.ZohoDeskAsap__asyncalls||[];window.ZohoDeskAsapReadyStatus?(s&&e.push(s),e.forEach(s=>s&&s()),window.ZohoDeskAsap__asyncalls=null):s&&e.push(s)};`
        }}
      />

      <Script id="zoho-salesiq-init" strategy="afterInteractive">
        {`window.$zoho = window.$zoho || {};
window.$zoho.salesiq = window.$zoho.salesiq || { ready: function() {} };

// Disable proactive triggers + minimize the chat ONCE when the API is ready.
// We don't keep calling chat.close() — that would block user-initiated opens.
function setupZohoQuiet() {
  const api = window.$zoho && window.$zoho.salesiq;
  if (!api) return false;

  // Disable proactive auto-open triggers
  try { api.chat && api.chat.proactive && typeof api.chat.proactive.set === 'function' && api.chat.proactive.set(false); } catch (e) {}
  try { api.proactivechat && typeof api.proactivechat.disable === 'function' && api.proactivechat.disable(); } catch (e) {}

  // Close any chat that auto-opened from the initial load
  try { api.chat && typeof api.chat.close === 'function' && api.chat.close(); } catch (e) {}

  // Minimize float window (user can still click the button to open)
  const fw = api.floatwindow || api.floatingwindow || api.floatWindow || api.floatingWindow;
  if (fw) {
    try { typeof fw.minimize === 'function' && fw.minimize(); } catch (e) {}
  }

  return true;
}

const originalSalesiqReady = window.$zoho.salesiq.ready;
window.$zoho.salesiq.ready = function() {
  if (typeof originalSalesiqReady === 'function') {
    try { originalSalesiqReady(); } catch (e) { console.warn(e); }
  }
  setupZohoQuiet();
};

// Retry until the API is available, then stop. No more blanket hiding after that.
let zohoSetupTries = 0;
const zohoSetupInterval = window.setInterval(() => {
  zohoSetupTries++;
  if (setupZohoQuiet() || zohoSetupTries > 40) {
    window.clearInterval(zohoSetupInterval);
  }
}, 250);`}
      </Script>
      <Script
        id="zsiqscript"
        strategy="afterInteractive"
        src="https://salesiq.zohopublic.in/widget?wc=siq9f911d3fa193998dd66a64c1b08a9fac0d784697b1a5dccf28cfbb3b8b553451"
        onLoad={() => {
          const setupZohoQuiet = () => {
            try {
              const api = window.$zoho && window.$zoho.salesiq;
              if (!api) return false;
              try { api.chat && api.chat.proactive && typeof api.chat.proactive.set === 'function' && api.chat.proactive.set(false); } catch (e) { }
              try { api.proactivechat && typeof api.proactivechat.disable === 'function' && api.proactivechat.disable(); } catch (e) { }
              try { api.chat && typeof api.chat.close === 'function' && api.chat.close(); } catch (e) { }
              const fw = api.floatwindow || api.floatingwindow || api.floatWindow || api.floatingWindow;
              if (fw && typeof fw.minimize === 'function') {
                try { fw.minimize(); } catch (e) { }
              }
              return true;
            } catch (error) {
              console.warn('Zoho SalesIQ setup failed', error);
              return false;
            }
          };

          let tries = 0;
          const interval = window.setInterval(() => {
            tries++;
            if (setupZohoQuiet() || tries > 40) {
              window.clearInterval(interval);
            }
          }, 250);
        }}
      />
      {!isAdminRoute && <Navbar />}
      {!isAdminRoute && <SocialSlider />}
      <Layout>
        <main className="min-h-screen">
          <Component {...pageProps} />
        </main>
      </Layout>
      {!isAdminRoute && riskVariant && <RiskDisclosure variant={riskVariant} />}
      {!isAdminRoute && <Footer />}
    </>
  );
}
