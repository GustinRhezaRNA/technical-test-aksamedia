/**
 * Service untuk mengelola storage di localStorage
 */
class StorageService {
    constructor() {
        this.prefix = 'moneywise_'
    }

    /**
     * Menyimpan data ke localStorage
     * @param {string} key - Key untuk data
     * @param {any} data - Data yang akan disimpan
     */
    set(key, data) {
        try {
            const serializedData = JSON.stringify(data)
            localStorage.setItem(this.prefix + key, serializedData)
            return true
        } catch (error) {
            console.error('Error saving to localStorage:', error)
            return false
        }
    }

    /**
     * Mengambil data dari localStorage
     * @param {string} key - Key untuk data
     * @param {any} defaultValue - Nilai default jika tidak ditemukan
     * @returns {any} - Data yang diambil atau default value
     */
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(this.prefix + key)
            return item ? JSON.parse(item) : defaultValue
        } catch (error) {
            console.error('Error reading from localStorage:', error)
            return defaultValue
        }
    }

    /**
     * Menghapus data dari localStorage
     * @param {string} key - Key untuk data yang akan dihapus
     */
    remove(key) {
        try {
            localStorage.removeItem(this.prefix + key)
            return true
        } catch (error) {
            console.error('Error removing from localStorage:', error)
            return false
        }
    }

    /**
     * Menghapus semua data aplikasi dari localStorage
     */
    clear() {
        try {
            const keys = Object.keys(localStorage)
            keys.forEach(key => {
                if (key.startsWith(this.prefix)) {
                    localStorage.removeItem(key)
                }
            })
            return true
        } catch (error) {
            console.error('Error clearing localStorage:', error)
            return false
        }
    }

    /**
     * Mengecek apakah key ada di localStorage
     * @param {string} key - Key yang akan dicek
     * @returns {boolean} - True jika key ada
     */
    exists(key) {
        return localStorage.getItem(this.prefix + key) !== null
    }

    /**
     * Mendapatkan semua keys yang ada
     * @returns {Array} - Array berisi semua keys
     */
    getAllKeys() {
        const keys = Object.keys(localStorage)
        return keys
            .filter(key => key.startsWith(this.prefix))
            .map(key => key.replace(this.prefix, ''))
    }

    /**
     * Mendapatkan ukuran storage yang digunakan
     * @returns {number} - Ukuran dalam bytes
     */
    getStorageSize() {
        let total = 0
        const keys = Object.keys(localStorage)
        keys.forEach(key => {
            if (key.startsWith(this.prefix)) {
                total += localStorage.getItem(key).length
            }
        })
        return total
    }
}

export const storageService = new StorageService()
