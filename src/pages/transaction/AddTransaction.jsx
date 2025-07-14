// src/pages/AddTransaction.jsx
import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useTransactions } from '../../contexts/TransactionContext'
import { ArrowLeft, Save, DollarSign, Calendar, Tag, FileText, TrendingUp, TrendingDown } from 'lucide-react'

const CATEGORIES = {
  income: ['Salary', 'Freelance', 'Investment', 'Bonus', 'Gift', 'Other'],
  expense: ['Food', 'Transportation', 'Shopping', 'Utilities', 'Healthcare', 'Entertainment', 'Education', 'Other']
}

const AddTransaction = () => {
  const navigate = useNavigate()
  const { addTransaction } = useTransactions()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    type: 'expense',
    title: '',
    description: '',
    amount: '',
    category: '',
    date: new Date().toISOString().split('T')[0], // Today's date
  })
  const [errors, setErrors] = useState({})

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }

    // Reset category when type changes
    if (name === 'type') {
      setFormData(prev => ({
        ...prev,
        category: ''
      }))
    }
  }

  const validateForm = () => {
    const newErrors = {}

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required'
    }

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0'
    }

    if (!formData.category) {
      newErrors.category = 'Category is required'
    }

    if (!formData.date) {
      newErrors.date = 'Date is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500))

      const transactionData = {
        ...formData,
        amount: parseFloat(formData.amount)
      }

      addTransaction(transactionData)
      navigate('/transactions')
    } catch (error) {
      console.error('Error adding transaction:', error)
      setErrors({ submit: 'Failed to add transaction. Please try again.' })
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (amount) => {
    if (!amount) return ''
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const getCurrentCategories = () => {
    return CATEGORIES[formData.type] || []
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Link
          to="/transactions"
          className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Add Transaction</h1>
          <p className="text-gray-600 dark:text-gray-400">Record a new income or expense</p>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
        {/* Transaction Type */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Transaction Type
          </label>
          <div className="flex rounded-lg bg-gray-100 dark:bg-gray-700 p-1">
            <button
              type="button"
              onClick={() => handleInputChange({ target: { name: 'type', value: 'expense' } })}
              className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md transition-colors ${formData.type === 'expense'
                  ? 'bg-red-500 text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
            >
              <TrendingDown className="h-4 w-4 mr-2" />
              Expense
            </button>
            <button
              type="button"
              onClick={() => handleInputChange({ target: { name: 'type', value: 'income' } })}
              className={`flex-1 flex items-center justify-center px-4 py-2 rounded-md transition-colors ${formData.type === 'income'
                  ? 'bg-green-500 text-white shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200'
                }`}
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              Income
            </button>
          </div>
        </div>

        {/* Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <FileText className="h-4 w-4 inline mr-1" />
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${errors.title
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
            placeholder="Enter transaction title"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title}</p>
          )}
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <FileText className="h-4 w-4 inline mr-1" />
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows={3}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${errors.description
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
            placeholder="Enter transaction description"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description}</p>
          )}
        </div>

        {/* Amount */}
        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <DollarSign className="h-4 w-4 inline mr-1" />
            Amount (IDR)
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleInputChange}
            min="0"
            step="1000"
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${errors.amount
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
            placeholder="0"
          />
          {formData.amount && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {formatCurrency(parseFloat(formData.amount))}
            </p>
          )}
          {errors.amount && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.amount}</p>
          )}
        </div>

        {/* Category */}
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Tag className="h-4 w-4 inline mr-1" />
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${errors.category
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
          >
            <option value="">Select a category</option>
            {getCurrentCategories().map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.category}</p>
          )}
        </div>

        {/* Date */}
        <div className="mb-6">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            <Calendar className="h-4 w-4 inline mr-1" />
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
            className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 transition-colors ${errors.date
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 dark:border-gray-600 focus:ring-blue-500 focus:border-blue-500'
              } bg-white dark:bg-gray-700 text-gray-900 dark:text-white`}
          />
          {errors.date && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.date}</p>
          )}
        </div>

        {/* Submit Error */}
        {errors.submit && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-md">
            <p className="text-sm text-red-600 dark:text-red-400">{errors.submit}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-3">
          <Link
            to="/transactions"
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors text-center"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-md transition-colors flex items-center justify-center"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Save Transaction
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  )
}

export default AddTransaction
