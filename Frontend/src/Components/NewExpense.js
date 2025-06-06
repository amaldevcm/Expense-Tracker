import React, { useState } from 'react'
import { paymentMethods } from './ExpenseTracker'
import { CheckIcon } from 'lucide-react'

export const NewExpense = ({ onSubmit, onCancel }) => {
  const [expense, setExpense] = useState({
    amount: '',
    category: '',
    description: '',
    paymentMethod: 'Credit Card',
  });

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
  ];

  const handleChange = (e) => {
    const { name, value } = e.target
    setExpense({
      ...expense,
      [name]: name === 'amount' ? parseFloat(value) || '' : value,
    })
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!expense.amount || !expense.category || !expense.description) return

    onSubmit(expense)
    setExpense({
      amount: '',
      category: '',
      description: '',
      paymentMethod: 'Credit Card',
    });
  };

return (
    <form onSubmit={handleSubmit}>
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Amount</label>
            <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-gray-500">$</span>
            </div>
            <input type="number" name="amount" value={expense.amount} onChange={handleChange} className="pl-7 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="0.00" step="0.01" min="0" required/>
            </div>
        </div>
        
        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1"> Category </label>
            <select name="category" value={expense.category} onChange={handleChange} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" required>
                <option value="">Select a category</option>
                {categories.map((category) => (
                    <option key={category} value={category}>
                    {category}
                    </option>
                ))}
            </select>
        </div>

        <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1"> Description </label>
            <input type="text" name="description" value={expense.description} onChange={handleChange} className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm" placeholder="What was this expense for?" required/>
        </div>

        <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2"> Payment Method </label>
            <div className="grid grid-cols-2 gap-2">
            {Object.keys(paymentMethods).map((method) => (
                <label key={method} className={`
                    flex items-center p-3 rounded-md border cursor-pointer ${expense.paymentMethod === method ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'}`}>

                <input type="radio" name="paymentMethod" value={method} checked={expense.paymentMethod === method} onChange={handleChange} className="hidden"/>
                <div className={`w-4 h-4 rounded-full mr-2 ${paymentMethods[method]}`}></div>
                <span className="text-sm">{method}</span>
                { expense.paymentMethod === method && (
                    <CheckIcon size={16} className="ml-auto text-blue-500" />
                )}
                </label>
            ))}
            </div>
        </div>
        <div className="flex justify-end space-x-3">
            <button type="button" onClick={onCancel} className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Cancel
            </button>
            <button type="submit" className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500" >
                Add Expense
            </button>
        </div>
    </form>
)
}

export default NewExpense;
