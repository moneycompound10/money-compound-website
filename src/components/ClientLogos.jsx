import React, { useState } from 'react';
import { motion } from 'framer-motion';

const initialClients = [
  { name: 'Edelweiss', localImg: '/edelweiss.jpg' },
  { name: 'IDFC Mutual Fund', localImg: '/idfc.jpg' },
  { name: 'L&T Financial', localImg: '/lnt.png' },
  { name: 'Reliance Mutual', localImg: '/939reliance.png' },
  { name: 'Motilal Oswal', localImg: '/970motial-oswald.png' },
  { name: 'Birla Sun Life', localImg: '/345Birla-sunlife.png' },
  { name: 'LIC Mutual Fund', localImg: '/360lic-mutualfund.png' },
  { name: 'DSP BlackRock', localImg: '/dsp.png' },
  { name: 'SBI Mutual Fund', localImg: '/sbi.png' },
  { name: 'Axis Mutual', localImg: '/axis.jpg' },
  { name: 'Tata Mutual', localImg: '/972tata.jpg' },
  { name: 'ICICI Prudential', localImg: '/icici.jpg' },
  { name: 'UTI Mutual Fund', localImg: '/uti.jpg' },
];

export default function ClientLogos() {
  const [validClients, setValidClients] = useState(initialClients);

  const handleError = (index) => {
    // Only remove if it's the first set to prevent multiple entries from disappearing
    setValidClients(prev => prev.filter((_, i) => i !== index));
  };

  // Create a continuous strip
  const tickerItems = [...validClients, ...validClients, ...validClients, ...validClients];

  return (
    <section className="py-20 relative overflow-hidden bg-white" data-scroll-section>

      <div className="max-w-7xl mx-auto px-10 relative z-10 mb-16 text-center">
        <h2 className="relative inline-block text-4xl md:text-5xl font-['Playfair_Display'] italic font-black text-[#1e293b] tracking-tight cursor-pointer group pb-2">
          Our Clients
          <span className="absolute bottom-0 left-0 w-full h-[3px] bg-brand-blue origin-right scale-x-0 transition-transform duration-300 ease-out group-hover:origin-left group-hover:scale-x-100" />
        </h2>
      </div>

      <div className="relative flex overflow-hidden">
        <motion.div
          animate={{ x: [0, -2500] }}
          transition={{
            duration: 45,
            repeat: Infinity,
            ease: "linear"
          }}
          className="flex gap-4 items-center w-max"
        >
          {tickerItems.map((client, i) => (
            <div
              key={`${client.name}-${i}`}
              className="flex-shrink-0 w-36 h-[65px] border border-slate-50 bg-white flex items-center justify-center p-0 transition-all duration-300 cursor-pointer overflow-hidden group relative"
            >
              <img
                src={client.localImg}
                alt={client.name}
                className="w-full h-full object-cover"
                onError={() => handleError(i % validClients.length)}
              />
              <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          ))}
        </motion.div>

        {/* Cinematic Edge Fades */}
        <div className="absolute inset-y-0 left-0 w-64 bg-gradient-to-r from-white/95 to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-64 bg-gradient-to-l from-white/95 to-transparent z-10 pointer-events-none" />
      </div>

    </section>
  );
}
