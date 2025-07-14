import {
  LayoutDashboard,
  Receipt,
  User,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'

/**
 * Navigation items untuk sidebar/navbar
 */
export const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    description: 'Overview and statistics'
  },
  {
    name: 'Transactions',
    href: '/transactions',
    icon: Receipt,
    description: 'Manage your transactions'
  },
  {
    name: 'Profile',
    href: '/profile',
    icon: User,
    description: 'Account settings'
  }
]

/**
 * Quick action items
 */
export const quickActions = [
  {
    name: 'Add Income',
    href: '/transactions/add?type=income',
    icon: TrendingUp,
    color: 'green',
    description: 'Record income transaction'
  },
  {
    name: 'Add Expense',
    href: '/transactions/add?type=expense',
    icon: ArrowUpRight,
    color: 'red',
    description: 'Record expense transaction'
  },
  {
    name: 'View All',
    href: '/transactions',
    icon: ArrowDownRight,
    color: 'blue',
    description: 'View all transactions'
  }
]

/**
 * Breadcrumb mapping
 */
export const breadcrumbMapping = {
  '/dashboard': 'Dashboard',
  '/transactions': 'Transactions',
  '/transactions/add': 'Add Transaction',
  '/transactions/edit': 'Edit Transaction',
  '/profile': 'Profile'
}