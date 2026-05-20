import './Auth.css'

interface LoginFormData {
  email: string
  password: string
}

export default function Auth() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would handle login logic
    console.log('Login submitted')
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-header">
          <h1>Welcome back to TBI Employment Pathways</h1>
          <p>Sign in to access your employment journey dashboard</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              name="email"
              required
              placeholder="Enter your email address"
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              required
              placeholder="Enter your password"
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="btn-primary btn-full">
            Sign In
          </button>

          <div className="auth-links">
            <a href="#" className="link-secondary">Forgot password?</a>
          </div>
        </form>

        <div className="demo-notice">
          <strong>Demo Mode:</strong> Use any email and password to enter the demo
        </div>
      </div>
    </div>
  )
}
