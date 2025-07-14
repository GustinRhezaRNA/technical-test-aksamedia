/**
 * Format currency dalam format Rupiah Indonesia
 * @param {number} amount - Jumlah yang akan diformat
 * @returns {string} - Format currency IDR
 */
export const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(amount)
}

/**
 * Format tanggal dalam format yang mudah dibaca
 * @param {string|Date} date - Tanggal yang akan diformat
 * @param {Object} options - Opsi format
 * @returns {string} - Tanggal terformat
 */
export const formatDate = (date, options = {}) => {
    const defaultOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        ...options
    }

    return new Date(date).toLocaleDateString('id-ID', defaultOptions)
}

/**
 * Mendapatkan nama bulan saat ini
 * @param {Object} options - Opsi format
 * @returns {string} - Nama bulan dan tahun
 */
export const getCurrentMonthName = (options = {}) => {
    const defaultOptions = {
        month: 'long',
        year: 'numeric',
        ...options
    }

    return new Date().toLocaleString('default', defaultOptions)
}

/**
 * Debounce function untuk membatasi frekuensi pemanggilan fungsi
 * @param {Function} func - Fungsi yang akan di-debounce
 * @param {number} wait - Waktu tunggu dalam milliseconds
 * @returns {Function} - Fungsi yang sudah di-debounce
 */
export const debounce = (func, wait) => {
    let timeout
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout)
            func(...args)
        }
        clearTimeout(timeout)
        timeout = setTimeout(later, wait)
    }
}

/**
 * Generate ID unik sederhana
 * @returns {string} - ID unik
 */
export const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9)
}

/**
 * Memvalidasi email
 * @param {string} email - Email yang akan divalidasi
 * @returns {boolean} - True jika email valid
 */
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
}

/**
 * Memvalidasi nomor telepon Indonesia
 * @param {string} phone - Nomor telepon yang akan divalidasi
 * @returns {boolean} - True jika nomor telepon valid
 */
export const isValidPhoneNumber = (phone) => {
    const phoneRegex = /^(\+62|62|0)8[1-9][0-9]{6,9}$/
    return phoneRegex.test(phone.replace(/\s/g, ''))
}

/**
 * Capitalize first letter of each word
 * @param {string} str - String yang akan diformat
 * @returns {string} - String dengan huruf pertama kapital
 */
export const capitalizeWords = (str) => {
    return str.replace(/\w\S*/g, (txt) =>
        txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    )
}

/**
 * Memotong string dan menambahkan ellipsis
 * @param {string} str - String yang akan dipotong
 * @param {number} length - Panjang maksimal
 * @returns {string} - String yang sudah dipotong
 */
export const truncateString = (str, length = 100) => {
    if (str.length <= length) return str
    return str.substring(0, length) + '...'
}

/**
 * Deep clone object
 * @param {Object} obj - Object yang akan di-clone
 * @returns {Object} - Object hasil clone
 */
export const deepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj))
}

/**
 * Check if value is empty (null, undefined, empty string, empty array, empty object)
 * @param {any} value - Value yang akan dicek
 * @returns {boolean} - True jika empty
 */
export const isEmpty = (value) => {
    if (value === null || value === undefined) return true
    if (typeof value === 'string') return value.trim() === ''
    if (Array.isArray(value)) return value.length === 0
    if (typeof value === 'object') return Object.keys(value).length === 0
    return false
}

/**
 * Sleep function untuk delay
 * @param {number} ms - Milliseconds untuk delay
 * @returns {Promise} - Promise yang resolve setelah delay
 */
export const sleep = (ms) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Group array by key
 * @param {Array} array - Array yang akan digroup
 * @param {string} key - Key untuk grouping
 * @returns {Object} - Object dengan key sebagai group
 */
export const groupBy = (array, key) => {
    return array.reduce((result, currentValue) => {
        (result[currentValue[key]] = result[currentValue[key]] || []).push(currentValue)
        return result
    }, {})
}

/**
 * Remove duplicates from array
 * @param {Array} array - Array dengan duplicate
 * @param {string} key - Key untuk comparison (optional)
 * @returns {Array} - Array tanpa duplicate
 */
export const removeDuplicates = (array, key = null) => {
    if (key) {
        return array.filter((item, index, self) =>
            index === self.findIndex(t => t[key] === item[key])
        )
    }
    return [...new Set(array)]
}