import PropTypes from 'prop-types'
import { formatCurrency, formatDate } from '../../utils'

/**
 * Komponen StatsCard untuk menampilkan statistik
 */
export const StatsCard = ({ title, value, icon: Icon, color, trend, className = '' }) => {
    return (
        <div className={`bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 ${className}`}>
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
                    <p className={`text-2xl font-bold ${color}`}>
                        {typeof value === 'number' ? formatCurrency(value) : value}
                    </p>
                    {trend && (
                        <div className="flex items-center mt-2">
                            <span className={`text-sm font-medium ${trend.type === 'up' ? 'text-green-600' :
                                    trend.type === 'down' ? 'text-red-600' :
                                        'text-gray-600'
                                }`}>
                                {trend.type === 'up' ? '↗' : trend.type === 'down' ? '↘' : '→'} {trend.value}
                            </span>
                            <span className="text-sm text-gray-500 ml-1">vs last month</span>
                        </div>
                    )}
                </div>
                <div className={`p-3 rounded-full ${color.includes('green') ? 'bg-green-100 dark:bg-green-900/20' :
                        color.includes('red') ? 'bg-red-100 dark:bg-red-900/20' :
                            color.includes('blue') ? 'bg-blue-100 dark:bg-blue-900/20' :
                                'bg-gray-100 dark:bg-gray-900/20'
                    }`}>
                    <Icon className={`h-6 w-6 ${color}`} />
                </div>
            </div>
        </div>
    )
}

StatsCard.propTypes = {
    title: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    icon: PropTypes.elementType.isRequired,
    color: PropTypes.string.isRequired,
    trend: PropTypes.shape({
        type: PropTypes.oneOf(['up', 'down', 'stable']),
        value: PropTypes.string
    }),
    className: PropTypes.string
}

/**
 * Komponen TransactionCard untuk menampilkan item transaksi
 */
export const TransactionCard = ({
    transaction,
    onEdit,
    onDelete,
    onClick,
    showActions = true,
    className = ''
}) => {
    const isIncome = transaction.type === 'income'

    return (
        <div
            className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${onClick ? 'cursor-pointer' : ''} ${className}`}
            onClick={onClick}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <div className={`p-2 rounded-full ${isIncome
                            ? 'bg-green-100 dark:bg-green-900/20'
                            : 'bg-red-100 dark:bg-red-900/20'
                        }`}>
                        {isIncome ? (
                            <svg className="h-5 w-5 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        ) : (
                            <svg className="h-5 w-5 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                            </svg>
                        )}
                    </div>
                    <div>
                        <p className="font-medium text-gray-900 dark:text-white">
                            {transaction.title}
                        </p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                            {transaction.category} • {formatDate(transaction.date)}
                        </p>
                    </div>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="text-right">
                        <p className={`font-semibold ${isIncome
                                ? 'text-green-600 dark:text-green-400'
                                : 'text-red-600 dark:text-red-400'
                            }`}>
                            {isIncome ? '+' : '-'}{formatCurrency(transaction.amount)}
                        </p>
                    </div>
                    {showActions && (
                        <div className="flex items-center space-x-2">
                            {onEdit && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        onEdit(transaction)
                                    }}
                                    className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                >
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                </button>
                            )}
                            {onDelete && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        onDelete(transaction)
                                    }}
                                    className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                                >
                                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

TransactionCard.propTypes = {
    transaction: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        type: PropTypes.oneOf(['income', 'expense']).isRequired,
        category: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        description: PropTypes.string
    }).isRequired,
    onEdit: PropTypes.func,
    onDelete: PropTypes.func,
    onClick: PropTypes.func,
    showActions: PropTypes.bool,
    className: PropTypes.string
}

/**
 * Komponen CategoryCard untuk menampilkan statistik kategori
 */
export const CategoryCard = ({ category, income, expense, count, className = '' }) => {
    const netAmount = income - expense

    return (
        <div className={`bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-4 ${className}`}>
            <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-gray-900 dark:text-white">{category}</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">{count} transactions</span>
            </div>

            <div className="space-y-2">
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Income</span>
                    <span className="text-sm font-medium text-green-600 dark:text-green-400">
                        {formatCurrency(income)}
                    </span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Expense</span>
                    <span className="text-sm font-medium text-red-600 dark:text-red-400">
                        {formatCurrency(expense)}
                    </span>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-2">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">Net</span>
                        <span className={`text-sm font-bold ${netAmount >= 0
                                ? 'text-green-600 dark:text-green-400'
                                : 'text-red-600 dark:text-red-400'
                            }`}>
                            {netAmount >= 0 ? '+' : ''}{formatCurrency(netAmount)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}

CategoryCard.propTypes = {
    category: PropTypes.string.isRequired,
    income: PropTypes.number.isRequired,
    expense: PropTypes.number.isRequired,
    count: PropTypes.number.isRequired,
    className: PropTypes.string
}

/**
 * Komponen QuickActionCard untuk aksi cepat
 */
export const QuickActionCard = ({
    title,
    description,
    icon: Icon,
    onClick,
    color = 'blue',
    className = ''
}) => {
    const colorClasses = {
        blue: 'bg-blue-600 hover:bg-blue-700 text-white',
        green: 'bg-green-600 hover:bg-green-700 text-white',
        gray: 'bg-gray-600 hover:bg-gray-700 text-white',
        outline: 'border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
    }

    return (
        <button
            onClick={onClick}
            className={`flex items-center justify-center px-6 py-4 rounded-lg transition-colors w-full ${colorClasses[color]} ${className}`}
        >
            {Icon && <Icon className="h-5 w-5 mr-2" />}
            <div className="text-left">
                <div className="font-medium">{title}</div>
                {description && (
                    <div className="text-sm opacity-90">{description}</div>
                )}
            </div>
        </button>
    )
}

QuickActionCard.propTypes = {
    title: PropTypes.string.isRequired,
    description: PropTypes.string,
    icon: PropTypes.elementType.isRequired,
    onClick: PropTypes.func.isRequired,
    color: PropTypes.oneOf(['blue', 'green', 'gray', 'outline']),
    className: PropTypes.string
}
