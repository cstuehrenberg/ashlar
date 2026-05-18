import './App.css'

function Nav() {
  return (
    <header className="nav">
      <div className="nav-inner">
        <div className="logo">
          <img src="/assets/logo-256.webp" alt="Ashlar" className="logo-img" />
        </div>
        <nav className="links">
          <a href="#about">About</a>
          <a href="#features">Features</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <h1 className="hero-title">Build bold. Build lasting.</h1>
        <p className="hero-sub">Modern web apps with a handcrafted touch — React, Node, and MySQL.</p>
        <div className="hero-cta">
          <a className="btn primary" href="#features">Get Started</a>
          <a className="btn ghost" href="#about">Learn More</a>
        </div>
      </div>
    </section>
  )
}

function Features() {
  return (
    <section id="features" className="features">
      <div className="features-grid">
        <div className="feature">
          <h3>Solid Backend</h3>
          <p>Robust Express API with MySQL connection pooling.</p>
        </div>
        <div className="feature">
          <h3>Fast Frontend</h3>
          <p>Vite + React for instant dev feedback and production builds.</p>
        </div>
        <div className="feature">
          <h3>Scalable</h3>
          <p>Monorepo structure and clear separation keep growth manageable.</p>
        </div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>© {new Date().getFullYear()} Ashlar</div>
        <div className="footer-links">
          <a href="#privacy">Privacy</a>
          <a href="#terms">Terms</a>
        </div>
      </div>
    </footer>
  )
}

export default function App() {
  return (
    <div className="app-root">
      <Nav />
      <main>
        <Hero />
        <Features />
      </main>
      <Footer />
    </div>
  )
}
