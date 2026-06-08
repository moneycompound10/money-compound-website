import React from 'react'
import { Shield, CheckCircle, Star, Smartphone, Clock } from 'lucide-react'

const trustItems = [
  { icon: Shield, title: 'AMFI Registered', sub: 'Mutual Fund Distributor' },
  { icon: CheckCircle, title: 'Zero Hidden Fees', sub: '100% Transparent' },
  { icon: Star, title: 'CA, CS, CFP', sub: 'Led by Qualified Professionals' },
  { icon: Smartphone, title: 'Digital-First', sub: 'Paperless & Secure' },
  { icon: Clock, title: '24/7 Portal Access', sub: 'Track Anytime' },
]

export default function TrustBar() {
  return (
    <div className="bg-white border-y border-slate-100 py-8">
      <div className="max-w-7xl mx-auto px-10">
        <div className="flex flex-wrap justify-between items-center gap-8">
          {trustItems.map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center gap-2 min-w-[150px]">
              <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-brand-gold mb-1">
                <item.icon size={22} />
              </div>
              <div className="text-[14px] font-black text-slate-900 tracking-tight">{item.title}</div>
              <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{item.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
