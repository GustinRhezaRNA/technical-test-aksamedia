import PropTypes from 'prop-types'
import { SearchInput, SelectField } from '../forms'
import { Button } from '../common'
import { Filter, X } from 'lucide-react'
import { TRANSACTION_CATEGORIES } from '../../utils/transactionUtils'

/**
 * Komponen untuk filtering dan searching transaksi
 */
export const TransactionFilters = ({
    searchTerm,
    onSearchChange,
    selectedType,
    onTypeChange,
    selectedCategory,
    onCategoryChange,
    onClearFilters,
    className = ''
}) => {
    const typeOptions = [
        { value: '', label: 'All Types' },
        { value: 'income', label: 'Income' },
        { value: 'expense', label: 'Expense' }
    ]

    // Get all categories from both income and expense
    const allCategories = [
        ...TRANSACTION_CATEGORIES.income,
        ...TRANSACTION_CATEGORIES.expense
    ]
    const uniqueCategories = [...new Set(allCategories)]

    const categoryOptions = [
        { value: '', label: 'All Categories' },
        ...uniqueCategories.map(cat => ({ value: cat, label: cat }))
    ]

    const hasActiveFilters = searchTerm || selectedType || selectedCategory

    return (
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4 ${className}`}>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                    <Filter className="h-5 w-5 text-gray-400" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        Filters
                    </h3>
                </div>
                {hasActiveFilters && (
                    <Button
                        variant="outline"
                        size="small"
                        onClick={onClearFilters}
                        className="text-sm"
                    >
                        <X className="h-4 w-4 mr-1" />
                        Clear All
                    </Button>
                )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Search */}
                <SearchInput
                    value={searchTerm}
                    onChange={(e) => onSearchChange(e.target.value)}
                    placeholder="Search transactions..."
                    onClear={() => onSearchChange('')}
                />

                {/* Type Filter */}
                <SelectField
                    name="type"
                    value={selectedType}
                    onChange={(e) => onTypeChange(e.target.value)}
                    options={typeOptions}
                    placeholder="Filter by type"
                />

                {/* Category Filter */}
                <SelectField
                    name="category"
                    value={selectedCategory}
                    onChange={(e) => onCategoryChange(e.target.value)}
                    options={categoryOptions}
                    placeholder="Filter by category"
                />
            </div>

            {/* Active filters display */}
            {hasActiveFilters && (
                <div className="mt-4 flex flex-wrap gap-2">
                    {searchTerm && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200">
                            Search: "{searchTerm}"
                            <button
                                onClick={() => onSearchChange('')}
                                className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </span>
                    )}
                    {selectedType && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-200">
                            Type: {selectedType}
                            <button
                                onClick={() => onTypeChange('')}
                                className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-green-200 dark:hover:bg-green-800"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </span>
                    )}
                    {selectedCategory && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-200">
                            Category: {selectedCategory}
                            <button
                                onClick={() => onCategoryChange('')}
                                className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full hover:bg-purple-200 dark:hover:bg-purple-800"
                            >
                                <X className="h-3 w-3" />
                            </button>
                        </span>
                    )}
                </div>
            )}
        </div>
    )
}

TransactionFilters.propTypes = {
    searchTerm: PropTypes.string.isRequired,
    onSearchChange: PropTypes.func.isRequired,
    selectedType: PropTypes.string.isRequired,
    onTypeChange: PropTypes.func.isRequired,
    selectedCategory: PropTypes.string.isRequired,
    onCategoryChange: PropTypes.func.isRequired,
    onClearFilters: PropTypes.func.isRequired,
    className: PropTypes.string
}
