import { createContext, useContext, useState, useCallback, ReactNode } from 'react'
import { authService, LoginResponse } from '../services/authService'

interface AuthContextType {
  user: LoginResponse['user'] | null
  token: string | null
  isAuthenticated: boolean
  login: (identifier: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<LoginResponse['user'] | null>(() => authService.getUser())
  const [token, setToken] = useState<string | null>(() => authService.getToken())

  const login = useCallback(async (identifier: string, password: string) => {
    const response = await authService.login({ identifier, password })
    authService.storeAuthData(response.token, response.user)
    setToken(response.token)
    setUser(response.user)
  }, [])

  const logout = useCallback(() => {
    authService.clearAuth()
    setToken(null)
    setUser(null)
  }, [])

  const value: AuthContextType = {
    user,
    token,
    isAuthenticated: !!token && !!user,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}
