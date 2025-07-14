# MoneyWise - Personal Finance Management

MoneyWise adalah aplikasi manajemen keuangan pribadi yang dibangun dengan React dan Vite. Aplikasi ini memungkinkan Anda untuk melacak pemasukan dan pengeluaran dengan interface yang modern dan responsive.

## ✨ Fitur

- 📊 **Dashboard Interaktif** - Lihat ringkasan keuangan Anda dengan statistik real-time
- 💰 **Manajemen Transaksi** - Tambah, edit, dan hapus transaksi dengan mudah
- 🔍 **Pencarian & Filter** - Cari dan filter transaksi berdasarkan kategori, tipe, dan tanggal
- 📱 **Responsive Design** - Bekerja sempurna di desktop, tablet, dan mobile
- 🌙 **Dark Mode** - Support untuk tema gelap dan terang
- 📈 **Statistik Realtime** - Lihat tren keuangan Anda dalam berbagai periode
- 🔐 **Secure Authentication** - Sistem login yang aman
- 💾 **Persistent Data** - Data tersimpan di localStorage

## 🏗 Arsitektur Modular

Aplikasi ini dibangun dengan arsitektur modular untuk meningkatkan maintainability dan reusability:

### 📁 Struktur Folder

```
src/
├── components/           # Komponen UI yang dapat digunakan kembali
│   ├── common/          # Button, Modal, Alert, LoadingSpinner, dll
│   ├── forms/           # InputField, SelectField, TransactionForm, dll
│   ├── cards/           # StatsCard, TransactionCard, CategoryCard, dll
│   ├── Layout/          # Layout components
│   └── UI/              # Basic UI components
├── hooks/               # Custom React hooks
│   ├── useForm.js       # Form management hook
│   ├── useDataManagement.js  # Pagination, filtering, sorting
│   ├── useTransactions.js    # Transaction business logic
│   └── index.js         # Export barrel
├── services/            # Business logic layer
│   ├── authService.js   # Authentication service
│   ├── transactionService.js # Transaction operations
│   ├── storageService.js     # localStorage abstraction
│   └── index.js         # Export barrel
├── utils/               # Utility functions
│   ├── index.js         # General utilities (formatCurrency, formatDate, dll)
│   └── transactionUtils.js   # Transaction-specific utilities
├── constants/           # App constants dan configuration
├── contexts/            # React context providers
├── pages/               # Page components
└── assets/              # Static assets
```

### 🧩 Komponen Modular

- **Reusable Components**: Button, Modal, Alert, InputField, SelectField
- **Specialized Cards**: StatsCard, TransactionCard, CategoryCard
- **Form Components**: TransactionForm dengan validasi built-in
- **Layout Components**: Responsive layout dengan navigation

### 🎣 Custom Hooks

- **useForm**: Form state management dengan validasi
- **usePagination**: Pagination logic yang dapat digunakan kembali
- **useFilter**: Filtering dan searching logic
- **useTransactionStats**: Kalkulasi statistik transaksi

### 🔧 Services Layer

- **AuthService**: Manajemen authentication dan session
- **TransactionService**: CRUD operations untuk transaksi
- **StorageService**: Abstraksi localStorage dengan error handling

## 🚀 Getting Started

### Prerequisites

- Node.js (versi 16 atau lebih baru)
- npm atau yarn

### Installation

1. Clone repository

```bash
git clone <repository-url>
cd technical-test-aksamedia
```

2. Install dependencies

```bash
npm install
```

3. Install additional dependencies untuk modular structure

```bash
npm install prop-types
```

4. Jalankan development server

```bash
npm run dev
```

5. Buka browser dan akses `http://localhost:5173`

### 🔑 Login Credentials

- **Username**: admin
- **Password**: finance123

## 📱 Fitur Aplikasi

### Dashboard

- Overview keuangan bulanan
- Statistik total pemasukan, pengeluaran, dan saldo
- Transaksi terbaru
- Quick actions untuk menambah transaksi

### Manajemen Transaksi

- Daftar semua transaksi dengan pagination
- Filter berdasarkan tipe (pemasukan/pengeluaran)
- Filter berdasarkan kategori
- Pencarian berdasarkan judul dan deskripsi
- Edit dan hapus transaksi

### Profile Management

- Edit informasi profil pengguna
- Update nama lengkap dan informasi lainnya

## 🛠 Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Routing**: React Router DOM
- **State Management**: React Context + Custom Hooks
- **Data Storage**: localStorage
- **Build Tool**: Vite
- **Linting**: ESLint

## 📋 Available Scripts

- `npm run dev` - Jalankan development server
- `npm run build` - Build aplikasi untuk production
- `npm run preview` - Preview build production
- `npm run lint` - Jalankan ESLint

## 🎯 Penggunaan Komponen Modular

### Contoh Penggunaan Button

```jsx
import { Button } from './components/common';

<Button
  variant="primary"
  size="medium"
  loading={isLoading}
  onClick={handleClick}
>
  Save Transaction
</Button>;
```

### Contoh Penggunaan Form Hook

```jsx
import { useForm } from './hooks';

const { values, errors, handleChange, handleSubmit, isValid } = useForm(initialValues, validationRules);
```

### Contoh Penggunaan Service

```jsx
import { transactionService } from './services';

const result = await transactionService.create(transactionData);
```

## 🔄 Migration ke Struktur Modular

Lihat [MODULAR_STRUCTURE.md](./MODULAR_STRUCTURE.md) untuk panduan lengkap tentang:

- Struktur folder detail
- Dokumentasi komponen
- Custom hooks usage
- Services layer
- Best practices
- Migration strategy

## 🌟 Keuntungan Arsitektur Modular

1. **Reusability** - Komponen dapat digunakan berulang kali
2. **Maintainability** - Kode lebih mudah dirawat
3. **Testability** - Setiap modul dapat ditest terpisah
4. **Scalability** - Mudah menambah fitur baru
5. **Consistency** - UI/UX yang konsisten
6. **Performance** - Optimasi dengan code splitting

## 🔮 Future Enhancements

- [ ] Integration dengan real API
- [ ] Export/Import data (CSV, JSON)
- [ ] Advanced charts dan analytics
- [ ] Kategori custom
- [ ] Multi-currency support
- [ ] Backup dan restore data
- [ ] PWA features
- [ ] Real-time notifications

## 🤝 Contributing

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buat Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

## 👥 Contact

Untuk pertanyaan atau dukungan, silakan buat issue di repository ini.
