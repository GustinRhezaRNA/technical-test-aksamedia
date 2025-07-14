import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

const CREDENTIALS = {
  username: 'admin',
  password: 'finance123'
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const savedAuth = localStorage.getItem('auth')
    if (savedAuth) {
      const authData = JSON.parse(savedAuth)
      setUser(authData.user)
    }
    setLoading(false)
  }, [])

  const login = (username, password) => {
    if (username === CREDENTIALS.username && password === CREDENTIALS.password) {
      const userData = {
        id: 1,
        username: CREDENTIALS.username,
        fullName: 'Admin User'
      }
      setUser(userData)
      localStorage.setItem('auth', JSON.stringify({ 
        isAuthenticated: true, 
        user: userData 
      }))
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('auth')
  }

  const updateProfile = (newData) => {
    const updatedUser = { ...user, ...newData }
    setUser(updatedUser)
    localStorage.setItem('auth', JSON.stringify({
      isAuthenticated: true,
      user: updatedUser
    }))
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      updateProfile,
      loading,
      isAuthenticated: !!user 
    }}>
      {children}
    </AuthContext.Provider>
  )
}