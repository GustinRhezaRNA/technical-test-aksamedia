import { formatCurrency, formatDate, groupBy } from './index.js'

/**
 * Categories untuk transaksi
 */
export const TRANSACTION_CATEGORIES = {
    income: ['Salary', 'Freelance', 'Investment', 'Bonus', 'Gift', 'Other'],
    expense: ['Food', 'Transportation', 'Shopping', 'Utilities', 'Healthcare', 'Entertainment', 'Education', 'Other']
}

/**
 * Transaction types
 */
export const TRANSACTION_TYPES = {
    INCOME: 'income',
    EXPENSE: 'expense'
}

/**
 * Validasi data transaksi
 * @param {Object} transactionData - Data transaksi yang akan divalidasi
 * @returns {Object} - Object berisi errors
 */
export const validateTransaction = (transactionData) => {
    const errors = {}

    if (!transactionData.title?.trim()) {
        errors.title = 'Title is required'
    }

    if (!transactionData.description?.trim()) {
        errors.description = 'Description is required'
    }

    if (!transactionData.amount || parseFloat(transactionData.amount) <= 0) {
        errors.amount = 'Amount must be greater than 0'
    }

    if (!transactionData.category) {
        errors.category = 'Category is required'
    }

    if (!transactionData.type) {
        errors.type = 'Transaction type is required'
    }

    if (!transactionData.date) {
        errors.date = 'Date is required'
    }

    // Validate category based on type
    if (transactionData.type && transactionData.category) {
        const validCategories = TRANSACTION_CATEGORIES[transactionData.type] || []
        if (!validCategories.includes(transactionData.category)) {
            errors.category = `Invalid category for ${transactionData.type} transaction`
        }
    }

    return errors
}

/**
 * Mendapatkan semua kategori unik dari transaksi
 * @param {Array} transactions - Array transaksi
 * @returns {Array} - Array kategori unik
 */
export const getAllCategories = (transactions = []) => {
    const categories = transactions.map(t => t.category)
    return [...new Set(categories)].sort()
}

/**
 * Filter transaksi berdasarkan periode
 * @param {Array} transactions - Array transaksi
 * @param {string} period - Periode ('today', 'week', 'month', 'year')
 * @returns {Array} - Transaksi yang difilter
 */
export const filterTransactionsByPeriod = (transactions, period) => {
    const now = new Date()
    const startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate())

    switch (period) {
        case 'today':
            return transactions.filter(t => {
                const transactionDate = new Date(t.date)
                return transactionDate >= startOfDay
            })

        case 'week': {
            const startOfWeek = new Date(startOfDay)
            startOfWeek.setDate(startOfDay.getDate() - startOfDay.getDay())
            return transactions.filter(t => {
                const transactionDate = new Date(t.date)
                return transactionDate >= startOfWeek
            })
        }

        case 'month': {
            const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1)
            return transactions.filter(t => {
                const transactionDate = new Date(t.date)
                return transactionDate >= startOfMonth
            })
        }

        case 'year': {
            const startOfYear = new Date(now.getFullYear(), 0, 1)
            return transactions.filter(t => {
                const transactionDate = new Date(t.date)
                return transactionDate >= startOfYear
            })
        }

        default:
            return transactions
    }
}

/**
 * Menghitung total berdasarkan type
 * @param {Array} transactions - Array transaksi
 * @param {string} type - Type transaksi ('income' atau 'expense')
 * @returns {number} - Total amount
 */
export const calculateTotalByType = (transactions, type) => {
    return transactions
        .filter(t => t.type === type)
        .reduce((sum, t) => sum + t.amount, 0)
}

/**
 * Mendapatkan statistik transaksi berdasarkan kategori
 * @param {Array} transactions - Array transaksi
 * @returns {Object} - Statistik per kategori
 */
export const getCategoryStatistics = (transactions) => {
    const grouped = groupBy(transactions, 'category')

    return Object.entries(grouped).map(([category, categoryTransactions]) => {
        const income = calculateTotalByType(categoryTransactions, TRANSACTION_TYPES.INCOME)
        const expense = calculateTotalByType(categoryTransactions, TRANSACTION_TYPES.EXPENSE)

        return {
            category,
            income,
            expense,
            total: income + expense,
            count: categoryTransactions.length,
            transactions: categoryTransactions
        }
    }).sort((a, b) => b.total - a.total)
}

/**
 * Mendapatkan transaksi terbesar
 * @param {Array} transactions - Array transaksi
 * @param {number} limit - Jumlah transaksi yang akan diambil
 * @returns {Array} - Transaksi terbesar
 */
export const getTopTransactions = (transactions, limit = 5) => {
    return [...transactions]
        .sort((a, b) => b.amount - a.amount)
        .slice(0, limit)
}

/**
 * Format data transaksi untuk export
 * @param {Array} transactions - Array transaksi
 * @returns {Array} - Data yang siap di-export
 */
export const formatTransactionsForExport = (transactions) => {
    return transactions.map(transaction => ({
        'Date': formatDate(transaction.date),
        'Title': transaction.title,
        'Description': transaction.description,
        'Type': transaction.type.toUpperCase(),
        'Category': transaction.category,
        'Amount': formatCurrency(transaction.amount)
    }))
}

/**
 * Mencari transaksi berdasarkan query
 * @param {Array} transactions - Array transaksi
 * @param {string} query - Query pencarian
 * @returns {Array} - Hasil pencarian
 */
export const searchTransactions = (transactions, query) => {
    if (!query.trim()) return transactions

    const searchTerm = query.toLowerCase()

    return transactions.filter(transaction => {
        return (
            transaction.title.toLowerCase().includes(searchTerm) ||
            transaction.description.toLowerCase().includes(searchTerm) ||
            transaction.category.toLowerCase().includes(searchTerm) ||
            transaction.type.toLowerCase().includes(searchTerm)
        )
    })
}

/**
 * Menghitung trend transaksi (perbandingan dengan periode sebelumnya)
 * @param {Array} currentTransactions - Transaksi periode saat ini
 * @param {Array} previousTransactions - Transaksi periode sebelumnya
 * @returns {Object} - Data trend
 */
export const calculateTransactionTrend = (currentTransactions, previousTransactions) => {
    const currentIncome = calculateTotalByType(currentTransactions, TRANSACTION_TYPES.INCOME)
    const currentExpense = calculateTotalByType(currentTransactions, TRANSACTION_TYPES.EXPENSE)
    const previousIncome = calculateTotalByType(previousTransactions, TRANSACTION_TYPES.INCOME)
    const previousExpense = calculateTotalByType(previousTransactions, TRANSACTION_TYPES.EXPENSE)

    const incomeChange = previousIncome === 0 ? 0 : ((currentIncome - previousIncome) / previousIncome) * 100
    const expenseChange = previousExpense === 0 ? 0 : ((currentExpense - previousExpense) / previousExpense) * 100

    return {
        income: {
            current: currentIncome,
            previous: previousIncome,
            change: incomeChange,
            trend: incomeChange > 0 ? 'up' : incomeChange < 0 ? 'down' : 'stable'
        },
        expense: {
            current: currentExpense,
            previous: previousExpense,
            change: expenseChange,
            trend: expenseChange > 0 ? 'up' : expenseChange < 0 ? 'down' : 'stable'
        }
    }
}

/**
 * Generate laporan transaksi
 * @param {Array} transactions - Array transaksi
 * @param {string} period - Periode laporan
 * @returns {Object} - Data laporan
 */
export const generateTransactionReport = (transactions, period = 'month') => {
    const filteredTransactions = filterTransactionsByPeriod(transactions, period)

    const totalIncome = calculateTotalByType(filteredTransactions, TRANSACTION_TYPES.INCOME)
    const totalExpense = calculateTotalByType(filteredTransactions, TRANSACTION_TYPES.EXPENSE)
    const balance = totalIncome - totalExpense

    const categoryStats = getCategoryStatistics(filteredTransactions)
    const topTransactions = getTopTransactions(filteredTransactions, 10)

    return {
        period,
        summary: {
            totalIncome,
            totalExpense,
            balance,
            transactionCount: filteredTransactions.length
        },
        categoryStats,
        topTransactions,
        transactions: filteredTransactions
    }
}