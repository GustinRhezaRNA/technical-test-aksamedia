// Demo untuk implementasi Dashboard dengan modularisasi
import { useTransactions } from '../contexts/TransactionContext'
import { useAuth } from '../contexts/AuthContext'
import { useTransactionStats } from '../hooks'
import { StatsCard, TransactionCard, QuickActionCard } from '../components/cards'
import { EmptyState, LoadingSpinner } from '../components/common'
import { formatCurrency, getCurrentMonthName } from '../utils'
import {
    TrendingUp,
    TrendingDown,
    DollarSign,
    Activity,
    Plus,
    Calendar,
    Receipt
} from 'lucide-react'
import { Link } from 'react-router-dom'

const Dashboard = () => {
    const { transactions, loading } = useTransactions()
    const { user } = useAuth()
    const { stats, getCurrentMonthStats, getRecentTransactions } = useTransactionStats(transactions)

    const monthlyStats = getCurrentMonthStats()
    const recentTransactions = getRecentTransactions(5)

    if (loading) {
        return (
            <div className="flex items-center justify-center py-12">
                <LoadingSpinner size="large" />
                <span className="ml-3 text-gray-600 dark:text-gray-400">Loading dashboard...</span>
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

            {/* Monthly Stats Cards */}
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
                            {formatCurrency(stats.totalIncome)}
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Total Expenses</p>
                        <p className="text-xl font-bold text-red-600 dark:text-red-400">
                            {formatCurrency(stats.totalExpense)}
                        </p>
                    </div>
                    <div className="text-center">
                        <p className="text-sm text-gray-600 dark:text-gray-400">Net Balance</p>
                        <p className={`text-xl font-bold ${stats.balance >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                            {formatCurrency(stats.balance)}
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
                        <EmptyState
                            icon={Receipt}
                            title="No transactions yet"
                            description="Start tracking your finances by adding your first transaction."
                            actionButton={
                                <Link
                                    to="/transactions/add"
                                    className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                                >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Transaction
                                </Link>
                            }
                        />
                    ) : (
                        <div className="space-y-4">
                            {recentTransactions.map((transaction) => (
                                <TransactionCard
                                    key={transaction.id}
                                    transaction={transaction}
                                    showActions={false}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <QuickActionCard
                        title="Add Transaction"
                        description="Record a new income or expense"
                        icon={Plus}
                        color="blue"
                        onClick={() => window.location.href = '/transactions/add'}
                    />
                    <QuickActionCard
                        title="View All Transactions"
                        description="Browse and manage your transactions"
                        icon={Calendar}
                        color="outline"
                        onClick={() => window.location.href = '/transactions'}
                    />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
