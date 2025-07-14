import { Sun, Moon, Monitor } from 'lucide-react'
import { useTheme } from '../../contexts/ThemeContext'

const ThemeToggle = () => {
    const { theme, setTheme } = useTheme()

    const themes = [
        { key: 'light', label: 'Light', icon: Sun },
        { key: 'dark', label: 'Dark', icon: Moon },
        { key: 'system', label: 'System', icon: Monitor }
    ]

    const currentTheme = themes.find(t => t.key === theme)
    const CurrentIcon = currentTheme?.icon || Monitor

    return (
        <div className="relative">
            <div className="flex items-center space-x-2">
                <CurrentIcon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                <select
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="appearance-none bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-gray-900 dark:text-white"
                >
                    {themes.map(({ key, label }) => (
                        <option key={key} value={key}>
                            {label}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    )
}

export default ThemeToggle