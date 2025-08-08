import { useState, type FormEvent } from 'react'
import { PaymentMethods } from './Common/CommonSchema'
import { CheckIcon } from 'lucide-react'
import moment from 'moment'

interface Props {
    serverUrl: String,
    onSubmit: () => void,
}

export const ExpenseForm = ({ serverUrl, onSubmit }: Props) => {
    const [expense, setExpense] = useState({
        title: '',
        amount: 0,
        category: '',
        description: '',
        currency: 'USD',
        exchangeRate: 0,
        createdDate: '',
        paymentType: 'credit',
    })

    const categories = [
        'Groceries',
        'Transportation',
        'Dining',
        'Entertainment',
        'Shopping',
        'Utilities',
        'Healthcare',
        'Education',
        'Travel',
        'Other',
    ]

    const handleChange = (e: { target: { name: any; value: any } }) => {
        const { name, value } = e.target
        setExpense({
            ...expense,
            [name]: name === 'amount' ? parseFloat(value) || '' : value,
        })
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!expense.amount || !expense.category || !expense.description) return
        expense.createdDate = moment().toISOString();

        await fetch(serverUrl + 'newExpense', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(expense),
        });

        setExpense({
            title: '',
            amount: 0,
            category: '',
            description: '',
            currency: 'USD',
            exchangeRate: 0,
            createdDate: '',
            paymentType: 'credit',
        })

        // ouput listener
        onSubmit()
    }

    const makeTitle = (str: String) => {
        if (str && str.length !== 0) {
            return str.charAt(0).toUpperCase() + str.slice(1);
        }
        return '';
    }

    const clearForm = () => {
        setExpense({
            title: '',
            amount: 0,
            category: '',
            description: '',
            currency: 'USD',
            exchangeRate: 0,
            createdDate: '',
            paymentType: 'credit',
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Amount
                </label>
                <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 dark:text-gray-400">$</span>
                    </div>
                    <input
                        type="number"
                        name="amount"
                        value={expense.amount}
                        onChange={handleChange}
                        className="pl-7 p-2 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                        placeholder="0.00"
                        step="0.01"
                        min="0"
                        required
                    />
                </div>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Category
                </label>
                <select
                    name="category"
                    value={expense.category}
                    onChange={handleChange}
                    className="p-2 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    required
                >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Description
                </label>

                <textarea name="description"
                    value={expense.description}
                    onChange={handleChange}
                    className="p-3 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                    placeholder="What was this expense for?"
                    rows={expense.description.length < 10 ? 1 : 3}
                    required
                ></textarea>
            </div>
            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Payment Method
                </label>
                <div className="grid grid-cols-2 gap-2">
                    {Object.keys(PaymentMethods).map((method) => (
                        <label
                            key={method}
                            className={`
                flex items-center p-3 rounded-md border cursor-pointer
                ${expense.paymentType === method ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/50' : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'}
              `}
                        >
                            <input
                                type="radio"
                                name="paymentType"
                                value={method}
                                checked={expense.paymentType === method}
                                onChange={handleChange}
                                className="hidden"
                            />
                            <div
                                className={`w-4 h-4 rounded-full mr-2 ${PaymentMethods[method]}`}
                            ></div>
                            <span className="text-sm dark:text-gray-300">{makeTitle(method)}</span>
                            {expense.paymentType === method && (
                                <CheckIcon size={16} className="ml-auto text-blue-500" />
                            )}
                        </label>
                    ))}
                </div>
            </div>
            <div className="flex justify-end space-x-3">
                <button
                    type="button"
                    onClick={clearForm}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Add Expense
                </button>
            </div>
        </form>
    )
}
