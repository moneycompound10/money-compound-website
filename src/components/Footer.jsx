import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, ArrowUpRight, ShieldCheck, Mail, Phone, AlertTriangle } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'

const FacebookIcon = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
);
const LinkedinIcon = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg>
);
const TwitterIcon = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" /></svg>
);
const InstagramIcon = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const YoutubeIcon = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V7z" />
    <polygon points="10 8 16 12 10 16 10 8" />
  </svg>
);

const REGISTRATIONS = {
  ARN: 'ARN-140318',
  EUIN: 'E238980',
  IRDAI: 'IRDAI POSP - 408483',
  SIF: 'ARN-140318',
}

const socialLinks = [
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/authwall?trk=bf&trkInfo=AQGFNhtU2rRacAAAAZ5O4vvY-HViHMPJpM-juaFWwC_ykbyF5OnAW9qfurOc6tkzawflBq33NqbpghGwf22eJ_uVT3UvlfBinLg4XIiIakiL3L_7SS4S99zMfy9Ge8PxwlrpwOc=&original_referer=&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fcompany%2Fmoneycompound',
    Icon: LinkedinIcon,
    color: 'bg-[#0A66C2]',
  },
  {
    label: 'Twitter',
    href: 'https://x.com/compound_money',
    Icon: TwitterIcon,
    color: 'bg-[#1DA1F2]',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/money_compound/',
    Icon: InstagramIcon,
    color: 'bg-gradient-to-br from-[#F58529] via-[#DD2A7B] to-[#8134AF]',
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@moneycompoundwealth',
    Icon: YoutubeIcon,
    color: 'bg-[#FF0000]',
  },
  {
    label: 'Facebook',
    href: 'https://www.facebook.com/moneycompoundwealth',
    Icon: FacebookIcon,
    color: 'bg-[#1877F2]',
  },
]

const footerLinks = {
  Services: [
    { name: 'Individuals', href: '/services/individuals' },
    { name: 'NRI Investments', href: '/services/nri' },
    { name: 'HNI Investments', href: '/services/hni' },
    { name: 'Retiree Investments', href: '/services/retiree' },
    { name: 'Need-Based Matching', href: '/services/goal' },
    { name: 'Corporate Workshops', href: '/services/corporate' },
    { name: 'Taxation Planning', href: '/services/tax' },
  ],
  Products: [
    { name: 'Mutual Funds', href: '/products/mutual-funds' },
    { name: 'Stock Market', href: '/products/stock-market' },
    { name: 'Health Insurance', href: '/products/health-insurance' },
    { name: 'Life Insurance', href: '/products/life-insurance' },
    { name: 'General Insurance', href: '/products/general-insurance' },
    { name: 'Loans', href: '/products/housing-loan' },
    { name: 'SIFs', href: '/products/sifs' },
    { name: 'Unlisted Shares', href: '/products/unlisted-shares' },
    { name: 'Bonds & FDs', href: '/products/bonds-fds' },
  ],
  Company: [
    { name: 'About Us', href: '/about' },
    { name: 'Our Team', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact Us', href: '/contact-us' },
  ],
  Compliance: [
    { name: 'Grievance Redressal', href: '/grievance-redressal' },
    { name: 'Privacy Policy', href: '/privacy-policy' },
    { name: 'KYC / AML Policy', href: '/kyc-aml' },
    { name: 'FATCA Disclosure', href: '/fatca' },
    { name: 'Cost of Investing', href: '/cost-of-investing' },
    { name: 'Brokerage Declaration', href: '/brokerage-declaration' },
  ]
}

const Footer = () => {
  const router = useRouter();
  const [currentPath, setCurrentPath] = useState('')

  useEffect(() => {
    setCurrentPath(router.pathname)
  }, [router.pathname])

  return (
    <footer
      className="pt-24 pb-12 border-t-2 border-[#0a1733]/15"
      style={{ background: 'linear-gradient(180deg, #ffffff 0%, #eef2f8 100%)' }}
    >
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          {/* Brand Column */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block mb-8">
              <h2 className="text-3xl font-serif font-medium text-[#0a1733] tracking-tight">Money <span className="text-[#0071e3]">Compound</span></h2>
            </Link>
            <p className="text-[#0a1733] text-[14px] leading-relaxed mb-6 max-w-sm font-normal">
              A Noida-based AMFI-registered Mutual Fund Distributor serving Delhi NCR and 1000+ families across 25+ countries with ₹180 Cr+ in investments facilitated (AUA). Founded by Vipul Khandelwal (CA, CS, CFP).
            </p>
            <div className="text-[12px] text-[#0a1733] font-normal mb-8 leading-relaxed tracking-tight">
              {REGISTRATIONS.ARN} · EUIN: {REGISTRATIONS.EUIN}
            </div>
            <div className="flex gap-3 flex-wrap">
              {socialLinks.map(({ href, Icon, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`w-10 h-10 rounded-full ${color} flex items-center justify-center text-white hover:scale-110 hover:shadow-lg transition-all duration-300 shadow-md`}
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-10">
            {Object.entries(footerLinks).map(([title, links]) => (
              <div key={title}>
                <h4 className="text-[13px] font-medium text-[#0071e3] uppercase tracking-[0.18em] mb-6">{title}</h4>
                <ul className="space-y-3.5">
                  {links.map((link) => {
                    const isActive = currentPath === link.href;
                    return (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className={`transition-colors text-[13px] ${isActive
                              ? 'text-[#0071e3] font-medium underline underline-offset-4'
                              : 'text-[#0a1733] hover:text-[#0071e3] font-normal'
                            }`}
                        >
                          {link.name}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Info Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-8 rounded-2xl bg-white border-2 border-[#0a1733]/15 shadow-[0_10px_40px_-10px_rgba(10,23,51,0.15)] mb-12">
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-[#0071e3]/10 flex items-center justify-center flex-shrink-0 border border-[#0071e3]/25">
              <MapPin className="w-5 h-5 text-[#0071e3]" strokeWidth={2.5} />
            </div>
            <div className="text-[13px] text-[#0a1733] font-normal leading-snug">C-107, 1st Floor, Noida One, Sector 62, Noida, UP-201309</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-[#0071e3]/10 flex items-center justify-center flex-shrink-0 border border-[#0071e3]/25">
              <Mail className="w-5 h-5 text-[#0071e3]" strokeWidth={2.5} />
            </div>
            <div className="text-[13px] text-[#0a1733] font-normal">support@moneycompound.com</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-11 h-11 rounded-xl bg-[#0071e3]/10 flex items-center justify-center flex-shrink-0 border border-[#0071e3]/25">
              <Phone className="w-5 h-5 text-[#0071e3]" strokeWidth={2.5} />
            </div>
            <div className="text-[13px] text-[#0a1733] font-normal">+91 84474 96480</div>
          </div>
        </div>

        {/* Risk Warning Strip */}
        <div className="flex items-start gap-3 p-4 mb-8 rounded-xl bg-amber-50 border-2 border-amber-400/60">
          <AlertTriangle className="w-5 h-5 text-amber-800 mt-0.5 flex-shrink-0" strokeWidth={2.5} />
          <p className="text-[13px] font-normal text-[#7c2d12] leading-relaxed">
            Mutual Fund investments are subject to market risks. Read all scheme-related documents carefully before investing. Past performance is not indicative of future results.
          </p>
        </div>

        {/* Detailed Disclaimer & Registrations */}
        <div className="space-y-6">
          <div className="text-[12px] text-[#0a1733] leading-relaxed text-justify space-y-3 font-normal">
            <p>
              <span className="font-medium text-[#0071e3]">Registrations:</span> Money Compound is registered as an AMFI Mutual Fund Distributor ({REGISTRATIONS.ARN}, EUIN: {REGISTRATIONS.EUIN}) and as an IRDAI POSP for insurance distribution ({REGISTRATIONS.IRDAI}). Specialised Investment Fund (SIF) distribution is conducted under {REGISTRATIONS.SIF}, per SEBI Circular dated Feb 27, 2025. Loan, NPS and stock-broker-related products are facilitated through tie-ups with regulated partner entities; partner details and registration numbers are shared at the time of onboarding.
            </p>
            <p>
              <span className="font-medium text-[#0071e3]">Disclaimer:</span> Money Compound is NOT a SEBI-registered Investment Adviser, Research Analyst or Portfolio Manager. We do not provide investment advisory services under the SEBI (Investment Advisers) Regulations, 2013, nor research recommendations under the SEBI (Research Analysts) Regulations, 2014. The content on this website is for general information and educational purposes only and should not be construed as personalised investment advice or a solicitation to buy or sell any security or scheme. Any mutual fund scheme suggestions are made in our capacity as an AMFI-registered Mutual Fund Distributor. Final investment decisions rest entirely with the investor.
            </p>
            <p>
              <span className="font-medium text-[#0071e3]">PMS / AIF — Referral Only:</span> For Portfolio Management Services (PMS) and Alternative Investment Funds (AIF), Money Compound may refer clients to SEBI-registered Portfolio Managers / AIF managers. Money Compound does not distribute, select, or advise on PMS or AIF products, and is <span className="font-normal">not registered with APMI</span>. PMS/AIF onboarding, scheme selection, performance reporting and grievance handling are the responsibility of the SEBI-registered manager.
            </p>
            <p>
              <span className="font-medium text-[#0071e3]">Investments Facilitated (AUA):</span> &quot;₹180 Cr+&quot; represents the aggregate Assets Under Advice/Administration of client investments facilitated by us; we do not manage assets — AMCs do. <span className="font-medium text-[#0071e3]">Past performance</span> of any scheme, AMC or asset class is not indicative of future returns. Mutual Fund, securities, SIF and unlisted-share investments are subject to market and credit risks.
            </p>
            <p>
              <span className="font-medium text-[#0071e3]">Insurance:</span> Insurance is the subject matter of solicitation. Life, health and general insurance products are distributed under IRDAI POSP registration {REGISTRATIONS.IRDAI}. Premium quotes, claim settlement ratios and policy terms are governed by the respective insurance company.
            </p>
            <p>
              <span className="font-medium text-[#0071e3]">Unlisted Shares:</span> Unlisted shares are facilitated on a transaction basis as informational referrals. They are illiquid, high-risk, and unsuitable for most retail investors. Pricing, settlement and ownership transfer are governed by the agreement between buyer, seller and the depositary participant.
            </p>
            <p>
              <span className="font-medium text-[#0071e3]">Grievance Redressal:</span> For any complaint, please contact our Grievance Officer, <span className="font-normal">Vipul Khandelwal</span>, at <a href="mailto:helpdesk@moneycompound.in" className="text-[#0071e3] underline font-normal hover:text-[#1d4ed8]">helpdesk@moneycompound.in</a> or <a href="tel:+918447496480" className="text-[#0071e3] underline font-normal hover:text-[#1d4ed8]">+91 8447496480</a>. We acknowledge complaints within 1 working day and aim to resolve within 21 working days. Unresolved complaints may be escalated via SEBI SCORES (<a href="https://scores.sebi.gov.in" target="_blank" rel="noopener noreferrer" className="text-[#0071e3] underline font-normal hover:text-[#1d4ed8]">scores.sebi.gov.in</a>) or the Smart ODR Portal (<a href="https://smartodr.in" target="_blank" rel="noopener noreferrer" className="text-[#0071e3] underline font-normal hover:text-[#1d4ed8]">smartodr.in</a>). Full details on our <Link href="/grievance-redressal" className="text-[#0071e3] underline font-normal hover:text-[#1d4ed8]">Grievance Redressal</Link> page.
            </p>
            <p>
              <span className="font-medium text-[#0071e3]">Direct vs Regular Plans:</span> We distribute regular plans of mutual fund schemes and earn standard commission from AMCs. Direct plans of the same scheme have a lower expense ratio. Refer to our <Link href="/cost-of-investing" className="text-[#0071e3] underline font-normal hover:text-[#1d4ed8]">Cost of Investing</Link> page for full disclosure.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t-2 border-[#0a1733]/15">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#0071e3]" strokeWidth={2.5} />
                <span className="font-medium text-[13px] text-[#0a1733] uppercase tracking-wider">AMFI Registered</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#0071e3]" strokeWidth={2.5} />
                <span className="font-medium text-[13px] text-[#0a1733] uppercase tracking-wider">Mutual Fund Distributor</span>
              </div>
            </div>
            <div className="text-[12px] text-[#0a1733] font-normal tracking-tight">
              © {new Date().getFullYear()} <span className="text-[#0071e3]">Money Compound</span>. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
