import { type MouseEvent } from 'react'

export function Nav() {
  const handleDropdownLinkClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.currentTarget.blur()
  }

  return (
    <header className="nav">
      <div className="nav-inner">
        <div className="logo">
          <img src="/assets/logo-256.webp" alt="Ashlar" className="logo-img" />
        </div>
        <nav className="links">
          <div className="dropdown">
            <a className="drop-header" href="#about">About</a>
            <div className="dropdown-menu">
              <a href="#about-overview" onClick={handleDropdownLinkClick}>Overview</a>
              <a href="#about-team" onClick={handleDropdownLinkClick}>Team</a>
            </div>
          </div>

          <div className="dropdown">
            <a className="drop-header" href="#features">Features</a>
            <div className="dropdown-menu">
              <a href="#features-plan" onClick={handleDropdownLinkClick}>Plan</a>
              <a href="#features-explore" onClick={handleDropdownLinkClick}>Explore</a>
              <a href="#features-learn" onClick={handleDropdownLinkClick}>Learn</a>
            </div>
          </div>

          <div className="dropdown">
            <a className="drop-header" href="#contact">Contact</a>
            <div className="dropdown-menu">
              <a href="#contact-support" onClick={handleDropdownLinkClick}>Support</a>
              <a href="#contact-sales" onClick={handleDropdownLinkClick}>Sales</a>
              <a href="#contact-careers" onClick={handleDropdownLinkClick}>Careers</a>
            </div>
          </div>
        </nav>
      </div>
    </header>
  )
}
