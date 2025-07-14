import { useTheme } from '../contexts/ThemeContext'

const SimpleThemeTest = () => {
    const { theme, setTheme } = useTheme()

    const testSystemDetection = () => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
        const currentSystemTheme = mediaQuery.matches ? 'dark' : 'light'

        console.log('=== THEME TEST ===')
        console.log('Current app theme:', theme)
        console.log('System prefers:', currentSystemTheme)
        console.log('HTML has dark class:', document.documentElement.classList.contains('dark'))
        console.log('LocalStorage theme:', localStorage.getItem('theme'))

        alert(`
Theme Test Results:
- App Theme: ${theme}
- System Prefers: ${currentSystemTheme}
- HTML Dark Class: ${document.documentElement.classList.contains('dark')}
- LocalStorage: ${localStorage.getItem('theme')}
    `)
    }

    return (
        <div className="fixed bottom-4 left-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg p-3 shadow-lg text-sm">
            <div className="space-y-2">
                <div>Theme: <strong>{theme}</strong></div>
                <div className="space-x-2">
                    <button onClick={() => setTheme('light')} className="px-2 py-1 bg-yellow-500 text-white rounded text-xs">Light</button>
                    <button onClick={() => setTheme('dark')} className="px-2 py-1 bg-gray-700 text-white rounded text-xs">Dark</button>
                    <button onClick={() => setTheme('system')} className="px-2 py-1 bg-blue-500 text-white rounded text-xs">System</button>
                </div>
                <button onClick={testSystemDetection} className="w-full px-2 py-1 bg-green-500 text-white rounded text-xs">
                    Test System
                </button>
            </div>
        </div>
    )
}

export default SimpleThemeTest
