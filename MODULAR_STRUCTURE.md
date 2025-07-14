# Struktur Modular MoneyWise

Dokumentasi ini menjelaskan bagaimana kode MoneyWise telah dimodularisasi untuk meningkatkan maintainability, reusability, dan scalability.

## 📁 Struktur Folder

```
src/
├── components/           # Komponen UI yang dapat digunakan kembali
│   ├── common/          # Komponen umum (Button, Modal, Alert, dll)
│   ├── forms/           # Komponen form (InputField, SelectField, dll)
│   ├── cards/           # Komponen card (StatsCard, TransactionCard, dll)
│   ├── Layout/          # Komponen layout
│   └── UI/              # Komponen UI dasar
├── hooks/               # Custom React hooks
│   ├── useForm.js       # Hook untuk form management
│   ├── useDataManagement.js  # Hook untuk pagination, filtering, sorting
│   ├── useTransactions.js    # Hook untuk transaction logic
│   └── index.js         # Export barrel
├── services/            # Layer untuk business logic dan API calls
│   ├── authService.js   # Service untuk authentication
│   ├── transactionService.js # Service untuk transaction operations
│   ├── storageService.js     # Service untuk localStorage operations
│   └── index.js         # Export barrel
├── utils/               # Utility functions
│   ├── index.js         # General utilities
│   └── transactionUtils.js   # Transaction-specific utilities
├── constants/           # Konstanta dan konfigurasi
│   ├── config.js        # Konfigurasi aplikasi
│   └── nav.jsx          # Navigation constants
├── contexts/            # React context providers
├── pages/               # Page components
└── assets/              # Static assets
```

## 🧩 Komponen Modular

### Common Components (`src/components/common/`)

#### Button

Komponen button yang dapat dikustomisasi dengan berbagai variant dan size.

```jsx
import { Button } from '../components/common';

<Button
  variant="primary"
  size="medium"
  loading={isLoading}
  onClick={handleClick}
>
  Save
</Button>;
```

**Props:**

- `variant`: 'primary' | 'secondary' | 'outline' | 'danger' | 'success'
- `size`: 'small' | 'medium' | 'large'
- `loading`: boolean
- `disabled`: boolean

#### Alert

Komponen untuk menampilkan pesan notifikasi.

```jsx
import { Alert } from '../components/common';

<Alert
  type="success"
  title="Success!"
  message="Transaction saved successfully"
  onClose={handleClose}
/>;
```

#### Modal

Komponen modal yang responsive.

```jsx
import { Modal } from '../components/common';

<Modal
  isOpen={isOpen}
  onClose={handleClose}
  title="Confirm Delete"
  size="medium"
>
  <p>Are you sure you want to delete this transaction?</p>
</Modal>;
```

#### LoadingSpinner

Komponen loading indicator.

```jsx
import { LoadingSpinner } from '../components/common';

<LoadingSpinner
  size="large"
  color="blue"
/>;
```

#### EmptyState

Komponen untuk menampilkan state kosong.

```jsx
import { EmptyState } from '../components/common';

<EmptyState
  icon={Receipt}
  title="No transactions found"
  description="Start by adding your first transaction"
  actionButton={<Button>Add Transaction</Button>}
/>;
```

### Form Components (`src/components/forms/`)

#### InputField

Komponen input yang fully-featured dengan validation.

```jsx
import { InputField } from '../components/forms';

<InputField
  label="Amount"
  name="amount"
  type="number"
  value={amount}
  onChange={handleChange}
  error={errors.amount}
  required
  icon={DollarSign}
/>;
```

#### SelectField

Komponen dropdown select.

```jsx
import { SelectField } from '../components/forms';

<SelectField
  label="Category"
  name="category"
  value={category}
  onChange={handleChange}
  options={categoryOptions}
  error={errors.category}
  required
/>;
```

#### TransactionForm

Komponen form lengkap untuk transaksi.

```jsx
import { TransactionForm } from '../components/forms';

<TransactionForm
  initialData={transaction}
  onSubmit={handleSubmit}
  onCancel={handleCancel}
  loading={loading}
  title="Edit Transaction"
/>;
```

### Card Components (`src/components/cards/`)

#### StatsCard

Komponen untuk menampilkan statistik.

```jsx
import { StatsCard } from '../components/cards';

<StatsCard
  title="Total Income"
  value={totalIncome}
  icon={TrendingUp}
  color="text-green-600"
  trend={{ type: 'up', value: '+15%' }}
/>;
```

#### TransactionCard

Komponen untuk menampilkan item transaksi.

```jsx
import { TransactionCard } from '../components/cards';

<TransactionCard
  transaction={transaction}
  onEdit={handleEdit}
  onDelete={handleDelete}
  showActions={true}
/>;
```

## 🎣 Custom Hooks

### useForm

Hook untuk mengelola form state dan validation.

```jsx
import { useForm } from '../hooks';

const { values, errors, handleChange, handleSubmit, resetForm, isValid } = useForm(initialValues, validationRules);
```

### usePagination

Hook untuk pagination logic.

```jsx
import { usePagination } from '../hooks';

const { currentPage, totalPages, currentData, goToPage, goToNextPage, goToPrevPage } = usePagination(data, 10); // 10 items per page
```

### useFilter

Hook untuk filtering dan searching.

```jsx
import { useFilter } from '../hooks';

const { filteredData, searchTerm, setSearchTerm, filters, setFilter, clearAllFilters } = useFilter(data, initialFilters);
```

### useTransactionStats

Hook untuk menghitung statistik transaksi.

```jsx
import { useTransactionStats } from '../hooks';

const { stats, getCurrentMonthStats, getRecentTransactions, getTopCategories } = useTransactionStats(transactions);
```

## 🔧 Services

### AuthService

Service untuk mengelola authentication.

```jsx
import { authService } from '../services';

// Login
const result = await authService.login(username, password);

// Get current user
const user = authService.getCurrentUser();

// Update profile
const result = await authService.updateProfile(newData);

// Logout
await authService.logout();
```

### TransactionService

Service untuk mengelola operasi transaksi.

```jsx
import { transactionService } from '../services';

// Get all transactions
const transactions = await transactionService.getAll();

// Create transaction
const result = await transactionService.create(transactionData);

// Update transaction
const result = await transactionService.update(id, updateData);

// Delete transaction
const result = await transactionService.delete(id);

// Export transactions
const result = await transactionService.export('csv');
```

### StorageService

Service untuk mengelola localStorage.

```jsx
import { storageService } from '../services';

// Save data
storageService.set('key', data);

// Get data
const data = storageService.get('key', defaultValue);

// Remove data
storageService.remove('key');

// Clear all app data
storageService.clear();
```

## 🛠 Utilities

### General Utilities (`src/utils/index.js`)

```jsx
import { formatCurrency, formatDate, debounce, generateId, isEmpty } from '../utils';

// Format currency
const formatted = formatCurrency(150000); // "Rp 150.000"

// Format date
const formatted = formatDate(new Date()); // "14 Juli 2025"

// Debounce function
const debouncedSearch = debounce(searchFunction, 300);
```

### Transaction Utilities (`src/utils/transactionUtils.js`)

```jsx
import { validateTransaction, TRANSACTION_CATEGORIES, filterTransactionsByPeriod, calculateTotalByType } from '../utils/transactionUtils';

// Validate transaction data
const errors = validateTransaction(transactionData);

// Filter by period
const monthlyTransactions = filterTransactionsByPeriod(transactions, 'month');

// Calculate totals
const totalIncome = calculateTotalByType(transactions, 'income');
```

## 📋 Constants

### App Configuration (`src/constants/config.js`)

```jsx
import { APP_CONFIG, PAGINATION, CURRENCY, VALIDATION_RULES } from '../constants/config';

// Use app name
console.log(APP_CONFIG.name); // "MoneyWise"

// Use pagination settings
const pageSize = PAGINATION.DEFAULT_PAGE_SIZE; // 10
```

## 🔄 Migration Strategy

Untuk menggunakan struktur modular ini, ikuti langkah-langkah berikut:

1. **Install Dependencies**

   ```bash
   npm install prop-types
   ```

2. **Import Komponen Baru**

   ```jsx
   // Ganti komponen lama
   // Old way:
   const StatsCard = ({ title, value }) => (...)

   // New way:
   import { StatsCard } from '../components/cards'
   ```

3. **Gunakan Custom Hooks**

   ```jsx
   // Ganti logic lama dengan hooks
   // Old way:
   const [formData, setFormData] = useState({});

   // New way:
   const { values, handleChange, errors } = useForm(initialValues);
   ```

4. **Gunakan Services**

   ```jsx
   // Ganti localStorage langsung dengan service
   // Old way:
   localStorage.setItem('transactions', JSON.stringify(data));

   // New way:
   transactionService.create(data);
   ```

## 🎯 Keuntungan Modularisasi

1. **Reusability**: Komponen dapat digunakan di berbagai tempat
2. **Maintainability**: Kode lebih mudah dirawat dan di-debug
3. **Testability**: Setiap modul dapat ditest secara terpisah
4. **Scalability**: Mudah menambah fitur baru
5. **Consistency**: UI/UX yang konsisten di seluruh aplikasi
6. **Performance**: Code splitting dan lazy loading lebih mudah

## 📝 Best Practices

1. **Gunakan TypeScript** untuk type safety (opsional)
2. **Buat unit tests** untuk setiap modul
3. **Dokumentasikan** setiap komponen dan hook
4. **Gunakan PropTypes** untuk validasi props
5. **Ikuti naming conventions** yang konsisten
6. **Buat Storybook** untuk komponen library

## 🔮 Future Enhancements

1. **API Integration**: Ganti localStorage dengan real API
2. **State Management**: Implementasi Redux/Zustand jika diperlukan
3. **Internationalization**: Support multi-bahasa
4. **Progressive Web App**: Tambah PWA features
5. **Real-time Updates**: WebSocket untuk real-time data
6. **Advanced Analytics**: Chart dan reporting yang lebih advanced
