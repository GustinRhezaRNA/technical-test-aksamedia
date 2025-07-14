import { createContext, useContext, useState, useEffect } from 'react'

const TransactionContext = createContext()

export const useTransactions = () => {
    const context = useContext(TransactionContext)
    if (!context) {
        throw new Error('useTransactions must be used within TransactionProvider')
    }
    return context
}

// Sample transaction data with many entries for pagination demo
const sampleTransactions = [
    // January 2024
    {
        id: '1',
        title: 'Salary Payment',
        amount: 5000000,
        type: 'income',
        category: 'Salary',
        description: 'Monthly salary payment',
        date: '2024-01-01',
        createdAt: new Date('2024-01-01').toISOString()
    },
    {
        id: '2',
        title: 'Grocery Shopping',
        amount: 150000,
        type: 'expense',
        category: 'Food',
        description: 'Weekly grocery shopping at supermarket',
        date: '2024-01-02',
        createdAt: new Date('2024-01-02').toISOString()
    },
    {
        id: '3',
        title: 'Freelance Project',
        amount: 2500000,
        type: 'income',
        category: 'Freelance',
        description: 'Web development project payment',
        date: '2024-01-03',
        createdAt: new Date('2024-01-03').toISOString()
    },
    {
        id: '4',
        title: 'Coffee Shop',
        amount: 45000,
        type: 'expense',
        category: 'Food',
        description: 'Morning coffee and breakfast',
        date: '2024-01-04',
        createdAt: new Date('2024-01-04').toISOString()
    },
    {
        id: '5',
        title: 'Uber Ride',
        amount: 35000,
        type: 'expense',
        category: 'Transportation',
        description: 'Ride to office',
        date: '2024-01-05',
        createdAt: new Date('2024-01-05').toISOString()
    },
    {
        id: '6',
        title: 'Investment Return',
        amount: 750000,
        type: 'income',
        category: 'Investment',
        description: 'Monthly investment return',
        date: '2024-01-06',
        createdAt: new Date('2024-01-06').toISOString()
    },
    {
        id: '7',
        title: 'Shopping Mall',
        amount: 320000,
        type: 'expense',
        category: 'Shopping',
        description: 'New clothes and accessories',
        date: '2024-01-07',
        createdAt: new Date('2024-01-07').toISOString()
    },
    {
        id: '8',
        title: 'Electricity Bill',
        amount: 250000,
        type: 'expense',
        category: 'Utilities',
        description: 'Monthly electricity bill payment',
        date: '2024-01-08',
        createdAt: new Date('2024-01-08').toISOString()
    },
    {
        id: '9',
        title: 'Cinema Tickets',
        amount: 80000,
        type: 'expense',
        category: 'Entertainment',
        description: 'Movie tickets for weekend',
        date: '2024-01-09',
        createdAt: new Date('2024-01-09').toISOString()
    },
    {
        id: '10',
        title: 'Gas Station',
        amount: 200000,
        type: 'expense',
        category: 'Transportation',
        description: 'Car fuel refill',
        date: '2024-01-10',
        createdAt: new Date('2024-01-10').toISOString()
    },
    {
        id: '11',
        title: 'Bonus Payment',
        amount: 1500000,
        type: 'income',
        category: 'Bonus',
        description: 'Performance bonus',
        date: '2024-01-11',
        createdAt: new Date('2024-01-11').toISOString()
    },
    {
        id: '12',
        title: 'Restaurant Dinner',
        amount: 180000,
        type: 'expense',
        category: 'Food',
        description: 'Dinner with family',
        date: '2024-01-12',
        createdAt: new Date('2024-01-12').toISOString()
    },
    {
        id: '13',
        title: 'Online Course',
        amount: 450000,
        type: 'expense',
        category: 'Education',
        description: 'Programming course subscription',
        date: '2024-01-13',
        createdAt: new Date('2024-01-13').toISOString()
    },
    {
        id: '14',
        title: 'Gift from Parents',
        amount: 1000000,
        type: 'income',
        category: 'Gift',
        description: 'Birthday gift money',
        date: '2024-01-14',
        createdAt: new Date('2024-01-14').toISOString()
    },
    {
        id: '15',
        title: 'Internet Bill',
        amount: 300000,
        type: 'expense',
        category: 'Utilities',
        description: 'Monthly internet subscription',
        date: '2024-01-15',
        createdAt: new Date('2024-01-15').toISOString()
    },
    // February 2024
    {
        id: '16',
        title: 'Salary Payment',
        amount: 5000000,
        type: 'income',
        category: 'Salary',
        description: 'Monthly salary payment',
        date: '2024-02-01',
        createdAt: new Date('2024-02-01').toISOString()
    },
    {
        id: '17',
        title: 'Doctor Visit',
        amount: 500000,
        type: 'expense',
        category: 'Healthcare',
        description: 'Regular health checkup',
        date: '2024-02-02',
        createdAt: new Date('2024-02-02').toISOString()
    },
    {
        id: '18',
        title: 'Freelance Design',
        amount: 1800000,
        type: 'income',
        category: 'Freelance',
        description: 'Logo design project',
        date: '2024-02-03',
        createdAt: new Date('2024-02-03').toISOString()
    },
    {
        id: '19',
        title: 'Grocery Shopping',
        amount: 175000,
        type: 'expense',
        category: 'Food',
        description: 'Weekly groceries',
        date: '2024-02-04',
        createdAt: new Date('2024-02-04').toISOString()
    },
    {
        id: '20',
        title: 'Spotify Premium',
        amount: 55000,
        type: 'expense',
        category: 'Entertainment',
        description: 'Music streaming subscription',
        date: '2024-02-05',
        createdAt: new Date('2024-02-05').toISOString()
    },
    {
        id: '21',
        title: 'Investment Dividend',
        amount: 650000,
        type: 'income',
        category: 'Investment',
        description: 'Stock dividend payment',
        date: '2024-02-06',
        createdAt: new Date('2024-02-06').toISOString()
    },
    {
        id: '22',
        title: 'Phone Bill',
        amount: 150000,
        type: 'expense',
        category: 'Utilities',
        description: 'Monthly phone bill',
        date: '2024-02-07',
        createdAt: new Date('2024-02-07').toISOString()
    },
    {
        id: '23',
        title: 'Bus Ticket',
        amount: 25000,
        type: 'expense',
        category: 'Transportation',
        description: 'Daily commute',
        date: '2024-02-08',
        createdAt: new Date('2024-02-08').toISOString()
    },
    {
        id: '24',
        title: 'Book Purchase',
        amount: 120000,
        type: 'expense',
        category: 'Education',
        description: 'Programming books',
        date: '2024-02-09',
        createdAt: new Date('2024-02-09').toISOString()
    },
    {
        id: '25',
        title: 'Lunch Meeting',
        amount: 95000,
        type: 'expense',
        category: 'Food',
        description: 'Business lunch',
        date: '2024-02-10',
        createdAt: new Date('2024-02-10').toISOString()
    },
    {
        id: '26',
        title: 'Consulting Fee',
        amount: 3200000,
        type: 'income',
        category: 'Freelance',
        description: 'IT consulting project',
        date: '2024-02-11',
        createdAt: new Date('2024-02-11').toISOString()
    },
    {
        id: '27',
        title: 'Gym Membership',
        amount: 250000,
        type: 'expense',
        category: 'Healthcare',
        description: 'Monthly gym subscription',
        date: '2024-02-12',
        createdAt: new Date('2024-02-12').toISOString()
    },
    {
        id: '28',
        title: 'Netflix Subscription',
        amount: 65000,
        type: 'expense',
        category: 'Entertainment',
        description: 'Monthly streaming service',
        date: '2024-02-13',
        createdAt: new Date('2024-02-13').toISOString()
    },
    {
        id: '29',
        title: 'Car Maintenance',
        amount: 800000,
        type: 'expense',
        category: 'Transportation',
        description: 'Car service and oil change',
        date: '2024-02-14',
        createdAt: new Date('2024-02-14').toISOString()
    },
    {
        id: '30',
        title: 'Fast Food',
        amount: 55000,
        type: 'expense',
        category: 'Food',
        description: 'Quick dinner',
        date: '2024-02-15',
        createdAt: new Date('2024-02-15').toISOString()
    },
    // March 2024
    {
        id: '31',
        title: 'Salary Payment',
        amount: 5200000,
        type: 'income',
        category: 'Salary',
        description: 'Monthly salary with raise',
        date: '2024-03-01',
        createdAt: new Date('2024-03-01').toISOString()
    },
    {
        id: '32',
        title: 'Water Bill',
        amount: 85000,
        type: 'expense',
        category: 'Utilities',
        description: 'Monthly water bill',
        date: '2024-03-02',
        createdAt: new Date('2024-03-02').toISOString()
    },
    {
        id: '33',
        title: 'Side Project',
        amount: 2200000,
        type: 'income',
        category: 'Freelance',
        description: 'Mobile app development',
        date: '2024-03-03',
        createdAt: new Date('2024-03-03').toISOString()
    },
    {
        id: '34',
        title: 'Pharmacy',
        amount: 75000,
        type: 'expense',
        category: 'Healthcare',
        description: 'Vitamins and medicines',
        date: '2024-03-04',
        createdAt: new Date('2024-03-04').toISOString()
    },
    {
        id: '35',
        title: 'Coffee Subscription',
        amount: 180000,
        type: 'expense',
        category: 'Food',
        description: 'Monthly coffee beans delivery',
        date: '2024-03-05',
        createdAt: new Date('2024-03-05').toISOString()
    },
    {
        id: '36',
        title: 'Investment Profit',
        amount: 1100000,
        type: 'income',
        category: 'Investment',
        description: 'Crypto trading profit',
        date: '2024-03-06',
        createdAt: new Date('2024-03-06').toISOString()
    },
    {
        id: '37',
        title: 'Gaming Purchase',
        amount: 350000,
        type: 'expense',
        category: 'Entertainment',
        description: 'New video game',
        date: '2024-03-07',
        createdAt: new Date('2024-03-07').toISOString()
    },
    {
        id: '38',
        title: 'Taxi Ride',
        amount: 45000,
        type: 'expense',
        category: 'Transportation',
        description: 'Airport transfer',
        date: '2024-03-08',
        createdAt: new Date('2024-03-08').toISOString()
    },
    {
        id: '39',
        title: 'Online Workshop',
        amount: 650000,
        type: 'expense',
        category: 'Education',
        description: 'UI/UX design workshop',
        date: '2024-03-09',
        createdAt: new Date('2024-03-09').toISOString()
    },
    {
        id: '40',
        title: 'Pizza Night',
        amount: 135000,
        type: 'expense',
        category: 'Food',
        description: 'Family pizza dinner',
        date: '2024-03-10',
        createdAt: new Date('2024-03-10').toISOString()
    },
    {
        id: '41',
        title: 'Freelance Article',
        amount: 800000,
        type: 'income',
        category: 'Freelance',
        description: 'Technical writing project',
        date: '2024-03-11',
        createdAt: new Date('2024-03-11').toISOString()
    },
    {
        id: '42',
        title: 'Clothing Store',
        amount: 450000,
        type: 'expense',
        category: 'Shopping',
        description: 'New work clothes',
        date: '2024-03-12',
        createdAt: new Date('2024-03-12').toISOString()
    },
    {
        id: '43',
        title: 'Concert Ticket',
        amount: 275000,
        type: 'expense',
        category: 'Entertainment',
        description: 'Music concert',
        date: '2024-03-13',
        createdAt: new Date('2024-03-13').toISOString()
    },
    {
        id: '44',
        title: 'Parking Fee',
        amount: 15000,
        type: 'expense',
        category: 'Transportation',
        description: 'Mall parking',
        date: '2024-03-14',
        createdAt: new Date('2024-03-14').toISOString()
    },
    {
        id: '45',
        title: 'Gift Money',
        amount: 500000,
        type: 'income',
        category: 'Gift',
        description: 'Wedding gift received',
        date: '2024-03-15',
        createdAt: new Date('2024-03-15').toISOString()
    },
    // April 2024
    {
        id: '46',
        title: 'Salary Payment',
        amount: 5200000,
        type: 'income',
        category: 'Salary',
        description: 'Monthly salary payment',
        date: '2024-04-01',
        createdAt: new Date('2024-04-01').toISOString()
    },
    {
        id: '47',
        title: 'Insurance Premium',
        amount: 350000,
        type: 'expense',
        category: 'Healthcare',
        description: 'Health insurance monthly payment',
        date: '2024-04-02',
        createdAt: new Date('2024-04-02').toISOString()
    },
    {
        id: '48',
        title: 'Bakery Visit',
        amount: 85000,
        type: 'expense',
        category: 'Food',
        description: 'Fresh bread and pastries',
        date: '2024-04-03',
        createdAt: new Date('2024-04-03').toISOString()
    },
    {
        id: '49',
        title: 'Train Ticket',
        amount: 125000,
        type: 'expense',
        category: 'Transportation',
        description: 'Weekend trip',
        date: '2024-04-04',
        createdAt: new Date('2024-04-04').toISOString()
    },
    {
        id: '50',
        title: 'Tutoring Income',
        amount: 1200000,
        type: 'income',
        category: 'Other',
        description: 'Private programming lessons',
        date: '2024-04-05',
        createdAt: new Date('2024-04-05').toISOString()
    },
    // Additional test data with "Agus" for search testing
    {
        id: '51',
        title: 'Payment from Agus',
        amount: 850000,
        type: 'income',
        category: 'Freelance',
        description: 'Website design project for Agus Company',
        date: '2024-04-06',
        createdAt: new Date('2024-04-06').toISOString()
    },
    {
        id: '52',
        title: 'Lunch with Agus',
        amount: 125000,
        type: 'expense',
        category: 'Food',
        description: 'Business lunch meeting with Agus at restaurant',
        date: '2024-04-07',
        createdAt: new Date('2024-04-07').toISOString()
    },
    {
        id: '53',
        title: 'Agus Birthday Gift',
        amount: 200000,
        type: 'expense',
        category: 'Other',
        description: 'Birthday gift for Agus colleague',
        date: '2024-04-08',
        createdAt: new Date('2024-04-08').toISOString()
    },
    {
        id: '54',
        title: 'Consulting for Agus Store',
        amount: 1500000,
        type: 'income',
        category: 'Freelance',
        description: 'E-commerce consultation for Agus retail store',
        date: '2024-04-09',
        createdAt: new Date('2024-04-09').toISOString()
    },
    {
        id: '55',
        title: 'Car Rental with Agus',
        amount: 300000,
        type: 'expense',
        category: 'Transportation',
        description: 'Split car rental cost with Agus for business trip',
        date: '2024-04-10',
        createdAt: new Date('2024-04-10').toISOString()
    }
    ,
    {
        id: '56',
        title: 'Agus Project Bonus',
        amount: 500000,
        type: 'income',
        category: 'Bonus',
        description: 'Bonus for completing Agus project ahead of schedule',
        date: '2024-04-11',
        createdAt: new Date('2024-04-11').toISOString()
    },
    {
        id: '57',
        title: 'Dinner with Agus Team',
        amount: 220000,
        type: 'expense',
        category: 'Food',
        description: 'Team dinner with Agus and colleagues',
        date: '2024-04-12',
        createdAt: new Date('2024-04-12').toISOString()
    },
    {
        id: '58',
        title: 'Agus Office Supplies',
        amount: 95000,
        type: 'expense',
        category: 'Shopping',
        description: 'Office supplies purchased for Agus project',
        date: '2024-04-13',
        createdAt: new Date('2024-04-13').toISOString()
    },
    {
        id: '59',
        title: 'Agus Freelance Payment',
        amount: 1200000,
        type: 'income',
        category: 'Freelance',
        description: 'Freelance payment received from Agus',
        date: '2024-04-14',
        createdAt: new Date('2024-04-14').toISOString()
    },
    {
        id: '60',
        title: 'Agus Transportation',
        amount: 175000,
        type: 'expense',
        category: 'Transportation',
        description: 'Transportation costs for Agus client meeting',
        date: '2024-04-15',
        createdAt: new Date('2024-04-15').toISOString()
    }
]

export const TransactionProvider = ({ children }) => {
    const [transactions, setTransactions] = useState([])
    const [loading, setLoading] = useState(true)

    // Load transactions from localStorage on mount
    useEffect(() => {
        const savedTransactions = localStorage.getItem('transactions')
        if (savedTransactions) {
            setTransactions(JSON.parse(savedTransactions))
        } else {
            // Use sample data if no saved transactions
            setTransactions(sampleTransactions)
            localStorage.setItem('transactions', JSON.stringify(sampleTransactions))
        }
        setLoading(false)
    }, [])

    // Save transactions to localStorage whenever transactions change
    useEffect(() => {
        if (!loading) {
            localStorage.setItem('transactions', JSON.stringify(transactions))
        }
    }, [transactions, loading])

    const addTransaction = (transactionData) => {
        const newTransaction = {
            ...transactionData,
            id: Date.now().toString(),
            createdAt: new Date().toISOString()
        }
        setTransactions(prev => [newTransaction, ...prev])
        return newTransaction
    }

    const updateTransaction = (id, transactionData) => {
        setTransactions(prev =>
            prev.map(transaction =>
                transaction.id === id
                    ? { ...transaction, ...transactionData }
                    : transaction
            )
        )
    }

    const deleteTransaction = (id) => {
        setTransactions(prev => prev.filter(transaction => transaction.id !== id))
    }

    const getTransaction = (id) => {
        return transactions.find(transaction => transaction.id === id)
    }

    // Calculate summary statistics
    const getSummary = () => {
        const totalIncome = transactions
            .filter(t => t.type === 'income')
            .reduce((sum, t) => sum + t.amount, 0)

        const totalExpense = transactions
            .filter(t => t.type === 'expense')
            .reduce((sum, t) => sum + t.amount, 0)

        return {
            totalIncome,
            totalExpense,
            balance: totalIncome - totalExpense,
            totalTransactions: transactions.length
        }
    }

    const value = {
        transactions,
        loading,
        addTransaction,
        updateTransaction,
        deleteTransaction,
        getTransaction,
        getSummary
    }

    return (
        <TransactionContext.Provider value={value}>
            {children}
        </TransactionContext.Provider>
    )
}
