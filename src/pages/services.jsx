import Link from 'next/link'

export default function ServicesPage() {
  return (
    <div style={{ padding: '40px', fontFamily: 'system-ui' }}>
      <h1>Our Services</h1>
      <p>Professional services to grow your portfolio.</p>
      <nav>
        <ul style={{ display: 'flex', gap: '20px', listStyle: 'none', padding: 0 }}>
          <li><Link href="/">Home</Link></li>
          <li><Link href="/products">Products</Link></li>
          <li><Link href="/services">Services</Link></li>
        </ul>
      </nav>
    </div>
  );
}
