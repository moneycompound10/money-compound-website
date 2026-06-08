import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Menu, X, MessageSquare, LogIn, ChevronRight, ChevronDown } from 'lucide-react'
import gsap from 'gsap'
import { track, EVENTS } from '../lib/analytics'

const WHATSAPP_HREF = 'https://wa.me/918447496480?text=' + encodeURIComponent(
  "Hi Money Compound, I'd like to learn more about your investment services."
)

// Inline WhatsApp glyph — kept local so we don't pull another dep.
const WhatsAppGlyph = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
    <path d="M20.52 3.48A11.86 11.86 0 0 0 12.05 0C5.5 0 .18 5.32.18 11.86c0 2.09.55 4.13 1.6 5.93L0 24l6.36-1.67a11.84 11.84 0 0 0 5.69 1.45h.01c6.54 0 11.86-5.32 11.86-11.86a11.8 11.8 0 0 0-3.4-8.44ZM12.06 21.6h-.01a9.7 9.7 0 0 1-4.96-1.36l-.36-.21-3.78 1 1.01-3.68-.23-.38a9.74 9.74 0 1 1 8.33 4.63Zm5.34-7.28c-.29-.15-1.72-.85-1.98-.95-.26-.1-.46-.15-.65.15-.19.29-.74.95-.91 1.14-.17.19-.34.21-.62.07-.29-.15-1.22-.45-2.32-1.43-.86-.76-1.43-1.7-1.6-1.99-.17-.29-.02-.45.13-.6.13-.13.29-.34.43-.51.14-.17.19-.29.29-.48.1-.19.05-.36-.02-.51-.07-.15-.65-1.58-.9-2.16-.24-.57-.48-.49-.65-.5-.17-.01-.36-.01-.55-.01-.19 0-.5.07-.77.36-.26.29-1 1-1 2.44 0 1.43 1.02 2.82 1.16 3.01.15.19 2 3.06 4.85 4.29.68.29 1.21.46 1.62.59.68.22 1.3.19 1.79.12.55-.08 1.72-.7 1.96-1.38.24-.68.24-1.26.17-1.38-.07-.12-.26-.19-.55-.34Z" />
  </svg>
)

const Navbar = () => {
  const [mounted, setMounted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [activeSubItem, setActiveSubItem] = useState(null)
  const [activeNestedItem, setActiveNestedItem] = useState(null)
  const navRef = useRef(null)
  const pillRef = useRef(null)
  const bubbleRef = useRef(null)
  const closeTimeoutRef = useRef(null)
  const router = useRouter()
  const currentPath = mounted ? router.pathname : ''

  useEffect(() => {
    // Hydration-safe client mount flag — intentional setState in effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true)

    const ctx = gsap.context(() => {
      gsap.from(pillRef.current, {
        y: -30,
        opacity: 0,
        duration: 1,
        ease: 'power3.out'
      })
      gsap.from('.nav-link-item', {
        opacity: 0,
        y: 8,
        stagger: 0.07,
        duration: 0.7,
        delay: 0.4,
        ease: 'power2.out'
      })
    }, navRef)

    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null)
        setActiveSubItem(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      ctx.revert()
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleMouseEnter = (e, linkName) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)

    // Move Bubble — clamp inside parent so it never bleeds over the action
    // buttons (Contact Us / WhatsApp) on the right.
    const target = e.currentTarget;
    const rect = target.getBoundingClientRect();
    const parentRect = target.parentElement.getBoundingClientRect();
    const desiredLeft = (rect.left - parentRect.left) - 8;
    const desiredWidth = rect.width + 16;
    const maxLeft = Math.max(0, parentRect.width - desiredWidth);
    const clampedLeft = Math.min(Math.max(0, desiredLeft), maxLeft);

    gsap.to(bubbleRef.current, {
      left: clampedLeft,
      width: desiredWidth,
      opacity: 1,
      duration: 0.4,
      ease: "power2.out"
    });

    const linkObj = navLinks.find(l => l.name === linkName)
    if (linkObj?.subItems) {
      setActiveDropdown(linkName)
      setActiveSubItem(null)
    } else {
      setActiveDropdown(null)
      setActiveSubItem(null)
    }
  }

  const handleMouseLeave = () => {
    gsap.to(bubbleRef.current, {
      opacity: 0,
      duration: 0.3
    });
    closeTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null)
      setActiveSubItem(null)
      setActiveNestedItem(null)
    }, 800)
  }

  const handleSubItemHover = (category) => {
    if (activeSubItem === category.name) return
    setActiveSubItem(category.name)
    setActiveNestedItem(null)
    if (category.items && category.items.length > 0) {
      setTimeout(() => {
        gsap.fromTo('.sub-item-link',
          { opacity: 0, x: -8 },
          { opacity: 1, x: 0, stagger: 0.04, duration: 0.35, ease: 'power2.out' }
        )
      }, 10)
    }
  }

  const handleNestedItemHover = (item) => {
    const itemName = typeof item === 'string' ? item : item.name
    if (activeNestedItem === itemName) return
    setActiveNestedItem(itemName)
    if (item.subItems && item.subItems.length > 0) {
      setTimeout(() => {
        gsap.fromTo('.nested-item-link',
          { opacity: 0, x: -8 },
          { opacity: 1, x: 0, stagger: 0.04, duration: 0.35, ease: 'power2.out' }
        )
      }, 10)
    }
  }

  const navLinks = [
    { name: 'HOME', href: '/' },
    { name: 'ABOUT', href: '/about' },
    {
      name: 'SERVICES',
      subItems: [
        { name: 'INDIVIDUALS', href: '/services/individuals', items: [] },
        { name: 'NRI INVESTMENTS', href: '/services/nri', items: [] },
        { name: 'HNI INVESTMENTS', href: '/services/hni', items: [] },
        { name: 'RETIREE INVESTMENTS', href: '/services/retiree', items: [] },
        { name: 'NEED-ALIGNED SELECTION', href: '/services/goal', items: [] },
        { name: 'CORPORATE SESSIONS & WORKSHOPS', href: '/services/corporate', items: [] },
        { name: 'TAXATION PLANNING', href: '/services/tax', items: [] },
      ]
    },
    {
      name: 'PRODUCTS',
      subItems: [
        { name: 'MUTUAL FUNDS', href: '/products/mutual-funds', items: [] },
        { name: 'STOCK MARKET', href: '/products/stock-market', items: [] },
        { name: 'HEALTH INSURANCE', href: '/products/health-insurance', items: [] },
        { name: 'LIFE INSURANCE', href: '/products/life-insurance', items: [] },
        { name: 'GENERAL INSURANCE', href: '/products/general-insurance', items: [] },
        { name: 'LOANS', href: '/products/housing-loan', items: [] },
        { name: 'SIFs', href: '/products/sifs', items: [] },
        { name: 'UNLISTED SHARES', href: '/products/unlisted-shares', items: [] },
        { name: 'BONDS & FDs', href: '/products/bonds-fds', items: [] },
      ]
    },
    { name: 'CALCULATORS', href: '/calculators' },
    {
      name: 'RESOURCES',
      subItems: [
        { name: 'EBOOKS & GUIDES', href: '/resources', items: [] },
        { name: 'FINANCIAL CHECKUP', href: '/financial-checkup', items: [] },
      ]
    },
    { name: 'BLOG', href: '/blog' },
  ]

  const [mobileSubMenu, setMobileSubMenu] = useState(null)

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 bg-white/70 backdrop-blur-xl shadow-sm border-b border-slate-100"
      style={{ minHeight: '78px' }}
    >
      <div ref={pillRef} className="max-w-7xl mx-auto h-full flex items-center justify-between px-4 md:px-6 pt-2 pb-4 relative">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <img
            src="/images/new_logo.png"
            alt="Money Compound"
            className="h-[54px] md:h-[64px] lg:h-[72px] w-auto object-contain hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Desktop Links */}
        <div className="relative hidden lg:flex items-center gap-1 flex-1 justify-center" onMouseLeave={handleMouseLeave}>
          {/* Sliding Bubble */}
          <div
            ref={bubbleRef}
            className="absolute h-11 bg-slate-100 rounded-full opacity-0 pointer-events-none z-0"
          />

          {navLinks.map((link) => (
            <div
              key={link.name}
              className="relative nav-link-item"
              onMouseEnter={(e) => handleMouseEnter(e, link.name)}
            >
              {link.subItems ? (
                <button
                  type="button"
                  onClick={() => {
                    if (activeDropdown === link.name) {
                      setActiveDropdown(null)
                    } else {
                      setActiveDropdown(link.name)
                    }
                  }}
                  className={`relative z-10 flex items-center gap-1.5 px-4 py-2.5 text-[13px] font-bold transition-colors duration-200 uppercase tracking-widest rounded-full whitespace-nowrap text-left cursor-pointer group ${
                    link.subItems.some(sub => currentPath === sub.href) ? 'text-brand-navy bg-slate-100' : 'text-black hover:text-brand-navy'
                  }`}
                >
                  {link.name}
                  <ChevronDown size={14} className={`transition-transform duration-300 ${activeDropdown === link.name ? 'rotate-180 text-brand-navy' : 'text-slate-400 group-hover:text-brand-navy'}`} />
                </button>
              ) : (
                <Link
                  href={link.href || '#'}
                  className={`relative z-10 block px-4 py-2.5 text-[13px] font-bold transition-colors duration-200 uppercase tracking-widest rounded-full whitespace-nowrap ${
                    currentPath === link.href ? 'text-brand-navy bg-slate-100' : 'text-black hover:text-brand-navy'
                  }`}
                >
                  {link.name}
                </Link>
              )}

              {/* Mega Menu Dropdown */}
              {link.subItems && activeDropdown === link.name && (
                <div
                  className={`mega-menu-${link.name.replace(/\s/g, '-')} absolute top-[calc(100%+4px)] left-0 bg-white/95 backdrop-blur-xl border border-slate-100 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-50 flex
                    before:content-[''] before:absolute before:-top-4 before:left-0 before:w-full before:h-4 before:z-[-1]
                  `}
                  onMouseEnter={() => { if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current) }}
                  onMouseLeave={handleMouseLeave}
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="min-w-[220px] py-3">
                    {link.subItems.map((category) => (
                      <div
                        key={category.name}
                        onMouseEnter={() => handleSubItemHover(category)}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleSubItemHover(category);
                        }}
                        className={`mega-left-item flex items-center justify-between px-5 py-3.5 text-[10px] font-bold uppercase tracking-widest cursor-pointer transition-all duration-200 ${activeSubItem === category.name
                          ? 'bg-brand-navy text-white'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-brand-navy'
                          }`}
                      >
                        {category.name === 'MUTUAL FUNDS' ? (
                          <Link href="/products/mutual-funds" className="w-full h-full block"><span>{category.name}</span></Link>
                        ) : category.name === 'CALCULATORS' ? (
                          <Link href="/calculators" className="w-full h-full block"><span>{category.name}</span></Link>
                        ) : category.href ? (
                          <Link href={category.href} className="w-full h-full block"><span>{category.name}</span></Link>
                        ) : (
                          <span>{category.name}</span>
                        )}
                        {category.items.length > 0 && <ChevronRight size={12} />}
                      </div>
                    ))}
                  </div>

                  {activeSubItem && link.subItems.find(c => c.name === activeSubItem)?.items.length > 0 && (
                    <div className="min-w-[220px] border-l border-slate-100 py-3">
                      {link.subItems.find(c => c.name === activeSubItem).items.map((item) => {
                        const itemName = typeof item === 'string' ? item : item.name;
                        const hasSubItems = typeof item === 'object' && item.subItems;

                        return (
                          <div
                            key={itemName}
                            onMouseEnter={() => handleNestedItemHover(item)}
                            className={`sub-item-link flex items-center justify-between px-5 py-3.5 text-[10px] font-bold transition-all duration-150 cursor-pointer ${activeNestedItem === itemName ? 'bg-slate-50 text-brand-navy' : 'text-slate-700 hover:text-brand-navy hover:bg-slate-50'} uppercase tracking-widest`}
                          >
                            {hasSubItems ? (
                              <>
                                <span>{itemName}</span>
                                <ChevronRight size={12} />
                              </>
                            ) : (
                              <Link href={itemName === 'PMS' ? '/products/pms' : itemName === 'AIF' ? '/products/aif' : itemName === 'MUTUAL FUNDS' ? '/products/mutual-funds' : itemName === 'CORPORATE FIXED DEPOSITS' ? '/products/corporate-fd' : itemName === 'CAPITAL GAIN BOND' ? '/products/capital-gain-bond' : itemName === 'HOUSING LOAN' ? '/products/housing-loan' : itemName === 'LIFE INSURANCE' ? '/products/life-insurance' : itemName === 'HEALTH INSURANCE' ? '/products/health-insurance' : itemName === 'TRAVEL INSURANCE' ? '/products/travel-insurance' : itemName === 'GENERAL INSURANCE' ? '/products/general-insurance' : '#'} className="block w-full">{itemName}</Link>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {activeNestedItem && link.subItems.find(c => c.name === activeSubItem)?.items.find(i => (typeof i === 'object' ? i.name : i) === activeNestedItem)?.subItems && (
                    <div className="min-w-[220px] border-l border-slate-100 py-3">
                      {link.subItems.find(c => c.name === activeSubItem).items.find(i => (typeof i === 'object' ? i.name : i) === activeNestedItem).subItems.map((subItem) => (
                        <Link
                          key={subItem}
                          href={subItem === 'P2P LENDING' ? '/products/p2p-lending' : subItem === 'NATIONAL PENSION SCHEME' ? '/products/nps' : subItem === 'CORPORATE FIXED DEPOSITS' ? '/products/corporate-fd' : '#'}
                          className="nested-item-link block px-5 py-3.5 text-[10px] font-bold text-slate-700 hover:text-brand-navy hover:bg-slate-50 uppercase tracking-widest transition-all duration-150"
                        >
                          {subItem}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="hidden lg:flex items-center gap-2 shrink-0">
          <a
            href="https://moneycompound.wealthmagic.in/Login.aspx"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-full text-[12px] font-bold text-black hover:text-brand-navy hover:bg-slate-50 border border-slate-200 transition-all duration-200 tracking-widest uppercase"
          >
            <LogIn size={15} />
            Login
          </a>
          <Link href="/contact-us" className="flex items-center gap-1.5 px-5 py-2.5 rounded-full text-[12px] font-bold bg-brand-navy text-white shadow-lg shadow-brand-navy/20 hover:scale-105 transition-all duration-200 tracking-widest uppercase whitespace-nowrap">
            <MessageSquare size={15} />
            Contact Us
          </Link>
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with Money Compound on WhatsApp"
            onClick={() => track(EVENTS.WHATSAPP_CLICK, { source: 'navbar' })}
            className="flex items-center justify-center w-11 h-11 rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/30 hover:scale-105 transition-all duration-200"
          >
            <WhatsAppGlyph size={20} />
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 text-brand-navy rounded-full hover:bg-slate-200/60 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden mt-0 w-full bg-white/95 backdrop-blur-xl border-t border-slate-100 shadow-xl p-5 relative z-50">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <div key={link.name} className="border-b border-slate-50 last:border-0">
                <div className="flex items-center justify-between py-3.5 cursor-pointer">
                  {link.subItems ? (
                    <div
                      className="text-[12px] font-bold text-slate-700 uppercase tracking-widest cursor-pointer w-full"
                      onClick={() => setMobileSubMenu(mobileSubMenu === link.name ? null : link.name)}
                    >
                      {link.name}
                    </div>
                  ) : (
                    <Link
                      href={link.href || '#'}
                      onClick={() => setIsMenuOpen(false)}
                      className={`text-[12px] font-bold uppercase tracking-widest transition-colors ${
                        currentPath === link.href ? 'text-brand-navy' : 'text-slate-700'
                      }`}
                    >
                      {link.name}
                    </Link>
                  )}
                  {link.subItems && (
                    <ChevronRight
                      size={16}
                      className={`text-slate-400 transition-transform duration-200 ${mobileSubMenu === link.name ? 'rotate-90' : ''}`}
                    />
                  )}
                </div>

                {link.subItems && mobileSubMenu === link.name && (
                  <div className="pb-3 pl-3 flex flex-col gap-3">
                    {link.subItems.map((sub) => (
                      <div key={sub.name} className="flex flex-col gap-1">
                        {sub.name === 'MUTUAL FUNDS' ? (
                          <Link href="/products/mutual-funds" onClick={() => setIsMenuOpen(false)} className={`text-[11px] font-bold uppercase tracking-widest transition-colors ${currentPath === '/products/mutual-funds' ? 'text-brand-gold' : 'text-brand-navy'}`}>{sub.name}</Link>
                        ) : sub.href ? (
                          <Link href={sub.href} onClick={() => setIsMenuOpen(false)} className={`text-[11px] font-bold uppercase tracking-widest transition-colors ${currentPath === sub.href ? 'text-brand-gold' : 'text-brand-navy'}`}>{sub.name}</Link>
                        ) : (
                          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">{sub.name}</span>
                        )}
                        {sub.items.map((item) => {
                          const itemName = typeof item === 'string' ? item : item.name;
                          const subItems = typeof item === 'object' ? item.subItems : null;
                          return (
                            <div key={itemName} className="flex flex-col gap-1">
                              {subItems ? (
                                <>
                                  <span className="text-[11px] font-bold text-slate-300 uppercase tracking-widest mt-2">{itemName}</span>
                                  {subItems.map(si => (
                                    <Link
                                      key={si}
                                      href={si === 'P2P LENDING' ? '/products/p2p-lending' : si === 'NATIONAL PENSION SCHEME' ? '/products/nps' : si === 'CORPORATE FIXED DEPOSITS' ? '/products/corporate-fd' : '#'}
                                      className="text-[11px] text-slate-600 font-bold uppercase py-1 tracking-wider ml-3"
                                      onClick={() => setIsMenuOpen(false)}
                                    >
                                      {si}
                                    </Link>
                                  ))}
                                </>
                              ) : (
                                <Link
                                  href={itemName === 'PMS' ? '/products/pms' : itemName === 'AIF' ? '/products/aif' : itemName === 'MUTUAL FUNDS' ? '/products/mutual-funds' : itemName === 'CORPORATE FIXED DEPOSITS' ? '/products/corporate-fd' : itemName === 'CAPITAL GAIN BOND' ? '/products/capital-gain-bond' : itemName === 'HOUSING LOAN' ? '/products/housing-loan' : itemName === 'LIFE INSURANCE' ? '/products/life-insurance' : itemName === 'HEALTH INSURANCE' ? '/products/health-insurance' : itemName === 'TRAVEL INSURANCE' ? '/products/travel-insurance' : itemName === 'GENERAL INSURANCE' ? '/products/general-insurance' : '#'}
                                  className="text-[11px] text-slate-600 font-bold uppercase py-1 tracking-wider"
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  {itemName}
                                </Link>
                              )}
                            </div>
                          )
                        })}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            <div className="flex flex-col gap-3 pt-4 mt-2 border-t border-slate-100">
              <a
                href="https://moneycompound.wealthmagic.in/Login.aspx"
                className="w-full py-3.5 rounded-xl text-[11px] font-bold border border-slate-200 text-slate-600 tracking-widest text-center flex items-center justify-center gap-2 hover:bg-slate-50 transition-all uppercase"
              >
                <LogIn size={15} /> Login
              </a>
              <div className="flex gap-3">
                <Link
                  href="/contact-us"
                  onClick={() => setIsMenuOpen(false)}
                  className="flex-1 py-3.5 rounded-xl text-[11px] font-bold bg-brand-navy text-white tracking-widest flex items-center justify-center gap-2 hover:bg-slate-900 transition-all uppercase"
                >
                  <MessageSquare size={15} /> Contact Us
                </Link>
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat with Money Compound on WhatsApp"
                  onClick={() => { setIsMenuOpen(false); track(EVENTS.WHATSAPP_CLICK, { source: 'navbar_mobile' }); }}
                  className="flex items-center justify-center w-12 h-12 rounded-xl bg-[#25D366] text-white shrink-0 shadow-md shadow-[#25D366]/30"
                >
                  <WhatsAppGlyph size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
