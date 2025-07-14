import { useEffect, useState } from 'react'
import { useTheme } from '../contexts/ThemeContext'

const ThemeDebug = () => {
    const { theme, setTheme } = useTheme()
    const [systemPrefersDark, setSystemPrefersDark] = useState(false)
    const [listenerActive, setListenerActive] = useState(false)

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

        // Initial check
        setSystemPrefersDark(mediaQuery.matches)

        // Setup listener for system changes
        const handleChange = (e) => {
            console.log('System theme changed to:', e.matches ? 'dark' : 'light')
            setSystemPrefersDark(e.matches)
        }

        mediaQuery.addEventListener('change', handleChange)
        setListenerActive(true)

        // Cleanup
        return () => {
            mediaQuery.removeEventListener('change', handleChange)
            setListenerActive(false)
        }
    }, [])

    const testSystemDetection = () => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        console.log('Current system preference:', mediaQuery.matches ? 'dark' : 'light')
        alert(`System prefers: ${mediaQuery.matches ? 'Dark' : 'Light'} mode`)
    }

    const forceRefresh = () => {
        window.location.reload()
    }

    const clearThemeStorage = () => {
        localStorage.removeItem('theme')
        alert('Theme storage cleared! Page will refresh.')
        window.location.reload()
    }

    return (
        <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-4 shadow-lg max-w-sm">
            <h3 className="text-lg font-semibold mb-3 text-gray-900 dark:text-white">Theme Debug</h3>

            <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Current Theme:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{theme}</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">System Prefers:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                        {systemPrefersDark ? 'Dark' : 'Light'}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Listener Active:</span>
                    <span className={`font-medium ${listenerActive ? 'text-green-600' : 'text-red-600'}`}>
                        {listenerActive ? 'Yes' : 'No'}
                    </span>
                </div>

                <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Applied Class:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                        {document.documentElement.classList.contains('dark') ? 'dark' : 'light'}
                    </span>
                </div>
            </div>

            <div className="mt-4 space-y-2">
                <button
                    onClick={testSystemDetection}
                    className="w-full px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                >
                    Test System Detection
                </button>

                <button
                    onClick={() => setTheme('system')}
                    className="w-full px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                >
                    Set to System
                </button>

                <button
                    onClick={clearThemeStorage}
                    className="w-full px-3 py-1 text-sm bg-orange-500 text-white rounded hover:bg-orange-600 transition-colors"
                >
                    Clear Storage
                </button>

                <button
                    onClick={forceRefresh}
                    className="w-full px-3 py-1 text-sm bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors"
                >
                    Refresh Page
                </button>
            </div>

            <div className="mt-3 text-xs text-gray-500 dark:text-gray-400">
                <p><strong>Windows:</strong> Settings → Personalization → Colors → Choose your mode</p>
                <p><strong>Test:</strong> Change Windows theme then check if this updates automatically</p>
            </div>
        </div>
    )
}

export default ThemeDebug
