import { useTransactions } from '../contexts/TransactionContext'
import { useAuth } from '../contexts/AuthContext'

const DebugDashboard = () => {
    const { transactions, loading, getSummary } = useTransactions()
    const { user } = useAuth()

    const summary = getSummary()

    return (
        <div className="p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h2 className="text-lg font-bold mb-4">Dashboard Debug</h2>

            <div className="space-y-2 text-sm">
                <p><strong>User:</strong> {user?.username || 'No user'}</p>
                <p><strong>Loading:</strong> {loading ? 'Yes' : 'No'}</p>
                <p><strong>Transactions Count:</strong> {transactions?.length || 0}</p>
                <p><strong>Total Income:</strong> {summary?.totalIncome || 0}</p>
                <p><strong>Total Expense:</strong> {summary?.totalExpense || 0}</p>
                <p><strong>Balance:</strong> {summary?.balance || 0}</p>
            </div>

            {transactions?.length > 0 && (
                <div className="mt-4">
                    <h3 className="font-semibold">Recent Transactions:</h3>
                    <ul className="text-xs">
                        {transactions.slice(0, 3).map(t => (
                            <li key={t.id}>{t.title} - {t.amount}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}

export default DebugDashboard
