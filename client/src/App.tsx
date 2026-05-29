import { type MouseEvent, useState, useEffect } from 'react'
import './App.css'

function Nav() {
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
              <a href="#features-discover" onClick={handleDropdownLinkClick}>Dicover</a>
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

function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <h1 className="hero-title">Build bold. Build lasting.</h1>
        <p className="hero-sub">Plan, discover, and learn - capture insights and improve with every session in one easy app.</p>
        <div className="hero-cta">
          <a className="btn primary" href="#features">Get Started</a>
          <a className="btn ghost" href="#about">Sign In</a>
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
          <h3>Scoped</h3>
          <p>Robust Express API with MySQL connection pooling.</p>
        </div>
        <div className="feature">
          <h3>Explored</h3>
          <p>Vite + React for instant dev feedback and production builds.</p>
        </div>
        <div className="feature">
          <h3>Studied</h3>
          <p>Monorepo structure and clear separation keep growth manageable.</p>
        </div>
      </div>
    </section>
  )
}

interface Product {
  name: string
  description: string
  teamName: string
}

interface ProductData extends Product {
  id: number
  createdAt: string
  updatedAt: string
}

interface FormErrors {
  [key: string]: string
}

function NewProductForm({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState<Product>({
    name: '',
    description: '',
    teamName: ''
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required'
    }
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }
    if (!formData.teamName.trim()) {
      newErrors.teamName = 'Team name is required'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if (!response.ok) {
        throw new Error('Failed to create product')
      }

      const result = await response.json()
      setSuccessMessage(`Product "${result.name}" created successfully!`)
      
      // Reset form
      setFormData({
        name: '',
        description: '',
        teamName: ''
      })
      
      // Close form after 2 seconds
      setTimeout(() => {
        onClose()
      }, 2000)
    } catch (error) {
      console.error('Error creating product:', error)
      setErrors({ submit: 'Failed to create product. Please try again.' })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Create New Product</h2>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}
        
        <form onSubmit={handleSubmit} className="product-form">
          <div className="form-group">
            <label htmlFor="name">Product Name *</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter product name"
              disabled={isSubmitting}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter a short description"
              rows={4}
              disabled={isSubmitting}
            />
            {errors.description && <span className="error-message">{errors.description}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="teamName">Team Name *</label>
            <input
              type="text"
              id="teamName"
              name="teamName"
              value={formData.teamName}
              onChange={handleChange}
              placeholder="Enter team name"
              disabled={isSubmitting}
            />
            {errors.teamName && <span className="error-message">{errors.teamName}</span>}
          </div>

          {errors.submit && <div className="error-message">{errors.submit}</div>}

          <div className="form-actions">
            <button type="button" className="btn ghost" onClick={onClose} disabled={isSubmitting}>
              Cancel
            </button>
            <button type="submit" className="btn primary" disabled={isSubmitting}>
              {isSubmitting ? 'Creating...' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

function Plan() {
  const [showNewProductForm, setShowNewProductForm] = useState(false)

  return (
    <section id="features-plan" className="plan-page">
      <div className="plan-inner">
        <h1>Planning Tools</h1>
        <p className="plan-intro">Organize your thoughts and break down complex projects into actionable steps.</p>
        
        <div className="plan-links">
          <button 
            className="btn primary"
            onClick={() => setShowNewProductForm(true)}
          >
            + Create New Product
          </button>
        </div>

        <div className="plan-grid">
          <a href="#products" className="plan-card plan-card-link">
            <h3>Products</h3>
            <p>Set clear goals and milestones for your projects with built-in tracking.</p>
          </a>
          <div className="plan-card">
            <h3>Attributes</h3>
            <p>Single words describing product traits or characteristics important to the users and business.</p>
            <p>Examples: Secure, Social, Intuitive, Reliable, Fun</p>
          </div>
          <div className="plan-card">
            <h3>Components</h3>
            <p>Building blocks that together constitute a system and implement the attributes.</p>
            <p>Examples: Product Search, Shopping Cart, Checkout, User Account, Product Details</p>
          </div>
          <div className="plan-card">
            <h3>Capabilities</h3>
            <p>Actions the system performs in response to user inputs.</p>
            <p>Examples: Search for Products, Add to Cart, Purchase, Login, View Product Catalog</p>
          </div>
        </div>
      </div>

      {showNewProductForm && (
        <NewProductForm onClose={() => setShowNewProductForm(false)} />
      )}
    </section>
  )
}

function Products() {
  const [products, setProducts] = useState<ProductData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true)
        const response = await fetch('http://localhost:3000/api/products')
        
        if (!response.ok) {
          throw new Error('Failed to fetch products')
        }
        
        const data = await response.json()
        setProducts(data)
        setError(null)
      } catch (err) {
        console.error('Error fetching products:', err)
        setError('Failed to load products. Please try again later.')
        setProducts([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  return (
    <section id="products" className="products-page">
      <div className="products-inner">
        <div className="products-header">
          <h1>Products</h1>
          <a href="#features-plan" className="btn primary">← Back to Plan</a>
        </div>

        {isLoading && (
          <div className="loading-state">Loading products...</div>
        )}

        {error && (
          <div className="error-state">{error}</div>
        )}

        {!isLoading && !error && products.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-content">
              <h2>No Products Yet</h2>
              <p>You haven't created any products yet. Get started by creating your first product and begin organizing your projects.</p>
              <a href="#features-plan" className="btn primary">Create Your First Product</a>
            </div>
          </div>
        )}

        {!isLoading && !error && products.length > 0 && (
          <div className="products-table-container">
            <table className="products-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Team Name</th>
                  <th>Created</th>
                  <th>Updated</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>{product.description}</td>
                    <td>{product.teamName}</td>
                    <td>{new Date(product.createdAt).toLocaleDateString()}</td>
                    <td>{new Date(product.updatedAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
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
  const [currentPage, setCurrentPage] = useState<string>(window.location.hash || '#home')

  useEffect(() => {
    const handleHashChange = () => {
      setCurrentPage(window.location.hash || '#home')
    }
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  // Show Products page for products route
  if (currentPage === '#products') {
    return (
      <div className="app-root">
        <Nav />
        <main>
          <Products />
        </main>
        <Footer />
      </div>
    )
  }

  // Show Plan page for features-plan route
  if (currentPage === '#features-plan') {
    return (
      <div className="app-root">
        <Nav />
        <main>
          <Plan />
        </main>
        <Footer />
      </div>
    )
  }

  // Default home page
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
