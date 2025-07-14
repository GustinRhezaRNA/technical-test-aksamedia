import { storageService } from './storageService.js'
import { validateTransaction, TRANSACTION_TYPES } from '../utils/transactionUtils.js'

/**
 * Service untuk mengelola operasi transaksi
 */
class TransactionService {
    constructor() {
        this.STORAGE_KEY = 'transactions'
        this.sampleData = this.getSampleTransactions()
    }

    /**
     * Mendapatkan semua transaksi
     * @returns {Array} - Array transaksi
     */
    async getAll() {
        try {
            const transactions = storageService.get(this.STORAGE_KEY, [])

            // Jika tidak ada data, gunakan sample data
            if (transactions.length === 0) {
                await this.initializeSampleData()
                return storageService.get(this.STORAGE_KEY, [])
            }

            return transactions.sort((a, b) => new Date(b.date) - new Date(a.date))
        } catch (error) {
            console.error('Error getting transactions:', error)
            return []
        }
    }

    /**
     * Mendapatkan transaksi berdasarkan ID
     * @param {string} id - ID transaksi
     * @returns {Object|null} - Transaksi atau null
     */
    async getById(id) {
        try {
            const transactions = await this.getAll()
            return transactions.find(t => t.id === id) || null
        } catch (error) {
            console.error('Error getting transaction by ID:', error)
            return null
        }
    }

    /**
     * Menambah transaksi baru
     * @param {Object} transactionData - Data transaksi
     * @returns {Object} - Result object dengan success status dan data
     */
    async create(transactionData) {
        try {
            // Validasi data
            const errors = validateTransaction(transactionData)
            if (Object.keys(errors).length > 0) {
                return { success: false, errors }
            }

            const transactions = await this.getAll()
            const newTransaction = {
                ...transactionData,
                id: this.generateId(),
                amount: parseFloat(transactionData.amount),
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            }

            const updatedTransactions = [newTransaction, ...transactions]
            storageService.set(this.STORAGE_KEY, updatedTransactions)

            return { success: true, data: newTransaction }
        } catch (error) {
            console.error('Error creating transaction:', error)
            return { success: false, error: 'Failed to create transaction' }
        }
    }

    /**
     * Mengupdate transaksi
     * @param {string} id - ID transaksi
     * @param {Object} updateData - Data yang akan diupdate
     * @returns {Object} - Result object dengan success status dan data
     */
    async update(id, updateData) {
        try {
            // Validasi data
            const errors = validateTransaction(updateData)
            if (Object.keys(errors).length > 0) {
                return { success: false, errors }
            }

            const transactions = await this.getAll()
            const index = transactions.findIndex(t => t.id === id)

            if (index === -1) {
                return { success: false, error: 'Transaction not found' }
            }

            const updatedTransaction = {
                ...transactions[index],
                ...updateData,
                amount: parseFloat(updateData.amount),
                updatedAt: new Date().toISOString()
            }

            transactions[index] = updatedTransaction
            storageService.set(this.STORAGE_KEY, transactions)

            return { success: true, data: updatedTransaction }
        } catch (error) {
            console.error('Error updating transaction:', error)
            return { success: false, error: 'Failed to update transaction' }
        }
    }

    /**
     * Menghapus transaksi
     * @param {string} id - ID transaksi
     * @returns {Object} - Result object dengan success status
     */
    async delete(id) {
        try {
            const transactions = await this.getAll()
            const filteredTransactions = transactions.filter(t => t.id !== id)

            if (filteredTransactions.length === transactions.length) {
                return { success: false, error: 'Transaction not found' }
            }

            storageService.set(this.STORAGE_KEY, filteredTransactions)
            return { success: true }
        } catch (error) {
            console.error('Error deleting transaction:', error)
            return { success: false, error: 'Failed to delete transaction' }
        }
    }

    /**
     * Menghapus multiple transaksi
     * @param {Array} ids - Array ID transaksi
     * @returns {Object} - Result object dengan success status
     */
    async bulkDelete(ids) {
        try {
            const transactions = await this.getAll()
            const filteredTransactions = transactions.filter(t => !ids.includes(t.id))

            storageService.set(this.STORAGE_KEY, filteredTransactions)
            return { success: true, deletedCount: transactions.length - filteredTransactions.length }
        } catch (error) {
            console.error('Error bulk deleting transactions:', error)
            return { success: false, error: 'Failed to delete transactions' }
        }
    }

    /**
     * Menduplicate transaksi
     * @param {string} id - ID transaksi yang akan diduplicate
     * @returns {Object} - Result object dengan success status dan data
     */
    async duplicate(id) {
        try {
            const transaction = await this.getById(id)
            if (!transaction) {
                return { success: false, error: 'Transaction not found' }
            }

            const duplicateData = {
                ...transaction,
                title: `${transaction.title} (Copy)`,
                date: new Date().toISOString().split('T')[0]
            }

            return await this.create(duplicateData)
        } catch (error) {
            console.error('Error duplicating transaction:', error)
            return { success: false, error: 'Failed to duplicate transaction' }
        }
    }

    /**
     * Export transaksi ke format yang bisa di-download
     * @param {string} format - Format export (json, csv)
     * @returns {Object} - Result object dengan data export
     */
    async export(format = 'json') {
        try {
            const transactions = await this.getAll()

            if (format === 'csv') {
                return this.exportToCSV(transactions)
            }

            return {
                success: true,
                data: transactions,
                filename: `transactions-${new Date().toISOString().split('T')[0]}.json`
            }
        } catch (error) {
            console.error('Error exporting transactions:', error)
            return { success: false, error: 'Failed to export transactions' }
        }
    }

    /**
     * Import transaksi dari file
     * @param {Array} importData - Data transaksi yang akan diimport
     * @returns {Object} - Result object dengan success status
     */
    async import(importData) {
        try {
            if (!Array.isArray(importData)) {
                return { success: false, error: 'Invalid import data format' }
            }

            const validTransactions = []
            const errors = []

            importData.forEach((item, index) => {
                const validationErrors = validateTransaction(item)
                if (Object.keys(validationErrors).length === 0) {
                    validTransactions.push({
                        ...item,
                        id: this.generateId(),
                        createdAt: new Date().toISOString(),
                        updatedAt: new Date().toISOString()
                    })
                } else {
                    errors.push({ index: index + 1, errors: validationErrors })
                }
            })

            if (validTransactions.length > 0) {
                const existingTransactions = await this.getAll()
                const allTransactions = [...validTransactions, ...existingTransactions]
                storageService.set(this.STORAGE_KEY, allTransactions)
            }

            return {
                success: true,
                imported: validTransactions.length,
                errors: errors.length,
                errorDetails: errors
            }
        } catch (error) {
            console.error('Error importing transactions:', error)
            return { success: false, error: 'Failed to import transactions' }
        }
    }

    /**
     * Generate ID unik untuk transaksi
     * @returns {string} - ID unik
     */
    generateId() {
        return Date.now().toString() + Math.random().toString(36).substr(2, 9)
    }

    /**
     * Export ke format CSV
     * @param {Array} transactions - Array transaksi
     * @returns {Object} - Result object dengan data CSV
     */
    exportToCSV(transactions) {
        const headers = ['Date', 'Title', 'Description', 'Type', 'Category', 'Amount']
        const csvContent = [
            headers.join(','),
            ...transactions.map(t => [
                t.date,
                `"${t.title}"`,
                `"${t.description}"`,
                t.type,
                t.category,
                t.amount
            ].join(','))
        ].join('\n')

        return {
            success: true,
            data: csvContent,
            filename: `transactions-${new Date().toISOString().split('T')[0]}.csv`
        }
    }

    /**
     * Inisialisasi sample data
     */
    async initializeSampleData() {
        try {
            storageService.set(this.STORAGE_KEY, this.sampleData)
            return { success: true }
        } catch (error) {
            console.error('Error initializing sample data:', error)
            return { success: false, error: 'Failed to initialize sample data' }
        }
    }

    /**
     * Reset semua data transaksi
     */
    async reset() {
        try {
            storageService.remove(this.STORAGE_KEY)
            await this.initializeSampleData()
            return { success: true }
        } catch (error) {
            console.error('Error resetting transactions:', error)
            return { success: false, error: 'Failed to reset transactions' }
        }
    }

    /**
     * Mendapatkan sample data transaksi
     * @returns {Array} - Sample transactions
     */
    getSampleTransactions() {
        return [
            {
                id: '1',
                title: 'Salary Payment',
                amount: 5000000,
                type: TRANSACTION_TYPES.INCOME,
                category: 'Salary',
                description: 'Monthly salary payment',
                date: '2024-01-01',
                createdAt: new Date('2024-01-01').toISOString(),
                updatedAt: new Date('2024-01-01').toISOString()
            },
            {
                id: '2',
                title: 'Grocery Shopping',
                amount: 150000,
                type: TRANSACTION_TYPES.EXPENSE,
                category: 'Food',
                description: 'Weekly grocery shopping at supermarket',
                date: '2024-01-02',
                createdAt: new Date('2024-01-02').toISOString(),
                updatedAt: new Date('2024-01-02').toISOString()
            },
            // Tambahkan lebih banyak sample data sesuai kebutuhan
        ]
    }
}

export const transactionService = new TransactionService()
