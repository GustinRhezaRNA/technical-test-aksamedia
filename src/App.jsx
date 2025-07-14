import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { ThemeProvider } from './contexts/ThemeContext'
import { AuthProvider } from './contexts/AuthContext'
import { TransactionProvider } from './contexts/TransactionContext'
import ProtectedRoute from './components/ProtectedRoute'
import Layout from './components/Layout/Layout'
import ErrorBoundary from './components/ErrorBoundary'

// Pages
import Login from './pages/auth/Login'
import Dashboard from './pages/Dashboard'
import Transaction from './pages/transaction/Transaction'
import AddTransaction from './pages/transaction/AddTransaction'
import EditTransaction from './pages/transaction/EditTransaction'
import Profile from './pages/Profile'


function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <AuthProvider>
          <TransactionProvider>
            <Router>
              <Routes>
                {/* Public route */}
                <Route path="/login" element={<Login />} />

                {/* Protected routes */}
                <Route path="/" element={
                  <ProtectedRoute>
                    <Layout />
                  </ProtectedRoute>
                }>
                  <Route index element={<Navigate to="/dashboard" replace />} />
                  <Route path="dashboard" element={<Dashboard />} />
                  <Route path="transactions" element={<Transaction />} />
                  <Route path="transactions/add" element={<AddTransaction />} />
                  <Route path="transactions/edit/:id" element={<EditTransaction />} />
                  <Route path="profile" element={<Profile />} />
                </Route>

                {/* Catch all route */}
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </Router>
          </TransactionProvider>
        </AuthProvider>
      </ThemeProvider>
    </ErrorBoundary>
  )
}

export default App