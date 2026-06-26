const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5300/api'

export interface LoginPayload {
  identifier: string
  password: string
}

export interface LoginResponse {
  message: string
  token: string
  user: {
    email: string
    role: string
    title: string | null
    redirectTo: string
  }
  error?: string
}

export interface ForgotPasswordPayload {
  email: string
}

export interface ForgotPasswordResponse {
  message: string
  error?: string
}

class AuthService {
  /**
   * Login with username/email and password
   * @throws Error with specific messages for different failure scenarios
   */
  async login(payload: LoginPayload): Promise<LoginResponse> {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const data = await response.json()

    if (!response.ok) {
      // Parse error messages from backend
      if (data.error) {
        if (data.error.includes('not found') || data.error.includes('does not exist')) {
          throw new Error('Username or email not found')
        }
        throw new Error(data.error)
      }
      throw new Error(data.message || 'Login failed')
    }

    return data
  }

  /**
   * Request password reset code
   * @throws Error with messages from backend
   */
  async requestPasswordReset(payload: ForgotPasswordPayload): Promise<ForgotPasswordResponse> {
    const response = await fetch(`${API_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(data.error || data.message || 'Password reset request failed')
    }

    return data
  }

  /**
   * Store authentication data in localStorage
   */
  storeAuthData(token: string, user: LoginResponse['user']): void {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
  }

  /**
   * Get stored authentication token
   */
  getToken(): string | null {
    return localStorage.getItem('token')
  }

  /**
   * Get stored user data
   */
  getUser(): LoginResponse['user'] | null {
    const user = localStorage.getItem('user')
    return user ? JSON.parse(user) : null
  }

  /**
   * Clear all authentication data
   */
  clearAuth(): void {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return !!this.getToken() && !!this.getUser()
  }
}

export const authService = new AuthService()
