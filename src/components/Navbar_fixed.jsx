import React, { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { Menu, X, MessageSquare, LogIn, ChevronRight } from 'lucide-react'
import gsap from 'gsap'

const Navbar = () => {
  const [mounted, setMounted] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const [activeSubItem, setActiveSubItem] = useState(null)
  const [activeNestedItem, setActiveNestedItem] = useState(null)
  const navRef = useRef(null)
  const pillRef = useRef(null)
  const closeTimeoutRef = useRef(null)

  useEffect(() => {
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

  const handleMouseEnter = (linkName) => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current)
    const linkObj = navLinks.find(l => l.name === linkName)
    if (linkObj?.subItems) {
      setActiveDropdown(linkName)
      setActiveSubItem(null)
      setTimeout(() => {
        gsap.fromTo(
          `.mega-menu-${linkName.replace(/\s/g, '-')}`,
          { opacity: 0, y: 12, filter: 'blur(6px)' },
          { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.45, ease: 'power3.out' }
        )
        gsap.fromTo('.mega-left-item',
          { opacity: 0, x: -10 },
          { opacity: 1, x: 0, stagger: 0.04, duration: 0.4, ease: 'power2.out', delay: 0.05 }
        )
      }, 10)
    } else {
      setActiveDropdown(null)
      setActiveSubItem(null)
    }
  }

  const handleMouseLeave = () => {
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
    { name: 'RESOURCES', href: '/gallery' },
    { name: 'BLOG', href: '/blog' },
  ]

  const [mobileSubMenu, setMobileSubMenu] = useState(null)
  if (!mounted) return null

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-[#2C78C5] to-[#52C19E] shadow-[0_4px_20px_rgba(44,120,197,0.2)] border-b border-white/20"
      style={{ minHeight: '110px' }}
    >
      <div ref={pillRef} className="max-w-7xl mx-auto h-full flex items-center justify-between px-6 md:px-12 py-3 relative">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0">
          <img
            src="/images/new_logo.png"
            alt="Money Compound"
            className="h-[80px] md:h-[95px] lg:h-[110px] w-auto object-contain hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* Desktop Links */}
        <div className="relative hidden lg:flex items-center gap-1 flex-1 justify-center">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="relative nav-link-item"
              onMouseEnter={() => handleMouseEnter(link.name)}
              onMouseLeave={handleMouseLeave}
            >
              {link.subItems ? (
                <button
                  type="button"
                  className="block w-full px-4 py-2 text-[15px] font-bold text-white hover:text-white transition-colors duration-200 uppercase tracking-tight rounded-full hover:bg-white/15 whitespace-nowrap text-left cursor-pointer"
                >
                  {link.name}
                </button>
              ) : (
                <Link
                  href={link.href || '#'}
                  className="block px-4 py-2 text-[15px] font-bold text-white hover:text-white transition-colors duration-200 uppercase tracking-tight rounded-full hover:bg-white/15 whitespace-nowrap"
                >
                  {link.name}
                </Link>
              )}

              {/* Mega Menu Dropdown */}
              {link.subItems && activeDropdown === link.name && (
                <div
                  className={`mega-menu-${link.name.replace(/\s/g, '-')} absolute top-[calc(100%+4px)] left-0 bg-white border border-slate-100 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] z-50 flex
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
                        className={`mega-left-item flex items-center justify-between px-5 py-3.5 text-[11px] font-semibold uppercase tracking-widest cursor-pointer transition-all duration-200 ${activeSubItem === category.name
                          ? 'bg-[#1a5fa8] text-white'
                          : 'text-slate-500 hover:bg-slate-50 hover:text-[#2C78C5]'
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
                            className={`sub-item-link flex items-center justify-between px-5 py-3.5 text-[11px] font-medium transition-all duration-150 cursor-pointer ${activeNestedItem === itemName ? 'bg-slate-50 text-[#2C78C5]' : 'text-slate-500 hover:text-[#2C78C5] hover:bg-slate-50'} uppercase tracking-widest`}
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
                          className="nested-item-link block px-5 py-3.5 text-[11px] font-medium text-slate-500 hover:text-[#2C78C5] hover:bg-slate-50 uppercase tracking-widest transition-all duration-150"
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
        <div className="hidden lg:flex items-center gap-6 shrink-0 pr-12">
          <a
            href="https://moneycompound.wealthmagic.in/Login.aspx"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-2.5 rounded-full text-[13px] font-semibold text-white/80 hover:text-white hover:bg-white/10 border border-white/20 transition-all duration-200 tracking-wide"
          >
            <LogIn size={15} />
            Login
          </a>
          <Link href="/contact-us" className="flex items-center gap-2 px-6 py-3 rounded-full text-[13px] font-bold bg-white text-[#2C78C5] shadow-lg hover:scale-105 transition-all duration-200 tracking-wide">
            <MessageSquare size={16} />
            Contact Us
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden p-2 text-white rounded-full hover:bg-white/15 transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden mt-0 w-full bg-gradient-to-r from-[#2C78C5] to-[#52C19E] border-t border-white/20 shadow-xl p-5 relative z-50">
          <div className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <div key={link.name} className="border-b border-white/10 last:border-0">
                <div className="flex items-center justify-between py-3.5 cursor-pointer">
                  {link.subItems ? (
                    <div
                      className="text-[13px] font-semibold text-white uppercase tracking-widest cursor-pointer w-full"
                      onClick={() => setMobileSubMenu(mobileSubMenu === link.name ? null : link.name)}
                    >
                      {link.name}
                    </div>
                  ) : (
                    <Link
                      href={link.href || '#'}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-[13px] font-semibold text-white uppercase tracking-widest"
                    >
                      {link.name}
                    </Link>
                  )}
                  {link.subItems && (
                    <ChevronRight
                      size={16}
                      className={`text-white/60 transition-transform duration-200 ${mobileSubMenu === link.name ? 'rotate-90' : ''}`}
                    />
                  )}
                </div>

                {link.subItems && mobileSubMenu === link.name && (
                  <div className="pb-3 pl-3 flex flex-col gap-3">
                    {link.subItems.map((sub) => (
                      <div key={sub.name} className="flex flex-col gap-1">
                        {sub.name === 'MUTUAL FUNDS' ? (
                          <Link href="/products/mutual-funds" onClick={() => setIsMenuOpen(false)} className="text-[11px] font-bold text-white uppercase tracking-widest">{sub.name}</Link>
                        ) : sub.href ? (
                          <Link href={sub.href} onClick={() => setIsMenuOpen(false)} className="text-[11px] font-bold text-white uppercase tracking-widest">{sub.name}</Link>
                        ) : (
                          <span className="text-[11px] font-bold text-white/70 uppercase tracking-widest">{sub.name}</span>
                        )}
                        {sub.items.map((item) => {
                          const itemName = typeof item === 'string' ? item : item.name;
                          const subItems = typeof item === 'object' ? item.subItems : null;
                          return (
                            <div key={itemName} className="flex flex-col gap-1">
                              {subItems ? (
                                <>
                                  <span className="text-[11px] font-bold text-white/60 uppercase tracking-widest mt-2">{itemName}</span>
                                  {subItems.map(si => (
                                    <Link
                                      key={si}
                                      href={si === 'P2P LENDING' ? '/products/p2p-lending' : si === 'NATIONAL PENSION SCHEME' ? '/products/nps' : si === 'CORPORATE FIXED DEPOSITS' ? '/products/corporate-fd' : '#'}
                                      className="text-[12px] text-white/80 uppercase py-1 tracking-wider ml-3"
                                      onClick={() => setIsMenuOpen(false)}
                                    >
                                      {si}
                                    </Link>
                                  ))}
                                </>
                              ) : (
                                <Link
                                  href={itemName === 'PMS' ? '/products/pms' : itemName === 'AIF' ? '/products/aif' : itemName === 'MUTUAL FUNDS' ? '/products/mutual-funds' : itemName === 'CORPORATE FIXED DEPOSITS' ? '/products/corporate-fd' : itemName === 'CAPITAL GAIN BOND' ? '/products/capital-gain-bond' : itemName === 'HOUSING LOAN' ? '/products/housing-loan' : itemName === 'LIFE INSURANCE' ? '/products/life-insurance' : itemName === 'HEALTH INSURANCE' ? '/products/health-insurance' : itemName === 'TRAVEL INSURANCE' ? '/products/travel-insurance' : itemName === 'GENERAL INSURANCE' ? '/products/general-insurance' : '#'}
                                  className="text-[12px] text-white/80 uppercase py-1 tracking-wider"
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

            <div className="flex flex-col gap-3 pt-4 mt-2 border-t border-white/10">
              <a
                href="https://moneycompound.wealthmagic.in/Login.aspx"
                className="w-full py-3.5 rounded-full text-[13px] font-semibold border border-white/40 text-white tracking-wide text-center flex items-center justify-center gap-2 hover:bg-white/15 transition-all"
              >
                <LogIn size={15} /> Login
              </a>
              <button className="w-full py-3.5 rounded-full text-[13px] font-bold bg-white text-[#2C78C5] tracking-wide flex items-center justify-center gap-2 hover:bg-slate-50 transition-all">
                <MessageSquare size={15} /> Contact Us
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

export default Navbar
