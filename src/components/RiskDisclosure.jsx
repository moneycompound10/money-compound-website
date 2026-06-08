import React from 'react'
import { AlertTriangle } from 'lucide-react'

const VARIANTS = {
  mutualFund: 'Mutual Fund investments are subject to market risks. Read all scheme-related documents carefully before investing. Past performance is not indicative of future returns.',
  equity: 'Equity and direct stock investments are subject to significant market risk and the risk of capital loss. Past performance is not indicative of future returns. Money Compound is not a SEBI-registered Investment Adviser; the content here is for educational purposes only.',
  insurance: 'Insurance is the subject matter of solicitation. Please read the policy wordings, terms and exclusions carefully before concluding a sale. Money Compound facilitates insurance products as a registered intermediary; final issuance is at the discretion of the insurer.',
  loan: 'Loans are facilitated by Money Compound as a referral / DSA partner with regulated NBFCs and banks. Sanction, disbursal and applicable charges remain at the sole discretion of the lender.',
  pms: 'Portfolio Management Services (PMS) are SEBI-regulated products subject to market risk. Minimum ticket size as prescribed by SEBI. Past performance is not indicative of future returns. Investments are made at the investor\'s own risk.',
  aif: 'Alternative Investment Funds (AIF) are SEBI-regulated pooled vehicles with high risk, limited liquidity and minimum ticket as prescribed by SEBI. Past performance is not indicative of future returns.',
  sif: 'Specialised Investment Funds (SIF) are a distinct category notified by SEBI in 2025 with their own risk profile and registration requirements for distributors. Read the offer document carefully before investing.',
  unlisted: 'Unlisted shares are illiquid, high-risk instruments without daily price discovery. Valuations, exit windows and capital protection are not guaranteed. Suitable only for sophisticated investors with surplus risk capital.',
  bond: 'Debt and fixed-income instruments carry credit, interest-rate and liquidity risk. Returns are subject to issuer credit quality. Past performance is not indicative of future returns.',
  general: 'Investments in securities markets are subject to market risks. Read all related documents carefully before investing. Money Compound is an AMFI-registered Mutual Fund Distributor and not a SEBI-registered Investment Adviser; content is for educational purposes only.',
}

export default function RiskDisclosure({ variant = 'general' }) {
  const text = VARIANTS[variant] || VARIANTS.general
  return (
    <div className="w-full bg-amber-50 border-y border-amber-200">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-start gap-3">
        <AlertTriangle className="w-4 h-4 text-amber-700 mt-0.5 flex-shrink-0" />
        <p className="text-[11px] md:text-[12px] font-bold text-amber-900 leading-relaxed">
          <span className="uppercase tracking-widest mr-2">Risk Disclosure:</span>
          {text}
        </p>
      </div>
    </div>
  )
}
