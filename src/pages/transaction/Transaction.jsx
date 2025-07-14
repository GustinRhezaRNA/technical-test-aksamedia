// src/pages/Transactions.jsx
import { useState, useEffect, useCallback } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useTransactions } from '../../contexts/TransactionContext'
import { Search, Filter, Plus, Edit2, Trash2, ArrowUpRight, ArrowDownRight, ChevronLeft, ChevronRight } from 'lucide-react'

const CATEGORIES = {
  income: ['Salary', 'Freelance', 'Investment', 'Bonus', 'Gift', 'Other'],
  expense: ['Food', 'Transportation', 'Shopping', 'Utilities', 'Healthcare', 'Entertainment', 'Education', 'Other']
}

const Transactions = () => {
  const { transactions, deleteTransaction, loading } = useTransactions()
  const [searchParams, setSearchParams] = useSearchParams()
  const [filteredTransactions, setFilteredTransactions] = useState([])

  // URL State
  const [currentPage, setCurrentPage] = useState(parseInt(searchParams.get('page')) || 1)
  const [searchTerm, setSearchTerm] = useState(searchParams.get('search') || '')
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '')
  const [selectedType, setSelectedType] = useState(searchParams.get('type') || '')

  const itemsPerPage = 5

  const filterTransactions = useCallback(() => {
    let filtered = transactions

    if (searchTerm) {
      filtered = filtered.filter(transaction =>
        transaction.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (selectedCategory) {
      filtered = filtered.filter(transaction => transaction.category === selectedCategory)
    }

    if (selectedType) {
      filtered = filtered.filter(transaction => transaction.type === selectedType)
    }

    // Sort by date (newest first)
    filtered.sort((a, b) => new Date(b.date) - new Date(a.date))

    setFilteredTransactions(filtered)

    // Reset to first page if current page is out of range
    const totalPages = Math.ceil(filtered.length / itemsPerPage)
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1)
    }
  }, [transactions, searchTerm, selectedCategory, selectedType, currentPage])

  useEffect(() => {
    filterTransactions()
  }, [filterTransactions])

  useEffect(() => {
    // Update URL params
    const params = new URLSearchParams()
    if (currentPage > 1) params.set('page', currentPage.toString())
    if (searchTerm) params.set('search', searchTerm)
    if (selectedCategory) params.set('category', selectedCategory)
    if (selectedType) params.set('type', selectedType)

    setSearchParams(params)
  }, [currentPage, searchTerm, selectedCategory, selectedType, setSearchParams])

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      deleteTransaction(id)
    }
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const handleCategoryFilter = (e) => {
    setSelectedCategory(e.target.value)
    setCurrentPage(1)
  }

  const handleTypeFilter = (e) => {
    setSelectedType(e.target.value)
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setSearchTerm('')
    setSelectedCategory('')
    setSelectedType('')
    setCurrentPage(1)
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentTransactions = filteredTransactions.slice(startIndex, endIndex)

  const goToPage = (page) => {
    setCurrentPage(page)
  }

  const getAllCategories = () => {
    return [...CATEGORIES.income, ...CATEGORIES.expense].sort()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Transactions</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {filteredTransactions.length} transaction{filteredTransactions.length !== 1 ? 's' : ''} found
          </p>
        </div>
        <Link
          to="/transactions/add"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Transaction
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={handleSearch}
              className="pl-10 w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </div>

          {/* Type Filter */}
          <select
            value={selectedType}
            onChange={handleTypeFilter}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white relative z-10"
          >
            <option value="">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={handleCategoryFilter}
            className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white relative z-10"
          >
            <option value="">All Categories</option>
            {getAllCategories().map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>

          {/* Clear Filters */}
          <button
            onClick={clearFilters}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Transactions List */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
        {currentTransactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200 dark:border-gray-700">
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Transaction
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="text-left py-3 px-6 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="text-right py-3 px-6 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="text-right py-3 px-6 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {currentTransactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-full ${transaction.type === 'income'
                          ? 'bg-success/10 text-success'
                          : 'bg-danger/10 text-danger'
                          }`}>
                          {transaction.type === 'income' ? (
                            <ArrowUpRight className="h-4 w-4" />
                          ) : (
                            <ArrowDownRight className="h-4 w-4" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {transaction.description}
                          </p>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {transaction.type === 'income' ? 'Income' : 'Expense'}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                        {transaction.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-gray-900 dark:text-white">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6 text-right">
                      <span className={`font-semibold ${transaction.type === 'income' ? 'text-success' : 'text-danger'
                        }`}>
                        {transaction.type === 'income' ? '+' : '-'}{formatCurrency(transaction.amount)}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end space-x-2">
                        <Link
                          to={`/transactions/edit/${transaction.id}`}
                          className="p-2 text-gray-500 hover:text-primary hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                          title="Edit Transaction"
                        >
                          <Edit2 className="h-4 w-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(transaction.id)}
                          className="p-2 text-gray-500 hover:text-danger hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                          title="Delete Transaction"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 dark:text-gray-400 mb-4">
              <Filter className="h-12 w-12 mx-auto mb-4" />
              <p className="text-lg font-medium">No transactions found</p>
              <p className="text-sm">Try adjusting your filters or add a new transaction</p>
            </div>
            <Link
              to="/transactions/add"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add Your First Transaction
            </Link>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between bg-white dark:bg-gray-800 px-4 py-3 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
            Showing {startIndex + 1} to {Math.min(endIndex, filteredTransactions.length)} of {filteredTransactions.length} results
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => goToPage(page)}
                className={`px-3 py-1 text-sm rounded-md transition-colors ${currentPage === page
                  ? 'bg-primary text-white'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Transactions