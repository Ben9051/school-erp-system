import { useState } from 'react'
import { Mail, Lock, Eye, EyeOff, ShieldAlert, X } from 'lucide-react'
import { authService } from './services/authService'

export default function Login() {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showResetForm, setShowResetForm] = useState(false)
  const [resetEmail, setResetEmail] = useState('')
  const [resetLoading, setResetLoading] = useState(false)
  const [resetMessage, setResetMessage] = useState('')
  const [resetError, setResetError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await authService.login({ identifier, password })

      // Store auth data
      authService.storeAuthData(response.token, response.user)

      // Show success alert with redirect destination
      alert(`Login successful! Redirecting to ${response.user.redirectTo}`)

      // Redirect to the specified path
      window.location.href = response.user.redirectTo
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Authentication failed'
      setError(errorMessage)
      setLoading(false)
    }
  }

  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setResetError('')
    setResetMessage('')
    setResetLoading(true)

    try {
      await authService.requestPasswordReset({ email: resetEmail })

      setResetMessage('Reset code has been sent to your email. Please check your inbox.')
      setResetLoading(false)
      setTimeout(() => {
        setShowResetForm(false)
        setResetEmail('')
        setResetMessage('')
      }, 3000)
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to process request'
      setResetError(errorMessage)
      setResetLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Error Banner */}
        {error && (
          <div className="mb-6 bg-red-500/10 border border-red-500/30 rounded-lg p-4 flex items-start gap-3">
            <ShieldAlert className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <p className="text-red-500 text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Login Card */}
        <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl p-8">
          {/* Header */}
          <h1 className="text-3xl font-bold text-white text-center mb-8 tracking-tight">
            School ERP
          </h1>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username/Email Label and Input */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Enter username or email
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input
                  type="text"
                  placeholder="username or email"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  required
                  className="w-full bg-slate-900 text-white pl-10 pr-4 py-3 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>

            {/* Password Label and Input */}
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <Lock className="w-5 h-5" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-slate-900 text-white pl-10 pr-12 py-3 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg transition-colors mt-8"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          {/* Forgot Password Button */}
          <button
            onClick={() => setShowResetForm(true)}
            className="w-full text-blue-400 hover:text-blue-300 text-sm font-medium py-2 mt-4 transition-colors"
          >
            Forgot password?
          </button>
        </div>
      </div>

      {/* Password Reset Modal */}
      {showResetForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-2xl border border-slate-700 shadow-2xl p-6 w-full max-w-sm relative">
            {/* Close Button */}
            <button
              onClick={() => {
                setShowResetForm(false)
                setResetEmail('')
                setResetMessage('')
                setResetError('')
              }}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-300 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Header */}
            <h2 className="text-2xl font-bold text-white mb-2">Reset Password</h2>
            <p className="text-slate-400 text-sm mb-6">
              Enter your email address and we'll send you a reset code.
            </p>

            {/* Error Message */}
            {resetError && (
              <div className="mb-4 bg-red-500/10 border border-red-500/30 rounded-lg p-3 flex items-start gap-2">
                <ShieldAlert className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-red-500 text-sm">{resetError}</p>
              </div>
            )}

            {/* Success Message */}
            {resetMessage && (
              <div className="mb-4 bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                <p className="text-green-500 text-sm">{resetMessage}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handlePasswordReset} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input
                    type="email"
                    placeholder="your email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    required
                    className="w-full bg-slate-900 text-white pl-10 pr-4 py-3 rounded-lg border border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={resetLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-600/50 disabled:cursor-not-allowed text-white font-semibold py-2 rounded-lg transition-colors mt-6"
              >
                {resetLoading ? 'Sending...' : 'Send Reset Code'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
