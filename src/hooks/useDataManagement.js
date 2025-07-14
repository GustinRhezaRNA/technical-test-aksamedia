import { useState, useEffect, useCallback } from 'react'

/**
 * Custom hook untuk pagination
 * @param {Array} data - Data yang akan dipaginasi
 * @param {number} itemsPerPage - Jumlah item per halaman
 * @returns {Object} - Pagination state dan methods
 */
export const usePagination = (data = [], itemsPerPage = 10) => {
    const [currentPage, setCurrentPage] = useState(1)

    const totalItems = data.length
    const totalPages = Math.ceil(totalItems / itemsPerPage)

    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentData = data.slice(startIndex, endIndex)

    const goToPage = useCallback((page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page)
        }
    }, [totalPages])

    const goToNextPage = useCallback(() => {
        if (currentPage < totalPages) {
            setCurrentPage(prev => prev + 1)
        }
    }, [currentPage, totalPages])

    const goToPrevPage = useCallback(() => {
        if (currentPage > 1) {
            setCurrentPage(prev => prev - 1)
        }
    }, [currentPage])

    const resetPagination = useCallback(() => {
        setCurrentPage(1)
    }, [])

    // Reset to page 1 when data changes
    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) {
            setCurrentPage(1)
        }
    }, [data.length, currentPage, totalPages])

    const getPageNumbers = useCallback(() => {
        const pages = []
        const maxVisiblePages = 5

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
    }, [currentPage, totalPages])

    return {
        currentPage,
        totalPages,
        totalItems,
        currentData,
        hasNextPage: currentPage < totalPages,
        hasPrevPage: currentPage > 1,
        goToPage,
        goToNextPage,
        goToPrevPage,
        resetPagination,
        getPageNumbers,
        itemsPerPage,
        startIndex: startIndex + 1,
        endIndex: Math.min(endIndex, totalItems)
    }
}

/**
 * Custom hook untuk filtering dan searching
 * @param {Array} data - Data yang akan difilter
 * @param {Object} initialFilters - Filter awal
 * @returns {Object} - Filter state dan methods
 */
export const useFilter = (data = [], initialFilters = {}) => {
    const [filters, setFilters] = useState(initialFilters)
    const [searchTerm, setSearchTerm] = useState('')

    const filteredData = useCallback(() => {
        let result = [...data]

        // Apply search
        if (searchTerm) {
            result = result.filter(item => {
                return Object.values(item).some(value =>
                    value?.toString().toLowerCase().includes(searchTerm.toLowerCase())
                )
            })
        }

        // Apply filters
        Object.entries(filters).forEach(([key, value]) => {
            if (value !== '' && value !== null && value !== undefined) {
                result = result.filter(item => {
                    if (Array.isArray(value)) {
                        return value.includes(item[key])
                    }
                    return item[key] === value
                })
            }
        })

        return result
    }, [data, filters, searchTerm])

    const setFilter = useCallback((key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }))
    }, [])

    const clearFilter = useCallback((key) => {
        setFilters(prev => {
            const newFilters = { ...prev }
            delete newFilters[key]
            return newFilters
        })
    }, [])

    const clearAllFilters = useCallback(() => {
        setFilters(initialFilters)
        setSearchTerm('')
    }, [initialFilters])

    return {
        filters,
        searchTerm,
        filteredData: filteredData(),
        setFilter,
        setSearchTerm,
        clearFilter,
        clearAllFilters,
        hasActiveFilters: Object.keys(filters).length > 0 || searchTerm !== ''
    }
}

/**
 * Custom hook untuk sorting data
 * @param {Array} data - Data yang akan disort
 * @param {string} initialSortBy - Field untuk sort awal
 * @param {string} initialOrder - Order awal (asc/desc)
 * @returns {Object} - Sort state dan methods
 */
export const useSort = (data = [], initialSortBy = '', initialOrder = 'asc') => {
    const [sortBy, setSortBy] = useState(initialSortBy)
    const [sortOrder, setSortOrder] = useState(initialOrder)

    const sortedData = useCallback(() => {
        if (!sortBy) return data

        return [...data].sort((a, b) => {
            let aVal = a[sortBy]
            let bVal = b[sortBy]

            // Handle different data types
            if (typeof aVal === 'string') {
                aVal = aVal.toLowerCase()
                bVal = bVal.toLowerCase()
            }

            if (typeof aVal === 'number' && typeof bVal === 'number') {
                return sortOrder === 'asc' ? aVal - bVal : bVal - aVal
            }

            if (aVal < bVal) {
                return sortOrder === 'asc' ? -1 : 1
            }
            if (aVal > bVal) {
                return sortOrder === 'asc' ? 1 : -1
            }
            return 0
        })
    }, [data, sortBy, sortOrder])

    const handleSort = useCallback((field) => {
        if (sortBy === field) {
            setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')
        } else {
            setSortBy(field)
            setSortOrder('asc')
        }
    }, [sortBy])

    const resetSort = useCallback(() => {
        setSortBy(initialSortBy)
        setSortOrder(initialOrder)
    }, [initialSortBy, initialOrder])

    return {
        sortBy,
        sortOrder,
        sortedData: sortedData(),
        handleSort,
        resetSort,
        isSorted: sortBy !== ''
    }
}
