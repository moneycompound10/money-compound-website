import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import gsap from 'gsap';
import { Send, ShieldCheck } from 'lucide-react';

// Manual SplitText implementation for characters
const SplitTextCharacters = ({ text, className }) => {
  return (
    <span className={className}>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className="char-reveal inline-block whitespace-pre"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {char}
        </span>
      ))}
    </span>
  );
};

// ─── Helpers ───────────────────────────────────────────────────────────────
const fmt = (n) => {
  if (!isFinite(n) || isNaN(n)) return '—';
  const neg = n < 0;
  const abs = Math.abs(n);
  if (abs >= 1e7) return `${neg ? '-' : ''}₹${(abs / 1e7).toFixed(2)} Cr`;
  if (abs >= 1e5) return `${neg ? '-' : ''}₹${(abs / 1e5).toFixed(2)} L`;
  return `${neg ? '-' : ''}₹${Math.round(abs).toLocaleString('en-IN')}`;
};
const fmtPlain = (n) =>
  isFinite(n) && !isNaN(n) ? `₹${Math.round(n).toLocaleString('en-IN')}` : '—';

// Effective monthly rate from an annual % — compounded (i = (1+r)^(1/12) − 1)
const monthlyRate = (annualPct) => Math.pow(1 + annualPct / 100, 1 / 12) - 1;

// Future value of monthly SIP (contributions at end of month, annuity-due variant)
const sipFV = (monthly, annualPct, months) => {
  if (months <= 0) return 0;
  const i = monthlyRate(annualPct);
  if (i === 0) return monthly * months;
  return monthly * ((Math.pow(1 + i, months) - 1) / i) * (1 + i);
};

// Donut chart colours
const DONUT_INVESTED = '#3B82F6';
const DONUT_RETURNS = '#22C55E';
function Donut({ invested, gained }) {
  const safeInvested = Math.max(invested, 0);
  const safeGained = Math.max(gained, 0);
  const total = safeInvested + safeGained;
  const radius = 56;
  const C = 2 * Math.PI * radius;
  const investedDash = total > 0 ? (safeInvested / total) * C : 0;
  return (
    <div className="relative flex items-center justify-center my-6">
      <svg width="160" height="160" viewBox="0 0 160 160" className="-rotate-90">
        <circle cx="80" cy="80" r={radius} fill="none" strokeWidth="18" stroke={DONUT_RETURNS} />
        <circle
          cx="80" cy="80" r={radius}
          fill="none" strokeWidth="18" stroke={DONUT_INVESTED}
          strokeDasharray={`${investedDash} ${C}`}
        />
      </svg>
    </div>
  );
}

// ─── Slider Component ───────────────────────────────────────────────────────
function Slider({ label, value, min, max, step, onChange, display, disabled }) {
  const clampedMin = min;
  const clampedMax = Math.max(max, min + step);
  const pct = ((value - clampedMin) / (clampedMax - clampedMin)) * 100;
  const safePct = Math.max(0, Math.min(100, pct));
  return (
    <div className={`mb-7 ${disabled ? 'opacity-50 pointer-events-none' : ''}`}>
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-semibold text-slate-700">{label}</span>
        <span className="text-xs font-black text-brand-navy bg-brand-gold/10 border border-brand-gold/30 px-3 py-1 rounded-full">
          {display}
        </span>
      </div>
      <div className="relative h-2 bg-slate-200 rounded-full">
        <div
          className="absolute top-0 left-0 h-2 bg-gradient-to-r from-brand-navy to-brand-gold rounded-full"
          style={{ width: `${safePct}%` }}
        />
        <input
          type="range" min={clampedMin} max={clampedMax} step={step} value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          disabled={disabled}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-brand-gold border-2 border-white rounded-full shadow-md pointer-events-none"
          style={{ left: `calc(${safePct}% - 8px)` }}
        />
      </div>
    </div>
  );
}

// ─── Result Row ─────────────────────────────────────────────────────────────
function ResultRow({ label, value, dot }) {
  return (
    <div className="flex justify-between items-center py-3 border-b border-white/10 last:border-0">
      <span className="text-white/70 text-sm font-medium flex items-center gap-2">
        {dot && <span className="w-2.5 h-2.5 rounded-full" style={{ background: dot }} />}
        {label}
      </span>
      <span className="text-white font-bold text-sm">{value}</span>
    </div>
  );
}

// ─── Shared Layout ──────────────────────────────────────────────────────────
function CalcLayout({
  title, desc,
  result, resultLabel, ctaText,
  invested = 0, gained = 0,
  multiplier, extra,
  hideDonut = false,
  rows = null,
  children,
}) {
  let renderRows;
  if (rows) {
    renderRows = rows;
  } else {
    renderRows = [
      { label: 'Invested amount', value: fmtPlain(invested), dot: DONUT_INVESTED },
      { label: 'Est. returns', value: fmtPlain(gained), dot: DONUT_RETURNS },
      { label: 'Total value', value: fmtPlain(invested + gained) },
    ];
    if (multiplier) renderRows.push({ label: 'Multiplier', value: `${multiplier}×` });
    if (extra) renderRows.push({ label: 'Insight', value: extra });
  }

  return (
    <div className="grid lg:grid-cols-2 gap-0 rounded-3xl overflow-hidden border border-slate-200 shadow-xl">
      {/* Inputs */}
      <div className="bg-white p-8 lg:p-10 max-h-[720px] overflow-y-auto">
        <h3 className="text-xl font-black text-brand-navy mb-1 font-serif">{title}</h3>
        <p className="text-slate-500 text-sm mb-8">{desc}</p>
        {children}
      </div>
      {/* Results */}
      <div className="bg-brand-navy p-8 lg:p-10 flex flex-col justify-between">
        <div>
          <p className="text-white text-xs font-black uppercase tracking-widest mb-2">{resultLabel}</p>
          <p className="text-4xl font-black text-white mb-2 leading-none">{fmt(result)}</p>
          {!hideDonut ? <Donut invested={invested} gained={gained} /> : <div className="my-6" />}
          <div className="space-y-1 mb-6">
            {renderRows.map((row, i) => (
              <ResultRow key={i} label={row.label} value={row.value} dot={row.dot} />
            ))}
          </div>
        </div>
        <Link href="/contact-us" className="block w-full py-4 bg-brand-gold text-white text-center font-black text-sm rounded-2xl hover:brightness-110 transition-all shadow-lg mt-4">
          {ctaText} →
        </Link>
      </div>
    </div>
  );
}

// ─── Goal math helper (used by Education/Wedding/Car/Vacation) ─────────────
function goalMath({ years, currentCost, inflation, existing, returnExisting, returnNew }) {
  const futureCost = currentCost * Math.pow(1 + inflation / 100, years);
  const existingGrowth = existing * Math.pow(1 + returnExisting / 100, years);
  const gap = Math.max(futureCost - existingGrowth, 0);
  const i = monthlyRate(returnNew);
  const n = years * 12;
  const sipNeeded = gap > 0 && n > 0
    ? (gap * i) / ((Math.pow(1 + i, n) - 1) * (1 + i))
    : 0;
  return { futureCost, existingGrowth, gap, sipNeeded };
}

// ════════════════════════ CALCULATORS ══════════════════════════════════════

// 1. SIP (with optional delay)
function SIPCalc() {
  const [monthly, setMonthly] = useState(25000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);
  const [delay, setDelay] = useState(0);
  const totalMonths = years * 12;
  const activeMonths = Math.max(totalMonths - delay, 0);
  const fv = sipFV(monthly, rate, activeMonths);
  const invested = monthly * activeMonths;
  const gained = fv - invested;
  return (
    <CalcLayout
      title="SIP Calculator"
      desc="Estimate the future value of your monthly SIP investments."
      result={fv} invested={invested} gained={gained}
      multiplier={invested > 0 ? (fv / invested).toFixed(2) : null}
      resultLabel="Total Value" ctaText="Start My SIP"
      extra={delay > 0 ? `Effective: ${activeMonths} mo` : null}
    >
      <Slider label="Monthly Investment Amount" value={monthly} min={500} max={200000} step={500} onChange={setMonthly} display={fmtPlain(monthly)} />
      <Slider label="Expected Return p.a." value={rate} min={1} max={30} step={0.1} onChange={setRate} display={`${rate}%`} />
      <Slider label="No. of Years" value={years} min={1} max={40} step={1} onChange={setYears} display={`${years} Yr`} />
      <Slider label="Delay in Starting (Months)" value={delay} min={0} max={120} step={1} onChange={setDelay} display={`${delay} mo`} />
      <p className="text-[11px] text-slate-400 mt-2">Monthly rate derived from annual return: i = (1 + r)^(1/12) − 1.</p>
    </CalcLayout>
  );
}

// 2. Lumpsum
function LumpsumCalc() {
  const [amount, setAmount] = useState(500000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);
  const fv = amount * Math.pow(1 + rate / 100, years);
  const gained = fv - amount;
  return (
    <CalcLayout
      title="Lumpsum Calculator"
      desc="Calculate returns on a one-time investment."
      result={fv} invested={amount} gained={gained}
      multiplier={(fv / amount).toFixed(2)}
      resultLabel="Maturity Value" ctaText="Invest Now"
    >
      <Slider label="Investment Amount" value={amount} min={10000} max={20000000} step={10000} onChange={setAmount} display={fmt(amount)} />
      <Slider label="Expected Return p.a." value={rate} min={1} max={30} step={0.1} onChange={setRate} display={`${rate}%`} />
      <Slider label="No. of Years" value={years} min={1} max={40} step={1} onChange={setYears} display={`${years} Yr`} />
    </CalcLayout>
  );
}

// 3. SIP Topup (annual step-up)
function SIPTopUpCalc() {
  const [monthly, setMonthly] = useState(10000);
  const [rate, setRate] = useState(12);
  const [topup, setTopup] = useState(10);
  const [years, setYears] = useState(15);
  let fv = 0, invested = 0, sip = monthly;
  const r = monthlyRate(rate);
  for (let y = 0; y < years; y++) {
    for (let m = 0; m < 12; m++) {
      fv = (fv + sip) * (1 + r);
    }
    invested += sip * 12;
    sip *= 1 + topup / 100;
  }
  const gained = fv - invested;
  return (
    <CalcLayout
      title="SIP Topup Calculator"
      desc="Model an SIP that steps up by a fixed % every year."
      result={fv} invested={invested} gained={gained}
      multiplier={invested > 0 ? (fv / invested).toFixed(2) : null}
      resultLabel="Projected Corpus" ctaText="Start Topup SIP"
    >
      <Slider label="Initial Monthly SIP" value={monthly} min={500} max={100000} step={500} onChange={setMonthly} display={fmtPlain(monthly)} />
      <Slider label="Yearly Topup %" value={topup} min={1} max={50} step={1} onChange={setTopup} display={`${topup}%`} />
      <Slider label="Expected Return p.a." value={rate} min={1} max={30} step={0.1} onChange={setRate} display={`${rate}%`} />
      <Slider label="No. of Years" value={years} min={1} max={40} step={1} onChange={setYears} display={`${years} Yr`} />
    </CalcLayout>
  );
}

// 4. Limited Period SIP
function LimitedPeriodSIPCalc() {
  const [monthly, setMonthly] = useState(10000);
  const [limited, setLimited] = useState(5);
  const [horizon, setHorizon] = useState(15);
  const [rate, setRate] = useState(12);
  const safeLimited = Math.min(limited, horizon);
  const phase1Months = safeLimited * 12;
  const fvLimited = sipFV(monthly, rate, phase1Months);
  const remainYears = Math.max(horizon - safeLimited, 0);
  const fvFinal = fvLimited * Math.pow(1 + rate / 100, remainYears);
  const invested = monthly * phase1Months;
  const gained = fvFinal - invested;
  return (
    <CalcLayout
      title="Limited Period SIP Calculator"
      desc="Invest monthly for a few years; let the corpus compound till horizon."
      result={fvFinal} invested={invested} gained={gained}
      multiplier={invested > 0 ? (fvFinal / invested).toFixed(2) : null}
      resultLabel="Final Corpus" ctaText="Plan This SIP"
      extra={`At end of SIP: ${fmt(fvLimited)}`}
    >
      <Slider label="Monthly Investment" value={monthly} min={500} max={200000} step={500} onChange={setMonthly} display={fmtPlain(monthly)} />
      <Slider label="Limited Investment Term (Years)" value={limited} min={1} max={30} step={1} onChange={setLimited} display={`${limited} Yr`} />
      <Slider label="Total Investment Horizon (Years)" value={horizon} min={1} max={40} step={1} onChange={setHorizon} display={`${horizon} Yr`} />
      <Slider label="Expected Return p.a." value={rate} min={1} max={30} step={0.1} onChange={setRate} display={`${rate}%`} />
    </CalcLayout>
  );
}

// 5. Birthday SIP
function BirthdaySIPCalc() {
  // Stable initial value to avoid SSR/client hydration mismatch
  const [today, setToday] = useState({ year: 2026, month: 5 });
  useEffect(() => {
    const d = new Date();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setToday({ year: d.getFullYear(), month: d.getMonth() + 1 });
  }, []);
  const [year, setYear] = useState(2000);
  const [month, setMonth] = useState(1);
  const [sip, setSip] = useState(5000);
  const [rate, setRate] = useState(12);

  const monthsSince = Math.max(
    (today.year - year) * 12 + (today.month - month),
    0
  );
  const fv = sipFV(sip, rate, monthsSince);
  const invested = sip * monthsSince;
  const gained = fv - invested;
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  return (
    <CalcLayout
      title="Birthday SIP Calculator"
      desc="Discover the wealth an SIP started in your birth month would hold by today."
      result={fv} invested={invested} gained={gained}
      multiplier={invested > 0 ? (fv / invested).toFixed(2) : null}
      resultLabel="Wealth As of Today" ctaText="Start SIP Now"
      extra={`Cumulative months: ${monthsSince}`}
    >
      <Slider label="Monthly SIP Amount" value={sip} min={500} max={100000} step={500} onChange={setSip} display={fmtPlain(sip)} />
      <Slider label="Birth Year" value={year} min={1950} max={Math.max(today.year - 1, 1951)} step={1} onChange={setYear} display={`${year}`} />
      <Slider label="Birth Month" value={month} min={1} max={12} step={1} onChange={setMonth} display={monthNames[month - 1]} />
      <Slider label="Expected Return p.a." value={rate} min={1} max={30} step={0.1} onChange={setRate} display={`${rate}%`} />
      <p className="text-[11px] text-slate-400 mt-2">Hypothetical scenario based on a constant monthly SIP since your birth month.</p>
    </CalcLayout>
  );
}

// 6. Cost of Delay
function CostOfDelayCalc() {
  const [monthly, setMonthly] = useState(10000);
  const [years, setYears] = useState(20);
  const [rate, setRate] = useState(12);
  const [delayYears, setDelayYears] = useState(5);
  const totalMonths = years * 12;
  const fvNow = sipFV(monthly, rate, totalMonths);
  const remainingMonths = Math.max((years - delayYears) * 12, 0);
  const fvDelayed = sipFV(monthly, rate, remainingMonths);
  const lost = Math.max(fvNow - fvDelayed, 0);
  return (
    <CalcLayout
      title="Cost of Delay Calculator"
      desc="See how much wealth you forfeit by postponing your SIP."
      result={lost}
      resultLabel="Wealth Lost to Delay" ctaText="Start Investing Today"
      hideDonut
      rows={[
        { label: 'If Started Today', value: fmtPlain(fvNow), dot: DONUT_RETURNS },
        { label: `If Delayed by ${delayYears} Yr`, value: fmtPlain(fvDelayed), dot: DONUT_INVESTED },
        { label: 'Wealth Lost', value: fmtPlain(lost) },
        { label: '% Lost', value: fvNow > 0 ? `${((lost / fvNow) * 100).toFixed(1)}%` : '—' },
      ]}
    >
      <Slider label="Monthly Investment" value={monthly} min={500} max={200000} step={500} onChange={setMonthly} display={fmtPlain(monthly)} />
      <Slider label="Total Time Horizon" value={years} min={2} max={40} step={1} onChange={setYears} display={`${years} Yr`} />
      <Slider label="Expected Return p.a." value={rate} min={1} max={30} step={0.1} onChange={setRate} display={`${rate}%`} />
      <Slider label="Years of Delay" value={delayYears} min={1} max={Math.max(years - 1, 1)} step={1} onChange={setDelayYears} display={`${delayYears} Yr`} />
    </CalcLayout>
  );
}

// 7. SWP (with deferred period)
function SWPCalc() {
  const [corpus, setCorpus] = useState(5000000);
  const [withdrawal, setWithdrawal] = useState(30000);
  const [rate, setRate] = useState(10);
  const [tenure, setTenure] = useState(20);
  const [deferred, setDeferred] = useState(0);

  const fvAfterDeferred = corpus * Math.pow(1 + rate / 100, deferred);
  const r = monthlyRate(rate);
  let bal = fvAfterDeferred;
  const months = tenure * 12;
  let monthsRan = 0;
  for (let m = 0; m < months; m++) {
    if (bal <= 0) break;
    bal = bal * (1 + r) - withdrawal;
    monthsRan++;
  }
  const finalValue = Math.max(bal, 0);
  const totalWithdrawn = withdrawal * monthsRan;
  return (
    <CalcLayout
      title="SWP Calculator"
      desc="Plan a Systematic Withdrawal Plan, with an optional growth-only deferral period."
      result={finalValue}
      resultLabel="Fund Value at End of Tenure" ctaText="Plan My SWP"
      hideDonut
      rows={[
        { label: 'Initial Lumpsum', value: fmtPlain(corpus), dot: DONUT_INVESTED },
        { label: 'FV After Deferred', value: fmtPlain(fvAfterDeferred) },
        { label: 'Total Withdrawn', value: fmtPlain(totalWithdrawn), dot: DONUT_RETURNS },
        { label: 'Final Fund Value', value: fmtPlain(finalValue) },
        { label: 'Status', value: monthsRan === months ? 'Corpus lasted full tenure' : `Corpus exhausted in ${Math.floor(monthsRan / 12)}y ${monthsRan % 12}m` },
      ]}
    >
      <Slider label="Lumpsum Investment" value={corpus} min={100000} max={100000000} step={100000} onChange={setCorpus} display={fmt(corpus)} />
      <Slider label="Monthly SWP Withdrawal" value={withdrawal} min={1000} max={1000000} step={1000} onChange={setWithdrawal} display={fmtPlain(withdrawal)} />
      <Slider label="Assumed Return p.a." value={rate} min={1} max={20} step={0.1} onChange={setRate} display={`${rate}%`} />
      <Slider label="Tenure (Years)" value={tenure} min={1} max={40} step={1} onChange={setTenure} display={`${tenure} Yr`} />
      <Slider label="Deferred Period (Years)" value={deferred} min={0} max={20} step={1} onChange={setDeferred} display={`${deferred} Yr`} />
    </CalcLayout>
  );
}

// 8. Dream Education
function EducationCalc() {
  const [childAge, setChildAge] = useState(5);
  const [eduAge, setEduAge] = useState(18);
  const [cost, setCost] = useState(2500000);
  const [inflation, setInflation] = useState(8);
  const [existing, setExisting] = useState(200000);
  const [retExist, setRetExist] = useState(10);
  const [retNew, setRetNew] = useState(12);
  const years = Math.max(eduAge - childAge, 1);
  const { futureCost, existingGrowth, gap, sipNeeded } = goalMath({
    years, currentCost: cost, inflation, existing, returnExisting: retExist, returnNew: retNew,
  });
  return (
    <CalcLayout
      title="Dream Education Calculator"
      desc="Plan the SIP needed to fund your child's higher education on time."
      result={futureCost}
      resultLabel="Inflation-Adjusted Goal" ctaText="Plan My Goal"
      hideDonut
      rows={[
        { label: 'Years to Goal', value: `${years} Yr` },
        { label: 'Future Cost', value: fmtPlain(futureCost), dot: DONUT_RETURNS },
        { label: 'Existing Will Grow To', value: fmtPlain(existingGrowth), dot: DONUT_INVESTED },
        { label: 'Funding Gap', value: fmtPlain(gap) },
        { label: 'Required Monthly SIP', value: fmtPlain(sipNeeded) },
      ]}
    >
      <Slider label="Child's Current Age" value={childAge} min={0} max={20} step={1} onChange={setChildAge} display={`${childAge} Yr`} />
      <Slider label="Higher Education Age" value={eduAge} min={16} max={28} step={1} onChange={setEduAge} display={`${eduAge} Yr`} />
      <Slider label="Current Cost of Education" value={cost} min={100000} max={50000000} step={50000} onChange={setCost} display={fmt(cost)} />
      <Slider label="Inflation" value={inflation} min={3} max={15} step={0.5} onChange={setInflation} display={`${inflation}%`} />
      <Slider label="Current Investment for Goal" value={existing} min={0} max={20000000} step={50000} onChange={setExisting} display={fmt(existing)} />
      <Slider label="Return on Existing Investment" value={retExist} min={1} max={20} step={0.5} onChange={setRetExist} display={`${retExist}%`} />
      <Slider label="Return on New Investment" value={retNew} min={1} max={20} step={0.5} onChange={setRetNew} display={`${retNew}%`} />
    </CalcLayout>
  );
}

// 9. Grand Wedding
function WeddingCalc() {
  const [childAge, setChildAge] = useState(5);
  const [weddingAge, setWeddingAge] = useState(26);
  const [cost, setCost] = useState(2000000);
  const [inflation, setInflation] = useState(8);
  const [existing, setExisting] = useState(100000);
  const [retExist, setRetExist] = useState(10);
  const [retNew, setRetNew] = useState(12);
  const years = Math.max(weddingAge - childAge, 1);
  const { futureCost, existingGrowth, gap, sipNeeded } = goalMath({
    years, currentCost: cost, inflation, existing, returnExisting: retExist, returnNew: retNew,
  });
  return (
    <CalcLayout
      title="Grand Wedding Calculator"
      desc="Find the SIP required to fund your child's wedding when the time comes."
      result={futureCost}
      resultLabel="Inflation-Adjusted Goal" ctaText="Plan My Goal"
      hideDonut
      rows={[
        { label: 'Years to Goal', value: `${years} Yr` },
        { label: 'Future Cost', value: fmtPlain(futureCost), dot: DONUT_RETURNS },
        { label: 'Existing Will Grow To', value: fmtPlain(existingGrowth), dot: DONUT_INVESTED },
        { label: 'Funding Gap', value: fmtPlain(gap) },
        { label: 'Required Monthly SIP', value: fmtPlain(sipNeeded) },
      ]}
    >
      <Slider label="Child's Current Age" value={childAge} min={0} max={25} step={1} onChange={setChildAge} display={`${childAge} Yr`} />
      <Slider label="Marriage Age" value={weddingAge} min={18} max={35} step={1} onChange={setWeddingAge} display={`${weddingAge} Yr`} />
      <Slider label="Current Cost of Wedding" value={cost} min={100000} max={50000000} step={50000} onChange={setCost} display={fmt(cost)} />
      <Slider label="Inflation" value={inflation} min={3} max={15} step={0.5} onChange={setInflation} display={`${inflation}%`} />
      <Slider label="Current Investment for Goal" value={existing} min={0} max={20000000} step={50000} onChange={setExisting} display={fmt(existing)} />
      <Slider label="Return on Existing Investment" value={retExist} min={1} max={20} step={0.5} onChange={setRetExist} display={`${retExist}%`} />
      <Slider label="Return on New Investment" value={retNew} min={1} max={20} step={0.5} onChange={setRetNew} display={`${retNew}%`} />
    </CalcLayout>
  );
}

// 10. Dream Car / Bike / Property
function DreamAssetCalc() {
  const [years, setYears] = useState(5);
  const [cost, setCost] = useState(1500000);
  const [inflation, setInflation] = useState(6);
  const [existing, setExisting] = useState(100000);
  const [retExist, setRetExist] = useState(8);
  const [retNew, setRetNew] = useState(12);
  const { futureCost, existingGrowth, gap, sipNeeded } = goalMath({
    years, currentCost: cost, inflation, existing, returnExisting: retExist, returnNew: retNew,
  });
  return (
    <CalcLayout
      title="Dream Car / Bike / Property Calculator"
      desc="Map the SIP needed to own that big-ticket asset on schedule."
      result={futureCost}
      resultLabel="Inflation-Adjusted Goal" ctaText="Plan My Goal"
      hideDonut
      rows={[
        { label: 'Future Cost', value: fmtPlain(futureCost), dot: DONUT_RETURNS },
        { label: 'Existing Will Grow To', value: fmtPlain(existingGrowth), dot: DONUT_INVESTED },
        { label: 'Funding Gap', value: fmtPlain(gap) },
        { label: 'Required Monthly SIP', value: fmtPlain(sipNeeded) },
      ]}
    >
      <Slider label="Years to Achieve Goal" value={years} min={1} max={30} step={1} onChange={setYears} display={`${years} Yr`} />
      <Slider label="Current Cost of Asset" value={cost} min={50000} max={100000000} step={50000} onChange={setCost} display={fmt(cost)} />
      <Slider label="Inflation" value={inflation} min={2} max={15} step={0.5} onChange={setInflation} display={`${inflation}%`} />
      <Slider label="Current Investment for Goal" value={existing} min={0} max={20000000} step={50000} onChange={setExisting} display={fmt(existing)} />
      <Slider label="Return on Existing Investment" value={retExist} min={1} max={20} step={0.5} onChange={setRetExist} display={`${retExist}%`} />
      <Slider label="Return on New Investment" value={retNew} min={1} max={20} step={0.5} onChange={setRetNew} display={`${retNew}%`} />
    </CalcLayout>
  );
}

// 11. Dream Vacation
function VacationCalc() {
  const [years, setYears] = useState(3);
  const [cost, setCost] = useState(500000);
  const [inflation, setInflation] = useState(7);
  const [existing, setExisting] = useState(50000);
  const [retExist, setRetExist] = useState(8);
  const [retNew, setRetNew] = useState(12);
  const { futureCost, existingGrowth, gap, sipNeeded } = goalMath({
    years, currentCost: cost, inflation, existing, returnExisting: retExist, returnNew: retNew,
  });
  return (
    <CalcLayout
      title="Dream Vacation Calculator"
      desc="Calculate the SIP needed for your bucket-list trip."
      result={futureCost}
      resultLabel="Inflation-Adjusted Goal" ctaText="Plan My Goal"
      hideDonut
      rows={[
        { label: 'Future Cost', value: fmtPlain(futureCost), dot: DONUT_RETURNS },
        { label: 'Existing Will Grow To', value: fmtPlain(existingGrowth), dot: DONUT_INVESTED },
        { label: 'Funding Gap', value: fmtPlain(gap) },
        { label: 'Required Monthly SIP', value: fmtPlain(sipNeeded) },
      ]}
    >
      <Slider label="After How Many Years" value={years} min={1} max={20} step={1} onChange={setYears} display={`${years} Yr`} />
      <Slider label="Current Cost of Vacation" value={cost} min={25000} max={10000000} step={25000} onChange={setCost} display={fmt(cost)} />
      <Slider label="Inflation" value={inflation} min={2} max={15} step={0.5} onChange={setInflation} display={`${inflation}%`} />
      <Slider label="Current Investment for Goal" value={existing} min={0} max={10000000} step={25000} onChange={setExisting} display={fmt(existing)} />
      <Slider label="Return on Existing Investment" value={retExist} min={1} max={20} step={0.5} onChange={setRetExist} display={`${retExist}%`} />
      <Slider label="Return on New Investment" value={retNew} min={1} max={20} step={0.5} onChange={setRetNew} display={`${retNew}%`} />
    </CalcLayout>
  );
}

// 12. Dream Retirement
function RetirementCalc() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retireAge, setRetireAge] = useState(60);
  const [lifeExp, setLifeExp] = useState(85);
  const [monthlyExp, setMonthlyExp] = useState(50000);
  const [inflation, setInflation] = useState(6);
  const [postInflation, setPostInflation] = useState(5);
  const [postRfr, setPostRfr] = useState(7);
  const [existing, setExisting] = useState(500000);
  const [retExist, setRetExist] = useState(10);
  const [retNew, setRetNew] = useState(12);

  const yearsToRetire = Math.max(retireAge - currentAge, 1);
  const postRetireYears = Math.max(lifeExp - retireAge, 1);
  const monthlyExpAtRetire = monthlyExp * Math.pow(1 + inflation / 100, yearsToRetire);

  const realAnnual = (1 + postRfr / 100) / (1 + postInflation / 100) - 1;
  const iReal = Math.pow(1 + realAnnual, 1 / 12) - 1;
  const monthsPost = postRetireYears * 12;
  const corpusNeeded = Math.abs(iReal) > 1e-9
    ? monthlyExpAtRetire * (1 - Math.pow(1 + iReal, -monthsPost)) / iReal * (1 + iReal)
    : monthlyExpAtRetire * monthsPost;

  const existingGrowth = existing * Math.pow(1 + retExist / 100, yearsToRetire);
  const gap = Math.max(corpusNeeded - existingGrowth, 0);
  const i = monthlyRate(retNew);
  const n = yearsToRetire * 12;
  const sipNeeded = gap > 0 && i > 0
    ? (gap * i) / ((Math.pow(1 + i, n) - 1) * (1 + i))
    : 0;

  return (
    <CalcLayout
      title="Dream Retirement Calculator"
      desc="Estimate the corpus and SIP needed for a comfortable retirement."
      result={corpusNeeded}
      resultLabel="Retirement Corpus Needed" ctaText="Plan My Retirement"
      hideDonut
      rows={[
        { label: 'Years to Retire', value: `${yearsToRetire} Yr` },
        { label: 'Monthly Exp. at Retire', value: fmtPlain(monthlyExpAtRetire) },
        { label: 'Existing Will Grow To', value: fmtPlain(existingGrowth), dot: DONUT_INVESTED },
        { label: 'Funding Gap', value: fmtPlain(gap) },
        { label: 'Required Monthly SIP', value: fmtPlain(sipNeeded), dot: DONUT_RETURNS },
      ]}
    >
      <Slider label="Current Age" value={currentAge} min={18} max={59} step={1} onChange={setCurrentAge} display={`${currentAge} Yr`} />
      <Slider label="Retirement Age" value={retireAge} min={40} max={75} step={1} onChange={setRetireAge} display={`${retireAge} Yr`} />
      <Slider label="Life Expectancy" value={lifeExp} min={65} max={100} step={1} onChange={setLifeExp} display={`${lifeExp} Yr`} />
      <Slider label="Current Monthly Expenses" value={monthlyExp} min={5000} max={1000000} step={5000} onChange={setMonthlyExp} display={fmtPlain(monthlyExp)} />
      <Slider label="Pre-Retire Inflation" value={inflation} min={3} max={12} step={0.5} onChange={setInflation} display={`${inflation}%`} />
      <Slider label="Post-Retirement Inflation" value={postInflation} min={2} max={10} step={0.5} onChange={setPostInflation} display={`${postInflation}%`} />
      <Slider label="Post-Retirement Risk-Free Return" value={postRfr} min={3} max={12} step={0.5} onChange={setPostRfr} display={`${postRfr}%`} />
      <Slider label="Existing Investment" value={existing} min={0} max={50000000} step={50000} onChange={setExisting} display={fmt(existing)} />
      <Slider label="Return on Existing Investment" value={retExist} min={1} max={20} step={0.5} onChange={setRetExist} display={`${retExist}%`} />
      <Slider label="Return on New Investment" value={retNew} min={1} max={20} step={0.5} onChange={setRetNew} display={`${retNew}%`} />
    </CalcLayout>
  );
}

// 13. Life Insurance Need
function LifeInsuranceCalc() {
  const [currentAge, setCurrentAge] = useState(35);
  const [spouseAge, setSpouseAge] = useState(32);
  const [spouseLifeExp, setSpouseLifeExp] = useState(85);
  const [numChildren, setNumChildren] = useState(1);
  const [avgChildAge, setAvgChildAge] = useState(5);
  const [eduAge, setEduAge] = useState(18);
  const [marriageAge, setMarriageAge] = useState(25);
  const [monthlyExp, setMonthlyExp] = useState(50000);
  const [inflation, setInflation] = useState(6);
  const [rfr, setRfr] = useState(7);
  const [retChild, setRetChild] = useState(10);
  const [eduCost, setEduCost] = useState(2500000);
  const [marriageCost, setMarriageCost] = useState(2000000);
  const [loan, setLoan] = useState(1000000);
  const [currentCover, setCurrentCover] = useState(500000);
  const [currentInv, setCurrentInv] = useState(500000);

  // Family expense PV until spouse life expectancy (using real rate)
  const spouseRemainingMonths = Math.max(spouseLifeExp - spouseAge, 0) * 12;
  const realAnnual = (1 + rfr / 100) / (1 + inflation / 100) - 1;
  const iReal = Math.pow(1 + realAnnual, 1 / 12) - 1;
  const familyPV = spouseRemainingMonths > 0 && Math.abs(iReal) > 1e-9
    ? monthlyExp * (1 - Math.pow(1 + iReal, -spouseRemainingMonths)) / iReal * (1 + iReal)
    : monthlyExp * spouseRemainingMonths;

  // Child education + marriage PVs
  const yrsToEdu = Math.max(eduAge - avgChildAge, 0);
  const yrsToMarriage = Math.max(marriageAge - avgChildAge, 0);
  const eduFV = eduCost * Math.pow(1 + inflation / 100, yrsToEdu);
  const marriageFV = marriageCost * Math.pow(1 + inflation / 100, yrsToMarriage);
  const eduPV = yrsToEdu > 0 ? eduFV / Math.pow(1 + retChild / 100, yrsToEdu) : eduFV;
  const marriagePV = yrsToMarriage > 0 ? marriageFV / Math.pow(1 + retChild / 100, yrsToMarriage) : marriageFV;
  const childNeeds = numChildren * (eduPV + marriagePV);

  const totalNeed = familyPV + childNeeds + loan;
  const totalAvailable = currentCover + currentInv;
  const insuranceNeed = Math.max(totalNeed - totalAvailable, 0);

  return (
    <CalcLayout
      title="Life Insurance Need Calculator"
      desc="Estimate adequate life cover for your family's protection."
      result={insuranceNeed}
      resultLabel="Life Insurance Required" ctaText="Get Insurance Quote"
      hideDonut
      rows={[
        { label: 'Family Expense PV', value: fmtPlain(familyPV) },
        { label: 'Children Future Needs', value: fmtPlain(childNeeds) },
        { label: 'Outstanding Loans', value: fmtPlain(loan) },
        { label: 'Existing Cover + Inv.', value: fmtPlain(totalAvailable), dot: DONUT_INVESTED },
        { label: 'Additional Cover Needed', value: fmtPlain(insuranceNeed), dot: DONUT_RETURNS },
      ]}
    >
      <Slider label="Your Current Age" value={currentAge} min={20} max={70} step={1} onChange={setCurrentAge} display={`${currentAge} Yr`} />
      <Slider label="Spouse Age" value={spouseAge} min={18} max={70} step={1} onChange={setSpouseAge} display={`${spouseAge} Yr`} />
      <Slider label="Spouse Life Expectancy" value={spouseLifeExp} min={60} max={100} step={1} onChange={setSpouseLifeExp} display={`${spouseLifeExp} Yr`} />
      <Slider label="Number of Children" value={numChildren} min={0} max={5} step={1} onChange={setNumChildren} display={`${numChildren}`} />
      <Slider label="Average Child Age" value={avgChildAge} min={0} max={25} step={1} onChange={setAvgChildAge} display={`${avgChildAge} Yr`} disabled={numChildren === 0} />
      <Slider label="Higher Education Age" value={eduAge} min={16} max={28} step={1} onChange={setEduAge} display={`${eduAge} Yr`} disabled={numChildren === 0} />
      <Slider label="Marriage Age" value={marriageAge} min={18} max={35} step={1} onChange={setMarriageAge} display={`${marriageAge} Yr`} disabled={numChildren === 0} />
      <Slider label="Current Monthly Expenses" value={monthlyExp} min={5000} max={1000000} step={5000} onChange={setMonthlyExp} display={fmtPlain(monthlyExp)} />
      <Slider label="Inflation" value={inflation} min={3} max={12} step={0.5} onChange={setInflation} display={`${inflation}%`} />
      <Slider label="Risk-Free Rate of Return" value={rfr} min={3} max={12} step={0.5} onChange={setRfr} display={`${rfr}%`} />
      <Slider label="Return on Child's Investment" value={retChild} min={1} max={20} step={0.5} onChange={setRetChild} display={`${retChild}%`} disabled={numChildren === 0} />
      <Slider label="Current Cost of Education" value={eduCost} min={100000} max={50000000} step={50000} onChange={setEduCost} display={fmt(eduCost)} disabled={numChildren === 0} />
      <Slider label="Current Cost of Marriage" value={marriageCost} min={100000} max={50000000} step={50000} onChange={setMarriageCost} display={fmt(marriageCost)} disabled={numChildren === 0} />
      <Slider label="Outstanding Loans" value={loan} min={0} max={50000000} step={50000} onChange={setLoan} display={fmt(loan)} />
      <Slider label="Current Life Insurance Cover" value={currentCover} min={0} max={100000000} step={100000} onChange={setCurrentCover} display={fmt(currentCover)} />
      <Slider label="Current Value of Investments" value={currentInv} min={0} max={100000000} step={100000} onChange={setCurrentInv} display={fmt(currentInv)} />
    </CalcLayout>
  );
}

// 14. EMI
function EMICalc() {
  const [loan, setLoan] = useState(3000000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const r = rate / 12 / 100, n = tenure * 12;
  const emi = (loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  const total = emi * n;
  const interest = total - loan;
  return (
    <CalcLayout
      title="EMI Calculator"
      desc="Calculate your monthly EMI on a loan."
      result={emi}
      resultLabel="Monthly EMI" ctaText="Apply for Loan"
      hideDonut
      rows={[
        { label: 'Loan Amount', value: fmtPlain(loan), dot: DONUT_INVESTED },
        { label: 'Total Interest', value: fmtPlain(interest), dot: DONUT_RETURNS },
        { label: 'Total Payable', value: fmtPlain(total) },
      ]}
    >
      <Slider label="Loan Amount" value={loan} min={50000} max={100000000} step={50000} onChange={setLoan} display={fmt(loan)} />
      <Slider label="Loan Interest (% p.a.)" value={rate} min={4} max={24} step={0.1} onChange={setRate} display={`${rate}%`} />
      <Slider label="Tenure (Years)" value={tenure} min={1} max={30} step={1} onChange={setTenure} display={`${tenure} Yr`} />
      <p className="text-[11px] text-slate-400 mt-2">Calculated on reducing balance method.</p>
    </CalcLayout>
  );
}

// 15. Home Loan vs SIP
function HomeLoanVsSIPCalc() {
  const [loan, setLoan] = useState(3000000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(20);
  const [sip, setSip] = useState(20000);
  const [sipReturn, setSipReturn] = useState(12);

  const lr = rate / 12 / 100, n = tenure * 12;
  const emi = (loan * lr * Math.pow(1 + lr, n)) / (Math.pow(1 + lr, n) - 1);
  const totalEmi = emi * n;
  const interest = totalEmi - loan;

  const fvSip = sipFV(sip, sipReturn, n);
  const sipInvested = sip * n;
  const sipGain = fvSip - sipInvested;
  const netWealth = fvSip - interest;

  return (
    <CalcLayout
      title="Home Loan vs SIP Calculator"
      desc="Compare the cost of a home loan against the wealth a parallel SIP can build."
      result={netWealth}
      resultLabel="Net Wealth (SIP − Interest)" ctaText="Discuss Strategy"
      hideDonut
      rows={[
        { label: 'Monthly EMI', value: fmtPlain(emi), dot: DONUT_INVESTED },
        { label: 'Total Interest Paid', value: fmtPlain(interest) },
        { label: 'SIP Maturity Value', value: fmtPlain(fvSip), dot: DONUT_RETURNS },
        { label: 'SIP Total Invested', value: fmtPlain(sipInvested) },
        { label: 'SIP Wealth Gain', value: fmtPlain(sipGain) },
      ]}
    >
      <Slider label="Loan Amount" value={loan} min={100000} max={100000000} step={50000} onChange={setLoan} display={fmt(loan)} />
      <Slider label="Loan Interest Rate p.a." value={rate} min={4} max={20} step={0.1} onChange={setRate} display={`${rate}%`} />
      <Slider label="Loan Tenure (Years)" value={tenure} min={1} max={30} step={1} onChange={setTenure} display={`${tenure} Yr`} />
      <Slider label="Parallel Monthly SIP" value={sip} min={1000} max={500000} step={1000} onChange={setSip} display={fmtPlain(sip)} />
      <Slider label="Expected SIP Return p.a." value={sipReturn} min={1} max={30} step={0.1} onChange={setSipReturn} display={`${sipReturn}%`} />
    </CalcLayout>
  );
}

// 16. PPF (kept from existing site)
function PPFCalc() {
  const [annual, setAnnual] = useState(150000);
  const [years, setYears] = useState(15);
  const rate = 7.1;
  let bal = 0;
  for (let y = 0; y < years; y++) bal = (bal + annual) * (1 + rate / 100);
  const invested = annual * years;
  const gained = bal - invested;
  return (
    <CalcLayout
      title="PPF Calculator"
      desc="Estimate your Public Provident Fund maturity amount."
      result={bal} invested={invested} gained={gained}
      multiplier={(bal / invested).toFixed(2)}
      resultLabel="Maturity Amount" ctaText="Open PPF Account"
    >
      <Slider label="Annual Investment" value={annual} min={500} max={150000} step={500} onChange={setAnnual} display={fmtPlain(annual)} />
      <Slider label="Tenure" value={years} min={15} max={50} step={1} onChange={setYears} display={`${years} Yr`} />
      <p className="text-xs text-slate-500 mt-1 font-medium">Current PPF rate: <span className="text-brand-navy font-bold">7.1% p.a.</span> (tax-free, EEE).</p>
      <p className="text-[11px] text-slate-400 mt-2">Rate subject to quarterly revision by Govt. of India.</p>
    </CalcLayout>
  );
}

// ─── Tabs Config ─────────────────────────────────────────────────────────────
const TABS = [
  { id: 'sip', label: 'SIP', component: SIPCalc },
  { id: 'lumpsum', label: 'Lumpsum', component: LumpsumCalc },
  { id: 'sipTopup', label: 'SIP Topup', component: SIPTopUpCalc },
  { id: 'limitedSip', label: 'Limited Period SIP', component: LimitedPeriodSIPCalc },
  { id: 'birthdaySip', label: 'Birthday SIP', component: BirthdaySIPCalc },
  { id: 'costDelay', label: 'Cost of Delay', component: CostOfDelayCalc },
  { id: 'swp', label: 'SWP', component: SWPCalc },
  { id: 'education', label: 'Dream Education', component: EducationCalc },
  { id: 'wedding', label: 'Grand Wedding', component: WeddingCalc },
  { id: 'asset', label: 'Dream Car/Bike/Property', component: DreamAssetCalc },
  { id: 'vacation', label: 'Dream Vacation', component: VacationCalc },
  { id: 'retirement', label: 'Dream Retirement', component: RetirementCalc },
  { id: 'insurance', label: 'Life Insurance Need', component: LifeInsuranceCalc },
  { id: 'emi', label: 'EMI', component: EMICalc },
  { id: 'homeVsSip', label: 'Home Loan vs SIP', component: HomeLoanVsSIPCalc },
  { id: 'ppf', label: 'PPF', component: PPFCalc },
];

// ─── CTA Form ─────────────────────────────────────────────────────────────────
function CTAForm() {
  const [form, setForm] = useState({ name: '', phone: '', interest: 'SIP Investment' });
  const [done, setDone] = useState(false);
  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  if (done) return (
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-brand-navy rounded-full flex items-center justify-center mx-auto mb-4">
        <ShieldCheck className="text-brand-gold w-8 h-8" />
      </div>
      <h3 className="text-xl font-black text-brand-navy mb-2">We&apos;ll reach out shortly!</h3>
      <p className="text-slate-500 text-sm">Our professionals will call you within 24 hours.</p>
    </div>
  );
  return (
    <form onSubmit={(e) => { e.preventDefault(); setDone(true); }} className="grid md:grid-cols-3 gap-4 items-end">
      <div>
        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Your Name</label>
        <input required name="name" value={form.name} onChange={handle} placeholder="Full name" className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm text-slate-700 focus:outline-none focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/10 transition-all font-medium" />
      </div>
      <div>
        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">Phone / WhatsApp</label>
        <input required name="phone" value={form.phone} onChange={handle} placeholder="+91 98765 43210" className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm text-slate-700 focus:outline-none focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/10 transition-all font-medium" />
      </div>
      <div>
        <label className="block text-xs font-bold text-slate-600 uppercase tracking-wider mb-2">I&apos;m interested in</label>
        <select name="interest" value={form.interest} onChange={handle} className="w-full px-4 py-3.5 bg-white border border-slate-200 rounded-2xl text-sm text-slate-700 focus:outline-none focus:border-brand-navy focus:ring-2 focus:ring-brand-navy/10 transition-all font-medium appearance-none">
          {TABS.map(t => <option key={t.id}>{t.label}</option>)}
          <option>General Financial Planning</option>
        </select>
      </div>
      <div className="md:col-span-3">
        <button type="submit" className="w-full flex items-center justify-center gap-2 py-4 bg-brand-navy text-white font-black text-sm rounded-2xl hover:bg-brand-gold hover:text-brand-navy transition-all shadow-lg">
          <Send size={16} /> Get Free Consultation Call
        </button>
        <p className="text-center text-slate-400 text-xs mt-3">
          <ShieldCheck size={12} className="inline mr-1 text-brand-gold" />
          100% confidential. No spam. Zero obligation.
        </p>
      </div>
    </form>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function CalculatorsPage() {
  const [active, setActive] = useState('sip');
  const ActiveCalc = TABS.find(t => t.id === active)?.component || SIPCalc;
  const containerRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out', duration: 1.2 } });

      // Setup Initial 3D State
      gsap.set('.perspective-stage', { perspective: 2000 });
      gsap.set('.char-reveal', {
        rotationY: -90,
        opacity: 0,
        z: -20,
        transformOrigin: '50% 50% -20px',
      });
      gsap.set('.animate-up', { y: 40, opacity: 0 });

      tl.to('.char-reveal', {
        rotationY: 0,
        opacity: 1,
        z: 0,
        stagger: 0.04,
        duration: 0.8,
        ease: 'back.out(1.4)',
      })
        .to('.animate-up', {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 1,
        }, '-=0.5');
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="min-h-screen bg-slate-50 pt-32 pb-24 font-['Inter'] perspective-stage">
      <Head>
        <title>Free Financial Calculators — SIP, EMI, PPF, Retirement | Money Compound</title>
        <meta name="description" content="Free financial calculators for SIP, Lumpsum, EMI, PPF, Retirement, Goal Planning, Life Insurance HLV and more. Outputs are illustrative — actual returns depend on market conditions and are not guaranteed." />
        <link rel="canonical" href="https://www.moneycompound.com/calculators" />
        <meta property="og:title" content="Free Financial Calculators — Money Compound" />
        <meta property="og:url" content="https://www.moneycompound.com/calculators" />
        <meta property="og:image" content="https://www.moneycompound.com/og-cover.jpg" />
      </Head>

      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* ── Header ── */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="animate-up flex items-center justify-center gap-3 mb-5">
            <span className="w-10 h-[2px] bg-brand-gold rounded-full" />
            <span className="text-[11px] font-black text-brand-gold uppercase tracking-[0.25em]">Plan Smarter</span>
            <span className="w-10 h-[2px] bg-brand-gold rounded-full" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-serif font-bold text-brand-navy mb-4 leading-tight">
            <SplitTextCharacters text="Financial " className="" />
            <SplitTextCharacters text="Calculators" className="text-brand-gold" />
          </h1>
          <p className="animate-up text-slate-500 text-lg leading-relaxed">
            Powerful tools to plan, project and perfect your investments. All calculations run instantly in your browser.
          </p>
        </div>

        {/* ── Tab Bar ── */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={`px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${
                active === tab.id
                  ? 'bg-brand-navy text-white shadow-lg scale-105'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-brand-navy hover:text-brand-navy'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ── Active Calculator ── */}
        <div className="mb-20">
          <ActiveCalc />
        </div>

        {/* ── CTA / Lead Form ── */}
        <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-8 lg:p-12">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-10 h-[2px] bg-brand-gold rounded-full" />
              <span className="text-[11px] font-black text-brand-gold uppercase tracking-[0.25em]">Take the Next Step</span>
              <span className="w-10 h-[2px] bg-brand-gold rounded-full" />
            </div>
            <h2 className="text-3xl font-serif font-bold text-brand-navy mb-3">
              Let Our Professionals <span className="text-brand-gold">Build Your Plan</span>
            </h2>
            <p className="text-slate-500 text-base max-w-xl mx-auto">
              These calculators give you projections — our CAs and CFPs give you a <strong>written, personalised financial plan</strong> for free.
            </p>
          </div>
          <CTAForm />
        </div>

      </div>

      {/* Slider thumb global style */}
      <style jsx global>{`
        input[type=range]::-webkit-slider-thumb { appearance: none; }
        input[type=range]::-moz-range-thumb { appearance: none; }
      `}</style>
    </div>
  );
}
