import PropTypes from 'prop-types'
import { ChevronLeft, ChevronRight } from 'lucide-react'

/**
 * Komponen Pagination untuk navigasi halaman
 */
export const Pagination = ({
    currentPage,
    totalPages,
    onPageChange,
    showPageNumbers = true,
    showPrevNext = true,
    showFirstLast = false,
    maxVisiblePages = 5,
    className = ''
}) => {
    if (totalPages <= 1) return null

    const getPageNumbers = () => {
        const pages = []

        if (totalPages <= maxVisiblePages) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i)
            }
        } else {
            const startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2))
            const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1)

            for (let i = startPage; i <= endPage; i++) {
                pages.push(i)
            }
        }

        return pages
    }

    const pages = getPageNumbers()

    return (
        <div className={`flex items-center justify-center space-x-1 ${className}`}>
            {/* First page */}
            {showFirstLast && currentPage > 1 && (
                <>
                    <button
                        onClick={() => onPageChange(1)}
                        className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                    >
                        First
                    </button>
                    {pages[0] > 2 && (
                        <span className="px-2 text-gray-500 dark:text-gray-400">...</span>
                    )}
                </>
            )}

            {/* Previous page */}
            {showPrevNext && (
                <button
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                >
                    <ChevronLeft className="h-4 w-4" />
                </button>
            )}

            {/* Page numbers */}
            {showPageNumbers && pages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${currentPage === page
                            ? 'bg-blue-600 dark:bg-blue-500 text-white'
                            : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                >
                    {page}
                </button>
            ))}

            {/* Next page */}
            {showPrevNext && (
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="p-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                >
                    <ChevronRight className="h-4 w-4" />
                </button>
            )}

            {/* Last page */}
            {showFirstLast && currentPage < totalPages && (
                <>
                    {pages[pages.length - 1] < totalPages - 1 && (
                        <span className="px-2 text-gray-500 dark:text-gray-400">...</span>
                    )}
                    <button
                        onClick={() => onPageChange(totalPages)}
                        className="px-3 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition-colors"
                    >
                        Last
                    </button>
                </>
            )}
        </div>
    )
}

Pagination.propTypes = {
    currentPage: PropTypes.number.isRequired,
    totalPages: PropTypes.number.isRequired,
    onPageChange: PropTypes.func.isRequired,
    showPageNumbers: PropTypes.bool,
    showPrevNext: PropTypes.bool,
    showFirstLast: PropTypes.bool,
    maxVisiblePages: PropTypes.number,
    className: PropTypes.string
}

/**
 * Komponen untuk menampilkan info pagination
 */
export const PaginationInfo = ({
    currentPage,
    itemsPerPage,
    totalItems,
    className = ''
}) => {
    const startItem = (currentPage - 1) * itemsPerPage + 1
    const endItem = Math.min(currentPage * itemsPerPage, totalItems)

    return (
        <div className={`text-sm text-gray-600 dark:text-gray-400 ${className}`}>
            Showing {startItem} to {endItem} of {totalItems} results
        </div>
    )
}

PaginationInfo.propTypes = {
    currentPage: PropTypes.number.isRequired,
    itemsPerPage: PropTypes.number.isRequired,
    totalItems: PropTypes.number.isRequired,
    className: PropTypes.string
}

/**
 * Komponen untuk memilih jumlah item per halaman
 */
export const PageSizeSelector = ({
    pageSize,
    onPageSizeChange,
    options = [5, 10, 20, 50],
    className = ''
}) => {
    return (
        <div className={`flex items-center space-x-2 ${className}`}>
            <span className="text-sm text-gray-600 dark:text-gray-400">Show:</span>
            <select
                value={pageSize}
                onChange={(e) => onPageSizeChange(Number(e.target.value))}
                className="px-2 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
            >
                {options.map(size => (
                    <option key={size} value={size}>
                        {size}
                    </option>
                ))}
            </select>
            <span className="text-sm text-gray-600 dark:text-gray-400">per page</span>
        </div>
    )
}

PageSizeSelector.propTypes = {
    pageSize: PropTypes.number.isRequired,
    onPageSizeChange: PropTypes.func.isRequired,
    options: PropTypes.arrayOf(PropTypes.number),
    className: PropTypes.string
}
