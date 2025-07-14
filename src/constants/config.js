/**
 * Konstanta untuk aplikasi MoneyWise
 */

/**
 * Konfigurasi aplikasi
 */
export const APP_CONFIG = {
    name: 'MoneyWise',
    version: '1.0.0',
    description: 'Personal Finance Management Application',
    author: 'MoneyWise Team',
    support: {
        email: 'support@moneywise.com',
        phone: '+62-XXX-XXXX-XXXX'
    }
}

/**
 * API Configuration (untuk future use)
 */
export const API_CONFIG = {
    baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001/api',
    timeout: 10000,
    version: 'v1'
}

/**
 * Storage keys
 */
export const STORAGE_KEYS = {
    AUTH: 'auth',
    TRANSACTIONS: 'transactions',
    USER_PREFERENCES: 'user_preferences',
    THEME: 'theme'
}

/**
 * Pagination settings
 */
export const PAGINATION = {
    DEFAULT_PAGE_SIZE: 10,
    PAGE_SIZE_OPTIONS: [5, 10, 20, 50],
    MAX_VISIBLE_PAGES: 5
}

/**
 * Date formats
 */
export const DATE_FORMATS = {
    DISPLAY: 'DD/MM/YYYY',
    INPUT: 'YYYY-MM-DD',
    FULL: 'dddd, DD MMMM YYYY',
    SHORT: 'DD MMM YYYY',
    TIME: 'HH:mm:ss'
}

/**
 * Currency settings
 */
export const CURRENCY = {
    CODE: 'IDR',
    SYMBOL: 'Rp',
    LOCALE: 'id-ID',
    DECIMAL_PLACES: 0
}

/**
 * Theme options
 */
export const THEME_OPTIONS = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'system', label: 'System' }
]

/**
 * Form validation rules
 */
export const VALIDATION_RULES = {
    TRANSACTION: {
        TITLE_MIN_LENGTH: 3,
        TITLE_MAX_LENGTH: 100,
        DESCRIPTION_MIN_LENGTH: 5,
        DESCRIPTION_MAX_LENGTH: 500,
        AMOUNT_MIN: 0.01,
        AMOUNT_MAX: 999999999
    },
    USER: {
        FULLNAME_MIN_LENGTH: 2,
        FULLNAME_MAX_LENGTH: 50,
        USERNAME_MIN_LENGTH: 3,
        USERNAME_MAX_LENGTH: 20,
        PASSWORD_MIN_LENGTH: 6
    }
}

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
    NETWORK: 'Network error. Please check your connection.',
    UNAUTHORIZED: 'You are not authorized to perform this action.',
    NOT_FOUND: 'Requested resource not found.',
    SERVER_ERROR: 'Server error. Please try again later.',
    VALIDATION_FAILED: 'Please check your input and try again.',
    SESSION_EXPIRED: 'Your session has expired. Please login again.'
}

/**
 * Success messages
 */
export const SUCCESS_MESSAGES = {
    TRANSACTION_CREATED: 'Transaction created successfully!',
    TRANSACTION_UPDATED: 'Transaction updated successfully!',
    TRANSACTION_DELETED: 'Transaction deleted successfully!',
    PROFILE_UPDATED: 'Profile updated successfully!',
    LOGIN_SUCCESS: 'Login successful!',
    LOGOUT_SUCCESS: 'Logged out successfully!'
}

/**
 * Loading states
 */
export const LOADING_STATES = {
    IDLE: 'idle',
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error'
}

/**
 * File upload settings
 */
export const FILE_UPLOAD = {
    MAX_SIZE: 5 * 1024 * 1024, // 5MB
    ALLOWED_TYPES: ['image/jpeg', 'image/png', 'image/gif'],
    ALLOWED_EXTENSIONS: ['.jpg', '.jpeg', '.png', '.gif']
}

/**
 * Regular expressions
 */
export const REGEX_PATTERNS = {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE_ID: /^(\+62|62|0)8[1-9][0-9]{6,9}$/,
    USERNAME: /^[a-zA-Z0-9_]{3,20}$/,
    PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{6,}$/
}

/**
 * Chart colors
 */
export const CHART_COLORS = {
    PRIMARY: '#3B82F6',
    SUCCESS: '#10B981',
    DANGER: '#EF4444',
    WARNING: '#F59E0B',
    INFO: '#06B6D4',
    SECONDARY: '#6B7280'
}

/**
 * Animation durations (in ms)
 */
export const ANIMATION_DURATION = {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500
}

/**
 * Keyboard shortcuts
 */
export const KEYBOARD_SHORTCUTS = {
    ADD_TRANSACTION: 'ctrl+n',
    SEARCH: 'ctrl+k',
    TOGGLE_THEME: 'ctrl+shift+t',
    SAVE: 'ctrl+s',
    CANCEL: 'escape'
}

/**
 * Feature flags
 */
export const FEATURE_FLAGS = {
    ENABLE_EXPORT: true,
    ENABLE_IMPORT: true,
    ENABLE_CHARTS: true,
    ENABLE_NOTIFICATIONS: true,
    ENABLE_DARK_MODE: true
}
