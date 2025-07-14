import { useState, useEffect, useCallback } from 'react'

/**
 * Custom hook untuk mengelola form dengan validasi
 * @param {Object} initialValues - Nilai awal form
 * @param {Function} validationRules - Fungsi validasi
 * @returns {Object} - Form state dan handlers
 */
export const useForm = (initialValues = {}, validationRules = null) => {
    const [values, setValues] = useState(initialValues)
    const [errors, setErrors] = useState({})
    const [touched, setTouched] = useState({})
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleChange = useCallback((e) => {
        const { name, value } = e.target
        setValues(prev => ({
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
    }, [errors])

    const handleBlur = useCallback((e) => {
        const { name } = e.target
        setTouched(prev => ({
            ...prev,
            [name]: true
        }))
    }, [])

    const validate = useCallback(() => {
        if (!validationRules) return {}
        return validationRules(values)
    }, [values, validationRules])

    const handleSubmit = useCallback((onSubmit) => {
        return async (e) => {
            e.preventDefault()
            setIsSubmitting(true)

            const newErrors = validate()
            setErrors(newErrors)

            if (Object.keys(newErrors).length === 0) {
                try {
                    await onSubmit(values)
                } catch (error) {
                    console.error('Form submission error:', error)
                }
            }

            setIsSubmitting(false)
        }
    }, [values, validate])

    const resetForm = useCallback(() => {
        setValues(initialValues)
        setErrors({})
        setTouched({})
        setIsSubmitting(false)
    }, [initialValues])

    const setFieldValue = useCallback((name, value) => {
        setValues(prev => ({
            ...prev,
            [name]: value
        }))
    }, [])

    const setFieldError = useCallback((name, error) => {
        setErrors(prev => ({
            ...prev,
            [name]: error
        }))
    }, [])

    return {
        values,
        errors,
        touched,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
        resetForm,
        setFieldValue,
        setFieldError,
        setValues,
        isValid: Object.keys(validate()).length === 0
    }
}

/**
 * Custom hook untuk mengelola toggle state
 * @param {boolean} initialValue - Nilai awal
 * @returns {Array} - [value, toggle, setValue]
 */
export const useToggle = (initialValue = false) => {
    const [value, setValue] = useState(initialValue)

    const toggle = useCallback(() => {
        setValue(prev => !prev)
    }, [])

    return [value, toggle, setValue]
}

/**
 * Custom hook untuk mengelola loading state
 * @param {boolean} initialValue - Nilai awal loading
 * @returns {Array} - [loading, setLoading, withLoading]
 */
export const useLoading = (initialValue = false) => {
    const [loading, setLoading] = useState(initialValue)

    const withLoading = useCallback(async (asyncFunction) => {
        setLoading(true)
        try {
            const result = await asyncFunction()
            return result
        } finally {
            setLoading(false)
        }
    }, [])

    return [loading, setLoading, withLoading]
}

/**
 * Custom hook untuk debouncing nilai
 * @param {any} value - Nilai yang akan di-debounce
 * @param {number} delay - Delay dalam milliseconds
 * @returns {any} - Nilai yang sudah di-debounce
 */
export const useDebounce = (value, delay) => {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])

    return debouncedValue
}

/**
 * Custom hook untuk mengelola local storage
 * @param {string} key - Key untuk localStorage
 * @param {any} initialValue - Nilai awal
 * @returns {Array} - [value, setValue, removeValue]
 */
export const useLocalStorage = (key, initialValue) => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem(key)
            return item ? JSON.parse(item) : initialValue
        } catch (error) {
            console.error(`Error reading localStorage key "${key}":`, error)
            return initialValue
        }
    })

    const setValue = useCallback((value) => {
        try {
            const valueToStore = value instanceof Function ? value(storedValue) : value
            setStoredValue(valueToStore)
            window.localStorage.setItem(key, JSON.stringify(valueToStore))
        } catch (error) {
            console.error(`Error setting localStorage key "${key}":`, error)
        }
    }, [key, storedValue])

    const removeValue = useCallback(() => {
        try {
            window.localStorage.removeItem(key)
            setStoredValue(initialValue)
        } catch (error) {
            console.error(`Error removing localStorage key "${key}":`, error)
        }
    }, [key, initialValue])

    return [storedValue, setValue, removeValue]
}
