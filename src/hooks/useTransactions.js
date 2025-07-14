import { useState, useEffect, useCallback } from 'react'

/**
 * Custom hook untuk menghitung statistik transaksi
 * @param {Array} transactions - Array transaksi
 * @returns {Object} - Statistik transaksi
 */
export const useTransactionStats = (transactions = []) => {
    const [stats, setStats] = useState({
        totalIncome: 0,
        totalExpense: 0,
        balance: 0,
        totalTransactions: 0,
        monthlyStats: {},
        categoryStats: {}
    })

    const calculateStats = useCallback(() => {
        if (!transactions.length) {
            setStats({
                totalIncome: 0,
                totalExpense: 0,
                balance: 0,
                totalTransactions: 0,
                monthlyStats: {},
                categoryStats: {}
            })
            return
        }

        const totalIncome = transactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0)

        const totalExpense = transactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0)

        // Monthly stats
        const monthlyStats = transactions.reduce((acc, transaction) => {
            const date = new Date(transaction.date)
            const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`

            if (!acc[key]) {
                acc[key] = { income: 0, expense: 0, count: 0 }
            }

            if (transaction.type === 'income') {
                acc[key].income += transaction.amount
            } else {
                acc[key].expense += transaction.amount
            }
            acc[key].count += 1

            return acc
        }, {})

        // Category stats
        const categoryStats = transactions.reduce((acc, transaction) => {
            const { category, type, amount } = transaction

            if (!acc[category]) {
                acc[category] = { income: 0, expense: 0, count: 0 }
            }

            if (type === 'income') {
                acc[category].income += amount
            } else {
                acc[category].expense += amount
            }
            acc[category].count += 1

            return acc
        }, {})

        setStats({
            totalIncome,
            totalExpense,
            balance: totalIncome - totalExpense,
            totalTransactions: transactions.length,
            monthlyStats,
            categoryStats
        })
    }, [transactions])

    useEffect(() => {
        calculateStats()
    }, [calculateStats])

    const getCurrentMonthStats = useCallback(() => {
        const currentDate = new Date()
        const currentMonth = currentDate.getMonth()
        const currentYear = currentDate.getFullYear()

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

        return {
            totalIncome,
            totalExpense,
            balance: totalIncome - totalExpense,
            transactionCount: monthlyTransactions.length
        }
    }, [transactions])

    const getRecentTransactions = useCallback((limit = 5) => {
        return [...transactions]
            .sort((a, b) => new Date(b.date) - new Date(a.date))
            .slice(0, limit)
    }, [transactions])

    const getTopCategories = useCallback((type = 'expense', limit = 5) => {
        const categoryTotals = transactions
            .filter(t => t.type === type)
            .reduce((acc, transaction) => {
                const { category, amount } = transaction
                acc[category] = (acc[category] || 0) + amount
                return acc
            }, {})

        return Object.entries(categoryTotals)
            .sort(([, a], [, b]) => b - a)
            .slice(0, limit)
            .map(([category, amount]) => ({ category, amount }))
    }, [transactions])

    return {
        stats,
        getCurrentMonthStats,
        getRecentTransactions,
        getTopCategories,
        refreshStats: calculateStats
    }
}

/**
 * Custom hook untuk mengelola data transaksi
 * @param {Array} initialTransactions - Transaksi awal
 * @returns {Object} - Transaction management methods
 */
export const useTransactionManagement = (initialTransactions = []) => {
    const [transactions, setTransactions] = useState(initialTransactions)
    const [loading, setLoading] = useState(false)

    const addTransaction = useCallback((transactionData) => {
        const newTransaction = {
            ...transactionData,
            id: Date.now().toString(),
            createdAt: new Date().toISOString()
        }
        setTransactions(prev => [newTransaction, ...prev])
        return newTransaction
    }, [])

    const updateTransaction = useCallback((id, transactionData) => {
        setTransactions(prev =>
            prev.map(transaction =>
                transaction.id === id
                    ? { ...transaction, ...transactionData }
                    : transaction
            )
        )
    }, [])

    const deleteTransaction = useCallback((id) => {
        setTransactions(prev => prev.filter(transaction => transaction.id !== id))
    }, [])

    const getTransaction = useCallback((id) => {
        return transactions.find(transaction => transaction.id === id)
    }, [transactions])

    const bulkDeleteTransactions = useCallback((ids) => {
        setTransactions(prev => prev.filter(transaction => !ids.includes(transaction.id)))
    }, [])

    const duplicateTransaction = useCallback((id) => {
        const transaction = getTransaction(id)
        if (transaction) {
            const duplicated = {
                ...transaction,
                id: Date.now().toString(),
                title: `${transaction.title} (Copy)`,
                date: new Date().toISOString().split('T')[0],
                createdAt: new Date().toISOString()
            }
            setTransactions(prev => [duplicated, ...prev])
            return duplicated
        }
    }, [getTransaction])

    return {
        transactions,
        loading,
        setLoading,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        getTransaction,
        bulkDeleteTransactions,
        duplicateTransaction,
        setTransactions
    }
}
