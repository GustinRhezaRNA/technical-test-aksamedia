import { storageService } from './storageService.js'

/**
 * Service untuk mengelola autentikasi pengguna
 */
class AuthService {
    constructor() {
        this.STORAGE_KEY = 'auth'
        this.USER_KEY = 'user'
        this.credentials = {
            username: 'admin',
            password: 'finance123'
        }
    }

    /**
     * Login pengguna
     * @param {string} username - Username
     * @param {string} password - Password
     * @returns {Object} - Result object dengan success status dan data user
     */
    async login(username, password) {
        try {
            // Simulate API delay
            await this.delay(500)

            if (username === this.credentials.username && password === this.credentials.password) {
                const userData = {
                    id: 1,
                    username: this.credentials.username,
                    fullName: 'Admin User',
                    email: 'admin@moneywise.com',
                    role: 'admin',
                    createdAt: new Date().toISOString(),
                    lastLoginAt: new Date().toISOString()
                }

                // Save auth state
                const authData = {
                    isAuthenticated: true,
                    user: userData,
                    token: this.generateToken(),
                    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // 24 hours
                }

                storageService.set(this.STORAGE_KEY, authData)

                return { success: true, data: userData }
            }

            return { success: false, error: 'Invalid username or password' }
        } catch (error) {
            console.error('Error during login:', error)
            return { success: false, error: 'Login failed. Please try again.' }
        }
    }

    /**
     * Logout pengguna
     * @returns {Object} - Result object dengan success status
     */
    async logout() {
        try {
            storageService.remove(this.STORAGE_KEY)
            return { success: true }
        } catch (error) {
            console.error('Error during logout:', error)
            return { success: false, error: 'Logout failed' }
        }
    }

    /**
     * Mendapatkan data user yang sedang login
     * @returns {Object|null} - Data user atau null
     */
    getCurrentUser() {
        try {
            const authData = storageService.get(this.STORAGE_KEY)

            if (!authData || !authData.isAuthenticated) {
                return null
            }

            // Check if token is expired
            if (new Date() > new Date(authData.expiresAt)) {
                this.logout()
                return null
            }

            return authData.user
        } catch (error) {
            console.error('Error getting current user:', error)
            return null
        }
    }

    /**
     * Mengecek apakah user sudah login
     * @returns {boolean} - True jika sudah login
     */
    isAuthenticated() {
        const user = this.getCurrentUser()
        return user !== null
    }

    /**
     * Update profile user
     * @param {Object} updateData - Data yang akan diupdate
     * @returns {Object} - Result object dengan success status dan data user
     */
    async updateProfile(updateData) {
        try {
            const authData = storageService.get(this.STORAGE_KEY)

            if (!authData || !authData.isAuthenticated) {
                return { success: false, error: 'User not authenticated' }
            }

            // Validate update data
            const errors = this.validateProfileData(updateData)
            if (Object.keys(errors).length > 0) {
                return { success: false, errors }
            }

            const updatedUser = {
                ...authData.user,
                ...updateData,
                updatedAt: new Date().toISOString()
            }

            const updatedAuthData = {
                ...authData,
                user: updatedUser
            }

            storageService.set(this.STORAGE_KEY, updatedAuthData)

            return { success: true, data: updatedUser }
        } catch (error) {
            console.error('Error updating profile:', error)
            return { success: false, error: 'Failed to update profile' }
        }
    }

    /**
     * Change password
     * @param {string} currentPassword - Password saat ini
     * @param {string} newPassword - Password baru
     * @returns {Object} - Result object dengan success status
     */
    async changePassword(currentPassword, newPassword) {
        try {
            if (currentPassword !== this.credentials.password) {
                return { success: false, error: 'Current password is incorrect' }
            }

            if (newPassword.length < 6) {
                return { success: false, error: 'New password must be at least 6 characters long' }
            }

            // In a real app, you would hash the password and save to backend
            this.credentials.password = newPassword

            return { success: true, message: 'Password changed successfully' }
        } catch (error) {
            console.error('Error changing password:', error)
            return { success: false, error: 'Failed to change password' }
        }
    }

    /**
     * Reset password (untuk demo purposes)
     * @param {string} username - Username
     * @returns {Object} - Result object dengan success status
     */
    async resetPassword(username) {
        try {
            if (username !== this.credentials.username) {
                return { success: false, error: 'Username not found' }
            }

            // Generate temporary password
            const tempPassword = this.generateTempPassword()

            // In a real app, you would send this via email
            return {
                success: true,
                message: 'Temporary password generated',
                tempPassword // Only for demo - never return password in real app
            }
        } catch (error) {
            console.error('Error resetting password:', error)
            return { success: false, error: 'Failed to reset password' }
        }
    }

    /**
     * Get user session info
     * @returns {Object|null} - Session info atau null
     */
    getSessionInfo() {
        try {
            const authData = storageService.get(this.STORAGE_KEY)

            if (!authData || !authData.isAuthenticated) {
                return null
            }

            return {
                user: authData.user,
                expiresAt: authData.expiresAt,
                isExpired: new Date() > new Date(authData.expiresAt)
            }
        } catch (error) {
            console.error('Error getting session info:', error)
            return null
        }
    }

    /**
     * Extend session
     * @returns {Object} - Result object dengan success status
     */
    async extendSession() {
        try {
            const authData = storageService.get(this.STORAGE_KEY)

            if (!authData || !authData.isAuthenticated) {
                return { success: false, error: 'No active session' }
            }

            const updatedAuthData = {
                ...authData,
                expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString() // Extend 24 hours
            }

            storageService.set(this.STORAGE_KEY, updatedAuthData)

            return { success: true, expiresAt: updatedAuthData.expiresAt }
        } catch (error) {
            console.error('Error extending session:', error)
            return { success: false, error: 'Failed to extend session' }
        }
    }

    /**
     * Validate profile data
     * @param {Object} data - Data yang akan divalidasi
     * @returns {Object} - Object berisi errors
     */
    validateProfileData(data) {
        const errors = {}

        if (data.fullName && data.fullName.trim().length < 2) {
            errors.fullName = 'Full name must be at least 2 characters long'
        }

        if (data.email && !this.isValidEmail(data.email)) {
            errors.email = 'Please enter a valid email address'
        }

        return errors
    }

    /**
     * Validate email format
     * @param {string} email - Email yang akan divalidasi
     * @returns {boolean} - True jika email valid
     */
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        return emailRegex.test(email)
    }

    /**
     * Generate JWT-like token (for demo purposes)
     * @returns {string} - Token
     */
    generateToken() {
        const header = btoa(JSON.stringify({ alg: 'HS256', typ: 'JWT' }))
        const payload = btoa(JSON.stringify({
            sub: this.credentials.username,
            iat: Date.now(),
            exp: Date.now() + 24 * 60 * 60 * 1000
        }))
        const signature = btoa('demo-signature')

        return `${header}.${payload}.${signature}`
    }

    /**
     * Generate temporary password
     * @returns {string} - Temporary password
     */
    generateTempPassword() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        let result = ''
        for (let i = 0; i < 8; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length))
        }
        return result
    }

    /**
     * Simulate async delay
     * @param {number} ms - Milliseconds
     * @returns {Promise} - Promise yang resolve setelah delay
     */
    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms))
    }
}

export const authService = new AuthService()
