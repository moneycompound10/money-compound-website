import Head from 'next/head'
import HeroSection from '../components/HeroSection'
import WhyMoneyCompound from '../components/WhyMoneyCompound'
import InvestmentFlow from '../components/InvestmentFlow'
import PartnerLogos from '../components/PartnerLogos'
import IdentitySection from '../components/IdentitySection'
import ServicesGrid from '../components/ServicesGrid'
import AppShowcase from '../components/AppShowcase'
import PremiumTestimonials from '../components/PremiumTestimonials'
import VideoTestimonials from '../components/VideoTestimonials'
import VideoSection from '../components/VideoSection'
import PremiumBlog from '../components/PremiumBlog'
import ResourcesSection from '../components/ResourcesSection'
import FinalCTA from '../components/FinalCTA'

const SITE_URL = 'https://moneycompound.com'

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'FinancialService',
      '@id': `${SITE_URL}/#organization`,
      name: 'Money Compound',
      url: SITE_URL,
      logo: `${SITE_URL}/images/new_logo.png`,
      description: 'AMFI-registered Mutual Fund Distributor (ARN-140318) and IRDAI POSP (408483) serving Individuals, NRIs, HNIs and retirees with need-aligned mutual fund distribution, insurance distribution and retirement planning. PMS/AIF interest is handled on a referral-only basis to SEBI-registered managers.',
      telephone: '+91-84474-96480',
      email: 'helpdesk@moneycompound.com',
      areaServed: ['IN', 'US', 'GB', 'AE', 'SG', 'CA', 'AU'],
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'C-107, 1st Floor, Noida One, Sector 62',
        addressLocality: 'Noida',
        addressRegion: 'Uttar Pradesh',
        postalCode: '201309',
        addressCountry: 'IN'
      },
      sameAs: [
        'https://www.youtube.com/@moneycompoundwealth'
      ]
    },
    {
      '@type': 'LocalBusiness',
      '@id': `${SITE_URL}/#localbusiness`,
      name: 'Money Compound — Noida Office',
      image: `${SITE_URL}/images/new_logo.png`,
      url: SITE_URL,
      telephone: '+91-84474-96480',
      priceRange: 'Zero distributor fee (commission from AMC)',
      address: {
        '@type': 'PostalAddress',
        streetAddress: 'C-107, 1st Floor, Noida One, Sector 62',
        addressLocality: 'Noida',
        addressRegion: 'Uttar Pradesh',
        postalCode: '201309',
        addressCountry: 'IN'
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: 28.6260,
        longitude: 77.3725
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
          opens: '10:00',
          closes: '19:00'
        }
      ]
    }
  ]
}

export default function Home() {
  const title = 'Money Compound — AMFI Registered Mutual Fund Distributor for Individuals, NRIs, HNIs & Retirees | Noida'
  const description = 'AMFI-registered mutual fund distribution and need-based mutual fund selection for Individuals, NRIs, HNIs and retirees. CA, CS, CFP-qualified team. Zero hidden charges. Based in Noida, serving 25+ countries.'

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={SITE_URL} />
        <meta name="robots" content="index,follow,max-image-preview:large" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="Money Compound" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={SITE_URL} />
        <meta property="og:image" content={`${SITE_URL}/og-card.jpg`} />
        <meta property="og:image:secure_url" content={`${SITE_URL}/og-card.jpg`} />
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Money Compound — AMFI Registered Mutual Fund Distributor" />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@compound_money" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={`${SITE_URL}/og-card.jpg`} />
        <meta name="twitter:image:alt" content="Money Compound — AMFI Registered Mutual Fund Distributor" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </Head>

      <HeroSection />
      <WhyMoneyCompound />
      <InvestmentFlow />
      <PartnerLogos />
      <IdentitySection />
      <ServicesGrid />
      <AppShowcase />
      <PremiumTestimonials />
      <VideoTestimonials />
      <VideoSection />
      <PremiumBlog />
      <ResourcesSection />
      <FinalCTA />
    </>
  )
}

