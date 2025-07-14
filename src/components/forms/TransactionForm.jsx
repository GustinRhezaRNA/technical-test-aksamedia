import { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { InputField, SelectField, TextareaField } from '../forms'
import { Button } from '../common'
import { validateTransaction, TRANSACTION_CATEGORIES } from '../../utils/transactionUtils'
import { useForm } from '../../hooks/useForm'

/**
 * Komponen form untuk transaksi yang dapat digunakan kembali
 */
export const TransactionForm = ({
    initialData = null,
    onSubmit,
    onCancel,
    loading = false,
    submitLabel = 'Save Transaction',
    title = 'Transaction Form'
}) => {
    const [availableCategories, setAvailableCategories] = useState([])

    const defaultValues = {
        type: 'expense',
        title: '',
        description: '',
        amount: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
        ...initialData
    }

    const {
        values,
        errors,
        handleChange,
        handleSubmit,
        setFieldValue,
        isValid
    } = useForm(defaultValues, validateTransaction)

    // Update available categories when type changes
    useEffect(() => {
        const categories = TRANSACTION_CATEGORIES[values.type] || []
        setAvailableCategories(
            categories.map(cat => ({ value: cat, label: cat }))
        )

        // Reset category if current category is not valid for new type
        if (values.category && !categories.includes(values.category)) {
            setFieldValue('category', '')
        }
    }, [values.type, values.category, setFieldValue])

    const handleFormSubmit = handleSubmit(async (formData) => {
        try {
            await onSubmit({
                ...formData,
                amount: parseFloat(formData.amount)
            })
        } catch (error) {
            console.error('Form submission error:', error)
        }
    })

    const typeOptions = [
        { value: 'income', label: 'Income' },
        { value: 'expense', label: 'Expense' }
    ]

    return (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
                {title}
            </h2>

            <form onSubmit={handleFormSubmit} className="space-y-6">
                {/* Transaction Type */}
                <SelectField
                    label="Transaction Type"
                    name="type"
                    value={values.type}
                    onChange={handleChange}
                    options={typeOptions}
                    error={errors.type}
                    required
                />

                {/* Title */}
                <InputField
                    label="Title"
                    name="title"
                    value={values.title}
                    onChange={handleChange}
                    placeholder="Enter transaction title"
                    error={errors.title}
                    required
                />

                {/* Description */}
                <TextareaField
                    label="Description"
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    placeholder="Enter transaction description"
                    error={errors.description}
                    rows={3}
                    required
                />

                {/* Amount */}
                <InputField
                    label="Amount"
                    name="amount"
                    type="number"
                    value={values.amount}
                    onChange={handleChange}
                    placeholder="0"
                    error={errors.amount}
                    required
                    min="0"
                    step="0.01"
                />

                {/* Category */}
                <SelectField
                    label="Category"
                    name="category"
                    value={values.category}
                    onChange={handleChange}
                    options={availableCategories}
                    placeholder="Select category"
                    error={errors.category}
                    required
                />

                {/* Date */}
                <InputField
                    label="Date"
                    name="date"
                    type="date"
                    value={values.date}
                    onChange={handleChange}
                    error={errors.date}
                    required
                />

                {/* Form Actions */}
                <div className="flex items-center justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                    {onCancel && (
                        <Button
                            type="button"
                            variant="outline"
                            onClick={onCancel}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                    )}
                    <Button
                        type="submit"
                        loading={loading}
                        disabled={!isValid}
                    >
                        {submitLabel}
                    </Button>
                </div>
            </form>
        </div>
    )
}

TransactionForm.propTypes = {
    initialData: PropTypes.shape({
        type: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string,
        amount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        category: PropTypes.string,
        date: PropTypes.string
    }),
    onSubmit: PropTypes.func.isRequired,
    onCancel: PropTypes.func,
    loading: PropTypes.bool,
    submitLabel: PropTypes.string,
    title: PropTypes.string
}
