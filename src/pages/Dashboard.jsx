// src/pages/Dashboard.jsx
import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { useTransactions } from '../contexts/TransactionContext'
import { useAuth } from '../contexts/AuthContext'
import { TrendingUp, TrendingDown, DollarSign, Plus, Calendar, ArrowUpRight, ArrowDownRight, Activity } from 'lucide-react'

const Dashboard = () => {
  const { transactions, getSummary, loading } = useTransactions()
  const { user } = useAuth()
  const [recentTransactions, setRecentTransactions] = useState([])
  const [monthlyStats, setMonthlyStats] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    transactionCount: 0
  })

  const calculateMonthlyStats = useCallback(() => {
    const currentMonth = new Date().getMonth()
    const currentYear = new Date().getFullYear()

    const monthlyTransactions = transactions.filter(transaction => {
      const transactionDate = new Date(transaction.date)
      return transactionDate.getMonth() === currentMonth &&
        transactionDate.getFullYear() === currentYear
    })

    const totalIncome = monthlyTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0)

    const totalExpense = monthlyTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0)

    setMonthlyStats({
      totalIncome,
      totalExpense,
      balance: totalIncome - totalExpense,
      transactionCount: monthlyTransactions.length
    })
  }, [transactions])

  const getRecentTransactions = useCallback(() => {
    const recent = [...transactions]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5)
    setRecentTransactions(recent)
  }, [transactions])

  useEffect(() => {
    if (!loading) {
      calculateMonthlyStats()
      getRecentTransactions()
    }
  }, [loading, calculateMonthlyStats, getRecentTransactions])

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const getCurrentMonthName = () => {
    return new Date().toLocaleString('default', { month: 'long', year: 'numeric' })
  }

  const StatsCard = ({ title, value, icon: Icon, color }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className={`text-2xl font-bold ${color}`}>
            {typeof value === 'number' ? formatCurrency(value) : value}
          </p>
        </div>
        <div className={`p-3 rounded-full ${color.includes('green') ? 'bg-green-100 dark:bg-green-900/20' :
          color.includes('red') ? 'bg-red-100 dark:bg-red-900/20' :
            'bg-blue-100 dark:bg-blue-900/20'}`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
      </div>
    </div>
  )

  const allStats = getSummary()

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600 dark:text-gray-400">Loading dashboard...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg p-6 text-white">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {user?.fullName || 'Admin'}! 👋
        </h1>
        <p className="text-blue-100">
          Here's your financial overview for {getCurrentMonthName()}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Income"
          value={monthlyStats.totalIncome}
          icon={TrendingUp}
          color="text-green-600 dark:text-green-400"
        />
        <StatsCard
          title="Total Expenses"
          value={monthlyStats.totalExpense}
          icon={TrendingDown}
          color="text-red-600 dark:text-red-400"
        />
        <StatsCard
          title="Net Balance"
          value={monthlyStats.balance}
          icon={DollarSign}
          color={monthlyStats.balance >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}
        />
        <StatsCard
          title="Transactions"
          value={monthlyStats.transactionCount}
          icon={Activity}
          color="text-blue-600 dark:text-blue-400"
        />
      </div>

      {/* All Time Stats */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">All Time Statistics</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Income</p>
            <p className="text-xl font-bold text-green-600 dark:text-green-400">
              {formatCurrency(allStats.totalIncome)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Total Expenses</p>
            <p className="text-xl font-bold text-red-600 dark:text-red-400">
              {formatCurrency(allStats.totalExpense)}
            </p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">Net Balance</p>
            <p className={`text-xl font-bold ${allStats.balance >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
              {formatCurrency(allStats.balance)}
            </p>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Transactions</h2>
            <Link
              to="/transactions"
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
            >
              View all
            </Link>
          </div>
        </div>

        <div className="p-6">
          {recentTransactions.length === 0 ? (
            <div className="text-center py-8">
              <Activity className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No transactions yet</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Start tracking your finances by adding your first transaction.
              </p>
              <Link
                to="/transactions/add"
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Transaction
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-full ${transaction.type === 'income'
                        ? 'bg-green-100 dark:bg-green-900/20'
                        : 'bg-red-100 dark:bg-red-900/20'
                      }`}>
                      {transaction.type === 'income' ? (
                        <ArrowDownRight className="h-5 w-5 text-green-600 dark:text-green-400" />
                      ) : (
                        <ArrowUpRight className="h-5 w-5 text-red-600 dark:text-red-400" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {transaction.title}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {transaction.category} • {new Date(transaction.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-semibold ${transaction.type === 'income'
                        ? 'text-green-600 dark:text-green-400'
                        : 'text-red-600 dark:text-red-400'
                      }`}>
                      {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link
            to="/transactions/add"
            className="flex items-center justify-center px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Transaction
          </Link>
          <Link
            to="/transactions"
            className="flex items-center justify-center px-6 py-4 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Calendar className="h-5 w-5 mr-2" />
            View All Transactions
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
